
/**
 * Returns the redirect URL for authentication
 */
export const useRedirectUrl = () => {
  const getRedirectUrl = (type: 'verification' | 'reset-password' = 'verification') => {
    // Get the current origin
    const origin = window.location.origin;
    
    // Create a proper redirect URL with no trailing slash
    const cleanOrigin = origin.replace(/\/$/, '');
    
    // When using the reset-password type, we want to use the auth-redirect endpoint
    // This ensures Supabase redirects to our special handler that can correctly process the tokens
    const route = type === 'reset-password' ? '/auth-redirect' : '/verify';
    
    // Build the redirect URL
    const redirectUrl = `${cleanOrigin}${route}`;
    
    console.log(`Generated ${type} redirect URL:`, redirectUrl);
    
    return redirectUrl;
  };

  return { getRedirectUrl };
};
