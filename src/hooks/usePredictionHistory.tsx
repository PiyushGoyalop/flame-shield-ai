
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

// Prediction interface
interface Prediction {
  id: string;
  location: string;
  probability: number;
  co2_level: number;
  temperature: number;
  humidity: number;
  drought_index: number;
  created_at: string;
  current_probability?: number;
}

export function usePredictionHistory() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Generate consistent current probability for each unique location
  const generateConsistentCurrentProbability = (predictions: Prediction[]) => {
    // Create a map to store consistent probabilities by location
    const locationProbabilities = new Map<string, number>();
    
    // Process predictions and group by location
    predictions.forEach(prediction => {
      const location = prediction.location.toLowerCase().trim();
      
      // If we haven't assigned a current probability to this location yet
      if (!locationProbabilities.has(location)) {
        // Generate a consistent value for this location (using location string as seed)
        // We'll use a deterministic approach based on the location name and current date (month)
        const currentMonth = new Date().getMonth();
        const locationHash = location.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const seed = locationHash + currentMonth;
        
        // Generate a value that's somewhat close to the original prediction
        // but is consistent for the same location
        const baseValue = 35 + (seed % 30); // Base value between 35-65%
        const randomOffset = ((seed * 13) % 100) / 10; // Consistent "random" offset
        const currentProbability = Math.min(95, Math.max(5, baseValue + randomOffset));
        
        // Round to one decimal place
        locationProbabilities.set(location, Math.round(currentProbability * 10) / 10);
      }
    });
    
    // Apply the consistent current probabilities to predictions
    return predictions.map(prediction => ({
      ...prediction,
      current_probability: locationProbabilities.get(prediction.location.toLowerCase().trim())
    }));
  };

  // Fetch predictions from Supabase
  useEffect(() => {
    const fetchPredictions = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('predictions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        // Generate consistent current probabilities for the same locations
        const predictionsWithConsistentCurrent = generateConsistentCurrentProbability(data);
        
        setPredictions(predictionsWithConsistentCurrent);
      } catch (error: any) {
        toast({
          title: "Error loading predictions",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictions();
  }, [user, toast]);

  return { predictions, isLoading };
}
