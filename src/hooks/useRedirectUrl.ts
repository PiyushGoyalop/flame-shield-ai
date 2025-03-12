
/**
 * Returns the redirect URL for authentication
 */
export const useRedirectUrl = () => {
  const getRedirectUrl = (type: 'verification' | 'reset-password' = 'verification') => {
    // Get the current origin
    const origin = window.location.origin;
    
    // Create a proper redirect URL with no trailing slash
    const cleanOrigin = origin.replace(/\/$/, '');
    
    // Build the redirect URL based on the type
    const route = type === 'reset-password' 
      ? '/auth-redirect' 
      : '/verify';
    
    const redirectUrl = `${cleanOrigin}${route}`;
    
    console.log(`Generated ${type} redirect URL:`, redirectUrl);
    
    return redirectUrl;
  };

  return { getRedirectUrl };
};
