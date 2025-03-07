
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
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
          ) : status === "loading" ? (
            <LoadingState />
          ) : status === "success" ? (
            <SuccessState message={successMessage} />
          ) : (
            <ErrorState message={errorMessage} />
          )}
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthRedirect;
