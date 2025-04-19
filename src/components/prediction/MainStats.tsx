
import React from 'react';
import { WildfireRiskCard } from './stats/WildfireRiskCard';
import { EnvironmentCard } from './stats/EnvironmentCard';
import { WeatherStatsCard } from './stats/WeatherStatsCard';
import { AirQualityCard } from './stats/AirQualityCard';
import { AlertCircle } from 'lucide-react';

interface MainStatsProps {
  probability: number;
  co2Level: number;
  temperature: number;
  humidity: number;
  droughtIndex: number;
  airQualityIndex?: number;
  pm2_5?: number;
  pm10?: number;
  dataSource?: string; // Add data source information
}

export function MainStats({ 
  probability, 
  co2Level, 
  temperature, 
  humidity, 
  droughtIndex, 
  airQualityIndex, 
  pm2_5, 
  pm10,
  dataSource 
}: MainStatsProps) {
  return (
    <div className="mt-6 space-y-4">
      <WildfireRiskCard probability={probability} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <EnvironmentCard co2Level={co2Level} droughtIndex={droughtIndex} />
        <WeatherStatsCard temperature={temperature} humidity={humidity} />
        <AirQualityCard 
          airQualityIndex={airQualityIndex}
          pm2_5={pm2_5}
          pm10={pm10}
        />
      </div>
      
      {dataSource === 'mock_fallback' && (
        <div className="p-2 bg-yellow-50 border border-yellow-200 rounded-md text-xs text-yellow-700 flex items-center space-x-2">
          <AlertCircle className="h-4 w-4" />
          <span>Using simulated Earth Engine data. The Google Earth Engine API connection may need attention.</span>
        </div>
      )}
    </div>
  );
}
