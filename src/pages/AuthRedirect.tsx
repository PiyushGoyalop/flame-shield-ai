
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const AuthRedirect = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error" | "reset_password">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // Get the hash parameters and query parameters from the URL
        const hash = window.location.hash;
        const hashParams = new URLSearchParams(hash.substring(1));
        const queryParams = new URLSearchParams(location.search);
        
        // Log the full details for debugging
        console.log("Processing auth redirect at:", window.location.href);
        console.log("URL Hash:", hash);
        console.log("Hash params:", Object.fromEntries(hashParams.entries()));
        console.log("Query params:", Object.fromEntries(queryParams.entries()));
        console.log("URL path:", location.pathname);
        
        // Check for type parameter which indicates email confirmation or recovery
        const type = queryParams.get("type");
        const token = queryParams.get("token");
        const accessToken = hashParams.get("access_token") || queryParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token") || queryParams.get("refresh_token");
        const error = queryParams.get("error");
        const errorDescription = queryParams.get("error_description");
        
        // Handle error case first
        if (error) {
          console.error("Auth error from URL:", error, errorDescription);
          setStatus("error");
          setErrorMessage(errorDescription || `Authentication error: ${error}`);
          return;
        }
        
        // Handle token cases
        if (type === "email_confirmation" || queryParams.has("confirmation")) {
          // This is an email confirmation
          console.log("Email confirmation detected");
          setStatus("success");
          setSuccessMessage("Your email has been confirmed successfully!");
          
          // Show a toast notification
          toast({
            title: "Email confirmed successfully",
            description: "You can now sign in to your account.",
          });
          
          // After 2 seconds, redirect to sign in
          setTimeout(() => navigate("/signin"), 2000);
        } 
        else if (type === "recovery" || token || (accessToken && queryParams.has("type"))) {
          // This is a password reset flow
          console.log("Recovery mode detected, showing password reset form");
          setStatus("reset_password");
          
          // If we have an access token, try to set the session
          if (accessToken) {
            console.log("Found access token in URL for password reset");
            try {
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
          else if (token) {
            console.log("Found token in URL parameters for password reset:", token);
          }
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
              setStatus("error");
              setErrorMessage("Failed to set authentication session: " + error.message);
            } else {
              console.log("Session set successfully with access token");
              setStatus("success");
              setSuccessMessage("Authentication successful!");
              
              toast({
                title: "Authentication successful",
                description: "You have been signed in.",
              });
              
              // Redirect to home page after successful sign-in
              setTimeout(() => navigate("/"), 1000);
            }
          } catch (sessionError: any) {
            console.error("Exception when setting session:", sessionError);
            setStatus("error");
            setErrorMessage(sessionError.message || "An error occurred while setting your session");
          }
        } 
        else {
          // If we don't have any recognized parameters, show an error
          console.log("No valid authentication parameters found in URL");
          setStatus("error");
          setErrorMessage("Invalid authentication link. No authentication information found in the URL.");
        }
      } catch (error: any) {
        console.error("Auth redirect error:", error);
        setStatus("error");
        setErrorMessage(error.message || "An unexpected error occurred during authentication");
      }
    };

    handleRedirect();
  }, [navigate, location, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          {status === "reset_password" ? (
            <>
              <CardHeader className="text-center">
                <AuthHeader 
                  title="Reset Your Password" 
                  description="Enter a new password for your account"
                />
              </CardHeader>
              <CardContent>
                <PasswordResetForm />
              </CardContent>
            </>
          ) : (
            <CardContent className="pt-6 pb-8 px-8">
              <div className="flex flex-col items-center text-center gap-4">
                {status === "loading" && (
                  <>
                    <Loader2 size={40} className="text-wildfire-600 animate-spin" />
                    <h1 className="text-2xl font-semibold text-gray-800">Processing...</h1>
                    <p className="text-gray-600">
                      Please wait while we validate your authentication.
                    </p>
                  </>
                )}

                {status === "success" && (
                  <>
                    <CheckCircle size={40} className="text-green-600" />
                    <h1 className="text-2xl font-semibold text-gray-800">Success!</h1>
                    <p className="text-gray-600 mb-4">
                      {successMessage || "You have been successfully authenticated."}
                    </p>
                    <p className="text-sm text-gray-500">
                      Redirecting you automatically...
                    </p>
                    <Button
                      className="mt-2"
                      onClick={() => navigate(
                        location.search.includes("type=email_confirmation") 
                          ? "/signin" 
                          : "/"
                      )}
                    >
                      Continue Now
                    </Button>
                  </>
                )}

                {status === "error" && (
                  <>
                    <AlertCircle size={40} className="text-red-600" />
                    <h1 className="text-2xl font-semibold text-gray-800">Error</h1>
                    <p className="text-gray-600 mb-4">
                      {errorMessage || "Something went wrong with the authentication process."}
                    </p>
                    <Button onClick={() => navigate("/signin")}>
                      Return to Sign In
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          )}
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthRedirect;
