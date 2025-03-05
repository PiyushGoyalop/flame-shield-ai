
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

  // Simulate current probability for demonstration
  const simulateCurrentProbability = (originalProbability: number) => {
    const change = (Math.random() - 0.5) * 15; // Random change between -7.5% and +7.5%
    const newProbability = Math.max(0, Math.min(100, originalProbability + change));
    return Math.round(newProbability * 10) / 10;
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
        
        // Simulate current probability for demonstration purposes
        const predictionsWithCurrent = data.map(prediction => ({
          ...prediction,
          current_probability: simulateCurrentProbability(prediction.probability)
        }));
        
        setPredictions(predictionsWithCurrent);
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
