
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownLocationSelector } from "./DropdownLocationSelector";
import { ManualLocationInput } from "./ManualLocationInput";
import { LocationDisplay } from "./LocationDisplay";

interface LocationSelectorProps {
  onLocationSelect: (location: string) => void;
  isLoading: boolean;
}

export function LocationSelector({ onLocationSelect, isLoading }: LocationSelectorProps) {
  const [inputMode, setInputMode] = useState<"dropdown" | "text">("dropdown");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    onLocationSelect(location);
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="dropdown" onValueChange={(value) => setInputMode(value as "dropdown" | "text")}>
        <TabsList className="w-full">
          <TabsTrigger value="dropdown" className="flex-1">Use Dropdown</TabsTrigger>
          <TabsTrigger value="text" className="flex-1">Enter Location</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dropdown">
          <DropdownLocationSelector 
            onLocationSelect={handleLocationChange}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="text">
          <ManualLocationInput 
            onLocationChange={handleLocationChange}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>

      {selectedLocation && <LocationDisplay location={selectedLocation} />}
    </div>
  );
}
