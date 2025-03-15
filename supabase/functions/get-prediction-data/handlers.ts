import { 
  RequestBody, 
  PredictionData, 
  WeatherData, 
  AirPollutionData 
} from "./types.ts";
import { 
  corsHeaders, 
  logApiKey,
  convertCOToCO2Equivalent,
  calculateDroughtIndex,
  calculateWildfireProbability,
  OPENWEATHER_API_KEY
} from "./utils.ts";
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
      
      // Get Earth Engine data (vegetation indices and land cover)
      let vegetationData, landCoverData;
      try {
        const earthEngineResponse = await fetch(`https://lmnvkkpxcqzogeisbygc.supabase.co/functions/v1/get-earth-engine-data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers.get('Authorization') || ''
          },
          body: JSON.stringify({ latitude: lat, longitude: lon })
        });
        
        if (earthEngineResponse.ok) {
          const earthEngineData = await earthEngineResponse.json();
          console.log(`Earth Engine data received for ${location}`);
          vegetationData = earthEngineData.vegetation_index;
          landCoverData = earthEngineData.land_cover;
        } else {
          console.error(`Failed to get Earth Engine data: ${await earthEngineResponse.text()}`);
        }
      } catch (error) {
        console.error(`Error fetching Earth Engine data: ${error.message}`);
      }
      
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
  // ... keep existing code (formula-based prediction logic)
}
