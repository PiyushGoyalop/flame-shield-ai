
import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PredictionFormCard } from "./prediction/PredictionFormCard";
import { LocationSelector } from "./prediction/LocationSelector";
import { PredictionResult } from "./prediction/PredictionResult";
import { Button } from "./ui/button";

interface PredictionResult {
  location: string;
  probability: number;
  co2Level: number;
  temperature: number;
  humidity: number;
  droughtIndex: number;
}

export function PredictionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [location, setLocation] = useState<string>("");
  const { toast } = useToast();

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
  };

  const handleSubmit = () => {
    if (!location) {
      toast({
        title: "Location required",
        description: "Please select a location to make a prediction",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulating API call to the ML model
    setTimeout(() => {
      // Generate more realistic random data
      const randomProbability = (
        location.toLowerCase().includes('california') ? Math.random() * 35 + 55 : // Higher for California
        location.toLowerCase().includes('colorado') ? Math.random() * 30 + 45 : // Medium-high for Colorado
        location.toLowerCase().includes('oregon') ? Math.random() * 25 + 40 : // Medium for Oregon
        location.toLowerCase().includes('york') ? Math.random() * 15 + 10 : // Lower for New York
        location.toLowerCase().includes('florida') ? Math.random() * 20 + 30 : // Medium-low for Florida
        Math.random() * 60 + 20 // Random for other places
      );
      
      const co2Level = Math.random() * 50 + 5; // Random CO2 level between 5 and 55 MT
      const temperature = Math.random() * 30 + 5; // Random temperature between 5°C and 35°C
      const humidity = Math.random() * 60 + 20; // Random humidity between 20% and 80%
      const droughtIndex = 100 - humidity; // Simple drought index calculation
      
      const newResult = {
        location,
        probability: Math.round(randomProbability * 100) / 100,
        co2Level: Math.round(co2Level * 10) / 10,
        temperature: Math.round(temperature * 10) / 10,
        humidity: Math.round(humidity),
        droughtIndex: Math.round(droughtIndex),
      };
      
      setResult(newResult);
      setIsLoading(false);
      
      // Show success toast
      toast({
        title: "Prediction Complete",
        description: `Analysis for ${location} has been generated.`,
      });
    }, 1500);
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <PredictionFormCard>
        <CardContent>
          <div className="space-y-4">
            <LocationSelector onLocationSelect={handleLocationSelect} isLoading={isLoading} />
            
            <Button 
              onClick={handleSubmit} 
              className="w-full bg-wildfire-600 hover:bg-wildfire-700 transition-all" 
              disabled={isLoading || !location}
            >
              {isLoading ? "Analyzing..." : "Predict Risk"}
            </Button>
          </div>
          
          {result && <PredictionResult result={result} />}
        </CardContent>
      </PredictionFormCard>
    </div>
  );
}
