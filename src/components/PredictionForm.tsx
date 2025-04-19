
import { CardContent } from "@/components/ui/card";
import { PredictionFormCard } from "./prediction/PredictionFormCard";
import { LocationSelector } from "./prediction/LocationSelector";
import { PredictionResult } from "./prediction/PredictionResult";
import { Button } from "./ui/button";
import { usePrediction } from "@/hooks/usePrediction";
import { Brain, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function PredictionForm() {
  const {
    isLoading,
    result,
    location,
    handleLocationSelect,
    handleSubmit
  } = usePrediction();
  
  const { toast } = useToast();
  const [apiIssueDetected, setApiIssueDetected] = useState(false);
  
  // Check for Earth Engine API issues when result is received
  useEffect(() => {
    if (result?.vegetation_index?.data_source === 'mock_fallback') {
      setApiIssueDetected(true);
      
      // Show a toast notification only once
      if (!apiIssueDetected) {
        toast({
          title: "Google Earth Engine API Issue Detected",
          description: "Using simulated vegetation data. The API connection may need attention.",
          variant: "destructive" // Changed to "destructive" as "warning" is not a valid variant
        });
      }
    }
  }, [result, toast, apiIssueDetected]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <PredictionFormCard>
        <CardContent>
          <div className="mb-4 px-1 flex items-center space-x-2 text-sm text-muted-foreground">
            <Brain className="h-4 w-4 text-purple-600" />
            <span>Using Random Forest ML model with real-time environmental APIs for accurate predictions</span>
          </div>
          
          {apiIssueDetected && (
            <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-md flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-700">
                <p className="font-medium">Google Earth Engine API Issue Detected</p>
                <p className="text-xs mt-1">The system is currently using simulated vegetation data. The Google Earth Engine API connection may need attention.</p>
              </div>
            </div>
          )}
          
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
