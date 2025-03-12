
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
        console.log("Auth Redirect Handler called");
        console.log("Full URL:", window.location.href);
        console.log("Hash:", window.location.hash);
        console.log("Search params:", window.location.search);
        
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        const type = queryParams.get('type');
        
        console.log("Extracted token:", token ? "Present" : "Not present");
        console.log("Extracted type:", type);
        
        if (token && type === 'recovery') {
          console.log("Valid recovery token found");
          
          // For recovery flow, we'll set a session flag and redirect
          localStorage.setItem('passwordResetToken', token);
          localStorage.setItem('passwordResetInProgress', 'true');
          
          // Directly redirect to set-new-password
          console.log("Redirecting to set-new-password page");
          navigate('/set-new-password', { replace: true });
          return;
        }
        
        // If we reach here without finding valid recovery parameters,
        // check if there's an active session that might have been established
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // We have a session, this could be from a recovery verification
          console.log("Session found, checking for password reset flag");
          if (localStorage.getItem('passwordResetInProgress') === 'true') {
            navigate('/set-new-password', { replace: true });
            return;
          }
          
          // Regular login - go to home
          navigate('/', { replace: true });
          return;
        }
        
        // If no valid parameters and no session, go back to reset password
        console.log("No valid auth parameters or session");
        toast({
          title: "Invalid or expired link",
          description: "The password reset link is invalid or has expired.",
          variant: "destructive",
        });
        navigate('/reset-password', { replace: true });
      } catch (error) {
        console.error("Error in auth redirect handler:", error);
        toast({
          title: "Authentication error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
        navigate('/reset-password', { replace: true });
      } finally {
        setIsProcessing(false);
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
