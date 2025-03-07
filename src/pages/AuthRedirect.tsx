
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";
import { LoadingState, SuccessState, ErrorState } from "@/components/auth/AuthRedirectStates";
import { processAuthRedirect, AuthRedirectStatus } from "@/utils/authRedirectUtils";
import { extractTokensFromUrl } from "@/utils/authTokenUtils";

const AuthRedirect = () => {
  const [status, setStatus] = useState<AuthRedirectStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      console.log("AuthRedirect - Current URL:", window.location.href);
      
      // Check for recovery/reset password flow first since it needs special handling
      const { type, token } = extractTokensFromUrl();
      const queryParams = new URLSearchParams(window.location.search);
      
      if (type === "recovery" || queryParams.get("type") === "recovery" || token) {
        console.log("Detected password reset flow, showing reset form");
        setStatus("reset_password");
        return;
      }
      
      // For other auth flows, process with our utility
      try {
        const result = await processAuthRedirect(navigate, toast);
        setStatus(result.status);
        setErrorMessage(result.errorMessage);
        setSuccessMessage(result.successMessage);
      } catch (error: any) {
        console.error("Error in auth redirect:", error);
        setStatus("error");
        setErrorMessage(error.message || "An unexpected error occurred");
      }
    };

    handleAuthRedirect();
  }, [navigate, toast]);

  return (
    <div className="container mx-auto py-10 max-w-md">
      {status === "reset_password" ? (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Reset Your Password</h1>
            <p className="text-muted-foreground">
              Please enter a new password for your account.
            </p>
          </div>
          <PasswordResetForm />
        </div>
      ) : (
        <>
          {status === "loading" && <LoadingState />}
          {status === "success" && <SuccessState message={successMessage} />}
          {status === "error" && <ErrorState message={errorMessage} />}
        </>
      )}
    </div>
  );
};

export default AuthRedirect;
