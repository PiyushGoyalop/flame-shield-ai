
import { Flame } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  isScrolled: boolean;
}

export function Logo({ isScrolled }: LogoProps) {
  return (
    <Link to="/" className="flex flex-col items-start gap-0 transform hover:scale-105 transition-transform">
      <div className="flex items-center gap-2">
        <Flame size={24} className="text-wildfire-500" />
        <span className={`font-display font-bold text-xl ${isScrolled ? "text-wildfire-800" : "text-white"}`}>
          FlameShield AI
        </span>
      </div>
      <span className={`text-xs ml-8 ${isScrolled ? "text-wildfire-600" : "text-wildfire-100"}`}>
        AI-powered Real-time wildfire prediction & monitoring
      </span>
    </Link>
  );
}
