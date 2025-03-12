
import { MobileNavLink } from "./MobileNavLink";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";

interface MobileNavProps {
  isMobileMenuOpen: boolean;
  isActive: (path: string) => boolean;
  user: any;
}

export function MobileNav({ isMobileMenuOpen, isActive, user }: MobileNavProps) {
  const navigate = useNavigate();
  
  // Extract username from user metadata if available
  const username = user?.user_metadata?.name || user?.email?.split('@')[0] || "Account";
  
  if (!isMobileMenuOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 flex flex-col gap-4 animate-fade-in">
      <MobileNavLink to="/" isActive={isActive("/")}>
        Home
      </MobileNavLink>
      <MobileNavLink to="/analytics" isActive={isActive("/analytics")}>
        Analytics
      </MobileNavLink>
      <MobileNavLink to="/predict" isActive={isActive("/predict")}>
        Prediction
      </MobileNavLink>
      {user && (
        <MobileNavLink to="/history" isActive={isActive("/history")}>
          History
        </MobileNavLink>
      )}
      <MobileNavLink to="/about" isActive={isActive("/about")}>
        About
      </MobileNavLink>
      <div className="flex gap-2 mt-2">
        {user ? (
          <Link to="/account" className="flex-1">
            <Button size="sm" className="w-full bg-wildfire-500 hover:bg-wildfire-600">
              <UserCircle className="h-4 w-4 mr-1" /> {username}
            </Button>
          </Link>
        ) : (
          <>
            <Link to="/signin" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link to="/signup" className="flex-1">
              <Button size="sm" className="w-full bg-wildfire-500 hover:bg-wildfire-600">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
