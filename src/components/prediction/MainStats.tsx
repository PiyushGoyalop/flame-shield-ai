
import { Leaf, Cloud, Thermometer, Droplets } from "lucide-react";

interface MainStatsProps {
  probability: number;
  co2Level: number;
  temperature: number;
  humidity: number;
  droughtIndex: number;
  airQualityIndex?: number;
  pm2_5?: number;
  pm10?: number;
}

export function MainStats({ 
  probability, 
  co2Level, 
  temperature, 
  humidity, 
  droughtIndex, 
  airQualityIndex, 
  pm2_5, 
  pm10 
}: MainStatsProps) {
  // Format probability to display with one decimal place when not a whole number
  const formattedProbability = probability % 1 === 0 ? probability : probability.toFixed(1);

  return (
    <div className="p-4 bg-white/60 rounded-lg hover:bg-white/80 transition-colors shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium flex items-center gap-1">
          <Leaf className="h-3 w-3 text-wildfire-600" /> Wildfire Probability:
        </span>
        <span className="font-bold">{formattedProbability}%</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium flex items-center gap-1">
          <Cloud className="h-3 w-3 text-wildfire-600" /> CO₂ Levels:
        </span>
        <span>{co2Level} MT</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium flex items-center gap-1">
          <Thermometer className="h-3 w-3 text-wildfire-600" /> Temperature:
        </span>
        <span>{temperature}°C</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium flex items-center gap-1">
          <Droplets className="h-3 w-3 text-wildfire-600" /> Humidity:
        </span>
        <span>{humidity}%</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium flex items-center gap-1">
          <Cloud className="h-3 w-3 text-orange-600" /> Drought Index:
        </span>
        <span>{droughtIndex.toFixed(1)}</span>
      </div>
      {airQualityIndex && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium flex items-center gap-1">
            <Cloud className="h-3 w-3 text-wildfire-600" /> Air Quality:
          </span>
          <span>{airQualityIndex} AQI</span>
        </div>
      )}
      {(pm2_5 || pm10) && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium flex items-center gap-1">
            <Cloud className="h-3 w-3 text-wildfire-600" /> Particulate Matter:
          </span>
          <span>
            {pm2_5 && `PM2.5: ${pm2_5}`}
            {pm2_5 && pm10 && ' | '}
            {pm10 && `PM10: ${pm10}`}
          </span>
        </div>
      )}
    </div>
  );
}
