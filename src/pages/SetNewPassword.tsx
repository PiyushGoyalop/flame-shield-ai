
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
    const verifySession = async () => {
      try {
        console.log("SetNewPassword component mounted");
        console.log("Current URL:", window.location.href);
        
        // Check if we have a valid session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Error getting session:", sessionError);
          setVerificationStatus("error");
          toast({
            title: "Reset link invalid",
            description: "Your password reset link is invalid or has expired.",
            variant: "destructive",
          });
          return;
        }
        
        if (session) {
          console.log("Valid session found for user:", session.user.id);
          setVerificationStatus("success");
          return;
        }
        
        // If no session is found, redirect to reset password page
        console.error("No active session found");
        setVerificationStatus("error");
        toast({
          title: "Reset link expired",
          description: "Your password reset link has expired. Please request a new one.",
          variant: "destructive",
        });
      } catch (err) {
        console.error("Error in session verification:", err);
        setVerificationStatus("error");
      } finally {
        setIsVerifying(false);
      }
    };

    verifySession();
  }, [toast, navigate]);

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
