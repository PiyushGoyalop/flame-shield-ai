
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AuthRedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const { toast } = useToast();
  const processingRef = useRef(false);
  
  useEffect(() => {
    // Prevent duplicate processing
    if (processingRef.current) return;
    processingRef.current = true;
    
    const handleAuthRedirect = async () => {
      try {
        // Enhanced debugging
        console.log("---------- AUTH REDIRECT HANDLER ----------");
        console.log("Full URL:", window.location.href);
        console.log("URL path:", window.location.pathname);
        console.log("Search params:", window.location.search);
        console.log("Hash fragment:", window.location.hash);
        
        // STRATEGY 1: Extract token from URL fragments
        const extractTokenFromUrl = () => {
          const url = window.location.href;
          const queryParams = new URLSearchParams(location.search);
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          
          // Try to find token in multiple locations
          let token = queryParams.get('token') || hashParams.get('token');
          
          // If not found in standard places, try to extract from URL directly
          if (!token && url.includes('token=')) {
            try {
              token = url.split('token=')[1].split('&')[0];
              console.log("Extracted token from URL string:", token.substring(0, 10) + "...");
            } catch (e) {
              console.error("Error extracting token from URL:", e);
            }
          }
          
          return token;
        };
        
        // STRATEGY 2: Determine if this is a recovery/reset flow
        const isRecoveryFlow = () => {
          const url = window.location.href.toLowerCase();
          const queryParams = new URLSearchParams(location.search);
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          
          return (
            queryParams.get('type') === 'recovery' ||
            hashParams.get('type') === 'recovery' ||
            url.includes('type=recovery') ||
            url.includes('recovery=true') ||
            url.includes('recovery') ||
            url.includes('reset')
          );
        };
        
        // Extract token and check flow type
        const token = extractTokenFromUrl();
        const isRecovery = isRecoveryFlow();
        
        console.log("Extracted token:", token ? `Present (length: ${token.length})` : "Not present");
        console.log("Is recovery flow:", isRecovery);
        
        // Force a specific path for recovery flows with tokens
        if (token && isRecovery) {
          console.log("RECOVERY FLOW DETECTED - Taking reset password path");
          
          // Clear any previous tokens
          localStorage.removeItem('passwordResetToken');
          localStorage.removeItem('passwordResetInProgress');
          
          // Store token for the password reset page
          localStorage.setItem('passwordResetToken', token);
          localStorage.setItem('passwordResetInProgress', 'true');
          
          console.log("Stored reset token in localStorage");
          console.log("Redirecting to password reset page...");
          
          // Force navigation with replacement to avoid history issues
          navigate('/set-new-password', { replace: true });
          return;
        }
        
        // Fallback: Check if we have a session (for email verification or normal login flows)
        console.log("Checking for active session...");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          toast({
            title: "Authentication error",
            description: "There was a problem with your authentication session",
            variant: "destructive",
          });
          navigate('/signin', { replace: true });
          return;
        }
        
        if (session) {
          console.log("Active session found - navigating to home");
          navigate('/', { replace: true });
          return;
        }
        
        // No valid parameters and no session
        console.log("No valid auth parameters or session found");
        toast({
          title: "Authentication error",
          description: "Invalid or missing authentication parameters",
          variant: "destructive",
        });
        navigate('/signin', { replace: true });
      } catch (error) {
        console.error("Error in auth redirect handler:", error);
        toast({
          title: "Authentication error",
          description: "An unexpected error occurred during authentication",
          variant: "destructive",
        });
        navigate('/signin', { replace: true });
      } finally {
        setIsProcessing(false);
        processingRef.current = false; // Reset processing state for potential retries
      }
    };

    handleAuthRedirect();
  }, [location, navigate, toast]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-wildfire-600" />
      <p className="mt-4 text-gray-600">Processing authentication...</p>
    </div>
  );
};

export default AuthRedirectHandler;
