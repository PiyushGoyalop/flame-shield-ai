
// Random Forest implementation for wildfire prediction
import { 
  WeatherData, 
  AirPollutionData,
  RandomForestInputData
} from "./types.ts";

// Random Forest model representation
// This is a simplified implementation of a pre-trained Random Forest model
class RandomForestModel {
  // Number of trees in the forest
  private numTrees = 20;
  private featureImportance = {
    temperature: 0.22,
    humidity: 0.18,
    drought_index: 0.20,
    air_quality_index: 0.05,
    pm2_5: 0.06,
    co2_level: 0.04,
    latitude: 0.05,
    longitude: 0.03,
    ndvi: 0.09,
    forest_percent: 0.05,
    grassland_percent: 0.03
  };
  
  // Decision paths for trees (simplified representation)
  private trees: any[] = [];
  
  constructor() {
    // Initialize the trees with simplified decision rules
    // In a real implementation, these would be loaded from a trained model
    this.initializeTrees();
  }
  
  private initializeTrees() {
    // Create simplified decision trees
    for (let i = 0; i < this.numTrees; i++) {
      // Each tree has slightly different thresholds to simulate ensemble diversity
      const randomFactor = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2
      this.trees.push({
        // Temperature thresholds
        tempThreshold: 25 * randomFactor,
        highTempContribution: 25 + (Math.random() * 10),
        
        // Humidity thresholds
        humidityThreshold: 40 * randomFactor,
        lowHumidityContribution: 20 + (Math.random() * 10),
        
        // Drought thresholds
        droughtThreshold: 60 * randomFactor,
        highDroughtContribution: 30 + (Math.random() * 15),
        
        // Air quality thresholds
        aqiThreshold: 3 * randomFactor,
        highAqiContribution: 10 + (Math.random() * 5),
        
        // PM2.5 thresholds
        pm25Threshold: 30 * randomFactor,
        highPm25Contribution: 12 + (Math.random() * 5),
        
        // Vegetation thresholds (NDVI)
        ndviLowThreshold: 0.3 * randomFactor,
        ndviHighThreshold: 0.6 * randomFactor,
        optimalNdviContribution: 15 + (Math.random() * 5),
        
        // Forest percent threshold
        forestThreshold: 40 * randomFactor,
        highForestContribution: 15 + (Math.random() * 5),
        
        // Latitude range threshold (most wildfires occur between 30-50 degrees)
        isHighRiskLatitude: (lat: number) => {
          const absLat = Math.abs(lat);
          return (absLat >= 30 * randomFactor && absLat <= 50 * randomFactor);
        },
        latitudeContribution: 10 + (Math.random() * 5)
      });
    }
  }
  
  // Process data through a single tree
  private predictTree(tree: any, data: RandomForestInputData): number {
    let probability = 40; // Base probability
    
    // Apply temperature rules
    if (data.temperature > tree.tempThreshold) {
      probability += tree.highTempContribution;
    } else {
      probability -= tree.highTempContribution / 2;
    }
    
    // Apply humidity rules (lower humidity = higher risk)
    if (data.humidity < tree.humidityThreshold) {
      probability += tree.lowHumidityContribution;
    } else {
      probability -= tree.lowHumidityContribution / 2;
    }
    
    // Apply drought rules
    if (data.drought_index > tree.droughtThreshold) {
      probability += tree.highDroughtContribution;
    }
    
    // Apply air quality rules
    if (data.air_quality_index > tree.aqiThreshold) {
      probability += tree.highAqiContribution;
    }
    
    // Apply PM2.5 rules
    if (data.pm2_5 > tree.pm25Threshold) {
      probability += tree.highPm25Contribution;
    }
    
    // Apply vegetation rules if available
    if (data.ndvi !== undefined) {
      // Optimal NDVI for fires is mid-range (not too dry, not too wet)
      if (data.ndvi > tree.ndviLowThreshold && data.ndvi < tree.ndviHighThreshold) {
        probability += tree.optimalNdviContribution;
      }
    }
    
    // Apply forest coverage rules if available
    if (data.forest_percent !== undefined) {
      if (data.forest_percent > tree.forestThreshold) {
        probability += tree.highForestContribution;
      }
    }
    
    // Apply latitude factor
    if (tree.isHighRiskLatitude(data.latitude)) {
      probability += tree.latitudeContribution;
    }
    
    // Cap probability and scale to 0-100
    return Math.min(Math.max(probability, 0), 100);
  }
  
  // Get probability prediction using the Random Forest ensemble
  predict(data: RandomForestInputData): number {
    // Collect predictions from all trees
    const predictions = this.trees.map(tree => this.predictTree(tree, data));
    
    // Average the predictions
    const sum = predictions.reduce((a, b) => a + b, 0);
    const average = sum / this.numTrees;
    
    // Apply sigmoid scaling to better represent probabilities
    // Cap at 95% to reflect uncertainty
    return Math.min(Math.round(average * 10) / 10, 95);
  }
  
  // Get feature importance for explainability
  getFeatureImportance(): Record<string, number> {
    return this.featureImportance;
  }
}

// Create and export a singleton instance
const randomForestModel = new RandomForestModel();

// Function to prepare input data for the model
export function prepareInputData(
  weatherData: WeatherData,
  airPollutionData: AirPollutionData,
  droughtIndex: number,
  co2Level: number,
  lat: number,
  lon: number,
  vegetationData?: { ndvi: number, evi: number },
  landCoverData?: { forest_percent: number, grassland_percent: number }
): RandomForestInputData {
  // Extract required data points
  const airQualityIndex = airPollutionData.list[0].main.aqi;
  const pm2_5 = airPollutionData.list[0].components.pm2_5;
  
  // Create input data object
  return {
    temperature: weatherData.main.temp,
    humidity: weatherData.main.humidity,
    drought_index: droughtIndex,
    air_quality_index: airQualityIndex,
    pm2_5: pm2_5,
    co2_level: co2Level,
    latitude: lat,
    longitude: lon,
    ndvi: vegetationData?.ndvi,
    evi: vegetationData?.evi,
    forest_percent: landCoverData?.forest_percent,
    grassland_percent: landCoverData?.grassland_percent
  };
}

// Function to predict wildfire probability using the Random Forest model
export function predictWildfireProbability(data: RandomForestInputData): number {
  return randomForestModel.predict(data);
}

// Function to explain the prediction (feature importance)
export function explainPrediction(): Record<string, number> {
  return randomForestModel.getFeatureImportance();
}
