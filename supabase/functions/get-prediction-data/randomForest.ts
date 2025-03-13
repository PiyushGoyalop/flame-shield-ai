
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
    // Create simplified decision trees with more realistic weights
    for (let i = 0; i < this.numTrees; i++) {
      // Each tree has slightly different thresholds to simulate ensemble diversity
      // Reduced randomness for more consistency with formula-based approach
      const randomFactor = 0.9 + (Math.random() * 0.2); // 0.9 to 1.1
      this.trees.push({
        // Temperature thresholds - higher temp increases risk
        tempThreshold: 25 * randomFactor, // Lower threshold to match formula approach
        highTempContribution: 18 + (Math.random() * 8),
        
        // Humidity thresholds - lower humidity increases risk
        humidityThreshold: 45 * randomFactor, // Adjusted to match formula sensitivity
        lowHumidityContribution: 16 + (Math.random() * 6),
        
        // Drought thresholds - higher drought index increases risk
        droughtThreshold: 55 * randomFactor,
        highDroughtContribution: 22 + (Math.random() * 8),
        
        // Air quality thresholds
        aqiThreshold: 3 * randomFactor,
        highAqiContribution: 7 + (Math.random() * 3),
        
        // PM2.5 thresholds
        pm25Threshold: 25 * randomFactor,
        highPm25Contribution: 8 + (Math.random() * 4),
        
        // Vegetation thresholds (NDVI)
        ndviLowThreshold: 0.3 * randomFactor,
        ndviHighThreshold: 0.6 * randomFactor,
        optimalNdviContribution: 10 + (Math.random() * 4),
        
        // Forest percent threshold
        forestThreshold: 40 * randomFactor,
        highForestContribution: 10 + (Math.random() * 4),
        
        // Latitude range threshold (most wildfires occur between 30-50 degrees)
        isHighRiskLatitude: (lat: number) => {
          const absLat = Math.abs(lat);
          return (absLat >= 30 * randomFactor && absLat <= 50 * randomFactor);
        },
        latitudeContribution: 7 + (Math.random() * 3)
      });
    }
  }
  
  // Process data through a single tree
  private predictTree(tree: any, data: RandomForestInputData): number {
    // Starting with a base probability aligned with formula-based approach
    let probability = 20; 
    
    // Apply temperature rules with adjusted weight
    if (data.temperature > tree.tempThreshold) {
      probability += tree.highTempContribution * (data.temperature / tree.tempThreshold) * 0.6;
    } else {
      probability += (tree.highTempContribution / 3) * (data.temperature / tree.tempThreshold);
    }
    
    // Apply humidity rules (lower humidity = higher risk) with adjusted weight
    if (data.humidity < tree.humidityThreshold) {
      probability += tree.lowHumidityContribution * ((tree.humidityThreshold - data.humidity) / tree.humidityThreshold) * 0.6;
    } else {
      probability -= (tree.lowHumidityContribution / 3) * (data.humidity / 100);
    }
    
    // Apply drought rules with more granular approach
    if (data.drought_index > tree.droughtThreshold) {
      probability += tree.highDroughtContribution * (data.drought_index / 100) * 0.7;
    } else {
      probability += (tree.highDroughtContribution / 4) * (data.drought_index / 100);
    }
    
    // Apply air quality rules with scaled impact
    if (data.air_quality_index > tree.aqiThreshold) {
      probability += tree.highAqiContribution * (data.air_quality_index / 5) * 0.5;
    }
    
    // Apply PM2.5 rules with scaled impact
    if (data.pm2_5 > tree.pm25Threshold) {
      probability += tree.highPm25Contribution * (Math.min(data.pm2_5, 100) / 100) * 0.5;
    }
    
    // Apply vegetation rules if available with improved scaling
    if (data.ndvi !== undefined) {
      // Optimal NDVI for fires is mid-range (not too dry, not too wet)
      if (data.ndvi > tree.ndviLowThreshold && data.ndvi < tree.ndviHighThreshold) {
        probability += tree.optimalNdviContribution * 0.8;
      } else if (data.ndvi <= tree.ndviLowThreshold) {
        // Very dry areas have moderate risk
        probability += (tree.optimalNdviContribution * 0.4);
      } else {
        // Very wet areas have low risk
        probability += (tree.optimalNdviContribution * 0.2);
      }
    }
    
    // Apply forest coverage rules if available
    if (data.forest_percent !== undefined) {
      probability += (tree.highForestContribution * (data.forest_percent / 100) * 0.6);
    }
    
    // Apply grassland coverage if available
    if (data.grassland_percent !== undefined) {
      probability += ((tree.highForestContribution * 0.7) * (data.grassland_percent / 100) * 0.5);
    }
    
    // Apply latitude factor more precisely
    if (tree.isHighRiskLatitude(data.latitude)) {
      probability += tree.latitudeContribution * 0.6;
    }
    
    // Cap and scale the probability to match formula-based approach
    return Math.min(Math.max(probability, 0), 95);
  }
  
  // Get probability prediction using the Random Forest ensemble
  predict(data: RandomForestInputData): number {
    // Collect predictions from all trees
    const predictions = this.trees.map(tree => this.predictTree(tree, data));
    
    // Average the predictions
    const sum = predictions.reduce((a, b) => a + b, 0);
    const average = sum / this.numTrees;
    
    // Apply formula-based scaling to maintain consistency
    // Formula model tends to give values in a similar range to our random forest now
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
