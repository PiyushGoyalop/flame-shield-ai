
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { UpdatePasswordForm } from "@/components/auth/UpdatePasswordForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const SetNewPassword = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<"success" | "error" | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const verifyPasswordResetSession = async () => {
      try {
        setIsVerifying(true);
        
        // Debug logs
        console.log("SetNewPassword component mounted");
        console.log("Current URL:", window.location.href);
        console.log("Location hash:", location.hash);
        console.log("Location search:", location.search);
        console.log("Search params:", Object.fromEntries(searchParams.entries()));
        
        // 1. Check for hash parameters (Supabase's default method)
        const hashParams = location.hash 
          ? new URLSearchParams(location.hash.substring(1))
          : null;
          
        if (hashParams && hashParams.get('access_token')) {
          console.log("Found access_token in hash params");
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token') || '';
          const type = hashParams.get('type');
          
          if (accessToken && type === 'recovery') {
            console.log("Recovery flow detected in hash, setting session with tokens");
            
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            
            if (error) {
              console.error("Error setting session from hash params:", error);
              throw error;
            }
            
            console.log("Session set successfully from hash params:", data.session?.user?.id);
            setVerificationStatus("success");
            toast({
              title: "Recovery link verified",
              description: "Please set your new password below.",
            });
            return;
          }
        }
        
        // 2. Check query parameters for token
        const queryToken = searchParams.get('token');
        const queryType = searchParams.get('type');
        
        if (queryToken && queryType === 'recovery') {
          console.log("Found recovery token in query params");
          try {
            const { error } = await supabase.auth.verifyOtp({
              token_hash: queryToken,
              type: 'recovery',
            });
            
            if (error) {
              console.error("Error verifying OTP from query params:", error);
              throw error;
            }
            
            console.log("OTP verified successfully from query params");
            setVerificationStatus("success");
            toast({
              title: "Recovery link verified",
              description: "Please set your new password below.",
            });
            return;
          } catch (e) {
            console.error("Error with query token verification:", e);
          }
        }
        
        // 3. Check for a special recovery token in URL parameters (another format)
        const specialToken = searchParams.get('recovery_token') || searchParams.get('code');
        if (specialToken) {
          console.log("Found special recovery token in URL");
          try {
            // Try to use this token to verify the session
            const { error } = await supabase.auth.verifyOtp({
              token_hash: specialToken,
              type: 'recovery',
            });
            
            if (error) {
              console.error("Error verifying special token:", error);
            } else {
              console.log("Special token verification successful");
              setVerificationStatus("success");
              toast({
                title: "Recovery link verified",
                description: "Please set your new password below.",
              });
              return;
            }
          } catch (e) {
            console.error("Error with special token verification:", e);
          }
        }
        
        // 4. Try to get current session as a last resort
        console.log("Checking for existing session");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Error getting session:", sessionError);
          throw sessionError;
        }
        
        if (session) {
          console.log("Existing session found:", session.user.id);
          setVerificationStatus("success");
          toast({
            title: "Ready to reset password",
            description: "Please enter your new password below.",
          });
          return;
        }
        
        // If we get here, no valid tokens were found
        console.error("No valid tokens or session found");
        setVerificationStatus("error");
        toast({
          title: "Password reset link invalid",
          description: "The link may be expired or invalid. Please request a new one.",
          variant: "destructive",
        });
      } catch (err) {
        console.error("Unexpected error during verification:", err);
        setVerificationStatus("error");
        toast({
          title: "Password reset failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPasswordResetSession();
  }, [toast, location.hash, searchParams, location.search]);

  // Success state - show the password reset form
  const renderPasswordResetForm = () => (
    <div className="space-y-4">
      <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
        <p className="font-medium">Recovery link verified!</p>
        <p className="text-sm mt-1">Please set your new password below.</p>
      </div>
      <UpdatePasswordForm />
    </div>
  );
  
  // Error state
  const renderError = () => (
    <div className="text-center">
      <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
        <p className="font-medium">Password reset link invalid</p>
        <p className="text-sm mt-1">The link may be invalid or expired.</p>
      </div>
      <Button onClick={() => navigate("/reset-password")} className="mt-4 mr-2">
        Try Again
      </Button>
      <Button onClick={() => navigate("/signin")} className="mt-4" variant="outline">
        Return to Sign In
      </Button>
    </div>
  );

  return (
    <AuthLayout 
      title="Reset Password" 
      description="Set your new password"
    >
      <div className="flex flex-col items-center justify-center py-8">
        {isVerifying ? (
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-wildfire-600 mx-auto mb-4" />
            <p className="text-lg font-medium">Verifying reset link...</p>
          </div>
        ) : verificationStatus === "success" ? (
          renderPasswordResetForm()
        ) : (
          renderError()
        )}
      </div>
    </AuthLayout>
  );
};

export default SetNewPassword;
