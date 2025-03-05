
import { CardContent } from "@/components/ui/card";
import { PredictionFormCard } from "./prediction/PredictionFormCard";
import { LocationSelector } from "./prediction/LocationSelector";
import { PredictionResult } from "./prediction/PredictionResult";
import { Button } from "./ui/button";
import { usePrediction } from "@/hooks/usePrediction";
import { Info, Upload } from "lucide-react";
import { useState } from "react";
import { CSVUploader } from "./prediction/CSVUploader";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

export function PredictionForm() {
  const {
    isLoading,
    result,
    location,
    apiMode,
    handleLocationSelect,
    handleSubmit,
    handleCustomDataUpload
  } = usePrediction();
  
  const [showUploader, setShowUploader] = useState(false);

  return (
    <div className="max-w-md w-full mx-auto">
      <PredictionFormCard>
        <CardContent>
          <div className="space-y-4">
            <LocationSelector onLocationSelect={handleLocationSelect} isLoading={isLoading} />
            
            <div className="rounded-md bg-blue-50 p-2 mb-2">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-4 w-4 text-blue-400" />
                </div>
                <div className="ml-2 text-xs text-blue-700">
                  For best results, try simple location formats like "City" or "City, State"
                </div>
              </div>
            </div>
            
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
            
            <Collapsible open={showUploader} onOpenChange={setShowUploader}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center w-full justify-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Upload className="h-3 w-3" />
                  {showUploader ? "Hide Custom Data Upload" : "Upload Custom Dataset"}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CSVUploader onDataUploaded={handleCustomDataUpload} />
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          {result && <PredictionResult result={result} />}
        </CardContent>
      </PredictionFormCard>
    </div>
  );
}
