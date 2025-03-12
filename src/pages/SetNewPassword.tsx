
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { UpdatePasswordForm } from "@/components/auth/UpdatePasswordForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const SetNewPassword = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<"success" | "error" | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const verifyPasswordResetSession = async () => {
      try {
        setIsVerifying(true);
        
        console.log("Verifying password reset token...");
        
        // Check the session
        const { error } = await supabase.auth.refreshSession();
        
        if (error) {
          console.error("Password reset verification error:", error);
          setVerificationStatus("error");
          toast({
            title: "Password reset failed",
            description: "Your link may be invalid or expired.",
            variant: "destructive",
          });
        } else {
          setVerificationStatus("success");
          toast({
            title: "Ready to reset password",
            description: "Please enter your new password below.",
          });
        }
      } catch (err) {
        console.error("Unexpected error during verification:", err);
        setVerificationStatus("error");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPasswordResetSession();
  }, [toast]);

  // Success state - show the password reset form
  const renderPasswordResetForm = () => (
    <div className="space-y-4">
      <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
        <p className="font-medium">Recovery link verified!</p>
        <p className="text-sm mt-1">Please set your new password below.</p>
      </div>
      <UpdatePasswordForm />
    </div>
  );
  
  // Error state
  const renderError = () => (
    <div className="text-center">
      <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
        <p className="font-medium">Password reset link invalid</p>
        <p className="text-sm mt-1">The link may be invalid or expired.</p>
      </div>
      <Button onClick={() => navigate("/signin")} className="mt-4">
        Return to Sign In
      </Button>
    </div>
  );

  return (
    <AuthLayout 
      title="Reset Password" 
      description="Set your new password"
    >
      <div className="flex flex-col items-center justify-center py-8">
        {isVerifying ? (
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-wildfire-600 mx-auto mb-4" />
            <p className="text-lg font-medium">Verifying reset link...</p>
          </div>
        ) : verificationStatus === "success" ? (
          renderPasswordResetForm()
        ) : (
          renderError()
        )}
      </div>
    </AuthLayout>
  );
};

export default SetNewPassword;
