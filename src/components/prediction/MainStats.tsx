
import React from 'react';
import { Leaf, Cloud, Thermometer, Droplets, AlertTriangle, Wind } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
  const formattedProbability = probability % 1 === 0 ? probability : probability.toFixed(1);
  
  const getRiskLevel = (prob: number) => {
    if (prob < 30) return { level: "Low", color: "text-green-600" };
    if (prob < 60) return { level: "Moderate", color: "text-amber-600" };
    if (prob < 80) return { level: "High", color: "text-orange-600" };
    return { level: "Severe", color: "text-red-600" };
  };
  
  const riskInfo = getRiskLevel(probability);

  // Get appropriate AQI display text and color based on OpenWeather's 1-5 scale
  const getAQIInfo = (aqi?: number) => {
    if (!aqi) return { text: "Unknown", color: "text-gray-500", value: 0 };
    
    switch(aqi) {
      case 1: 
        return { 
          text: "Good", 
          color: "text-green-600",
          value: 50 // Approx equivalent on 0-500 scale
        };
      case 2: 
        return { 
          text: "Fair", 
          color: "text-lime-600",
          value: 100
        };
      case 3: 
        return { 
          text: "Moderate", 
          color: "text-amber-600",
          value: 150
        };
      case 4: 
        return { 
          text: "Poor", 
          color: "text-orange-600",
          value: 200
        };
      case 5: 
        return { 
          text: "Very Poor", 
          color: "text-red-600",
          value: 300
        };
      default: 
        return { 
          text: "Unknown", 
          color: "text-gray-500",
          value: 0
        };
    }
  };

  const aqiInfo = getAQIInfo(airQualityIndex);

  return (
    <div className="mt-6 space-y-4">
      <Card className="border-wildfire-200 shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-full ${probability > 50 ? 'bg-red-100' : 'bg-green-100'}`}>
                <AlertTriangle className={`h-5 w-5 ${probability > 50 ? 'text-red-600' : 'text-green-600'}`} />
              </div>
              <div>
                <h3 className="text-lg font-medium">Wildfire Risk</h3>
                <p className={`text-sm ${riskInfo.color}`}>{riskInfo.level} Risk Level</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold">{formattedProbability}%</span>
              <p className="text-sm text-muted-foreground">Probability</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-wildfire-100">
          <CardContent className="p-4 space-y-3">
            <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
              <Leaf className="h-4 w-4 text-green-600" />
              <span>Environment</span>
            </h3>
            
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-sm">
                <Cloud className="h-4 w-4 text-orange-600" /> 
                <span>CO₂ Levels</span>
              </span>
              <span className="font-semibold">
                {co2Level} MT 
                <span className="text-xs text-gray-500 ml-1">(Metric Tons)</span>
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-sm">
                <Cloud className="h-4 w-4 text-orange-600" /> 
                <span>Drought Index</span>
              </span>
              <span className="font-semibold">{droughtIndex.toFixed(1)}</span>
            </div>
          </CardContent>
        </Card>
        
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
      </div>
    </div>
  );
}
