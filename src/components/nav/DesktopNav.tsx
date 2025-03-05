
import { NavLink } from "./NavLink";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";

interface DesktopNavProps {
  isScrolled: boolean;
  isActive: (path: string) => boolean;
  user: any;
}

export function DesktopNav({ isScrolled, isActive, user }: DesktopNavProps) {
  return (
    <>
      <nav className="hidden md:flex items-center gap-8">
        <NavLink to="/" isActive={isActive("/")} isScrolled={isScrolled}>
          Home
        </NavLink>
        <NavLink to="/analytics" isActive={isActive("/analytics")} isScrolled={isScrolled}>
          Analytics
        </NavLink>
        <NavLink to="/predict" isActive={isActive("/predict")} isScrolled={isScrolled}>
          Prediction
        </NavLink>
        {user && (
          <NavLink to="/history" isActive={isActive("/history")} isScrolled={isScrolled}>
            History
          </NavLink>
        )}
        <NavLink to="/about" isActive={isActive("/about")} isScrolled={isScrolled}>
          About
        </NavLink>
      </nav>

      <div className="hidden md:flex items-center gap-3">
        {user ? (
          <Link to="/account">
            <Button
              size="sm"
              className={`${isScrolled
                ? "bg-wildfire-600 hover:bg-wildfire-700 text-white"
                : "bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/20"}`}
            >
              <UserCircle className="h-4 w-4 mr-1" /> Account
            </Button>
          </Link>
        ) : (
          <>
            <Link to="/signin">
              <Button
                variant="ghost"
                size="sm"
                className={`${isScrolled ? "text-wildfire-800 hover:bg-wildfire-100" : "text-white hover:bg-white/10"}`}
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                size="sm"
                className={`${isScrolled
                  ? "bg-wildfire-500 hover:bg-wildfire-600 text-white"
                  : "bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/20"}`}
              >
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
