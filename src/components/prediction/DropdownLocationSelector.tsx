
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statesData } from "@/data/statesData";
import { citiesByState, CityOption } from "@/data/citiesData";

interface DropdownLocationSelectorProps {
  onLocationSelect: (location: string) => void;
  isLoading: boolean;
}

export function DropdownLocationSelector({ onLocationSelect, isLoading }: DropdownLocationSelectorProps) {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [availableCities, setAvailableCities] = useState<CityOption[]>([]);

  // Update available cities when state changes
  useEffect(() => {
    if (selectedState) {
      setAvailableCities(citiesByState[selectedState] || []);
      setSelectedCity("");
    }
  }, [selectedState]);

  // When city is selected, call the parent's onLocationSelect
  useEffect(() => {
    if (selectedState && selectedCity) {
      const stateName = statesData.find(s => s.value === selectedState)?.label || "";
      const cityName = availableCities.find(c => c.value === selectedCity)?.label || "";
      onLocationSelect(`${cityName}, ${stateName}`);
    }
  }, [selectedCity, selectedState, availableCities, onLocationSelect]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="state-select">State</Label>
        <Select
          disabled={isLoading}
          value={selectedState}
          onValueChange={(value) => setSelectedState(value)}
        >
          <SelectTrigger className="w-full" id="state-select">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent>
            {statesData.map((state) => (
              <SelectItem key={state.value} value={state.value}>
                {state.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city-select">City</Label>
        <Select
          disabled={isLoading || !selectedState}
          value={selectedCity}
          onValueChange={(value) => setSelectedCity(value)}
        >
          <SelectTrigger className="w-full" id="city-select">
            <SelectValue placeholder={!selectedState ? "Select a state first" : "Select a city"} />
          </SelectTrigger>
          <SelectContent>
            {availableCities.map((city) => (
              <SelectItem key={city.value} value={city.value}>
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
