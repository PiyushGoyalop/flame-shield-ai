
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "./PasswordInput";
import { PasswordRequirements } from "./PasswordRequirements";
import { PasswordMatchCheck } from "./PasswordMatchCheck";
import { usePasswordValidation } from "@/hooks/usePasswordValidation";

export function PasswordResetForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMatchError, setShowMatchError] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { validation, updateValidation, isPasswordValid } = usePasswordValidation();

  const passwordsMatch = password === confirmPassword;

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    updateValidation(newPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setShowMatchError(true);

    if (!isPasswordValid()) {
      setError("Please ensure your password meets all requirements.");
      return;
    }

    if (!passwordsMatch) {
      return; // The error will be shown by the PasswordMatchCheck component
    }

    setIsSubmitting(true);

    try {
      console.log("Attempting to update password");
      
      // Get the current URL parameters to check for token information
      const hash = window.location.hash;
      const searchParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(hash.substring(1));
      
      // Check if we have an access token in the URL
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      const token = searchParams.get("token");
      
      console.log("Reset password info:", { 
        hasAccessToken: !!accessToken, 
        hasToken: !!token 
      });
      
      // If we have an access token, set the session first
      if (accessToken) {
        console.log("Setting session with access token");
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || "",
        });
        
        if (sessionError) {
          console.error("Error setting session:", sessionError);
          throw sessionError;
        }
      }
      
      // If we have a recovery token, verify it first
      if (token) {
        console.log("Verifying recovery token");
        const { error: verifyError } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'recovery'
        });
        
        if (verifyError) {
          console.error("Error verifying token:", verifyError);
          // Continue anyway, as some versions of Supabase don't require this step
        }
      }
      
      // Now update the password
      console.log("Updating password");
      const { error: updateError } = await supabase.auth.updateUser({ password });
      
      if (updateError) {
        console.error("Error updating password:", updateError);
        throw updateError;
      }
      
      console.log("Password updated successfully");
      
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
      <PasswordMatchCheck 
        error={error} 
        passwordsMatch={passwordsMatch} 
        showMatchError={showMatchError} 
      />

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
        disabled={isSubmitting || !isPasswordValid() || !passwordsMatch}
      >
        {isSubmitting ? "Updating Password..." : "Reset Password"}
      </Button>
    </form>
  );
}
