
import { ReactNode } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { CardContent } from "@/components/ui/card";

interface AuthStateProps {
  message: string;
  action?: ReactNode;
}

export const LoadingState = () => (
  <AuthStateContainer>
    <Loader2 size={40} className="text-wildfire-600 animate-spin" />
    <h1 className="text-2xl font-semibold text-gray-800">Processing...</h1>
    <p className="text-gray-600">
      Please wait while we validate your authentication.
    </p>
  </AuthStateContainer>
);

export const SuccessState = ({ message }: AuthStateProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <AuthStateContainer>
      <CheckCircle size={40} className="text-green-600" />
      <h1 className="text-2xl font-semibold text-gray-800">Success!</h1>
      <p className="text-gray-600 mb-4">
        {message || "You have been successfully authenticated."}
      </p>
      <p className="text-sm text-gray-500">
        Redirecting you automatically...
      </p>
      <Button
        className="mt-2"
        onClick={() => navigate(
          location.search.includes("type=email_confirmation") 
            ? "/signin" 
            : "/"
        )}
      >
        Continue Now
      </Button>
    </AuthStateContainer>
  );
};

export const ErrorState = ({ message }: AuthStateProps) => {
  const navigate = useNavigate();
  
  return (
    <AuthStateContainer>
      <AlertCircle size={40} className="text-red-600" />
      <h1 className="text-2xl font-semibold text-gray-800">Error</h1>
      <p className="text-gray-600 mb-4">
        {message || "Something went wrong with the authentication process."}
      </p>
      <Button onClick={() => navigate("/signin")}>
        Return to Sign In
      </Button>
    </AuthStateContainer>
  );
};

const AuthStateContainer = ({ children }: { children: ReactNode }) => (
  <CardContent className="pt-6 pb-8 px-8">
    <div className="flex flex-col items-center text-center gap-4">
      {children}
    </div>
  </CardContent>
);
