
// predictionUtils.ts - Contains prediction-related functions

import { RandomForestModel } from "../models/RandomForestModel.ts";
import { RandomForestInputData } from "../types.ts";

// Create and export a singleton instance of the model
const randomForestModel = new RandomForestModel();

/**
 * Predict wildfire probability using the Random Forest model
 * Enhanced to provide more accurate predictions based on environmental data
 */
export function predictWildfireProbability(data: RandomForestInputData): number {
  // Add data validation to ensure all required fields are present
  if (!data.temperature || !data.humidity || !data.drought_index) {
    console.warn("Missing critical data for prediction. Results may be less accurate.");
  }
  
  // Pre-process prediction inputs to ensure proper ranges
  const processedData = {
    ...data,
    // Ensure temperature is in reasonable range (-50 to 60°C)
    temperature: Math.max(Math.min(data.temperature, 60), -50),
    // Ensure humidity is between 0-100%
    humidity: Math.max(Math.min(data.humidity, 100), 0),
    // Ensure drought index is between 0-100
    drought_index: Math.max(Math.min(data.drought_index, 100), 0),
    // Normalize air quality index if outside expected range
    air_quality_index: Math.max(Math.min(data.air_quality_index, 5), 1),
    // Normalize PM2.5 values if they are extreme
    pm2_5: data.pm2_5 > 1000 ? 1000 : Math.max(data.pm2_5, 0),
    // Add seasonal data for better predictions
    month: new Date().getMonth() + 1, // 1-12
    // Apply any special transformations needed for better predictions
    ndvi: data.ndvi !== undefined ? Math.max(Math.min(data.ndvi, 1), -1) : undefined,
  };
  
  // Log processed data for debugging
  console.log("Processed Random Forest input:", processedData);
  
  // Get prediction from model
  const prediction = randomForestModel.predict(processedData);
  
  // Log prediction for debugging
  console.log("Random Forest prediction result:", prediction);
  
  return prediction;
}

/**
 * Get feature importance explanation for the prediction
 */
export function explainPrediction(): Record<string, number> {
  return randomForestModel.getFeatureImportance();
}
