
import { MapPin, ExternalLink } from "lucide-react";

interface LocationDisplayProps {
  location: string;
  lat?: number;
  lon?: number;
}

export function LocationDisplay({ location, lat, lon }: LocationDisplayProps) {
  if (!location) return null;
  
  // Create Google Maps link if coordinates are available
  const googleMapsUrl = lat && lon 
    ? `https://www.google.com/maps/search/?api=1&query=${lat},${lon}` 
    : null;
  
  return (
    <div className="mt-2 p-2 bg-wildfire-50 rounded-md border border-wildfire-100 text-sm flex items-center gap-2">
      <MapPin className="h-4 w-4 text-wildfire-500" />
      <span>{location}</span>
      {lat && lon && (
        <div className="flex items-center ml-auto">
          <span className="text-xs text-muted-foreground">({lat.toFixed(4)}, {lon.toFixed(4)})</span>
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
