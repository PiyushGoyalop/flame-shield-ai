
/**
 * Returns the redirect URL for authentication
 */
export const useRedirectUrl = () => {
  const getRedirectUrl = (type: 'verification' | 'reset-password' = 'verification') => {
    // Get the current origin
    const origin = window.location.origin;
    
    // Create a proper redirect URL with no trailing slash
    const cleanOrigin = origin.replace(/\/$/, '');
    
    // For password reset, we want to include special handling to ensure the tokens are preserved
    const route = type === 'reset-password' ? '/auth-redirect' : '/verify';
    
    // Build the redirect URL
    const redirectUrl = `${cleanOrigin}${route}`;
    
    console.log(`Generated ${type} redirect URL:`, redirectUrl);
    
    return redirectUrl;
  };

  return { getRedirectUrl };
};
