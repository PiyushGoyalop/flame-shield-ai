
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Log full URL including query parameters for better debugging of auth redirects
    console.error("Full URL:", window.location.href);
  }, [location.pathname]);

  // Check if this is likely an auth-related URL by looking for common patterns
  const isLikelyAuthUrl = () => {
    const fullUrl = window.location.href;
    const hasAuthParams = fullUrl.includes("access_token") || 
                          fullUrl.includes("refresh_token") || 
                          fullUrl.includes("type=recovery") || 
                          fullUrl.includes("type=email_confirmation");
    
    return hasAuthParams || 
           location.pathname.includes("verify") || 
           location.pathname.includes("reset-password") ||
           location.pathname.includes("auth");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        
        {isLikelyAuthUrl() ? (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-amber-800 text-sm mb-2">
              It looks like you clicked a link from an authentication email (password reset or verification).
            </p>
            <p className="text-amber-800 text-sm mb-2">
              Please try using the following direct link instead:
            </p>
            <Link 
              to={`/auth-redirect${window.location.search}${window.location.hash}`}
              className="block mt-2 text-blue-600 hover:text-blue-800 underline text-sm"
            >
              Go to authentication page
            </Link>
          </div>
        ) : null}
        
        <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
