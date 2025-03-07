
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { extractTokensFromUrl } from "./authTokenUtils";

export type AuthRedirectStatus = "loading" | "success" | "error" | "reset_password";

interface ProcessRedirectResult {
  status: AuthRedirectStatus;
  errorMessage: string;
  successMessage: string;
}

export const processAuthRedirect = async (
  navigate: ReturnType<typeof useNavigate>,
  toast: ReturnType<typeof useToast>["toast"]
): Promise<ProcessRedirectResult> => {
  try {
    console.log("Processing auth redirect at:", window.location.href);
    
    // Get tokens from URL using our existing utility
    const { token, accessToken, refreshToken, type } = extractTokensFromUrl();
    
    // Get query parameters for additional checks
    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get("error");
    const errorDescription = queryParams.get("error_description");
    const hasConfirmation = queryParams.has("confirmation");
    
    // Debug log all parameters we're checking
    console.log("Auth redirect parameters:", {
      token, accessToken, refreshToken, type,
      errorFromURL: error,
      errorDescription,
      hasConfirmation,
      queryParams: Object.fromEntries(queryParams.entries())
    });
    
    // Handle error case first
    if (error) {
      console.error("Auth error from URL:", error, errorDescription);
      return {
        status: "error",
        errorMessage: errorDescription || `Authentication error: ${error}`,
        successMessage: ""
      };
    }
    
    // If this is a password reset link, prioritize setting up the session
    if (type === "recovery" || token || (queryParams.has("type") && queryParams.get("type") === "recovery")) {
      console.log("Recovery mode detected, showing password reset form");
      
      // Try to set the session if we have an access token
      if (accessToken) {
        try {
          console.log("Found access token in URL for password reset, setting session");
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || "",
          });
          
          if (error) {
            console.error("Error setting session with access token:", error);
          } else {
            console.log("Session set successfully with access token");
          }
        } catch (sessionError) {
          console.error("Exception when setting session:", sessionError);
        }
      }
      
      return {
        status: "reset_password",
        errorMessage: "",
        successMessage: ""
      };
    }
    
    // Handle token cases
    if (type === "email_confirmation" || hasConfirmation) {
      // This is an email confirmation
      console.log("Email confirmation detected");
      
      // Show a toast notification
      toast({
        title: "Email confirmed successfully",
        description: "You can now sign in to your account.",
      });
      
      // After 2 seconds, redirect to sign in
      setTimeout(() => navigate("/signin"), 2000);
      
      return {
        status: "success",
        successMessage: "Your email has been confirmed successfully!",
        errorMessage: ""
      };
    } 
    else if (accessToken) {
      // This is a successful sign-in or other auth flow with a token
      console.log("Access token found - successful authentication");
      
      // Try to set the session with the access token
      try {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || "",
        });
        
        if (error) {
          console.error("Error setting session with access token:", error);
          return {
            status: "error",
            errorMessage: "Failed to set authentication session: " + error.message,
            successMessage: ""
          };
        } else {
          console.log("Session set successfully with access token");
          
          toast({
            title: "Authentication successful",
            description: "You have been signed in.",
          });
          
          // Redirect to home page after successful sign-in
          setTimeout(() => navigate("/"), 1000);
          
          return {
            status: "success",
            successMessage: "Authentication successful!",
            errorMessage: ""
          };
        }
      } catch (sessionError: any) {
        console.error("Exception when setting session:", sessionError);
        return {
          status: "error",
          errorMessage: sessionError.message || "An error occurred while setting your session",
          successMessage: ""
        };
      }
    } 
    else {
      // If we don't have any recognized parameters, show an error
      console.log("No valid authentication parameters found in URL");
      return {
        status: "error",
        errorMessage: "Invalid authentication link. No authentication information found in the URL.",
        successMessage: ""
      };
    }
  } catch (error: any) {
    console.error("Auth redirect error:", error);
    return {
      status: "error",
      errorMessage: error.message || "An unexpected error occurred during authentication",
      successMessage: ""
    };
  }
};
