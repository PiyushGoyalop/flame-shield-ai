
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const AuthRedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(true);
  
  useEffect(() => {
    console.log("Auth Redirect Handler called");
    console.log("URL:", window.location.href);
    console.log("Hash:", window.location.hash);
    console.log("Search:", window.location.search);
    
    // Ensure we handle the redirect only once
    if (isRedirecting) {
      setIsRedirecting(false);
      
      // Small timeout to ensure the component is fully mounted
      // and navigation state is ready before attempting to redirect
      setTimeout(() => {
        // Preserve both hash and search parameters to maintain the auth token
        const redirectTo = `/set-new-password${location.search}${location.hash}`;
        console.log("Redirecting to:", redirectTo);
        
        // Use navigate with replace: true to prevent back button from returning to redirect handler
        navigate(redirectTo, { replace: true });
      }, 100);
    }
  }, [navigate, location.search, location.hash, isRedirecting]);
  
  // Show a loading indicator while redirecting
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-wildfire-600" />
      <p className="mt-4 text-gray-600">Redirecting...</p>
    </div>
  );
};

export default AuthRedirectHandler;
