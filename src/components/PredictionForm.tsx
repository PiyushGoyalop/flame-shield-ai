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

interface PredictionResult {
  location: string;
  probability: number;
  co2Level: number;
  temperature: number;
  humidity: number;
  droughtIndex: number;
  latitude?: number;
  longitude?: number;
}

// Deterministic "seed" function that generates consistent numbers for same locations
const getLocationSeed = (location: string): number => {
  // Convert string to a simple numeric hash
  let hash = 0;
  for (let i = 0; i < location.length; i++) {
    hash = ((hash << 5) - hash) + location.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) / 2147483647; // Normalize between 0 and 1
};

// Location-based mock data generator
const getMockPredictionData = (location: string) => {
  const seed = getLocationSeed(location);
  
  // Use location characteristics for more realistic values
  const isHighRiskState = /california|arizona|nevada|colorado|oregon|washington|utah/.test(location.toLowerCase());
  const isCoastal = /beach|coast|ocean|bay|gulf|sea/.test(location.toLowerCase());
  const isForested = /forest|wood|pine|redwood|national park/.test(location.toLowerCase());
  const isUrban = /city|downtown|urban|metro/.test(location.toLowerCase());
  
  // Base probability factors
  let baseProbability = 0;
  if (isHighRiskState) baseProbability += 40;
  if (isForested) baseProbability += 25;
  if (isCoastal) baseProbability -= 15;
  if (isUrban) baseProbability -= 10;
  
  // Deterministic location-based randomization
  const locationFactor = seed * 35; // Scale from 0-35
  
  // Calculate prediction values
  const probability = Math.min(95, Math.max(5, baseProbability + locationFactor));
  const temperature = 10 + (seed * 25); // Between 10°C and 35°C
  const humidity = isCoastal ? 50 + (seed * 30) : 20 + (seed * 40); // Higher humidity for coastal areas
  const co2Level = 5 + (seed * 40) + (isUrban ? 15 : 0); // Higher CO2 for urban areas
  const droughtIndex = isHighRiskState ? 80 - humidity : 60 - humidity;
  
  return {
    probability: Math.round(probability * 100) / 100,
    temperature: Math.round(temperature * 10) / 10,
    humidity: Math.round(humidity),
    co2Level: Math.round(co2Level * 10) / 10,
    droughtIndex: Math.round(Math.max(0, droughtIndex)),
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
    
    // If user is not authenticated, redirect to sign in
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
      
      if (apiMode) {
        // Call the Supabase Edge Function
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
        
        predictionData = {
          location: data.location,
          probability: data.probability,
          co2Level: data.co2_level,
          temperature: data.temperature,
          humidity: data.humidity,
          droughtIndex: data.drought_index,
          latitude: data.latitude,
          longitude: data.longitude
        };
      } else {
        // Fallback to mock data if API is disabled
        const mockData = getMockPredictionData(location);
        predictionData = {
          location,
          ...mockData
        };
      }
      
      setResult(predictionData);
      
      // Store prediction in Supabase
      console.log("Saving prediction to api_predictions table for user:", user.id);
      const { error: insertError } = await supabase.from('api_predictions').insert({
        user_id: user.id,
        location: predictionData.location,
        latitude: predictionData.latitude,
        longitude: predictionData.longitude,
        probability: predictionData.probability,
        co2_level: predictionData.co2Level,
        temperature: predictionData.temperature,
        humidity: predictionData.humidity,
        drought_index: predictionData.droughtIndex
      });
      
      if (insertError) {
        console.error("Error saving prediction:", insertError);
        throw insertError;
      }
      
      console.log("Prediction saved successfully");
      
      // Show success toast
      toast({
        title: "Prediction Complete",
        description: `Analysis for ${predictionData.location} has been generated using ${apiMode ? 'real-time data' : 'simulation data'}.`,
      });
    } catch (error: any) {
      console.error("Error in prediction flow:", error);
      
      // Switch to mock data mode if API fails
      if (apiMode) {
        setApiMode(false);
        toast({
          title: "API Connection Issue",
          description: "Switching to simulation mode due to API issues. Your API key may be missing or invalid.",
          variant: "destructive"
        });
        
        // Retry with mock data
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
