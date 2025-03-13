
import { CardContent } from "@/components/ui/card";
import { PredictionFormCard } from "./prediction/PredictionFormCard";
import { LocationSelector } from "./prediction/LocationSelector";
import { PredictionResult } from "./prediction/PredictionResult";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { usePrediction } from "@/hooks/usePrediction";
import { useEffect } from "react";

export function PredictionForm() {
  const {
    isLoading,
    result,
    location,
    useRandomForest,
    handleLocationSelect,
    handleSubmit,
    toggleModel
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
            
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
              <div className="flex flex-col">
                <span className="font-medium">Prediction Model</span>
                <span className="text-sm text-muted-foreground">
                  {useRandomForest 
                    ? "Random Forest (more accurate)" 
                    : "Formula-based (faster)"}
                </span>
              </div>
              <Switch 
                checked={useRandomForest}
                onCheckedChange={toggleModel}
                disabled={isLoading}
              />
            </div>
            
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
