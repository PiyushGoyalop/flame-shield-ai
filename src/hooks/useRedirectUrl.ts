
/**
 * Returns the redirect URL for authentication
 */
export const useRedirectUrl = () => {
  const getRedirectUrl = (type: 'verification' | 'reset-password' = 'verification') => {
    // Get the current origin
    const origin = window.location.origin;
    
    // Create a proper redirect URL with no trailing slash
    const cleanOrigin = origin.replace(/\/$/, '');
    
    // For password reset, we need to ensure the correct path format
    // This must match exactly what Supabase expects
    if (type === 'reset-password') {
      // Using the exact format required by Supabase for password reset
      const redirectUrl = `${cleanOrigin}/auth-redirect`;
      console.log(`Generated ${type} redirect URL:`, redirectUrl);
      return redirectUrl;
    }
    
    // For email verification, use the normal verification path
    const redirectUrl = `${cleanOrigin}/verify`;
    console.log(`Generated ${type} redirect URL:`, redirectUrl);
    return redirectUrl;
  };

  return { getRedirectUrl };
};
