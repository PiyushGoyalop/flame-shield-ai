
/**
 * Returns the redirect URL for authentication
 */
export const useRedirectUrl = () => {
  const getRedirectUrl = () => {
    // Get the current origin - works in development or production
    const origin = window.location.origin;
    return `${origin}/auth-redirect`;
  };

  return { getRedirectUrl };
};
