
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
  
  // Debug logs
  console.log("Extracting tokens from URL:", {
    hash: hash ? "[hash content present]" : "[no hash]",
    search: window.location.search || "[no search params]"
  });
  
  // Look for token in both query params and hash
  const token = queryParams.get("token") || hashParams.get("token");
  
  // Look for type in both query params and hash
  const type = queryParams.get("type") || hashParams.get("type");
  
  // Special handling for recovery type (password reset)
  const isRecovery = type === "recovery" || 
                    queryParams.has("type") && queryParams.get("type") === "recovery" ||
                    hashParams.has("type") && hashParams.get("type") === "recovery";
  
  // Extract tokens from URL
  return {
    // Token from query param or hash (used in password reset flows)
    token: token,
    
    // Access token from hash (used in OAuth and some email flows)
    accessToken: hashParams.get("access_token"),
    
    // Refresh token from hash
    refreshToken: hashParams.get("refresh_token"),
    
    // Auth type with special handling for recovery
    type: isRecovery ? "recovery" : type,
  };
};
