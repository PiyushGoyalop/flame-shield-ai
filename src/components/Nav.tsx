
import { useState, useEffect } from "react";
import { Menu, X, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-8",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-subtle"
          : "bg-transparent text-white"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Flame size={24} className={isScrolled ? "text-wildfire-500" : "text-wildfire-300"} />
          <span className={`font-display font-bold text-xl ${isScrolled ? "text-wildfire-800" : "text-white"}`}>Wildfire Analytics</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={`highlight-link font-medium ${isScrolled ? "text-wildfire-800" : "text-white"}`}>
            Home
          </Link>
          <Link to="/analytics" className={`highlight-link font-medium ${isScrolled ? "text-wildfire-800" : "text-white"}`}>
            Analytics
          </Link>
          <Link to="/predict" className={`highlight-link font-medium ${isScrolled ? "text-wildfire-800" : "text-white"}`}>
            Prediction
          </Link>
          <Link to="/about" className={`highlight-link font-medium ${isScrolled ? "text-wildfire-800" : "text-white"}`}>
            About
          </Link>
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
          <Link
            to="/"
            className="py-2 px-4 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/analytics"
            className="py-2 px-4 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Analytics
          </Link>
          <Link
            to="/predict"
            className="py-2 px-4 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Prediction
          </Link>
          <Link
            to="/about"
            className="py-2 px-4 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
}
