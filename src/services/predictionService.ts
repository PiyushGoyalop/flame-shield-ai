
import { supabase } from "@/integrations/supabase/client";
import { PredictionData } from "@/types/prediction";
import { getMockPredictionData } from "@/utils/mockDataGenerator";

export async function getPredictionData(
  location: string, 
  apiMode: boolean,
  useRandomForest: boolean = false
): Promise<PredictionData> {
  if (!apiMode) {
    console.log("Using mock data for location:", location);
    const mockData = await getMockPredictionData(location);
    return {
      location,
      model_type: useRandomForest ? "random_forest" : "formula_based",
      ...mockData
    };
  }
  
  // Call the Supabase function to get prediction data
  const { data, error } = await supabase.functions.invoke('get-prediction-data', {
    body: { 
      location,
      useRandomForest 
    }
  });
  
  if (error) {
    console.error("Error calling prediction API:", error);
    throw error;
  }
  
  if (!data) {
    throw new Error("No data returned from prediction API");
  }
  
  // Log the successful prediction API call
  console.log("Prediction API response:", data);
  
  // Get historical data
  let historicData;
  try {
    const { data: historicResponse, error: historicError } = await supabase.functions.invoke('get-historic-wildfire-data', {
      body: { 
        location, 
        lat: data.latitude, 
        lon: data.longitude 
      }
    });
    
    if (historicError) {
      console.error("Error calling historic wildfire data API:", historicError);
    } else {
      console.log("Historical data API response:", historicResponse);
      
      if (historicResponse) {
        historicData = {
          total_incidents: historicResponse.total_incidents,
          largest_fire_acres: historicResponse.largest_fire_acres,
          average_fire_size_acres: historicResponse.average_fire_size_acres,
          yearly_incidents: historicResponse.yearly_incidents,
          severity_distribution: historicResponse.severity_distribution,
          causes: historicResponse.causes
        };
      }
    }
  } catch (err) {
    console.error("Failed to fetch historical data:", err);
  }
  
  // Get Earth Engine vegetation and land cover data
  let vegetationIndex, landCover;
  try {
    if (data.latitude && data.longitude) {
      const { data: earthEngineResponse, error: earthEngineError } = await supabase.functions.invoke('get-earth-engine-data', {
        body: { 
          latitude: data.latitude, 
          longitude: data.longitude 
        }
      });
      
      if (earthEngineError) {
        console.error("Error calling Earth Engine API:", earthEngineError);
      } else {
        console.log("Earth Engine API response:", earthEngineResponse);
        
        if (earthEngineResponse) {
          vegetationIndex = earthEngineResponse.vegetation_index;
          landCover = earthEngineResponse.land_cover;
        }
      }
    }
  } catch (err) {
    console.error("Failed to fetch Earth Engine data:", err);
  }
  
  return {
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
    historic_data: historicData,
    vegetation_index: vegetationIndex,
    land_cover: landCover,
    model_type: data.model_type,
    feature_importance: data.feature_importance
  };
}

export async function savePrediction(userId: string, predictionData: PredictionData): Promise<void> {
  console.log("Saving prediction data:", predictionData);
  console.log("User ID:", userId);
  
  try {
    // First save to the legacy predictions table for backward compatibility
    const legacyInsertData = {
      user_id: userId,
      location: predictionData.location,
      probability: predictionData.probability,
      co2_level: predictionData.co2Level || 0,
      temperature: predictionData.temperature || 0,
      humidity: predictionData.humidity || 0,
      drought_index: predictionData.droughtIndex || 0
    };
    
    const { error: legacyError } = await supabase.from('predictions').insert(legacyInsertData);
    
    if (legacyError) {
      console.error("Error saving to legacy predictions table:", legacyError);
    } else {
      console.log("Successfully saved to legacy predictions table");
    }
    
    // Then save to the more comprehensive api_predictions table, excluding the model_type field
    // if it's causing errors
    const insertData = {
      user_id: userId,
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
      pm10: predictionData.pm10,
      vegetation_ndvi: predictionData.vegetation_index?.ndvi,
      vegetation_evi: predictionData.vegetation_index?.evi,
      forest_percent: predictionData.land_cover?.forest_percent,
      grassland_percent: predictionData.land_cover?.grassland_percent,
      urban_percent: predictionData.land_cover?.urban_percent,
      water_percent: predictionData.land_cover?.water_percent,
      barren_percent: predictionData.land_cover?.barren_percent
      // Removed model_type field as it doesn't exist in the database schema
    };
    
    const { error: insertError } = await supabase.from('api_predictions').insert(insertData);
    
    if (insertError) {
      console.error("Error saving to api_predictions:", insertError);
      throw insertError;
    }
    
    console.log("Prediction saved successfully to both tables");
  } catch (error) {
    console.error("Error in savePrediction function:", error);
    throw error;
  }
}
