
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
        
        // Parse URL more carefully to extract all possible tokens
        const queryParams = new URLSearchParams(location.search);
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const fullUrl = window.location.href;
        
        // Try to find token in either location or directly in URL
        const token = queryParams.get('token') || hashParams.get('token') || 
                     (fullUrl.includes('token=') ? fullUrl.split('token=')[1].split('&')[0] : null);
        
        // Check for recovery type indicators in multiple places
        const isRecovery = queryParams.get('type') === 'recovery' || 
                          hashParams.get('type') === 'recovery' ||
                          fullUrl.includes('type=recovery') ||
                          fullUrl.includes('recovery=true');
        
        console.log("Extracted token:", token ? `Present (length: ${token.length})` : "Not present");
        console.log("Is recovery flow:", isRecovery);
        
        // If we have a token and it's a recovery flow, handle it
        if (token && isRecovery) {
          console.log("Valid recovery token identified, proceeding with reset flow");
          
          // Clear any existing tokens first
          localStorage.removeItem('passwordResetToken');
          localStorage.removeItem('passwordResetInProgress');
          
          // Store token in localStorage for the password reset flow
          localStorage.setItem('passwordResetToken', token);
          localStorage.setItem('passwordResetInProgress', 'true');
          
          console.log("Password reset token stored in localStorage");
          console.log("Now redirecting to set-new-password page");
          
          // Navigate to password reset page
          navigate('/set-new-password', { replace: true });
          return;
        }
        
        // Catch-all for any URL containing indication of recovery
        if (token && (fullUrl.toLowerCase().includes('recovery') || fullUrl.toLowerCase().includes('reset'))) {
          console.log("Recovery scenario detected from URL keywords");
          localStorage.setItem('passwordResetToken', token);
          localStorage.setItem('passwordResetInProgress', 'true');
          navigate('/set-new-password', { replace: true });
          return;
        }
        
        // Handle email verification - if we have a token but not a recovery flow
        if (token && !isRecovery) {
          console.log("Email verification token detected");
          // We'll let Supabase handle the session refresh below
        }
        
        // Check for an active session or refresh session with token
        console.log("Attempting to refresh or get session");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
        }
        
        if (session) {
          console.log("Active session found - navigating to home");
          navigate('/', { replace: true });
          return;
        }
        
        // No valid parameters and no session
        console.log("No valid auth parameters or session");
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
      }
    };

    // Execute immediately
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
