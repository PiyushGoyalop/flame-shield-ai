
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

    // Simulating API call to the ML model
    setTimeout(async () => {
      try {
        // Generate more realistic random data
        const randomProbability = (
          location.toLowerCase().includes('california') ? Math.random() * 35 + 55 : // Higher for California
          location.toLowerCase().includes('colorado') ? Math.random() * 30 + 45 : // Medium-high for Colorado
          location.toLowerCase().includes('oregon') ? Math.random() * 25 + 40 : // Medium for Oregon
          location.toLowerCase().includes('york') ? Math.random() * 15 + 10 : // Lower for New York
          location.toLowerCase().includes('florida') ? Math.random() * 20 + 30 : // Medium-low for Florida
          Math.random() * 60 + 20 // Random for other places
        );
        
        const co2Level = Math.random() * 50 + 5; // Random CO2 level between 5 and 55 MT
        const temperature = Math.random() * 30 + 5; // Random temperature between 5°C and 35°C
        const humidity = Math.random() * 60 + 20; // Random humidity between 20% and 80%
        const droughtIndex = 100 - humidity; // Simple drought index calculation
        
        const newResult = {
          location,
          probability: Math.round(randomProbability * 100) / 100,
          co2Level: Math.round(co2Level * 10) / 10,
          temperature: Math.round(temperature * 10) / 10,
          humidity: Math.round(humidity),
          droughtIndex: Math.round(droughtIndex),
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
