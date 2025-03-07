
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { 
  LoadingState, 
  SuccessState, 
  ErrorState 
} from "@/components/auth/AuthRedirectStates";
import { 
  processAuthRedirect, 
  AuthRedirectStatus 
} from "@/utils/authRedirectUtils";

const AuthRedirect = () => {
  const [status, setStatus] = useState<AuthRedirectStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleRedirect = async () => {
      const result = await processAuthRedirect(navigate, toast);
      setStatus(result.status);
      setErrorMessage(result.errorMessage);
      setSuccessMessage(result.successMessage);
    };

    handleRedirect();
  }, [navigate, location, toast]);

  // Special case for password reset
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

  // For other states, we use a simpler card layout
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          {status === "loading" ? (
            <LoadingState />
          ) : status === "success" ? (
            <SuccessState message={successMessage} />
          ) : (
            <ErrorState message={errorMessage} />
          )}
        </Card>
      </main>
    </div>
  );
};

export default AuthRedirect;
