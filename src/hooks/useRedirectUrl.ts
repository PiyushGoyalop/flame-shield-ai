
/**
 * Returns the redirect URL for authentication
 */
export const useRedirectUrl = () => {
  const getRedirectUrl = (type: 'verification' | 'reset-password' = 'verification') => {
    // Get the current origin
    const origin = window.location.origin;
    
    // Create a proper redirect URL with no trailing slash
    const cleanOrigin = origin.replace(/\/$/, '');
    
    // Different paths for different authentication flows
    if (type === 'reset-password') {
      // For password reset flow, we use a specific path
      // IMPORTANT: We must NOT include query parameters in the redirect URL
      // Supabase needs a plain path to which it will append its own token
      const redirectUrl = `${cleanOrigin}/auth-redirect`;
      console.log(`Generated ${type} redirect URL:`, redirectUrl);
      return redirectUrl;
    }
    
    // For email verification flow
    const redirectUrl = `${cleanOrigin}/verify`;
    console.log(`Generated ${type} redirect URL:`, redirectUrl);
    return redirectUrl;
  };

  return { getRedirectUrl };
};
