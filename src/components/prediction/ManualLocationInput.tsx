
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ManualLocationInputProps {
  onLocationChange: (location: string) => void;
  isLoading: boolean;
  initialLocation?: string;
}

export function ManualLocationInput({ onLocationChange, isLoading, initialLocation }: ManualLocationInputProps) {
  const [customLocation, setCustomLocation] = useState<string>("");

  // Update state when initialLocation changes
  useEffect(() => {
    if (initialLocation) {
      setCustomLocation(initialLocation);
    }
  }, [initialLocation]);

  const handleLocationChange = (value: string) => {
    setCustomLocation(value);
    onLocationChange(value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="custom-location">Enter Location</Label>
      <Input
        id="custom-location"
        placeholder="e.g. Sacramento, California"
        value={customLocation}
        onChange={(e) => handleLocationChange(e.target.value)}
        disabled={isLoading}
      />
    </div>
  );
}
