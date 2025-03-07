
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ExternalLink } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthLink, setIsAuthLink] = useState(false);

  useEffect(() => {
    // Log detailed information about the URL for debugging
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    console.error("Full URL:", window.location.href);
    console.error("Search params:", location.search);
    console.error("Hash:", window.location.hash);
    
    // Check if this is an auth-related URL
    const authLinkDetected = isLikelyAuthUrl();
    setIsAuthLink(authLinkDetected);
    
    // Auto-redirect for auth links after a short delay to allow logging
    if (authLinkDetected) {
      console.log("Auth link detected - preparing to auto-redirect");
      setTimeout(() => {
        const redirectPath = `/auth-redirect${location.search}${window.location.hash}`;
        console.log("Auto-redirecting to:", redirectPath);
        navigate(redirectPath);
      }, 500);
    }
  }, [location.pathname, location.search, window.location.hash, navigate]);

  // Enhanced check for auth-related URLs
  const isLikelyAuthUrl = () => {
    const fullUrl = window.location.href.toLowerCase();
    const path = location.pathname.toLowerCase();
    const search = location.search.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    
    // More comprehensive detection of auth-related parameters
    const hasAuthParams = 
      fullUrl.includes("access_token") || 
      fullUrl.includes("refresh_token") || 
      search.includes("token=") ||
      search.includes("type=recovery") || 
      search.includes("type=email_confirmation") ||
      hash.includes("access_token=") ||
      search.includes("error=");
    
    // Check for common auth-related paths
    const hasAuthPath = 
      path.includes("verify") || 
      path.includes("reset-password") ||
      path.includes("auth") ||
      path.includes("confirm") ||
      path.includes("recover");
    
    const isAuthLink = hasAuthParams || hasAuthPath;
    
    // Log the detection results
    if (isAuthLink) {
      console.log("Auth link detected with:", {
        hasAuthParams,
        hasAuthPath,
        path,
        search,
        hash
      });
    }
    
    return isAuthLink;
  };

  // Handle manual redirect for auth links
  const handleAuthRedirect = () => {
    const redirectPath = `/auth-redirect${location.search}${window.location.hash}`;
    console.log("Manual redirect to:", redirectPath);
    navigate(redirectPath);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        
        {isAuthLink && (
          <Alert variant="default" className="mb-6 bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <p className="mb-2">
                It looks like you clicked an authentication link (password reset or verification).
              </p>
              <p className="mb-4 text-sm">
                We're trying to redirect you automatically. If you're not redirected in a few seconds, please click the button below:
              </p>
              <Button 
                variant="outline"
                onClick={handleAuthRedirect}
                className="w-full border-amber-300 bg-amber-100 hover:bg-amber-200 text-amber-800"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Go to authentication page
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
