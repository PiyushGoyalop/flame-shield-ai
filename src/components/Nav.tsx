
import { useState, useEffect } from "react";
import { Menu, X, Flame, ChevronRight, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if a link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-8 ${
        isScrolled 
          ? "bg-white/95 shadow-sm backdrop-blur-md" 
          : "bg-black/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex flex-col items-start gap-0 transform hover:scale-105 transition-transform">
          <div className="flex items-center gap-2">
            <Flame size={24} className="text-wildfire-500" />
            <span className={`font-display font-bold text-xl ${isScrolled ? "text-wildfire-800" : "text-white"}`}>FlameShield AI</span>
          </div>
          <span className={`text-xs ml-8 ${isScrolled ? "text-wildfire-600" : "text-wildfire-100"}`}>
            AI-powered Real-time wildfire prediction & monitoring
          </span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Authentication buttons */}
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

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`md:hidden ${isScrolled ? "text-wildfire-800" : "text-white"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
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
                  <UserCircle className="h-4 w-4 mr-1" /> Account
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
      )}
    </header>
  );
}

// Helper component for desktop navigation links
const NavLink = ({ 
  children, 
  to, 
  isActive,
  isScrolled
}: { 
  children: React.ReactNode; 
  to: string; 
  isActive: boolean;
  isScrolled: boolean;
}) => (
  <Link 
    to={to} 
    className={`
      highlight-link font-medium relative flex items-center
      ${isScrolled 
        ? isActive ? "text-wildfire-700" : "text-wildfire-800 hover:text-wildfire-600" 
        : "text-white hover:text-wildfire-300"}
      ${isActive 
        ? "after:absolute after:w-full after:h-0.5 after:bg-wildfire-500 after:bottom-0 after:left-0" 
        : ""}
      transition-all duration-300
    `}
  >
    {children}
  </Link>
);

// Helper component for mobile navigation links
const MobileNavLink = ({ 
  children, 
  to, 
  isActive 
}: { 
  children: React.ReactNode; 
  to: string; 
  isActive: boolean;
}) => (
  <Link
    to={to}
    className={`
      py-2 px-4 rounded-md transition-colors flex justify-between items-center
      ${isActive 
        ? "bg-wildfire-50 text-wildfire-700 font-medium" 
        : "hover:bg-secondary"}
    `}
  >
    <span>{children}</span>
    {isActive && <ChevronRight className="h-4 w-4" />}
  </Link>
);

