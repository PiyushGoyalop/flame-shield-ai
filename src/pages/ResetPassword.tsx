
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/auth/LoadingButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useRedirectUrl } from "@/hooks/useRedirectUrl";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getRedirectUrl } = useRedirectUrl();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Use the auth-redirect URL which will handle redirecting to set-new-password
      // This is critical for the password reset flow to work correctly
      const redirectUrl = getRedirectUrl('reset-password');
      console.log("Using password reset redirect URL:", redirectUrl);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });
      
      if (error) {
        throw error;
      }
      
      setEmailSent(true);
      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link",
      });
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast({
        title: "Failed to send reset email",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToSignIn = () => {
    navigate("/signin");
  };

  return (
    <AuthLayout 
      title="Reset Password" 
      description="Enter your email to receive a password reset link"
    >
      {emailSent ? (
        <div className="space-y-4">
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              <p className="mb-4">
                We've sent a password reset link to <strong>{email}</strong>.
              </p>
              <p className="text-sm">
                Please check your inbox and click the link to reset your password. 
                If you don't see the email, check your spam folder.
              </p>
            </AlertDescription>
          </Alert>
          
          <LoadingButton 
            isLoading={false}
            loadingText=""
            onClick={handleBackToSignIn}
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Return to Sign In
          </LoadingButton>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          
          <LoadingButton 
            isLoading={isLoading} 
            loadingText="Sending Reset Link..."
            icon={<Mail className="h-4 w-4" />}
          >
            Send Reset Link
          </LoadingButton>
          
          <button
            type="button"
            onClick={handleBackToSignIn}
            className="w-full mt-2 text-sm text-center text-wildfire-600 hover:text-wildfire-800"
          >
            Back to Sign In
          </button>
        </form>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
