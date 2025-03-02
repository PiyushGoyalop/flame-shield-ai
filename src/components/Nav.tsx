
import { useState, useEffect } from "react";
import { Menu, X, Flame, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Check if a link is active
  const isActive = (path: string) => location.pathname === path;

  // Get background color based on scroll state
  const getNavBackgroundClass = () => {
    if (isScrolled) {
      return "bg-white/90 backdrop-blur-md shadow-subtle";
    }
    return "bg-transparent text-white";
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-8",
        getNavBackgroundClass()
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transform hover:scale-105 transition-transform">
          <Flame size={24} className={isScrolled ? "text-wildfire-500" : "text-wildfire-300"} />
          <span className={`font-display font-bold text-xl ${isScrolled ? "text-wildfire-800" : "text-white"}`}>Wildfire Analytics</span>
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
          <NavLink to="/about" isActive={isActive("/about")} isScrolled={isScrolled}>
            About
          </NavLink>
        </nav>

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
          <MobileNavLink to="/about" isActive={isActive("/about")}>
            About
          </MobileNavLink>
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
      highlight-link font-medium relative 
      ${isScrolled ? "text-wildfire-800" : "text-white"}
      ${isActive ? "after:absolute after:w-full after:h-0.5 after:bg-wildfire-500 after:bottom-0 after:left-0" : ""}
      transition-all duration-300 hover:text-wildfire-500
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
