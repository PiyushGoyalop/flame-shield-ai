
/**
 * Returns the redirect URL for authentication
 */
export const useRedirectUrl = () => {
  const getRedirectUrl = () => {
    // Get the current origin - works in development, production, or Lovable
    const origin = window.location.origin;
    
    // Create a proper redirect URL with no trailing slash
    const cleanOrigin = origin.replace(/\/$/, '');
    
    // Use /auth-redirect path specifically for all auth redirects
    const redirectUrl = `${cleanOrigin}/auth-redirect`;
    
    // Log the redirect URL for debugging
    console.log("Generated authentication redirect URL:", redirectUrl);
    
    return redirectUrl;
  };

  return { getRedirectUrl };
};
