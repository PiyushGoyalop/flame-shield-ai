
import { MapPin } from "lucide-react";

interface LocationDisplayProps {
  location: string;
}

export function LocationDisplay({ location }: LocationDisplayProps) {
  if (!location) return null;
  
  return (
    <div className="mt-2 p-2 bg-wildfire-50 rounded-md border border-wildfire-100 text-sm flex items-center gap-2">
      <MapPin className="h-4 w-4 text-wildfire-500" />
      <span>{location}</span>
    </div>
  );
}
