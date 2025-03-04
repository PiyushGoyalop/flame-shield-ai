
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface LoadingButtonProps {
  isLoading: boolean;
  children: ReactNode;
  loadingText: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

export function LoadingButton({ 
  isLoading, 
  children, 
  loadingText, 
  type = "submit", 
  className = "w-full bg-wildfire-600 hover:bg-wildfire-700 text-white",
  onClick,
  icon
}: LoadingButtonProps) {
  return (
    <Button 
      type={type} 
      className={className}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {loadingText}
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {icon}
          {children}
        </span>
      )}
    </Button>
  );
}
