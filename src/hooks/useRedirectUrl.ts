
/**
 * Returns the redirect URL for authentication
 */
export const useRedirectUrl = () => {
  const getRedirectUrl = (type: 'verification' = 'verification') => {
    // Get the current origin
    const origin = window.location.origin;
    
    // Create a proper redirect URL with no trailing slash
    const cleanOrigin = origin.replace(/\/$/, '');
    
    // We're using auth-redirect to handle all authentication flows consistently
    const redirectUrl = `${cleanOrigin}/auth-redirect`;
    
    console.log(`Generated ${type} redirect URL:`, redirectUrl);
    return redirectUrl;
  };

  return { getRedirectUrl };
};
