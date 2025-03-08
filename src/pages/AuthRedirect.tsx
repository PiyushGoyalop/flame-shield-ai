
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LoadingState, SuccessState, ErrorState } from "@/components/auth/AuthRedirectStates";
import { processAuthRedirect, AuthRedirectStatus } from "@/utils/authRedirectUtils";
import { extractTokensFromUrl } from "@/utils/authTokenUtils";

const AuthRedirect = () => {
  const [status, setStatus] = useState<AuthRedirectStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      console.log("AuthRedirect - Current URL:", window.location.href);
      
      // For auth flows, process with our utility
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
  }, [navigate, toast, location]);

  return (
    <div className="container mx-auto py-10 max-w-md">
      {status === "loading" && <LoadingState />}
      {status === "success" && <SuccessState message={successMessage} />}
      {status === "error" && <ErrorState message={errorMessage} />}
    </div>
  );
};

export default AuthRedirect;
