
/**
 * Returns the redirect URL for authentication
 */
export const useRedirectUrl = () => {
  const getRedirectUrl = (type: 'verification' | 'reset-password' = 'verification') => {
    // Get the current origin
    const origin = window.location.origin;
    
    // Create a proper redirect URL with no trailing slash
    const cleanOrigin = origin.replace(/\/$/, '');
    
    // IMPORTANT: For password reset flows, we need a very specific format without query parameters
    // This is critical to ensure Supabase properly redirects after password reset
    if (type === 'reset-password') {
      // The exact path Supabase will append the token to - must be a direct path
      const redirectUrl = `${cleanOrigin}/auth-redirect`;
      console.log(`Generated ${type} redirect URL:`, redirectUrl);
      return redirectUrl;
    }
    
    // For email verification
    const redirectUrl = `${cleanOrigin}/verify`;
    console.log(`Generated ${type} redirect URL:`, redirectUrl);
    return redirectUrl;
  };

  return { getRedirectUrl };
};
