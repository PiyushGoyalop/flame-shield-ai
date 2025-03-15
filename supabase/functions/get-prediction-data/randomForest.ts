
// randomForest.ts - Main entry point for Random Forest functionality

import { 
  WeatherData, 
  AirPollutionData,
  RandomForestInputData
} from "./types.ts";

import { prepareInputData } from "./utils/dataPreparation.ts";
import { 
  predictWildfireProbability as predict,
  explainPrediction as explain
} from "./utils/predictionUtils.ts";

// Export the functions with the same names as before to maintain compatibility
export { prepareInputData };
export const predictWildfireProbability = predict;
export const explainPrediction = explain;
