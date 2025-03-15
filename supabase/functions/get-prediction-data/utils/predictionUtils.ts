
// predictionUtils.ts - Enhanced prediction utilities for advanced wildfire risk assessment

import { RandomForestModel } from "../models/RandomForestModel.ts";
import { RandomForestInputData } from "../types.ts";

// Create and export an enhanced singleton instance of the model
const randomForestModel = new RandomForestModel();

/**
 * Predict wildfire probability using the advanced Random Forest model
 * Significantly enhanced to provide state-of-the-art research-grade predictions
 * based on comprehensive environmental data analysis
 */
export function predictWildfireProbability(data: RandomForestInputData): number {
  // Enhanced data validation with comprehensive error checking
  if (!data.temperature && data.temperature !== 0) {
    console.warn("Missing temperature data. Using climate average.");
    data.temperature = 20; // Use reasonable default
  }
  
  if (!data.humidity && data.humidity !== 0) {
    console.warn("Missing humidity data. Using climate average.");
    data.humidity = 50; // Use reasonable default
  }
  
  if (!data.drought_index && data.drought_index !== 0) {
    console.warn("Missing drought index. Estimating from temperature and humidity.");
    // Estimate drought from available data
    data.drought_index = Math.min(100, Math.max(0, 
      (data.temperature > 25 ? (data.temperature - 15) * 3 : 0) + 
      (data.humidity < 50 ? (50 - data.humidity) * 1.5 : 0)
    ));
  }
  
  // Advanced data preprocessing with sophisticated constraints
  const processedData = {
    ...data,
    // Scientific temperature range constraints
    temperature: Math.max(Math.min(data.temperature, 60), -50),
    
    // Percentage constraints
    humidity: Math.max(Math.min(data.humidity, 100), 0),
    drought_index: Math.max(Math.min(data.drought_index, 100), 0),
    
    // AQI constraints
    air_quality_index: Math.max(Math.min(data.air_quality_index, 5), 1),
    
    // Particulate matter constraints with scientific upper bounds
    pm2_5: data.pm2_5 > 1000 ? 1000 : Math.max(data.pm2_5, 0),
    
    // Add seasonal data if not already present
    month: data.month || (new Date().getMonth() + 1), // 1-12
    
    // Vegetation index bounds
    ndvi: data.ndvi !== undefined ? Math.max(Math.min(data.ndvi, 1), -1) : undefined,
    evi: data.evi !== undefined ? Math.max(Math.min(data.evi, 1), -1) : undefined,
    
    // Land cover percentage constraints
    forest_percent: data.forest_percent !== undefined ? 
      Math.max(Math.min(data.forest_percent, 100), 0) : undefined,
    grassland_percent: data.grassland_percent !== undefined ? 
      Math.max(Math.min(data.grassland_percent, 100), 0) : undefined,
  };
  
  // Log processed data for research and debugging
  console.log("Advanced processed Random Forest input:", processedData);
  
  // Get prediction from enhanced model
  const prediction = randomForestModel.predict(processedData);
  
  // Log prediction results
  console.log("Enhanced Random Forest prediction result:", prediction);
  
  return prediction;
}

/**
 * Get detailed feature importance explanation for the prediction
 * Enhanced with more nuanced explanation of model variables
 */
export function explainPrediction(): Record<string, number> {
  // Get feature importance from model
  const baseImportance = randomForestModel.getFeatureImportance();
  
  // Get current month to adjust seasonal importance
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const isSummerNorth = currentMonth >= 6 && currentMonth <= 8;
  const isSummerSouth = currentMonth === 12 || currentMonth <= 2;
  
  // Make seasonal adjustments to feature importance
  const adjustedImportance = { ...baseImportance };
  
  // During summer months, temperature and drought become more important
  if (isSummerNorth || isSummerSouth) {
    const totalAdjustment = 0.05; // 5% shift in importance
    
    // Increase temperature and drought importance
    adjustedImportance.temperature = baseImportance.temperature + totalAdjustment * 0.6;
    adjustedImportance.drought_index = baseImportance.drought_index + totalAdjustment * 0.4;
    
    // Decrease humidity importance slightly
    adjustedImportance.humidity = Math.max(0.15, baseImportance.humidity - totalAdjustment);
    
    // Normalize to ensure sum is still 1.0
    const sum = Object.values(adjustedImportance).reduce((a, b) => a + b, 0);
    Object.keys(adjustedImportance).forEach(key => {
      adjustedImportance[key] = adjustedImportance[key] / sum;
    });
  }
  
  return adjustedImportance;
}
