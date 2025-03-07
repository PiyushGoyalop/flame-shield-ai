
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
  const [sessionSetAttempted, setSessionSetAttempted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { validation, updateValidation, isPasswordValid } = usePasswordValidation();

  const passwordsMatch = password === confirmPassword;

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    updateValidation(newPassword);
  };

  // Check for tokens and attempt to set session when component mounts
  useEffect(() => {
    const initializePasswordReset = async () => {
      console.log("Initializing password reset form");
      logTokenInfo();
      
      // Try to set the session from URL tokens
      const { token, accessToken, refreshToken } = extractTokensFromUrl();
      
      if (accessToken) {
        console.log("Setting session with access token from URL");
        try {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || ""
          });
          
          if (error) {
            console.error("Failed to set session:", error);
          } else {
            console.log("Session set successfully:", data.session?.user?.id);
          }
        } catch (err) {
          console.error("Error setting session:", err);
        }
      } else if (token) {
        console.log("Found token parameter:", token);
        try {
          // Verify the token first
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'recovery'
          });
          
          if (error) {
            console.error("Error verifying recovery token:", error);
          } else {
            console.log("Recovery token verified successfully");
          }
        } catch (err) {
          console.error("Error verifying token:", err);
        }
      }
      
      setSessionSetAttempted(true);
    };
    
    initializePasswordReset();
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

  // If session setup is still in progress, show loading state
  if (!sessionSetAttempted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wildfire-600"></div>
        <p className="text-sm text-muted-foreground">Setting up password reset...</p>
      </div>
    );
  }

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
  
  console.log("Reset password called with token params:", { 
    hasToken: !!token, 
    hasAccessToken: !!accessToken 
  });
  
  // First approach: If we have a token parameter (common for password reset links)
  if (token) {
    console.log("Using token parameter for password reset:", token);
    
    // First try to update with just the password
    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        console.error("Error updating password with token:", error);
        throw error;
      }
      
      console.log("Password update successful with token parameter");
      return;
    } catch (updateError) {
      console.error("Error in first update attempt:", updateError);
      
      // If that fails, try verifying the token first and then updating
      try {
        console.log("Trying token verification before password update");
        const { error: verifyError } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'recovery'
        });
        
        if (verifyError) {
          console.error("Error verifying recovery token:", verifyError);
          throw verifyError;
        }
        
        console.log("Token verified, now updating password");
        const { error } = await supabase.auth.updateUser({ password });
        
        if (error) {
          console.error("Error updating password after token verification:", error);
          throw error;
        }
        
        console.log("Password update successful after token verification");
        return;
      } catch (verifyError) {
        console.error("Complete failure in token-based reset:", verifyError);
        throw verifyError;
      }
    }
  }
  
  // Second approach: If we have an access token in the URL, use it to set the session
  if (accessToken) {
    console.log("Using access token from URL for password reset");
    
    try {
      // Try to set the session with the access token
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken || "",
      });
      
      if (sessionError) {
        console.error("Session error:", sessionError);
        throw sessionError;
      }
      
      console.log("Session set successfully, now updating password");
      
      // After setting the session, update the password
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        console.error("Error updating password with access token:", error);
        throw error;
      }
      
      console.log("Password update successful with access token");
      return;
    } catch (error) {
      console.error("Complete failure in access-token-based reset:", error);
      throw error;
    }
  }
  
  // Third approach: Standard password update using current session
  console.log("Attempting password update with current session");
  
  // Get the current session to check if we have one
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    console.error("No active session found for password reset");
    throw new Error("Authentication session is missing. Please use the password reset link from your email again.");
  }
  
  console.log("Using current session for password update");
  
  // Update the password
  const { error } = await supabase.auth.updateUser({ password });
  
  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }
  
  console.log("Password update successful with current session");
}
