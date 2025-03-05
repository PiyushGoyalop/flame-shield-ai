
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

    // Simulating API call to the ML model with deterministic output
    setTimeout(async () => {
      try {
        // Get deterministic data for the location
        const predictionData = getMockPredictionData(location);
        
        const newResult = {
          location,
          ...predictionData
        };
        
        setResult(newResult);
        
        // Store prediction in Supabase
        console.log("Saving prediction to Supabase for user:", user.id);
        const { error } = await supabase.from('predictions').insert({
          user_id: user.id,
          location: newResult.location,
          probability: newResult.probability,
          co2_level: newResult.co2Level,
          temperature: newResult.temperature,
          humidity: newResult.humidity,
          drought_index: newResult.droughtIndex
        });
        
        if (error) {
          console.error("Error saving prediction:", error);
          throw error;
        }
        
        console.log("Prediction saved successfully");
        
        // Show success toast
        toast({
          title: "Prediction Complete",
          description: `Analysis for ${location} has been generated.`,
        });
      } catch (error: any) {
        console.error("Error in prediction flow:", error);
        toast({
          title: "Error saving prediction",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <PredictionFormCard>
        <CardContent>
          <div className="space-y-4">
            <LocationSelector onLocationSelect={handleLocationSelect} isLoading={isLoading} />
            
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
