
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

// Complete list of all 50 US states
const statesData = [
  { value: "alabama", label: "Alabama" },
  { value: "alaska", label: "Alaska" },
  { value: "arizona", label: "Arizona" },
  { value: "arkansas", label: "Arkansas" },
  { value: "california", label: "California" },
  { value: "colorado", label: "Colorado" },
  { value: "connecticut", label: "Connecticut" },
  { value: "delaware", label: "Delaware" },
  { value: "florida", label: "Florida" },
  { value: "georgia", label: "Georgia" },
  { value: "hawaii", label: "Hawaii" },
  { value: "idaho", label: "Idaho" },
  { value: "illinois", label: "Illinois" },
  { value: "indiana", label: "Indiana" },
  { value: "iowa", label: "Iowa" },
  { value: "kansas", label: "Kansas" },
  { value: "kentucky", label: "Kentucky" },
  { value: "louisiana", label: "Louisiana" },
  { value: "maine", label: "Maine" },
  { value: "maryland", label: "Maryland" },
  { value: "massachusetts", label: "Massachusetts" },
  { value: "michigan", label: "Michigan" },
  { value: "minnesota", label: "Minnesota" },
  { value: "mississippi", label: "Mississippi" },
  { value: "missouri", label: "Missouri" },
  { value: "montana", label: "Montana" },
  { value: "nebraska", label: "Nebraska" },
  { value: "nevada", label: "Nevada" },
  { value: "new_hampshire", label: "New Hampshire" },
  { value: "new_jersey", label: "New Jersey" },
  { value: "new_mexico", label: "New Mexico" },
  { value: "new_york", label: "New York" },
  { value: "north_carolina", label: "North Carolina" },
  { value: "north_dakota", label: "North Dakota" },
  { value: "ohio", label: "Ohio" },
  { value: "oklahoma", label: "Oklahoma" },
  { value: "oregon", label: "Oregon" },
  { value: "pennsylvania", label: "Pennsylvania" },
  { value: "rhode_island", label: "Rhode Island" },
  { value: "south_carolina", label: "South Carolina" },
  { value: "south_dakota", label: "South Dakota" },
  { value: "tennessee", label: "Tennessee" },
  { value: "texas", label: "Texas" },
  { value: "utah", label: "Utah" },
  { value: "vermont", label: "Vermont" },
  { value: "virginia", label: "Virginia" },
  { value: "washington", label: "Washington" },
  { value: "west_virginia", label: "West Virginia" },
  { value: "wisconsin", label: "Wisconsin" },
  { value: "wyoming", label: "Wyoming" }
];

