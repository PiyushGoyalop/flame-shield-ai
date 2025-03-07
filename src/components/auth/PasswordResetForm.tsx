
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
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

  // Check if we have a session when the component mounts
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Current session on password reset form:", session ? "Session exists" : "No session");
    };
    
    checkSession();
  }, []);

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
      
      // Get access token from URL if available
      const searchParams = new URLSearchParams(location.search);
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      
      let accessToken = hashParams.get("access_token");
      const token = searchParams.get("token");
      
      // If we have an access token in the URL, use it to set the session
      if (accessToken) {
        console.log("Found access token in URL, setting session");
        
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: hashParams.get("refresh_token") || "",
        });
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          throw sessionError;
        }
      } 
      // If we have a token parameter but no access_token (common for password reset links)
      else if (token) {
        console.log("Found token parameter for password reset, using updateUser with token");
        // This approach works better with the token parameter from email links
        const { error } = await supabase.auth.updateUser({ 
          password,
        });
        
        if (error) {
          console.error("Error updating password with token:", error);
          throw error;
        }
      }
      // Standard password update using current session
      else {
        // Update the password
        const { error } = await supabase.auth.updateUser({ password });
        
        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }
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
};
