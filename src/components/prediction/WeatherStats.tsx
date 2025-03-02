
import { StatCard } from "@/components/StatCard";
import { Thermometer, Droplets, Wind } from "lucide-react";

interface WeatherStatsProps {
  result: {
    temperature: number;
    humidity: number;
    droughtIndex: number;
  };
}

export function WeatherStats({ result }: WeatherStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      <StatCard 
        title="Temperature" 
        value={`${result.temperature}°C`}
        icon={<Thermometer className="h-5 w-5 text-wildfire-500" />}
        className="border-wildfire-100 bg-white/90"
      />
      <StatCard 
        title="Humidity" 
        value={`${result.humidity}%`}
        icon={<Droplets className="h-5 w-5 text-blue-500" />}
        className="border-blue-100 bg-white/90"
      />
      <StatCard 
        title="Drought" 
        value={`${result.droughtIndex}`}
        icon={<Wind className="h-5 w-5 text-amber-500" />}
        className="border-amber-100 bg-white/90"
      />
    </div>
  );
}
