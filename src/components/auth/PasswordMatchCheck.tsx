
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface PasswordMatchCheckProps {
  error: string | null;
  passwordsMatch: boolean;
  showMatchError: boolean;
}

export function PasswordMatchCheck({ error, passwordsMatch, showMatchError }: PasswordMatchCheckProps) {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  if (showMatchError && !passwordsMatch) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Passwords do not match.</AlertDescription>
      </Alert>
    );
  }
  
  return null;
}
