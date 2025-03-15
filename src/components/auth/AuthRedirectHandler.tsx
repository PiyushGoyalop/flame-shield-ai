
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AuthRedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
        
        // Extract URL parameters that might be part of the auth flow
        const params = new URLSearchParams(window.location.search);
        const errorParam = params.get('error');
        const errorDescription = params.get('error_description');
        
        // Handle explicit errors in URL parameters
        if (errorParam || errorDescription) {
          console.error("Error in auth parameters:", errorParam, errorDescription);
          toast({
            title: "Authentication error",
            description: errorDescription || "There was a problem with your authentication",
            variant: "destructive",
          });
          navigate('/signin', { replace: true });
          return;
        }
        
        // Check if we have a session (for email verification or normal login flows)
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

        // Check for hash fragment which might contain tokens
        if (window.location.hash) {
          console.log("Hash fragment found, attempting to process auth callback");
          const { error } = await supabase.auth.refreshSession();
          
          if (error) {
            console.error("Error processing auth callback:", error);
            toast({
              title: "Authentication failed",
              description: error.message,
              variant: "destructive",
            });
            navigate('/signin', { replace: true });
            return;
          }
          
          // Refresh session after callback processing
          const { data: { session: refreshedSession } } = await supabase.auth.getSession();
          
          if (refreshedSession) {
            console.log("Session obtained after refresh - navigating to home");
            navigate('/', { replace: true });
            return;
          }
        }
        
        // Set a timeout to avoid infinite loading
        setTimeout(() => {
          if (isProcessing) {
            console.log("Auth processing timeout reached");
            toast({
              title: "Authentication timeout",
              description: "The authentication process took too long. Please try again.",
              variant: "destructive",
            });
            navigate('/signin', { replace: true });
          }
        }, 10000); // 10 second timeout
        
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
  }, [navigate, toast, isProcessing]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-wildfire-600" />
      <p className="mt-4 text-gray-600">Processing authentication...</p>
      <p className="mt-2 text-sm text-gray-500">
        If you're not redirected within 10 seconds, <button 
          className="text-wildfire-600 hover:underline"
          onClick={() => navigate('/signin')}
        >
          click here to return to sign in
        </button>
      </p>
    </div>
  );
};

export default AuthRedirectHandler;
