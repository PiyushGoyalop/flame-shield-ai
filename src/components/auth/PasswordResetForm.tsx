
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { PasswordInput } from "./PasswordInput";
import { PasswordRequirements } from "./PasswordRequirements";
import { Label } from "@/components/ui/label";

export function PasswordResetForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Password validation state
  const [validation, setValidation] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false
  });

  const updateValidation = (password: string) => {
    setValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    });
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    updateValidation(newPassword);
  };

  const isPasswordValid = () => {
    return validation.length && validation.uppercase && validation.number && validation.special;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isPasswordValid()) {
      setError("Please ensure your password meets all requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Log before attempting the update to help with debugging
      console.log("Attempting to update password");
      
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      
      console.log("Password update successful");
      
      toast({
        title: "Password updated successfully",
        description: "You can now sign in with your new password.",
      });
      
      // Redirect to sign in page after successful password reset
      setTimeout(() => navigate("/signin"), 1500);
    } catch (err: any) {
      console.error("Error resetting password:", err);
      setError(err.message || "An error occurred while resetting your password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <PasswordInput 
          id="password"
          value={password}
          onChange={handlePasswordChange}
          disabled={isSubmitting}
          required={true}
        />
        <PasswordRequirements validation={validation} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <PasswordInput
          id="confirmPassword"
          value={confirmPassword}
          onChange={setConfirmPassword}
          disabled={isSubmitting}
          required={true}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={isSubmitting || !isPasswordValid() || password !== confirmPassword}
      >
        {isSubmitting ? "Updating Password..." : "Reset Password"}
      </Button>
    </form>
  );
}
