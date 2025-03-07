
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type AuthRedirectStatus = "loading" | "success" | "error" | "reset_password";

const AuthRedirect = () => {
  const [status, setStatus] = useState<AuthRedirectStatus>("loading");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        console.log("Processing auth redirect:", window.location.href);
        
        // Parse URL parameters
        const hash = window.location.hash;
        const searchParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(hash.substring(1));
        
        // Extract tokens and parameters
        const token = searchParams.get("token");
        const type = searchParams.get("type");
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        const error = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");
        
        // Handle errors first
        if (error) {
          console.error("Auth error:", error, errorDescription);
          setStatus("error");
          setMessage(errorDescription || `Authentication error: ${error}`);
          return;
        }

        // Handle password reset
        if (type === "recovery" || searchParams.has("type") && searchParams.get("type") === "recovery") {
          console.log("Password reset flow detected");
          
          // Try to set session if we have an access token
          if (accessToken) {
            try {
              await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken || "",
              });
              console.log("Session set for password reset");
            } catch (e) {
              console.error("Error setting session for password reset:", e);
            }
          }
          
          setStatus("reset_password");
          return;
        }
        
        // Handle email confirmation
        if (type === "email_confirmation" || searchParams.has("confirmation")) {
          console.log("Email confirmation flow detected");
          
          toast({
            title: "Email confirmed",
            description: "Your email has been confirmed. You can now sign in.",
          });
          
          setTimeout(() => navigate("/signin"), 2000);
          
          setStatus("success");
          setMessage("Your email has been confirmed successfully!");
          return;
        }
        
        // Handle successful sign-in with token
        if (accessToken) {
          console.log("Access token found - successful authentication");
          
          try {
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || "",
            });
            
            if (error) {
              console.error("Error setting session:", error);
              setStatus("error");
              setMessage("Failed to set authentication session: " + error.message);
              return;
            }
            
            toast({
              title: "Authentication successful",
              description: "You have been signed in.",
            });
            
            setTimeout(() => navigate("/"), 1000);
            
            setStatus("success");
            setMessage("Authentication successful!");
            return;
          } catch (error: any) {
            console.error("Exception setting session:", error);
            setStatus("error");
            setMessage(error.message || "An error occurred while setting your session");
            return;
          }
        }
        
        // If we reach here, no valid auth parameters were found
        setStatus("error");
        setMessage("Invalid authentication link. No authentication information found.");
      } catch (error: any) {
        console.error("Auth redirect error:", error);
        setStatus("error");
        setMessage(error.message || "An unexpected error occurred");
      }
    };
    
    handleRedirect();
  }, [navigate, toast]);

  // Render different content based on status
  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="flex flex-col items-center text-center gap-4">
            <Loader2 size={40} className="text-wildfire-600 animate-spin" />
            <h1 className="text-2xl font-semibold text-gray-800">Processing...</h1>
            <p className="text-gray-600">
              Please wait while we validate your authentication.
            </p>
          </div>
        );
      
      case "success":
        return (
          <div className="flex flex-col items-center text-center gap-4">
            <CheckCircle size={40} className="text-green-600" />
            <h1 className="text-2xl font-semibold text-gray-800">Success!</h1>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting you automatically...</p>
            <Button onClick={() => navigate("/")}>
              Continue Now
            </Button>
          </div>
        );
      
      case "error":
        return (
          <div className="flex flex-col items-center text-center gap-4">
            <AlertCircle size={40} className="text-red-600" />
            <h1 className="text-2xl font-semibold text-gray-800">Error</h1>
            <p className="text-gray-600 mb-4">{message}</p>
            <Button onClick={() => navigate("/signin")}>
              Return to Sign In
            </Button>
          </div>
        );
      
      case "reset_password":
        return (
          <PasswordResetForm />
        );
    }
  };

  // For password reset, use the auth layout
  if (status === "reset_password") {
    return (
      <AuthLayout
        title="Reset Your Password"
        description="Enter a new password for your account"
      >
        <PasswordResetForm />
      </AuthLayout>
    );
  }

  // For other states, use a simple card layout
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 pb-8 px-8">
            {renderContent()}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AuthRedirect;
