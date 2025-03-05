import { LocationDisplay } from "./LocationDisplay";
import { MainStats } from "./MainStats";
import { HistoricDataDisplay } from "./HistoricDataDisplay";
import { Precautions } from "./Precautions";
import { PredictionData } from "@/types/prediction";
import { EarthEngineDataDisplay } from "./EarthEngineDataDisplay";

export function PredictionResult({ result }: { result: PredictionData }) {
  return (
    <div className="mt-8">
      <LocationDisplay location={result.location} latitude={result.latitude} longitude={result.longitude} />
      <MainStats 
        probability={result.probability} 
        co2Level={result.co2Level} 
        temperature={result.temperature} 
        humidity={result.humidity} 
        droughtIndex={result.droughtIndex}
        airQualityIndex={result.air_quality_index}
        pm2_5={result.pm2_5}
        pm10={result.pm10}
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
      
      <Precautions probability={result.probability} />
    </div>
  );
}
