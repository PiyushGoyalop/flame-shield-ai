
import { useState, useEffect, useCallback, memo } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "./nav/Logo";
import { DesktopNav } from "./nav/DesktopNav";
import { MobileNav } from "./nav/MobileNav";
import { useFavicon } from "@/hooks/useFavicon";

export function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  // Use the favicon hook to ensure favicon is properly set
  useFavicon();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll effect with debounce
  useEffect(() => {
    // Threshold to determine when the header should change appearance
    const scrollThreshold = 10;
    
    // Optimized scroll handler with debounce logic
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > scrollThreshold);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Use passive listener to improve performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if a link is active
  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);
  
  // Toggle mobile menu with memoized callback
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-8 ${
        isScrolled 
          ? "bg-white/95 shadow-sm backdrop-blur-md" 
          : "bg-black/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo isScrolled={isScrolled} />
        
        <DesktopNav isScrolled={isScrolled} isActive={isActive} user={user} />

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`md:hidden ${isScrolled ? "text-wildfire-800" : "text-white"}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      <MobileNav isMobileMenuOpen={isMobileMenuOpen} isActive={isActive} user={user} />
    </header>
  );
}

// Use memo to prevent unnecessary re-renders
export default memo(Nav);
