
import { useLocation } from "react-router-dom";

/**
 * Extracts authentication tokens from the URL
 */
export const extractTokensFromUrl = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  
  return {
    token: searchParams.get("token"),
    accessToken: hashParams.get("access_token") || searchParams.get("access_token"),
    refreshToken: hashParams.get("refresh_token") || searchParams.get("refresh_token"),
    type: searchParams.get("type")
  };
};

/**
 * Logs token information for debugging purposes
 */
export const logTokenInfo = () => {
  console.log("Current URL at password reset form:", window.location.href);
  
  const { token, accessToken, type } = extractTokensFromUrl();
  
  if (token) {
    console.log("Found token parameter for password reset");
  } else if (accessToken) {
    console.log("Found access token in URL hash");
  } else {
    console.log("No token found in URL parameters or hash");
  }
};
