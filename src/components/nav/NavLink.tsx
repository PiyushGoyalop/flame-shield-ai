
import { Link } from "react-router-dom";

interface NavLinkProps {
  children: React.ReactNode;
  to: string;
  isActive: boolean;
  isScrolled: boolean;
}

export function NavLink({ children, to, isActive, isScrolled }: NavLinkProps) {
  return (
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
}
