
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const VerifyEmail = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<"success" | "error" | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        setIsVerifying(true);
        
        console.log("Starting email verification flow");
        
        // The access_token and refresh_token should be in the URL
        const { error } = await supabase.auth.refreshSession();
        
        if (error) {
          console.error("Verification error:", error);
          setVerificationStatus("error");
          toast({
            title: "Verification failed",
            description: "Your link may be invalid or expired.",
            variant: "destructive",
          });
        } else {
          setVerificationStatus("success");
          
          toast({
            title: "Email verified",
            description: "Your email has been successfully verified.",
          });
          
          // Short delay before redirecting to allow toast to be seen
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (err) {
        console.error("Unexpected error during verification:", err);
        setVerificationStatus("error");
      } finally {
        setIsVerifying(false);
      }
    };

    handleEmailVerification();
  }, [navigate, toast, location]);

  // Email verification success
  const renderEmailVerificationSuccess = () => (
    <div className="text-center">
      <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
        <p className="font-medium">Email verification successful!</p>
        <p className="text-sm mt-1">Redirecting you to the homepage...</p>
      </div>
    </div>
  );
  
  // Error state
  const renderError = () => (
    <div className="text-center">
      <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
        <p className="font-medium">Email verification failed</p>
        <p className="text-sm mt-1">The link may be invalid or expired.</p>
      </div>
      <Button onClick={() => navigate("/signin")} className="mt-4">
        Return to Sign In
      </Button>
    </div>
  );

  return (
    <AuthLayout 
      title="Email Verification" 
      description="Verifying your email address..."
    >
      <div className="flex flex-col items-center justify-center py-8">
        {isVerifying ? (
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-wildfire-600 mx-auto mb-4" />
            <p className="text-lg font-medium">
              Verifying your email...
            </p>
          </div>
        ) : verificationStatus === "success" ? (
          renderEmailVerificationSuccess()
        ) : (
          renderError()
        )}
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
