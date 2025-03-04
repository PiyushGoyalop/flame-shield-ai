
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ManualLocationInputProps {
  onLocationChange: (location: string) => void;
  isLoading: boolean;
}

export function ManualLocationInput({ onLocationChange, isLoading }: ManualLocationInputProps) {
  const [customLocation, setCustomLocation] = useState<string>("");

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
