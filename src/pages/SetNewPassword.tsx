
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { 
  PasswordResetLoading, 
  PasswordResetSuccess, 
  PasswordResetError 
} from "@/components/auth/PasswordResetComponents";
import { usePasswordResetVerification } from "@/hooks/usePasswordResetVerification";

const SetNewPassword = () => {
  const { isVerifying, verificationStatus } = usePasswordResetVerification();

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
