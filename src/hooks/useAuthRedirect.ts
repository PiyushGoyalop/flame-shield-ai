
import { useLocation } from "react-router-dom";

export function useAuthRedirect() {
  const location = useLocation();
  
  // Get redirect from query params if present
  const getRedirectPath = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('redirect') || '/history';
  };

  return { getRedirectPath };
}
