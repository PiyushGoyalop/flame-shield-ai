
import { Wind, Cloud } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAQIInfo } from "../utils/riskLevels";

interface AirQualityCardProps {
  airQualityIndex?: number;
  pm2_5?: number;
  pm10?: number;
}

export function AirQualityCard({ airQualityIndex, pm2_5, pm10 }: AirQualityCardProps) {
  const aqiInfo = getAQIInfo(airQualityIndex);

  return (
    <Card className="border-wildfire-100">
      <CardContent className="p-4 space-y-3">
        <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
          <Wind className="h-4 w-4 text-purple-600" />
          <span>Air Quality</span>
        </h3>
        
        {airQualityIndex && (
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 text-sm">
              <Wind className="h-4 w-4 text-purple-500" /> 
              <span>Air Quality Index</span>
            </span>
            <span className="font-semibold">
              {airQualityIndex} 
              <span className={`ml-2 text-xs ${aqiInfo.color}`}>{aqiInfo.text}</span>
              <span className="text-xs text-gray-500 ml-1 block text-right">(1-5 Scale)</span>
            </span>
          </div>
        )}
        
        {pm2_5 && (
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 text-sm">
              <Cloud className="h-4 w-4 text-indigo-500" /> 
              <span>PM2.5</span>
            </span>
            <span className="font-semibold">{pm2_5} μg/m³</span>
          </div>
        )}
        
        {pm10 && (
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 text-sm">
              <Cloud className="h-4 w-4 text-blue-500" /> 
              <span>PM10</span>
            </span>
            <span className="font-semibold">{pm10} μg/m³</span>
          </div>
        )}
        
        {!airQualityIndex && !pm2_5 && !pm10 && (
          <div className="text-center py-2 text-sm text-muted-foreground">
            No air quality data available
          </div>
        )}
      </CardContent>
    </Card>
  );
}
