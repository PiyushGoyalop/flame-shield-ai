
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
        
        console.log("Reset token from localStorage:", token ? "Present" : "Not present");
        console.log("Reset in progress flag:", resetInProgress);
        
        if (!token || resetInProgress !== 'true') {
          console.error("No reset token found");
          setVerificationStatus("error");
          return;
        }
        
        // Try to verify the token
        try {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'recovery',
          });
          
          if (error) {
            console.error("Error verifying OTP:", error);
            setVerificationStatus("error");
            toast({
              title: "Reset link invalid",
              description: "Your password reset link is invalid or has expired.",
              variant: "destructive",
            });
            return;
          }
          
          console.log("OTP verification successful");
          setVerificationStatus("success");
        } catch (error) {
          console.error("Error in OTP verification:", error);
          
          // Even if OTP verification fails, check if we have a session
          // as it might have been verified earlier
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session) {
            console.log("Session found, proceeding with password reset");
            setVerificationStatus("success");
            return;
          }
          
          setVerificationStatus("error");
          toast({
            title: "Reset link expired",
            description: "Your password reset link has expired. Please request a new one.",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error("Error in reset token verification:", err);
        setVerificationStatus("error");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyResetToken();
  }, [toast, navigate]);

  // Clean up the localStorage when component unmounts or on success
  useEffect(() => {
    return () => {
      if (verificationStatus === "success" || verificationStatus === "error") {
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
