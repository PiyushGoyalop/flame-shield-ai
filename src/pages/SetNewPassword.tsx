
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { 
  PasswordResetLoading, 
  PasswordResetSuccess, 
  PasswordResetError 
} from "@/components/auth/PasswordResetComponents";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SetNewPassword = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<"success" | "error" | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const verifyResetToken = async () => {
      try {
        console.log("SetNewPassword component mounted");
        
        // Check if we have a reset token in localStorage
        const token = localStorage.getItem('passwordResetToken');
        const resetInProgress = localStorage.getItem('passwordResetInProgress');
        
        console.log("Reset token from localStorage:", token ? "Present (length: " + token.length + ")" : "Not present");
        console.log("Reset in progress flag:", resetInProgress);
        
        if (!token || resetInProgress !== 'true') {
          console.error("No valid reset token found in localStorage");
          setVerificationStatus("error");
          
          // Show toast and redirect if no token
          toast({
            title: "Reset link invalid",
            description: "No valid password reset session found. Please request a new link.",
            variant: "destructive",
          });
          
          // Clean up any partial state
          localStorage.removeItem('passwordResetToken');
          localStorage.removeItem('passwordResetInProgress');
          
          // Wait a bit before redirecting
          setTimeout(() => {
            navigate('/reset-password', { replace: true });
          }, 2000);
          
          return;
        }
        
        // Verify the token is a valid format (simple check)
        if (token.length < 10) {
          console.error("Token format appears invalid");
          setVerificationStatus("error");
          localStorage.removeItem('passwordResetToken');
          localStorage.removeItem('passwordResetInProgress');
          return;
        }
        
        // We have a token, assume it's valid at this point
        console.log("Password reset token found, proceeding with form");
        setVerificationStatus("success");
      } catch (err) {
        console.error("Error in reset token verification:", err);
        setVerificationStatus("error");
        toast({
          title: "Error verifying reset link",
          description: "Please try requesting a new password reset link",
          variant: "destructive",
        });
        
        // Clean up on error
        localStorage.removeItem('passwordResetToken');
        localStorage.removeItem('passwordResetInProgress');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyResetToken();
  }, [toast, navigate]);

  // Clean up the localStorage when component unmounts
  useEffect(() => {
    return () => {
      // Only clean up token if there was an error
      if (verificationStatus === "error") {
        localStorage.removeItem('passwordResetToken');
        localStorage.removeItem('passwordResetInProgress');
      }
    };
  }, [verificationStatus]);

  return (
    <AuthLayout 
      title="Reset Password" 
      description="Set your new password"
    >
      <div className="flex flex-col items-center justify-center py-8">
        {isVerifying ? (
          <PasswordResetLoading />
        ) : verificationStatus === "success" ? (
          <PasswordResetSuccess />
        ) : (
          <PasswordResetError />
        )}
      </div>
    </AuthLayout>
  );
};

export default SetNewPassword;
