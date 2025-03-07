
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "./PasswordInput";
import { PasswordRequirements } from "./PasswordRequirements";
import { PasswordMatchCheck } from "./PasswordMatchCheck";
import { usePasswordValidation } from "@/hooks/usePasswordValidation";
import { extractTokensFromUrl, logTokenInfo } from "@/utils/authTokenUtils";

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

  // Check for tokens when component mounts
  useEffect(() => {
    const checkSessionAndTokens = async () => {
      console.log("Checking session and tokens for password reset form");
      logTokenInfo();
      
      // Check for existing session
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Current session on password reset form:", session ? "Session exists" : "No session");
    };
    
    checkSessionAndTokens();
  }, []);

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
      await resetPassword(password);
      
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
};

// Helper function to try different methods for resetting the password
async function resetPassword(password: string) {
  const { token, accessToken, refreshToken } = extractTokensFromUrl();
  
  // First approach: If we have a token parameter (common for password reset links)
  if (token) {
    console.log("Using token parameter for password reset:", token);
    
    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'recovery'
      });
      
      if (verifyError) {
        console.error("Error verifying recovery token:", verifyError);
      } else {
        console.log("Recovery token verified successfully");
      }
    } catch (verifyError) {
      console.log("Error in token verification, but continuing with password update:", verifyError);
    }
    
    // Try to update the password
    const { error } = await supabase.auth.updateUser({ password });
    
    if (error) {
      console.error("Error updating password with token:", error);
      throw error;
    }
    
    console.log("Password update successful with token parameter");
    return;
  }
  
  // Second approach: If we have an access token in the URL, use it to set the session
  if (accessToken) {
    console.log("Using access token from URL for password reset");
    
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken || "",
    });
    
    if (sessionError) {
      console.error("Session error:", sessionError);
      throw sessionError;
    }
    
    // After setting the session, update the password
    const { error } = await supabase.auth.updateUser({ password });
    
    if (error) {
      console.error("Error updating password with access token:", error);
      throw error;
    }
    
    console.log("Password update successful with access token");
    return;
  }
  
  // Third approach: Standard password update using current session
  console.log("Using current session for password update");
  
  // Update the password
  const { error } = await supabase.auth.updateUser({ password });
  
  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }
  
  console.log("Password update successful with current session");
}
