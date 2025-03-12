
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Key } from "lucide-react";
import { LoadingButton } from "@/components/auth/LoadingButton";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Label } from "@/components/ui/label";
import { PasswordRequirements } from "@/components/auth/PasswordRequirements";
import { useToast } from "@/hooks/use-toast";
import { isStrongPassword } from "@/services/authService";
import { supabase } from "@/integrations/supabase/client";

export function UpdatePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false
  });
  
  useEffect(() => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    });
  }, [password]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    if (!isStrongPassword(password)) {
      toast({
        title: "Password is not strong enough",
        description: "Please ensure your password meets all the requirements",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Password updated successfully",
        description: "Your password has been reset. You can now sign in with your new password.",
      });
      
      // Short delay before redirecting
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error: any) {
      console.error("Password update error:", error);
      toast({
        title: "Failed to update password",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="new-password">New Password</Label>
        <PasswordInput
          id="new-password"
          value={password}
          onChange={setPassword}
          disabled={isLoading}
          required={true}
        />
        
        <PasswordRequirements validation={passwordValidation} />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <PasswordInput
          id="confirm-password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          disabled={isLoading}
          required={true}
        />
      </div>
      
      <LoadingButton 
        isLoading={isLoading} 
        loadingText="Updating Password..."
        icon={<Key className="h-4 w-4" />}
      >
        Update Password
      </LoadingButton>
    </form>
  );
}
