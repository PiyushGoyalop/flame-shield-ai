
import { 
  RequestBody, 
  PredictionData, 
  WeatherData, 
  AirPollutionData 
} from "./types.ts";
import { 
  logApiKey,
  convertCOToCO2Equivalent,
  calculateDroughtIndex,
  calculateWildfireProbability,
  OPENWEATHER_API_KEY
} from "./utils.ts";
import { corsHeaders } from "../shared/cors.ts";
import {
  prepareInputData,
  predictWildfireProbability,
  explainPrediction
} from "./randomForest.ts";
import { 
  getCoordinates, 
  getWeatherData, 
  getAirPollutionData 
} from "./api.ts";

// Main request handler
export async function handleRequest(req: Request): Promise<Response> {
  try {
    const { location, useRandomForest = true } = await req.json() as RequestBody;
    
    if (!location || location.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Location is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Log the location received for debugging
    console.log(`Processing prediction request for location: "${location}" using Random Forest model`);
    
    // Check if API key is available
    if (!OPENWEATHER_API_KEY) {
      return new Response(
        JSON.stringify({ error: "OpenWeather API key is not configured" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Log the API key (masked for security)
    logApiKey();
    
    try {
      // Get coordinates for the location
      const { lat, lon } = await getCoordinates(location);
      console.log(`Coordinates for ${location}: lat=${lat}, lon=${lon}`);
      
      // Get weather data
      const weatherData = await getWeatherData(lat, lon);
      console.log(`Weather data received for ${location}`);
      
      // Get air pollution data
      const airPollutionData = await getAirPollutionData(lat, lon);
      console.log(`Air pollution data received for ${location}`);
      
      // Generate mock vegetation data and land cover data
      const vegetationData = generateMockVegetationData(lat, lon);
      const landCoverData = generateMockLandCoverData(lat, lon);
      
      // Always use the Random Forest model (ignoring useRandomForest parameter)
      const predictionData = generateRandomForestPrediction(
        location, 
        weatherData, 
        airPollutionData, 
        lat, 
        lon, 
        vegetationData, 
        landCoverData
      );
      
      console.log(`Prediction completed for ${location}: probability=${predictionData.probability}% using ${predictionData.model_type} model`);
      
      return new Response(
        JSON.stringify(predictionData),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    } catch (error) {
      // More specific error for geocoding failures
      if (error.message.includes("geocoding") || error.message.includes("location")) {
        console.error("Location error:", error.message);
        return new Response(
          JSON.stringify({ 
            error: error.message,
            details: "Try using a simpler location format like 'City' or 'City, State'"
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      // General API errors
      console.error("API error:", error);
      return new Response(
        JSON.stringify({ 
          error: "Error processing weather data. Please try again with a different location.",
          details: error.message
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
  } catch (error) {
    console.error("Unexpected error processing prediction:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Unexpected error processing prediction", 
        details: error.message || "An unknown error occurred"
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
}

// Generate mock vegetation data
function generateMockVegetationData(lat: number, lon: number) {
  // Create location-specific seed for consistent results
  const locationSeed = Math.abs(Math.sin(lat * lon)) * 0.7;
  
  // Adjust values based on latitude (assuming more vegetation in temperate zones)
  const isTemperateZone = Math.abs(lat) > 20 && Math.abs(lat) < 60;
  const isEquatorial = Math.abs(lat) < 20;
  
  // Base vegetation values
  let ndviBase = isTemperateZone ? 0.6 : isEquatorial ? 0.8 : 0.3;
  let eviBase = isTemperateZone ? 0.5 : isEquatorial ? 0.7 : 0.2;
  
  // Adjust for randomness
  const ndvi = Math.min(1, Math.max(0, ndviBase + (locationSeed * 0.4 - 0.2)));
  const evi = Math.min(1, Math.max(0, eviBase + (locationSeed * 0.4 - 0.2)));
  
  return {
    ndvi: parseFloat(ndvi.toFixed(2)),
    evi: parseFloat(evi.toFixed(2)),
    data_source: 'mock_data',
    request_timestamp: new Date().toISOString()
  };
}

// Generate mock land cover data
function generateMockLandCoverData(lat: number, lon: number) {
  // Create location-specific seed for consistent results
  const locationSeed = Math.abs(Math.sin(lat * lon)) * 0.7;
  
  // Adjust values based on latitude
  const isTemperateZone = Math.abs(lat) > 20 && Math.abs(lat) < 60;
  const isEquatorial = Math.abs(lat) < 20;
  const isPolar = Math.abs(lat) > 60;
  
  // Land cover percentages
  let forest = isTemperateZone ? 40 : isEquatorial ? 60 : 10;
  let grassland = isTemperateZone ? 30 : isEquatorial ? 20 : 20;
  let urban = 15;
  let water = 10;
  let barren = isPolar ? 50 : 5;
  
  // Adjust based on location seed
  forest = Math.min(100, Math.max(0, forest + (locationSeed * 30 - 15)));
  grassland = Math.min(100, Math.max(0, grassland + (locationSeed * 20 - 10)));
  urban = Math.min(100, Math.max(0, urban + (locationSeed * 15 - 7.5)));
  water = Math.min(100, Math.max(0, water + (locationSeed * 10 - 5)));
  barren = Math.min(100, Math.max(0, barren + (locationSeed * 20 - 10)));
  
  // Normalize to ensure total is 100%
  const total = forest + grassland + urban + water + barren;
  
  return {
    forest_percent: Math.round((forest / total) * 100),
    grassland_percent: Math.round((grassland / total) * 100),
    urban_percent: Math.round((urban / total) * 100),
    water_percent: Math.round((water / total) * 100),
    barren_percent: Math.round((barren / total) * 100)
  };
}

// Process all data and generate prediction results using Random Forest
function generateRandomForestPrediction(
  location: string, 
  weatherData: WeatherData, 
  airPollutionData: AirPollutionData,
  lat: number,
  lon: number,
  vegetationData?: { ndvi: number, evi: number },
  landCoverData?: { forest_percent: number, grassland_percent: number }
): PredictionData {
  // Extract air quality values
  const airQualityIndex = airPollutionData.list[0].main.aqi; // Air Quality Index (1-5)
  const pm2_5 = airPollutionData.list[0].components.pm2_5;
  const pm10 = airPollutionData.list[0].components.pm10;
  const coValue = airPollutionData.list[0].components.co;
  
  // Convert CO to CO2 equivalent for consistency with previous implementation
  const co2Level = convertCOToCO2Equivalent(coValue);
  
  // Calculate drought index
  const droughtIndex = calculateDroughtIndex(weatherData.main.temp, weatherData.main.humidity);
  
  // Prepare data for Random Forest model
  const inputData = prepareInputData(
    weatherData,
    airPollutionData,
    droughtIndex,
    co2Level,
    lat,
    lon,
    vegetationData,
    landCoverData
  );
  
  // Calculate probability using Random Forest model
  const probability = predictWildfireProbability(inputData);
  
  // Get feature importance for explainability
  const featureImportance = explainPrediction();
  
  // Prepare prediction data
  return {
    location: weatherData.name || location,
    latitude: lat,
    longitude: lon,
    probability: probability,
    co2_level: co2Level,
    temperature: weatherData.main.temp,
    humidity: weatherData.main.humidity,
    drought_index: droughtIndex,
    air_quality_index: airQualityIndex,
    pm2_5: pm2_5,
    pm10: pm10,
    vegetation_index: vegetationData,
    land_cover: landCoverData,
    model_type: "random_forest",
    feature_importance: featureImportance
  };
}

// Keep the generatePrediction function for backward compatibility
// but it's no longer used in the main flow
function generatePrediction(
  location: string, 
  weatherData: WeatherData, 
  airPollutionData: AirPollutionData,
  lat: number,
  lon: number,
  vegetationData?: { ndvi: number, evi: number },
  landCoverData?: { forest_percent: number, grassland_percent: number }
): PredictionData {
  // Weight factors by importance - adjusted to better align with Random Forest
  const tempWeight = 0.22;
  const humidityWeight = 0.18;
  const droughtWeight = 0.2;
  const co2Weight = 0.04;
  const aqiWeight = 0.05;
  const pm25Weight = 0.06;
  const vegetationWeight = 0.09; // vegetation factor
  const landCoverWeight = 0.08;   // land cover factor
  
  // Normalize each factor to a 0-1 scale
  const tempFactor = Math.max(0, Math.min(1, (weatherData.main.temp - 5) / 30)); // 0 at 5°C, 1 at 35°C
  const humidityFactor = Math.max(0, Math.min(1, (100 - weatherData.main.humidity) / 80)); // 0 at 100%, 1 at 20%
  const droughtFactor = droughtIndex / 100;
  const co2Factor = Math.max(0, Math.min(1, co2Level / 50));
  
  // Air quality index is 1-5, normalize to 0-1
  const aqiFactor = Math.max(0, Math.min(1, (airQualityIndex - 1) / 4));
  
  // PM2.5 normalization (typically 0-500 scale for AQI)
  const pm25Factor = Math.max(0, Math.min(1, pm2_5 / 100));
  
  // Vegetation factor - NDVI around 0.6-0.8 indicates dense vegetation (more fuel)
  // Lower values (0.1-0.3) indicate sparse vegetation (less fuel)
  let vegetationFactor = 0.5; // Default middle value
  if (vegetationData) {
    // Higher NDVI generally means more fuel for fires
    // But very high values might indicate green, moist vegetation which is less prone to burning
    const ndvi = vegetationData.ndvi;
    if (ndvi > 0.7) vegetationFactor = 0.7; // Very dense but possibly moist vegetation
    else if (ndvi > 0.5) vegetationFactor = 0.9; // Ideal fuel condition - dense but potentially dry
    else if (ndvi > 0.3) vegetationFactor = 0.7; // Moderate vegetation
    else if (ndvi > 0.1) vegetationFactor = 0.4; // Sparse vegetation
    else vegetationFactor = 0.2; // Very little vegetation
  }
  
  // Land cover factor - forests and grasslands provide more fuel
  let landCoverFactor = 0.5; // Default middle value
  if (landCoverData) {
    // Calculate based on forest and grassland percentages (main fuel sources)
    const fuelPercentage = (landCoverData.forest_percent + landCoverData.grassland_percent) / 100;
    landCoverFactor = Math.min(1, fuelPercentage);
  }
  
  // Check if location is in high-risk latitude band (most wildfires occur between 30-50 degrees)
  const latAbs = Math.abs(lat);
  const isHighRiskLatitude = (latAbs >= 30 && latAbs <= 50) ? 1.1 : 1.0;
  
  let probability = (
    tempFactor * tempWeight +
    humidityFactor * humidityWeight +
    droughtFactor * droughtWeight +
    co2Factor * co2Weight +
    aqiFactor * aqiWeight +
    pm25Factor * pm25Weight +
    vegetationFactor * vegetationWeight +
    landCoverFactor * landCoverWeight
  ) * 100 * isHighRiskLatitude;
  
  // Apply the same scaling as Random Forest for consistency
  probability = probability * 0.85;
  
  // Cap at 95%
  probability = Math.min(95, Math.round(probability * 100) / 100);
  
  return {
    location: weatherData.name || location,
    latitude: lat,
    longitude: lon,
    probability: probability,
    co2_level: co2Level,
    temperature: weatherData.main.temp,
    humidity: weatherData.main.humidity,
    drought_index: droughtIndex,
    air_quality_index: airQualityIndex,
    pm2_5: pm2_5,
    pm10: pm10,
    vegetation_index: vegetationData,
    land_cover: landCoverData,
    model_type: "formula"
  };
}
