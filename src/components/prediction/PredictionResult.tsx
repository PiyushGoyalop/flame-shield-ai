
import { memo } from "react";
import { LocationDisplay } from "./LocationDisplay";
import { MainStats } from "./MainStats";
import { HistoricDataDisplay } from "./HistoricDataDisplay";
import { Precautions } from "./Precautions";
import { PredictionData } from "@/types/prediction";
import { EarthEngineDataDisplay } from "./EarthEngineDataDisplay";
import { Card, CardContent } from "@/components/ui/card";
import { RiskIndicator } from "./RiskIndicator";

// Helper function to transform data with default values
const transformPredictionData = (result: PredictionData) => {
  return {
    location: result.location || "Unknown Location",
    latitude: result.latitude || 0,
    longitude: result.longitude || 0,
    probability: result.probability || 0,
    co2Level: result.co2Level || 0,
    temperature: result.temperature || 0,
    humidity: result.humidity || 0,
    droughtIndex: result.droughtIndex || 0,
    air_quality_index: result.air_quality_index || 0,
    pm2_5: result.pm2_5 || 0,
    pm10: result.pm10 || 0
  };
};

// Memoize the component to prevent unnecessary re-renders
export const PredictionResult = memo(function PredictionResult({ 
  result 
}: { 
  result: PredictionData 
}) {
  // Safeguard against null or undefined result
  if (!result) {
    return (
      <div className="mt-8 p-4 text-center">
        <p>No prediction data available. Please try again.</p>
      </div>
    );
  }

  // Transform data to ensure compatibility with PredictionData type
  const displayData = transformPredictionData(result);

  return (
    <div className="mt-8 space-y-6">
      <Card className="border-wildfire-200">
        <CardContent className="p-4 sm:p-6">
          <LocationDisplay 
            location={displayData.location} 
            latitude={displayData.latitude} 
            longitude={displayData.longitude} 
          />
        </CardContent>
      </Card>
      
      <RiskIndicator probability={displayData.probability} />
      
      <MainStats 
        probability={displayData.probability} 
        co2Level={displayData.co2Level} 
        temperature={displayData.temperature} 
        humidity={displayData.humidity} 
        droughtIndex={displayData.droughtIndex}
        airQualityIndex={displayData.air_quality_index}
        pm2_5={displayData.pm2_5}
        pm10={displayData.pm10}
      />
      
      {(result.vegetation_index || result.land_cover) && (
        <EarthEngineDataDisplay 
          vegetationIndex={result.vegetation_index} 
          landCover={result.land_cover} 
        />
      )}
      
      {result.historic_data && (
        <HistoricDataDisplay data={result.historic_data} />
      )}
      
      <Precautions probability={displayData.probability} />
    </div>
  );
});
