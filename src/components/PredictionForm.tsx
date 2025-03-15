
import { CardContent } from "@/components/ui/card";
import { PredictionFormCard } from "./prediction/PredictionFormCard";
import { LocationSelector } from "./prediction/LocationSelector";
import { PredictionResult } from "./prediction/PredictionResult";
import { Button } from "./ui/button";
import { usePrediction } from "@/hooks/usePrediction";
import { Brain } from "lucide-react";

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
          <div className="mb-4 px-1 flex items-center space-x-2 text-sm text-muted-foreground">
            <Brain className="h-4 w-4 text-purple-600" />
            <span>Using Random Forest ML model with real-time environmental APIs for accurate predictions</span>
          </div>
          
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
