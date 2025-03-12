
/**
 * Returns the redirect URL for authentication
 */
export const useRedirectUrl = () => {
  const getRedirectUrl = (type: 'verification' | 'reset-password' = 'verification') => {
    // Get the current origin
    const origin = window.location.origin;
    
    // Create a proper redirect URL with no trailing slash
    const cleanOrigin = origin.replace(/\/$/, '');
    
    // For both flows, we're now using auth-redirect to handle all cases consistently
    // This gives us one place to properly handle all authentication redirects
    const redirectUrl = `${cleanOrigin}/auth-redirect`;
    
    console.log(`Generated ${type} redirect URL:`, redirectUrl);
    return redirectUrl;
  };

  return { getRedirectUrl };
};
