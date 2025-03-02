
import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PredictionFormCard } from "./prediction/PredictionFormCard";
import { SearchForm } from "./prediction/SearchForm";
import { PredictionResult } from "./prediction/PredictionResult";

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
  const { toast } = useToast();

  const handleSubmit = (location: string) => {
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
      
      setResult({
        location,
        probability: Math.round(randomProbability * 100) / 100,
        co2Level: Math.round(co2Level * 10) / 10,
        temperature: Math.round(temperature * 10) / 10,
        humidity: Math.round(humidity),
        droughtIndex: Math.round(droughtIndex),
      });
      
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
          <SearchForm onSubmit={handleSubmit} isLoading={isLoading} />
          
          {result && <PredictionResult result={result} />}
        </CardContent>
      </PredictionFormCard>
    </div>
  );
}
