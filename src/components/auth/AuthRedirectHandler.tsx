
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
        
        // Extract token from URL - check both query params and hash fragment
        const queryParams = new URLSearchParams(location.search);
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        
        // Try to find token in either location
        const token = queryParams.get('token') || hashParams.get('token');
        const type = queryParams.get('type') || hashParams.get('recovery') ? 'recovery' : hashParams.get('type');
        
        console.log("Extracted token:", token ? `Present (length: ${token.length})` : "Not present");
        console.log("Extracted type:", type);
        
        // Handle password reset flow
        if (token && (type === 'recovery' || hashParams.has('type') === true)) {
          console.log("Valid recovery token identified, proceeding with reset flow");
          
          // Clear any existing tokens first
          localStorage.removeItem('passwordResetToken');
          localStorage.removeItem('passwordResetInProgress');
          
          // Store token in localStorage for the password reset flow
          localStorage.setItem('passwordResetToken', token);
          localStorage.setItem('passwordResetInProgress', 'true');
          
          console.log("Password reset token stored in localStorage");
          console.log("Now redirecting to set-new-password page");
          
          // Force navigation to set-new-password page
          navigate('/set-new-password', { replace: true });
          return;
        }
        
        // If we have a token but no specific type, it might still be a recovery
        if (token && !type && window.location.href.includes('recovery')) {
          console.log("Recovery scenario detected from URL");
          localStorage.setItem('passwordResetToken', token);
          localStorage.setItem('passwordResetInProgress', 'true');
          navigate('/set-new-password', { replace: true });
          return;
        }
        
        // Check for an active session if no recovery flow detected
        console.log("No specific recovery parameters found, checking for session");
        const { data: { session } } = await supabase.auth.getSession();
        
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
