
import { useState, useEffect } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Sample data for states and cities (would be replaced with API data)
const statesData = [
  { value: "california", label: "California" },
  { value: "colorado", label: "Colorado" },
  { value: "oregon", label: "Oregon" },
  { value: "washington", label: "Washington" },
  { value: "arizona", label: "Arizona" },
  { value: "nevada", label: "Nevada" },
  { value: "new_mexico", label: "New Mexico" },
  { value: "texas", label: "Texas" },
  { value: "florida", label: "Florida" },
  { value: "new_york", label: "New York" },
  { value: "montana", label: "Montana" },
];

// Map of cities by state
const citiesByState: Record<string, {value: string, label: string}[]> = {
  california: [
    { value: "los_angeles", label: "Los Angeles" },
    { value: "san_francisco", label: "San Francisco" },
    { value: "san_diego", label: "San Diego" },
    { value: "sacramento", label: "Sacramento" },
    { value: "fresno", label: "Fresno" }
  ],
  colorado: [
    { value: "denver", label: "Denver" },
    { value: "colorado_springs", label: "Colorado Springs" },
    { value: "boulder", label: "Boulder" },
    { value: "fort_collins", label: "Fort Collins" }
  ],
  oregon: [
    { value: "portland", label: "Portland" },
    { value: "eugene", label: "Eugene" },
    { value: "salem", label: "Salem" },
    { value: "bend", label: "Bend" }
  ],
  washington: [
    { value: "seattle", label: "Seattle" },
    { value: "spokane", label: "Spokane" },
    { value: "tacoma", label: "Tacoma" },
    { value: "olympia", label: "Olympia" }
  ],
  arizona: [
    { value: "phoenix", label: "Phoenix" },
    { value: "tucson", label: "Tucson" },
    { value: "flagstaff", label: "Flagstaff" },
    { value: "scottsdale", label: "Scottsdale" }
  ],
  nevada: [
    { value: "las_vegas", label: "Las Vegas" },
    { value: "reno", label: "Reno" },
    { value: "carson_city", label: "Carson City" },
    { value: "henderson", label: "Henderson" }
  ],
  new_mexico: [
    { value: "albuquerque", label: "Albuquerque" },
    { value: "santa_fe", label: "Santa Fe" },
    { value: "las_cruces", label: "Las Cruces" },
    { value: "roswell", label: "Roswell" }
  ],
  texas: [
    { value: "austin", label: "Austin" },
    { value: "houston", label: "Houston" },
    { value: "dallas", label: "Dallas" },
    { value: "san_antonio", label: "San Antonio" }
  ],
  florida: [
    { value: "miami", label: "Miami" },
    { value: "orlando", label: "Orlando" },
    { value: "tampa", label: "Tampa" },
    { value: "jacksonville", label: "Jacksonville" }
  ],
  new_york: [
    { value: "new_york_city", label: "New York City" },
    { value: "buffalo", label: "Buffalo" },
    { value: "rochester", label: "Rochester" },
    { value: "albany", label: "Albany" }
  ],
  montana: [
    { value: "billings", label: "Billings" },
    { value: "missoula", label: "Missoula" },
    { value: "helena", label: "Helena" },
    { value: "bozeman", label: "Bozeman" }
  ]
};

interface LocationSelectorProps {
  onLocationSelect: (location: string) => void;
  isLoading: boolean;
}

export function LocationSelector({ onLocationSelect, isLoading }: LocationSelectorProps) {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [availableCities, setAvailableCities] = useState<{value: string, label: string}[]>([]);

  // Update available cities when state changes
  useEffect(() => {
    if (selectedState) {
      setAvailableCities(citiesByState[selectedState] || []);
      setSelectedCity("");
    }
  }, [selectedState]);

  // When city is selected, call the parent's onLocationSelect with full location string
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
          <SelectTrigger 
            className="w-full" 
            id="city-select"
          >
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
        {!selectedState && (
          <p className="text-xs text-muted-foreground mt-1">
            Please select a state first
          </p>
        )}
      </div>

      {selectedState && selectedCity && (
        <div className="mt-2 p-2 bg-wildfire-50 rounded-md border border-wildfire-100 text-sm flex items-center gap-2">
          <MapPin className="h-4 w-4 text-wildfire-500" />
          <span>
            {availableCities.find(c => c.value === selectedCity)?.label}, {" "}
            {statesData.find(s => s.value === selectedState)?.label}
          </span>
        </div>
      )}
    </div>
  );
}
