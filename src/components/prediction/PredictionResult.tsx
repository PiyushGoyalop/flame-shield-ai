
import { MapPin } from "lucide-react";
import { RiskIndicator } from "./RiskIndicator";
import { WeatherStats } from "./WeatherStats";
import { MainStats } from "./MainStats";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export interface PredictionResultProps {
  result: {
    location: string;
    probability: number;
    co2Level: number;
    temperature: number;
    humidity: number;
    droughtIndex: number;
  };
}

export function PredictionResult({ result }: PredictionResultProps) {
  return (
    <div className="mt-6 animate-fade-in">
      <div className="mb-4 text-center">
        <h3 className="font-medium text-base flex items-center justify-center gap-2">
          <MapPin className="h-4 w-4 text-wildfire-500" />
          Results for {result.location}
        </h3>
      </div>
      
      <div className="space-y-4">
        <RiskIndicator probability={result.probability} />
        
        <div className="grid grid-cols-1 gap-3">
          <MainStats result={result} />
          <WeatherStats result={result} />
        </div>
        
        {result.probability > 65 && (
          <Alert variant="destructive" className="bg-danger-50 text-danger-800 border-danger-200 animate-pulse">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>High Risk Detected</AlertTitle>
            <AlertDescription>
              This location has a high probability of wildfire occurrence. Consider taking preventive measures.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
