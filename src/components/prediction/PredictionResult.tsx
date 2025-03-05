
import { Card, CardContent } from "@/components/ui/card";
import { LocationDisplay } from "./LocationDisplay";
import { MainStats } from "./MainStats";
import { RiskIndicator } from "./RiskIndicator";
import { WeatherStats } from "./WeatherStats";
import { Precautions } from "./Precautions";
import { HistoricDataDisplay } from "./HistoricDataDisplay";
import { PredictionData } from "@/types/prediction";

interface PredictionResultProps {
  result: PredictionData;
}

export function PredictionResult({ result }: PredictionResultProps) {
  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-medium">Prediction Result</h2>
      
      <LocationDisplay 
        location={result.location} 
        lat={result.latitude} 
        lon={result.longitude} 
      />
      
      <Card className="border-wildfire-200 hover:border-wildfire-300 transition-all duration-300">
        <CardContent className="p-5">
          <RiskIndicator probability={result.probability} />
          <MainStats 
            probability={result.probability} 
            co2Level={result.co2Level} 
            airQualityIndex={result.air_quality_index} 
          />
          <WeatherStats 
            temperature={result.temperature} 
            humidity={result.humidity} 
            droughtIndex={result.droughtIndex} 
            pm25={result.pm2_5} 
            pm10={result.pm10} 
          />
        </CardContent>
      </Card>
      
      {result.historic_data && (
        <HistoricDataDisplay data={result.historic_data} />
      )}
      
      <Precautions probability={result.probability} />
    </div>
  );
}
