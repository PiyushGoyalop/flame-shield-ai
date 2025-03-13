
// predictionUtils.ts - Contains prediction-related functions

import { RandomForestModel } from "../models/RandomForestModel.ts";
import { RandomForestInputData } from "../types.ts";

// Create and export a singleton instance of the model
const randomForestModel = new RandomForestModel();

/**
 * Predict wildfire probability using the Random Forest model
 */
export function predictWildfireProbability(data: RandomForestInputData): number {
  return randomForestModel.predict(data);
}

/**
 * Get feature importance explanation for the prediction
 */
export function explainPrediction(): Record<string, number> {
  return randomForestModel.getFeatureImportance();
}
