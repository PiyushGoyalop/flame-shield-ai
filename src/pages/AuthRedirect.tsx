
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuthRedirect = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // Get the hash parameters from the URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const queryParams = new URLSearchParams(location.search);
        
        // Check for type parameter which indicates email confirmation or recovery
        const type = queryParams.get("type");
        
        if (type === "email_confirmation") {
          // This is an email confirmation
          setStatus("success");
          
          // Show a toast notification to inform the user
          toast({
            title: "Email confirmed successfully",
            description: "You can now sign in to your account.",
          });
          
          // After 3 seconds, redirect to sign in
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        } else if (type === "recovery") {
          // This is a password reset
          setStatus("success");
          
          toast({
            title: "Password reset link verified",
            description: "You can now set a new password for your account.",
          });
          
          // After 3 seconds, redirect to a password reset page
          // For now, we'll redirect to sign in
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        } else if (hashParams.has("access_token")) {
          // This is a successful authentication redirect
          setStatus("success");
          
          toast({
            title: "Authentication successful",
            description: "You have been successfully signed in.",
          });
          
          // Redirect to home page immediately
          navigate("/");
        } else {
          // If we don't have an access token or confirmation, something went wrong
          setStatus("error");
          setErrorMessage("Invalid redirect. No authentication information found.");
        }
      } catch (error: any) {
        console.error("Redirect error:", error);
        setStatus("error");
        setErrorMessage(error.message || "An unexpected error occurred");
      }
    };

    handleRedirect();
  }, [navigate, location, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
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
                  {location.search.includes("type=email_confirmation") 
                    ? "Your email has been confirmed." 
                    : location.search.includes("type=recovery")
                      ? "Your password reset request has been verified."
                      : "You have been successfully authenticated."}
                </p>
                <p className="text-sm text-gray-500">
                  Redirecting you automatically...
                </p>
                <Button
                  className="mt-2"
                  onClick={() => navigate(
                    location.search.includes("type=email_confirmation") || 
                    location.search.includes("type=recovery") 
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
      </Card>
    </div>
  );
};

export default AuthRedirect;
