
import { Thermometer, Droplets, Cloud } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WeatherStatsCardProps {
  temperature: number;
  humidity: number;
}

export function WeatherStatsCard({ temperature, humidity }: WeatherStatsCardProps) {
  return (
    <Card className="border-wildfire-100">
      <CardContent className="p-4 space-y-3">
        <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
          <Cloud className="h-4 w-4 text-blue-600" />
          <span>Weather</span>
        </h3>
        
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2 text-sm">
            <Thermometer className="h-4 w-4 text-red-500" /> 
            <span>Temperature</span>
          </span>
          <span className="font-semibold">{temperature}°C</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2 text-sm">
            <Droplets className="h-4 w-4 text-blue-500" /> 
            <span>Humidity</span>
          </span>
          <span className="font-semibold">{humidity}%</span>
        </div>
      </CardContent>
    </Card>
  );
}
