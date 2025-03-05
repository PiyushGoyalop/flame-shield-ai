
import { MapPin, ExternalLink } from "lucide-react";

interface LocationDisplayProps {
  location: string;
  latitude?: number;
  longitude?: number;
}

export function LocationDisplay({ location, latitude, longitude }: LocationDisplayProps) {
  if (!location) return null;
  
  // Create Google Maps link if coordinates are available
  const googleMapsUrl = latitude && longitude 
    ? `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}` 
    : null;
  
  return (
    <div className="mt-2 p-2 bg-wildfire-50 rounded-md border border-wildfire-100 text-sm flex items-center gap-2">
      <MapPin className="h-4 w-4 text-wildfire-500" />
      <span>{location}</span>
      {latitude && longitude && (
        <div className="flex items-center ml-auto">
          <span className="text-xs text-muted-foreground">({latitude.toFixed(4)}, {longitude.toFixed(4)})</span>
          {googleMapsUrl && (
            <a 
              href={googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-2 text-wildfire-600 hover:text-wildfire-800 transition-colors"
              title="View on Google Maps"
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