// Map of major cities by state (expanded to include cities for all 50 states)
const citiesByState: Record<string, {value: string, label: string}[]> = {
  alabama: [
    { value: "birmingham", label: "Birmingham" },
    { value: "montgomery", label: "Montgomery" },
    { value: "mobile", label: "Mobile" },
    { value: "huntsville", label: "Huntsville" },
    { value: "tuscaloosa", label: "Tuscaloosa" }
  ],
  alaska: [
    { value: "anchorage", label: "Anchorage" },
    { value: "fairbanks", label: "Fairbanks" },
    { value: "juneau", label: "Juneau" },
    { value: "sitka", label: "Sitka" },
    { value: "ketchikan", label: "Ketchikan" }
  ],
  arizona: [
    { value: "phoenix", label: "Phoenix" },
    { value: "tucson", label: "Tucson" },
    { value: "mesa", label: "Mesa" },
    { value: "chandler", label: "Chandler" },
    { value: "scottsdale", label: "Scottsdale" },
    { value: "flagstaff", label: "Flagstaff" }
  ],
  arkansas: [
    { value: "little_rock", label: "Little Rock" },
    { value: "fort_smith", label: "Fort Smith" },
    { value: "fayetteville", label: "Fayetteville" },
    { value: "springdale", label: "Springdale" },
    { value: "jonesboro", label: "Jonesboro" }
  ],
  california: [
    { value: "los_angeles", label: "Los Angeles" },
    { value: "san_francisco", label: "San Francisco" },
    { value: "san_diego", label: "San Diego" },
    { value: "sacramento", label: "Sacramento" },
    { value: "fresno", label: "Fresno" },
    { value: "san_jose", label: "San Jose" },
    { value: "oakland", label: "Oakland" },
    { value: "long_beach", label: "Long Beach" }
  ],
  colorado: [
    { value: "denver", label: "Denver" },
    { value: "colorado_springs", label: "Colorado Springs" },
    { value: "aurora", label: "Aurora" },
    { value: "fort_collins", label: "Fort Collins" },
    { value: "boulder", label: "Boulder" }
  ],
  connecticut: [
    { value: "bridgeport", label: "Bridgeport" },
    { value: "new_haven", label: "New Haven" },
    { value: "hartford", label: "Hartford" },
    { value: "stamford", label: "Stamford" },
    { value: "waterbury", label: "Waterbury" }
  ],
  delaware: [
    { value: "wilmington", label: "Wilmington" },
    { value: "dover", label: "Dover" },
    { value: "newark", label: "Newark" },
    { value: "middletown", label: "Middletown" },
    { value: "smyrna", label: "Smyrna" }
  ],
  florida: [
    { value: "miami", label: "Miami" },
    { value: "orlando", label: "Orlando" },
    { value: "tampa", label: "Tampa" },
    { value: "jacksonville", label: "Jacksonville" },
    { value: "tallahassee", label: "Tallahassee" },
    { value: "fort_lauderdale", label: "Fort Lauderdale" }
  ],
  georgia: [
    { value: "atlanta", label: "Atlanta" },
    { value: "savannah", label: "Savannah" },
    { value: "athens", label: "Athens" },
    { value: "augusta", label: "Augusta" },
    { value: "columbus", label: "Columbus" }
  ],
  hawaii: [
    { value: "honolulu", label: "Honolulu" },
    { value: "hilo", label: "Hilo" },
    { value: "kailua", label: "Kailua" },
    { value: "kaneohe", label: "Kaneohe" },
    { value: "waipahu", label: "Waipahu" }
  ],
  idaho: [
    { value: "boise", label: "Boise" },
    { value: "nampa", label: "Nampa" },
    { value: "meridian", label: "Meridian" },
    { value: "idaho_falls", label: "Idaho Falls" },
    { value: "pocatello", label: "Pocatello" }
  ],
  illinois: [
    { value: "chicago", label: "Chicago" },
    { value: "aurora", label: "Aurora" },
    { value: "rockford", label: "Rockford" },
    { value: "joliet", label: "Joliet" },
    { value: "springfield", label: "Springfield" }
  ],
  indiana: [
    { value: "indianapolis", label: "Indianapolis" },
    { value: "fort_wayne", label: "Fort Wayne" },
    { value: "evansville", label: "Evansville" },
    { value: "south_bend", label: "South Bend" },
    { value: "bloomington", label: "Bloomington" }
  ],
  iowa: [
    { value: "des_moines", label: "Des Moines" },
    { value: "cedar_rapids", label: "Cedar Rapids" },
    { value: "davenport", label: "Davenport" },
    { value: "sioux_city", label: "Sioux City" },
    { value: "iowa_city", label: "Iowa City" }
  ],
  kansas: [
    { value: "wichita", label: "Wichita" },
    { value: "overland_park", label: "Overland Park" },
    { value: "kansas_city", label: "Kansas City" },
    { value: "topeka", label: "Topeka" },
    { value: "lawrence", label: "Lawrence" }
  ],
  kentucky: [
    { value: "louisville", label: "Louisville" },
    { value: "lexington", label: "Lexington" },
    { value: "bowling_green", label: "Bowling Green" },
    { value: "owensboro", label: "Owensboro" },
    { value: "covington", label: "Covington" }
  ],
  louisiana: [
    { value: "new_orleans", label: "New Orleans" },
    { value: "baton_rouge", label: "Baton Rouge" },
    { value: "shreveport", label: "Shreveport" },
    { value: "lafayette", label: "Lafayette" },
    { value: "lake_charles", label: "Lake Charles" }
  ],
  maine: [
    { value: "portland", label: "Portland" },
    { value: "lewiston", label: "Lewiston" },
    { value: "bangor", label: "Bangor" },
    { value: "south_portland", label: "South Portland" },
    { value: "auburn", label: "Auburn" }
  ],
  maryland: [
    { value: "baltimore", label: "Baltimore" },
    { value: "columbia", label: "Columbia" },
    { value: "silver_spring", label: "Silver Spring" },
    { value: "annapolis", label: "Annapolis" },
    { value: "rockville", label: "Rockville" }
  ],
  massachusetts: [
    { value: "boston", label: "Boston" },
    { value: "worcester", label: "Worcester" },
    { value: "springfield", label: "Springfield" },
    { value: "cambridge", label: "Cambridge" },
    { value: "lowell", label: "Lowell" }
  ],
  michigan: [
    { value: "detroit", label: "Detroit" },
    { value: "grand_rapids", label: "Grand Rapids" },
    { value: "ann_arbor", label: "Ann Arbor" },
    { value: "lansing", label: "Lansing" },
    { value: "flint", label: "Flint" }
  ],
  minnesota: [
    { value: "minneapolis", label: "Minneapolis" },
    { value: "saint_paul", label: "Saint Paul" },
    { value: "rochester", label: "Rochester" },
    { value: "duluth", label: "Duluth" },
    { value: "bloomington", label: "Bloomington" }
  ],
  mississippi: [
    { value: "jackson", label: "Jackson" },
    { value: "gulfport", label: "Gulfport" },
    { value: "southaven", label: "Southaven" },
    { value: "hattiesburg", label: "Hattiesburg" },
    { value: "biloxi", label: "Biloxi" }
  ],
  missouri: [
    { value: "kansas_city", label: "Kansas City" },
    { value: "saint_louis", label: "Saint Louis" },
    { value: "springfield", label: "Springfield" },
    { value: "columbia", label: "Columbia" },
    { value: "independence", label: "Independence" }
  ],
  montana: [
    { value: "billings", label: "Billings" },
    { value: "missoula", label: "Missoula" },
    { value: "great_falls", label: "Great Falls" },
    { value: "bozeman", label: "Bozeman" },
    { value: "helena", label: "Helena" }
  ],
  nebraska: [
    { value: "omaha", label: "Omaha" },
    { value: "lincoln", label: "Lincoln" },
    { value: "bellevue", label: "Bellevue" },
    { value: "grand_island", label: "Grand Island" },
    { value: "kearney", label: "Kearney" }
  ],
  nevada: [
    { value: "las_vegas", label: "Las Vegas" },
    { value: "henderson", label: "Henderson" },
    { value: "reno", label: "Reno" },
    { value: "north_las_vegas", label: "North Las Vegas" },
    { value: "carson_city", label: "Carson City" }
  ],
  new_hampshire: [
    { value: "manchester", label: "Manchester" },
    { value: "nashua", label: "Nashua" },
    { value: "concord", label: "Concord" },
    { value: "derry", label: "Derry" },
    { value: "dover", label: "Dover" }
  ],
  new_jersey: [
    { value: "newark", label: "Newark" },
    { value: "jersey_city", label: "Jersey City" },
    { value: "paterson", label: "Paterson" },
    { value: "trenton", label: "Trenton" },
    { value: "atlantic_city", label: "Atlantic City" }
  ],
  new_mexico: [
    { value: "albuquerque", label: "Albuquerque" },
    { value: "las_cruces", label: "Las Cruces" },
    { value: "rio_rancho", label: "Rio Rancho" },
    { value: "santa_fe", label: "Santa Fe" },
    { value: "roswell", label: "Roswell" }
  ],
  new_york: [
    { value: "new_york_city", label: "New York City" },
    { value: "buffalo", label: "Buffalo" },
    { value: "rochester", label: "Rochester" },
    { value: "yonkers", label: "Yonkers" },
    { value: "syracuse", label: "Syracuse" },
    { value: "albany", label: "Albany" }
  ],
  north_carolina: [
    { value: "charlotte", label: "Charlotte" },
    { value: "raleigh", label: "Raleigh" },
    { value: "greensboro", label: "Greensboro" },
    { value: "durham", label: "Durham" },
    { value: "winston_salem", label: "Winston-Salem" }
  ],
  north_dakota: [
    { value: "fargo", label: "Fargo" },
    { value: "bismarck", label: "Bismarck" },
    { value: "grand_forks", label: "Grand Forks" },
    { value: "minot", label: "Minot" },
    { value: "west_fargo", label: "West Fargo" }
  ],
  ohio: [
    { value: "columbus", label: "Columbus" },
    { value: "cleveland", label: "Cleveland" },
    { value: "cincinnati", label: "Cincinnati" },
    { value: "toledo", label: "Toledo" },
    { value: "akron", label: "Akron" }
  ],
  oklahoma: [
    { value: "oklahoma_city", label: "Oklahoma City" },
    { value: "tulsa", label: "Tulsa" },
    { value: "norman", label: "Norman" },
    { value: "broken_arrow", label: "Broken Arrow" },
    { value: "lawton", label: "Lawton" }
  ],
  oregon: [
    { value: "portland", label: "Portland" },
    { value: "salem", label: "Salem" },
    { value: "eugene", label: "Eugene" },
    { value: "gresham", label: "Gresham" },
    { value: "bend", label: "Bend" }
  ],
  pennsylvania: [
    { value: "philadelphia", label: "Philadelphia" },
    { value: "pittsburgh", label: "Pittsburgh" },
    { value: "allentown", label: "Allentown" },
    { value: "erie", label: "Erie" },
    { value: "harrisburg", label: "Harrisburg" }
  ],
  rhode_island: [
    { value: "providence", label: "Providence" },
    { value: "warwick", label: "Warwick" },
    { value: "cranston", label: "Cranston" },
    { value: "pawtucket", label: "Pawtucket" },
    { value: "east_providence", label: "East Providence" }
  ],
  south_carolina: [
    { value: "columbia", label: "Columbia" },
    { value: "charleston", label: "Charleston" },
    { value: "north_charleston", label: "North Charleston" },
    { value: "greenville", label: "Greenville" },
    { value: "rock_hill", label: "Rock Hill" }
  ],
  south_dakota: [
    { value: "sioux_falls", label: "Sioux Falls" },
    { value: "rapid_city", label: "Rapid City" },
    { value: "aberdeen", label: "Aberdeen" },
    { value: "brookings", label: "Brookings" },
    { value: "watertown", label: "Watertown" }
  ],
  tennessee: [
    { value: "nashville", label: "Nashville" },
    { value: "memphis", label: "Memphis" },
    { value: "knoxville", label: "Knoxville" },
    { value: "chattanooga", label: "Chattanooga" },
    { value: "clarksville", label: "Clarksville" }
  ],
  texas: [
    { value: "houston", label: "Houston" },
    { value: "san_antonio", label: "San Antonio" },
    { value: "dallas", label: "Dallas" },
    { value: "austin", label: "Austin" },
    { value: "fort_worth", label: "Fort Worth" },
    { value: "el_paso", label: "El Paso" }
  ],
  utah: [
    { value: "salt_lake_city", label: "Salt Lake City" },
    { value: "west_valley_city", label: "West Valley City" },
    { value: "provo", label: "Provo" },
    { value: "west_jordan", label: "West Jordan" },
    { value: "orem", label: "Orem" }
  ],
  vermont: [
    { value: "burlington", label: "Burlington" },
    { value: "south_burlington", label: "South Burlington" },
    { value: "rutland", label: "Rutland" },
    { value: "essex", label: "Essex" },
    { value: "colchester", label: "Colchester" }
  ],
  virginia: [
    { value: "virginia_beach", label: "Virginia Beach" },
    { value: "norfolk", label: "Norfolk" },
    { value: "chesapeake", label: "Chesapeake" },
    { value: "richmond", label: "Richmond" },
    { value: "arlington", label: "Arlington" }
  ],
  washington: [
    { value: "seattle", label: "Seattle" },
    { value: "spokane", label: "Spokane" },
    { value: "tacoma", label: "Tacoma" },
    { value: "vancouver", label: "Vancouver" },
    { value: "olympia", label: "Olympia" }
  ],
  west_virginia: [
    { value: "charleston", label: "Charleston" },
    { value: "huntington", label: "Huntington" },
    { value: "morgantown", label: "Morgantown" },
    { value: "parkersburg", label: "Parkersburg" },
    { value: "wheeling", label: "Wheeling" }
  ],
  wisconsin: [
    { value: "milwaukee", label: "Milwaukee" },
    { value: "madison", label: "Madison" },
    { value: "green_bay", label: "Green Bay" },
    { value: "kenosha", label: "Kenosha" },
    { value: "racine", label: "Racine" }
  ],
  wyoming: [
    { value: "cheyenne", label: "Cheyenne" },
    { value: "casper", label: "Casper" },
    { value: "laramie", label: "Laramie" },
    { value: "gillette", label: "Gillette" },
    { value: "rock_springs", label: "Rock Springs" }
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
