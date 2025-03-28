
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { PredictionData } from "@/types/prediction";
import { getPredictionData, savePrediction } from "@/services/predictionService";

// Define the CustomDataCache interface for backend use
interface CustomDataCache {
  wildfires: any[];
  co2: any[];
}

export function usePrediction() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionData | null>(null);
  const [location, setLocation] = useState<string>("");
  const [apiMode, setApiMode] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const locationParams = useLocation();
  
  // Parse URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(locationParams.search);
    const locationParam = queryParams.get("location");
    const autoSubmit = queryParams.get("autoSubmit");
    
    if (locationParam) {
      setLocation(locationParam);
      // Auto submit if the flag is present
      if (autoSubmit === "true") {
        // We need to wait for the state to update
        setTimeout(() => {
          handleSubmit(locationParam);
        }, 100);
      }
    }
  }, [locationParams.search]);

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
  };

  const handleSubmit = async (locationOverride?: string) => {
    const locationToUse = locationOverride || location;
    console.log("Submit prediction - current user:", user?.id);
    console.log("Using model: Random Forest");
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to make a prediction",
        variant: "destructive",
      });
      navigate("/signin?redirect=/predict");
      return;
    }

    if (!locationToUse) {
      toast({
        title: "Location required",
        description: "Please select a location to make a prediction",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Always use Random Forest model (useRandomForest = true)
      const predictionData = await getPredictionData(locationToUse, apiMode, true);
      setResult(predictionData);
      
      await savePrediction(user.id, predictionData);
      
      toast({
        title: "Prediction Complete",
        description: `Analysis for ${predictionData.location} has been generated using advanced Random Forest model.`,
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
          description: `Switching to simulation mode. ${errorDetails || errorMessage}`,
          variant: "destructive"
        });
        
        // Wait for state to update before calling again
        setTimeout(() => {
          handleSubmit(locationToUse);
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
    handleLocationSelect,
    handleSubmit
  };
}
