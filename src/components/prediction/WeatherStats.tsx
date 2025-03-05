
import { StatCard } from "@/components/StatCard";
import { Thermometer, Droplets, Wind, AlertTriangle, Gauge } from "lucide-react";

interface WeatherStatsProps {
  temperature: number;
  humidity: number;
  droughtIndex: number;
  pm25?: number;
  pm10?: number;
}

export function WeatherStats({ temperature, humidity, droughtIndex, pm25, pm10 }: WeatherStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
      <StatCard 
        title="Temperature" 
        value={`${temperature}°C`}
        icon={<Thermometer className="h-5 w-5 text-wildfire-500" />}
        className="border-wildfire-100 bg-white/90"
      />
      <StatCard 
        title="Humidity" 
        value={`${humidity}%`}
        icon={<Droplets className="h-5 w-5 text-wildfire-500" />}
        className="border-wildfire-100 bg-white/90"
      />
      <StatCard 
        title="Drought" 
        value={`${droughtIndex}`}
        icon={<Wind className="h-5 w-5 text-wildfire-500" />}
        className="border-wildfire-100 bg-white/90"
      />
      
      {pm25 !== undefined && (
        <StatCard 
          title="PM2.5" 
          value={`${pm25} µg/m³`}
          icon={<AlertTriangle className="h-5 w-5 text-wildfire-500" />}
          className="border-wildfire-100 bg-white/90"
        />
      )}
      
      {pm10 !== undefined && (
        <StatCard 
          title="PM10" 
          value={`${pm10} µg/m³`}
          icon={<Gauge className="h-5 w-5 text-wildfire-500" />}
          className="border-wildfire-100 bg-white/90"
        />
      )}
    </div>
  );
}
