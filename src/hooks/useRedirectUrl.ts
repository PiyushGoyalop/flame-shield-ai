
/**
 * Returns the redirect URL for authentication
 */
export const useRedirectUrl = () => {
  const getRedirectUrl = () => {
    // Get the current origin - works in development, production, or Vercel
    const origin = window.location.origin;
    return `${origin}/auth-redirect`;
  };

  return { getRedirectUrl };
};
