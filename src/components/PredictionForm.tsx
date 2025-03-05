
import { CardContent } from "@/components/ui/card";
import { PredictionFormCard } from "./prediction/PredictionFormCard";
import { LocationSelector } from "./prediction/LocationSelector";
import { PredictionResult } from "./prediction/PredictionResult";
import { Button } from "./ui/button";
import { usePrediction } from "@/hooks/usePrediction";

export function PredictionForm() {
  const {
    isLoading,
    result,
    location,
    apiMode,
    handleLocationSelect,
    handleSubmit
  } = usePrediction();

  return (
    <div className="max-w-md w-full mx-auto">
      <PredictionFormCard>
        <CardContent>
          <div className="space-y-4">
            <LocationSelector onLocationSelect={handleLocationSelect} isLoading={isLoading} />
            
            <div className="flex justify-between items-center mt-2 mb-1">
              <span className="text-sm text-muted-foreground">Data Source:</span>
              <span className={`text-xs ${apiMode ? 'text-green-600' : 'text-amber-600'} font-medium`}>
                {apiMode ? 'API (Real Data)' : 'Simulation'}
              </span>
            </div>
            
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
