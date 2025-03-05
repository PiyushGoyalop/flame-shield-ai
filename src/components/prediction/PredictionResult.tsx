
import { MapPin, ExternalLink } from "lucide-react";
import { RiskIndicator } from "./RiskIndicator";
import { WeatherStats } from "./WeatherStats";
import { MainStats } from "./MainStats";
import { Precautions } from "./Precautions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Globe, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PredictionResultProps {
  result: {
    location: string;
    probability: number;
    co2Level: number;
    temperature: number;
    humidity: number;
    droughtIndex: number;
    latitude?: number;
    longitude?: number;
    air_quality_index?: number;
    pm2_5?: number;
    pm10?: number;
  };
}

export function PredictionResult({ result }: PredictionResultProps) {
  // Determine risk level for precautions
  const getRiskLevel = () => {
    if (result.probability < 33) return 'low';
    if (result.probability < 66) return 'moderate';
    return 'high';
  };
  
  // Generate Google Maps URL using coordinates if available
  const getMapUrl = () => {
    if (result.latitude && result.longitude) {
      return `https://maps.google.com/maps?q=${result.latitude},${result.longitude}&z=15&output=embed`;
    }
    return null;
  };
  
  // Open map in new tab
  const openMap = () => {
    if (result.latitude && result.longitude) {
      window.open(`https://maps.google.com/maps?q=${result.latitude},${result.longitude}&z=15`, '_blank');
    }
  };
  
  // Get AQI description based on the value (1-5 scale from OpenWeatherMap)
  const getAQIDescription = () => {
    if (!result.air_quality_index) return null;
    
    switch(result.air_quality_index) {
      case 1: return "Good";
      case 2: return "Fair";
      case 3: return "Moderate";
      case 4: return "Poor";
      case 5: return "Very Poor";
      default: return "Unknown";
    }
  };

  return (
    <div className="mt-6 animate-fade-in">
      <div className="mb-4 text-center">
        <h3 className="font-medium text-base flex items-center justify-center gap-2">
          <MapPin className="h-4 w-4 text-wildfire-500" />
          Results for {result.location}
        </h3>
        
        {result.latitude && result.longitude && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
              <Globe className="h-3 w-3" />
              {result.latitude.toFixed(4)}, {result.longitude.toFixed(4)}
            </p>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs flex items-center gap-1 mt-1 h-7 px-2"
              onClick={openMap}
            >
              <Globe className="h-3 w-3" />
              View on Map
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <RiskIndicator probability={result.probability} />
        
        <div className="grid grid-cols-1 gap-3">
          <MainStats result={result} />
          <WeatherStats result={result} />
          
          {result.air_quality_index && (
            <div className="p-4 bg-white/60 rounded-lg hover:bg-white/80 transition-colors shadow-sm">
              <h4 className="text-sm font-medium mb-2">Air Quality Data</h4>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AQI Status:</span>
                  <span className={`font-medium ${
                    result.air_quality_index <= 2 ? 'text-green-600' : 
                    result.air_quality_index <= 3 ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {getAQIDescription()}
                  </span>
                </div>
                
                {result.pm2_5 !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">PM2.5:</span>
                    <span>{result.pm2_5.toFixed(1)} μg/m³</span>
                  </div>
                )}
                
                {result.pm10 !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">PM10:</span>
                    <span>{result.pm10.toFixed(1)} μg/m³</span>
                  </div>
                )}
                
                <div className="flex justify-between col-span-2 mt-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Wind className="h-3 w-3" /> Air quality affects wildfire risk and smoke dispersion
                  </span>
                </div>
              </div>
            </div>
          )}
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
        
        <Precautions riskLevel={getRiskLevel()} />
      </div>
    </div>
  );
}
