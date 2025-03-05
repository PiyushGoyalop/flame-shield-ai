import { useState, useEffect } from "react";
import { CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PredictionFormCard } from "./prediction/PredictionFormCard";
import { LocationSelector } from "./prediction/LocationSelector";
import { PredictionResult } from "./prediction/PredictionResult";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface HistoricData {
  total_incidents: number;
  largest_fire_acres: number;
  average_fire_size_acres: number;
  yearly_incidents: {
    year: number;
    incidents: number;
  }[];
}

interface PredictionResult {
  location: string;
  probability: number;
  co2Level: number;
  temperature: number;
  humidity: number;
  droughtIndex: number;
  latitude?: number;
  longitude?: number;
  air_quality_index?: number;
  pm2_5?: number;
  pm10?: number;
  historic_data?: HistoricData;
}

const getLocationSeed = (location: string): number => {
  let hash = 0;
  for (let i = 0; i < location.length; i++) {
    hash = ((hash << 5) - hash) + location.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) / 2147483647;
};

const getMockPredictionData = (location: string) => {
  const seed = getLocationSeed(location);
  
  const isHighRiskState = /california|arizona|nevada|colorado|oregon|washington|utah/.test(location.toLowerCase());
  const isCoastal = /beach|coast|ocean|bay|gulf|sea/.test(location.toLowerCase());
  const isForested = /forest|wood|pine|redwood|national park/.test(location.toLowerCase());
  const isUrban = /city|downtown|urban|metro/.test(location.toLowerCase());
  
  let baseProbability = 0;
  if (isHighRiskState) baseProbability += 40;
  if (isForested) baseProbability += 25;
  if (isCoastal) baseProbability -= 15;
  if (isUrban) baseProbability -= 10;
  
  const locationFactor = seed * 35;
  
  const probability = Math.min(95, Math.max(5, baseProbability + locationFactor));
  const temperature = 10 + (seed * 25);
  const humidity = isCoastal ? 50 + (seed * 30) : 20 + (seed * 40);
  const co2Level = 5 + (seed * 40) + (isUrban ? 15 : 0);
  const droughtIndex = isHighRiskState ? 80 - humidity : 60 - humidity;
  
  return {
    probability: Math.round(probability * 100) / 100,
    temperature: Math.round(temperature * 10) / 10,
    humidity: Math.round(humidity),
    co2Level: Math.round(co2Level * 10) / 10,
    droughtIndex: Math.round(Math.max(0, droughtIndex)),
    air_quality_index: Math.round(seed * 100),
    pm2_5: Math.round(seed * 10),
    pm10: Math.round(seed * 15)
  };
};

export function PredictionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [location, setLocation] = useState<string>("");
  const [apiMode, setApiMode] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
  };

  const handleSubmit = async () => {
    console.log("Submit prediction - current user:", user?.id);
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to make a prediction",
        variant: "destructive",
      });
      navigate("/signin?redirect=/predict");
      return;
    }

    if (!location) {
      toast({
        title: "Location required",
        description: "Please select a location to make a prediction",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      let predictionData;
      let historicData;
      
      if (apiMode) {
        const { data, error } = await supabase.functions.invoke('get-prediction-data', {
          body: { location }
        });
        
        if (error) {
          console.error("Error calling prediction API:", error);
          throw error;
        }
        
        if (!data) {
          throw new Error("No data returned from prediction API");
        }
        
        const { data: historicResponse, error: historicError } = await supabase.functions.invoke('get-historic-wildfire-data', {
          body: { 
            location, 
            lat: data.latitude, 
            lon: data.longitude 
          }
        });
        
        if (historicError) {
          console.error("Error calling historic wildfire data API:", historicError);
          // Continue without historic data, don't throw error
        }
        
        if (historicResponse) {
          historicData = {
            total_incidents: historicResponse.total_incidents,
            largest_fire_acres: historicResponse.largest_fire_acres,
            average_fire_size_acres: historicResponse.average_fire_size_acres,
            yearly_incidents: historicResponse.yearly_incidents.map(item => ({
              year: item.year,
              incidents: item.incidents
            }))
          };
        }
        
        predictionData = {
          location: data.location,
          probability: data.probability,
          co2Level: data.co2_level,
          temperature: data.temperature,
          humidity: data.humidity,
          droughtIndex: data.drought_index,
          latitude: data.latitude,
          longitude: data.longitude,
          air_quality_index: data.air_quality_index,
          pm2_5: data.pm2_5,
          pm10: data.pm10,
          historic_data: historicData
        };
      } else {
        const mockData = getMockPredictionData(location);
        predictionData = {
          location,
          ...mockData
        };
      }
      
      setResult(predictionData);
      
      console.log("Saving prediction to api_predictions table for user:", user.id);
      
      const insertData = {
        user_id: user.id,
        location: predictionData.location,
        latitude: predictionData.latitude,
        longitude: predictionData.longitude,
        probability: predictionData.probability,
        co2_level: predictionData.co2Level,
        temperature: predictionData.temperature,
        humidity: predictionData.humidity,
        drought_index: predictionData.droughtIndex,
        air_quality_index: predictionData.air_quality_index,
        pm2_5: predictionData.pm2_5,
        pm10: predictionData.pm10
      };
      
      const { error: insertError } = await supabase.from('api_predictions').insert(insertData);
      
      if (insertError) {
        console.error("Error saving prediction:", insertError);
        throw insertError;
      }
      
      console.log("Prediction saved successfully");
      
      toast({
        title: "Prediction Complete",
        description: `Analysis for ${predictionData.location} has been generated using ${apiMode ? 'real-time data' : 'simulation data'}.`,
      });
    } catch (error: any) {
      console.error("Error in prediction flow:", error);
      
      if (apiMode) {
        setApiMode(false);
        toast({
          title: "API Connection Issue",
          description: "Switching to simulation mode due to API issues. Your API key may be missing or invalid.",
          variant: "destructive"
        });
        
        handleSubmit();
      } else {
        toast({
          title: "Error saving prediction",
          description: error.message,
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <PredictionFormCard>
        <CardContent>
          <div className="space-y-4">
            <LocationSelector onLocationSelect={handleLocationSelect} isLoading={isLoading} />
            
            <div className="flex justify-between items-center mt-2 mb-1">
              <span className="text-sm text-muted-foreground">Data Source:</span>
              <span className={`text-xs ${apiMode ? 'text-green-600' : 'text-amber-600'} font-medium`}>
                {apiMode ? 'API (Real Data)' : 'Simulation'}
              </span>
            </div>
            
            <Button 
              onClick={handleSubmit} 
              className="w-full bg-wildfire-600 hover:bg-wildfire-700 transition-all" 
              disabled={isLoading || !location}
            >
              {isLoading ? "Analyzing..." : user ? "Predict Risk" : "Sign In to Predict"}
            </Button>
          </div>
          
          {result && <PredictionResult result={result} />}
        </CardContent>
      </PredictionFormCard>
    </div>
  );
}
