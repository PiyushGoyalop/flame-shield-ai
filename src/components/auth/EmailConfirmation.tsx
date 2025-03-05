
import { useState } from "react";
import { AlertCircle, Mail } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface EmailConfirmationProps {
  email: string;
}

export function EmailConfirmation({ email }: EmailConfirmationProps) {
  const [isResending, setIsResending] = useState(false);
  const { resendConfirmationEmail } = useAuth();

  const handleResendConfirmation = async () => {
    if (!email) return;
    
    setIsResending(true);
    try {
      await resendConfirmationEmail(email);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Alert className="mt-6 bg-amber-50 border-amber-200">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-800">Check your email</AlertTitle>
      <AlertDescription className="text-amber-700">
        <p className="mt-1 mb-3">
          We've sent a confirmation link to <strong>{email}</strong>. 
          Please check your inbox and click the link to verify your account.
        </p>
        <p className="text-sm mb-3">
          If you don't receive an email within a few minutes, check your spam folder or click below to resend.
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleResendConfirmation}
          disabled={isResending}
          className="border-amber-300 text-amber-800 hover:bg-amber-100"
        >
          <Mail className="mr-2 h-4 w-4" />
          {isResending ? "Sending..." : "Resend confirmation email"}
        </Button>
      </AlertDescription>
    </Alert>
  );
}
