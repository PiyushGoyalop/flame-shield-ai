
/**
 * Utility functions for handling authentication tokens from URLs
 */

/**
 * Extracts authentication tokens from URL hash and query parameters
 * This handles different token formats from Supabase auth redirects
 */
export const extractTokensFromUrl = (): {
  token: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  type: string | null;
} => {
  // Parse hash fragment (#) parameters - commonly used for access_token
  const hash = window.location.hash;
  const hashParams = new URLSearchParams(hash.substring(1));
  
  // Parse query (?) parameters - commonly used for recovery tokens
  const queryParams = new URLSearchParams(window.location.search);
  
  // Extract tokens from URL
  return {
    // Token from query param (used in password reset flows)
    token: queryParams.get("token"),
    
    // Access token from hash (used in OAuth and some email flows)
    accessToken: hashParams.get("access_token"),
    
    // Refresh token from hash
    refreshToken: hashParams.get("refresh_token"),
    
    // Auth type - can come from either location
    type: queryParams.get("type") || hashParams.get("type"),
  };
};

