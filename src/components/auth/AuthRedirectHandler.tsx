
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AuthRedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        console.log("Auth Redirect Handler called");
        console.log("URL:", window.location.href);
        console.log("Hash:", window.location.hash);
        console.log("Search:", window.location.search);
        
        // Extract tokens from URL - try both hash and search params
        const hashParams = location.hash 
          ? new URLSearchParams(location.hash.substring(1))
          : null;
          
        const queryParams = new URLSearchParams(location.search);
        
        // Check tokens in hash first (Supabase's default format)
        if (hashParams && hashParams.get('access_token')) {
          console.log("Found access_token in hash params");
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token') || '';
          const type = hashParams.get('type');
          
          if (accessToken && type === 'recovery') {
            console.log("Recovery flow detected in hash");
            
            // Set the session with the tokens
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            
            if (error) {
              console.error("Error setting session from hash params:", error);
              toast({
                title: "Authentication error",
                description: "Could not verify recovery token. Please try again.",
                variant: "destructive",
              });
              navigate('/reset-password', { replace: true });
              return;
            }
            
            console.log("Session set successfully from hash params");
            // Direct navigation to set-new-password
            navigate('/set-new-password', { replace: true });
            return;
          }
        }
        
        // Check query parameters
        const token = queryParams.get('token') || queryParams.get('recovery_token') || queryParams.get('code');
        const type = queryParams.get('type');
        
        if (token && type === 'recovery') {
          console.log("Found recovery token in query params");
          
          try {
            // Try to use this token to verify OTP
            const { error } = await supabase.auth.verifyOtp({
              token_hash: token,
              type: 'recovery',
            });
            
            if (error) {
              console.error("Error verifying OTP from query params:", error);
              toast({
                title: "Authentication error",
                description: "Invalid or expired recovery link. Please try again.",
                variant: "destructive",
              });
              navigate('/reset-password', { replace: true });
              return;
            }
            
            console.log("OTP verified successfully from query params");
            navigate('/set-new-password', { replace: true });
            return;
          } catch (e) {
            console.error("Error processing recovery token:", e);
          }
        }
        
        // If we get here with no valid tokens, check if we have a session already
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log("Existing session found, proceeding with password reset");
          navigate('/set-new-password', { replace: true });
          return;
        }
        
        // Fallback if all detection methods fail
        console.log("No valid authentication detected in URL, redirecting to reset-password");
        toast({
          title: "Authentication error",
          description: "Invalid or expired recovery link. Please request a new one.",
          variant: "destructive",
        });
        navigate('/reset-password', { replace: true });
      } catch (error) {
        console.error("Unexpected error in auth redirect handler:", error);
        toast({
          title: "Authentication error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
        navigate('/reset-password', { replace: true });
      } finally {
        setIsRedirecting(false);
      }
    };

    if (isRedirecting) {
      handleAuthRedirect();
    }
  }, [location, navigate, isRedirecting, toast]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-wildfire-600" />
      <p className="mt-4 text-gray-600">Processing authentication...</p>
    </div>
  );
};

export default AuthRedirectHandler;
