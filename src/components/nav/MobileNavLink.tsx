
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileNavLinkProps {
  children: React.ReactNode;
  to: string;
  isActive: boolean;
}

export function MobileNavLink({ children, to, isActive }: MobileNavLinkProps) {
  return (
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
}
