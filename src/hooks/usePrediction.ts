
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { PredictionData } from "@/types/prediction";
import { getPredictionData, savePrediction } from "@/services/predictionService";

// Define the CustomDataCache interface
interface CustomDataCache {
  wildfires: any[];
  co2: any[];
}

// Cache for custom uploaded data
const customDataCache: CustomDataCache = {
  wildfires: [],
  co2: []
};

export function usePrediction() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionData | null>(null);
  const [location, setLocation] = useState<string>("");
  const [apiMode, setApiMode] = useState<boolean>(true);
  const [usingCustomData, setUsingCustomData] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
  };

  const handleCustomDataUpload = (data: any[], type: "wildfires" | "co2") => {
    customDataCache[type] = data;
    setUsingCustomData(true);
    
    if (apiMode) {
      setApiMode(false);
      toast({
        title: "Switched to Simulation Mode",
        description: "Using your custom data for predictions",
      });
    }
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
      const predictionData = await getPredictionData(location, apiMode, usingCustomData ? customDataCache : undefined);
      setResult(predictionData);
      
      await savePrediction(user.id, predictionData);
      
      toast({
        title: "Prediction Complete",
        description: `Analysis for ${predictionData.location} has been generated using ${
          apiMode ? 'real-time data' : (usingCustomData ? 'your custom dataset' : 'simulation data')
        }.`,
      });
    } catch (error: any) {
      console.error("Error in prediction flow:", error);
      
      // Check if there are specific details in the error
      const errorDetails = error.error?.details || error.details || error.message;
      const errorMessage = error.error?.message || error.message || "Unknown error";
      
      if (apiMode) {
        setApiMode(false);
        toast({
          title: "API Connection Issue",
          description: `Switching to simulation mode due to API issues. ${errorDetails || errorMessage}`,
          variant: "destructive"
        });
        
        // Wait for state to update before calling again
        setTimeout(() => {
          handleSubmit();
        }, 100);
      } else {
        toast({
          title: "Error processing prediction",
          description: errorDetails || errorMessage,
          variant: "destructive"
        });
        setIsLoading(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    result,
    location,
    apiMode,
    handleLocationSelect,
    handleSubmit,
    handleCustomDataUpload
  };
}
