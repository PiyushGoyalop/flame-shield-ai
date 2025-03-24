
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface GoogleSignInButtonProps {
  onClick: () => Promise<void>;
}

export function GoogleSignInButton({ onClick }: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick();
    } catch (error) {
      console.error("Google sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
          className="h-4 w-4"
        >
          <path 
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            fill="#4285F4"  // Blue
          />
          <path 
            d="M488 261.8C488 244.3 486.4 232.1 484.1 219.4H248v85.3h140.8c-6.9 36.4-35.8 106.9-140.8 106.9-84.6 0-153.7-70.1-153.7-156.6 0-86.5 69.1-156.6 153.7-156.6 48.3 0 80.9 20.6 99.5 38.1l67.5-64.9C371 24.5 314.8 0 248 0 110.8 0 0 110.8 0 256s110.8 256 248 256c127.5 0 224-92.9 240-261.2z"
            fill="#34A853"  // Green
          />
          <path 
            d="M162.4 288.1c-3.1-9.4-5.4-19.2-5.4-29.6s2.3-20.2 5.4-29.6l-89.5-67.5C56.9 186.8 48 220.7 48 256c0 35.3 8.9 69.2 24.9 99.6l89.5-67.5z"
            fill="#FBBC05"  // Yellow
          />
          <path 
            d="M488 261.8C488 244.3 486.4 232.1 484.1 219.4H248v85.3h140.8c-6.9 36.4-35.8 106.9-140.8 106.9-84.6 0-153.7-70.1-153.7-156.6 0-86.5 69.1-156.6 153.7-156.6 48.3 0 80.9 20.6 99.5 38.1l67.5-64.9C371 24.5 314.8 0 248 0 110.8 0 0 110.8 0 256s110.8 256 248 256c127.5 0 224-92.9 240-261.2z"
            fill="#EA4335"  // Red
          />
        </svg>
      )}
      {isLoading ? "Signing in..." : "Sign in with Google"}
    </Button>
  );
}
