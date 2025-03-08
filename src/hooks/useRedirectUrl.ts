
/**
 * Returns the redirect URL for authentication
 */
export const useRedirectUrl = () => {
  const getRedirectUrl = () => {
    // Get the current origin
    const origin = window.location.origin;
    
    // Create a proper redirect URL with no trailing slash
    const cleanOrigin = origin.replace(/\/$/, '');
    
    // Use the root URL as the redirect since AuthRedirect has been removed
    const redirectUrl = cleanOrigin;
    
    console.log("Generated authentication redirect URL:", redirectUrl);
    
    return redirectUrl;
  };

  return { getRedirectUrl };
};
