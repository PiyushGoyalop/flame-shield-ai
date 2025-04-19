
import React from 'react';
import { WildfireRiskCard } from './stats/WildfireRiskCard';
import { EnvironmentCard } from './stats/EnvironmentCard';
import { WeatherStatsCard } from './stats/WeatherStatsCard';
import { AirQualityCard } from './stats/AirQualityCard';

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
    </div>
  );
}
