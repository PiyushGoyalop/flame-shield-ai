
/**
 * Returns the redirect URL for authentication
 */
export const useRedirectUrl = () => {
  const getRedirectUrl = () => {
    // Get the current origin - works in development, production, or Lovable
    const origin = window.location.origin;
    
    // Log the redirect URL for debugging
    const redirectUrl = `${origin}/auth-redirect`;
    console.log("Generated redirect URL:", redirectUrl);
    
    return redirectUrl;
  };

  return { getRedirectUrl };
};
