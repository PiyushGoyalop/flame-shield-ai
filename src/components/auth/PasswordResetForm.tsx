
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "./PasswordInput";
import { PasswordRequirements } from "./PasswordRequirements";
import { PasswordMatchCheck } from "./PasswordMatchCheck";
import { usePasswordValidation } from "@/hooks/usePasswordValidation";
import { extractTokensFromUrl } from "@/utils/authTokenUtils";

export function PasswordResetForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMatchError, setShowMatchError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
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
      
      // Extract tokens from URL to handle different Supabase auth flows
      const { token: recoveryToken } = extractTokensFromUrl();
      const searchParams = new URLSearchParams(location.search);
      const hashParams = new URLSearchParams(location.hash.substring(1));
      
      // Detailed logging for debugging
      console.log("Password reset info:", { 
        recoveryToken,
        query: Object.fromEntries(searchParams.entries()),
        hash: Object.fromEntries(hashParams.entries()),
        url: window.location.href
      });
      
      // Try multiple strategies to successfully reset the password
      
      // 1. First try: Use updateUser directly if we're already authenticated
      let updateResult = await supabase.auth.updateUser({ password });
      
      // If that fails and we have a token, try the recovery flow
      if (updateResult.error && recoveryToken) {
        console.log("Direct update failed, trying recovery flow with token");
        
        // 2. Second try: Verify the recovery token
        const verifyResult = await supabase.auth.verifyOtp({
          token_hash: recoveryToken,
          type: 'recovery'
        });
        
        console.log("Verify token result:", verifyResult);
        
        // 3. Third try: Update password again after verification
        updateResult = await supabase.auth.updateUser({ password });
      }
      
      // Check final result
      if (updateResult.error) {
        console.error("Error updating password:", updateResult.error);
        throw updateResult.error;
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
