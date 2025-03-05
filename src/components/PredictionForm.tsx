
import { CardContent } from "@/components/ui/card";
import { PredictionFormCard } from "./prediction/PredictionFormCard";
import { LocationSelector } from "./prediction/LocationSelector";
import { PredictionResult } from "./prediction/PredictionResult";
import { Button } from "./ui/button";
import { usePrediction } from "@/hooks/usePrediction";
import { useEffect } from "react";

export function PredictionForm() {
  const {
    isLoading,
    result,
    location,
    handleLocationSelect,
    handleSubmit
  } = usePrediction();

  return (
    <div className="w-full max-w-5xl mx-auto">
      <PredictionFormCard>
        <CardContent>
          <div className="space-y-4">
            <LocationSelector 
              onLocationSelect={handleLocationSelect} 
              isLoading={isLoading} 
              initialLocation={location}
            />
            
            <Button 
              onClick={() => handleSubmit()} 
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
