
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthRedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("Auth Redirect Handler called");
    console.log("URL:", window.location.href);
    console.log("Hash:", window.location.hash);
    console.log("Search:", window.location.search);
    
    // Preserve the hash fragment and search params when redirecting
    const redirectTo = `/set-new-password${location.search}${location.hash}`;
    console.log("Redirecting to:", redirectTo);
    
    // Use navigate instead of returning Navigate component
    // This ensures the navigation happens after the component mounts
    navigate(redirectTo, { replace: true });
  }, [navigate, location.search, location.hash]);
  
  // Return null while redirecting to avoid flashing content
  return null;
};

export default AuthRedirectHandler;
