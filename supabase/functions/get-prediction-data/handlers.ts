
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
  OPENWEATHER_API_KEY,
  WEATHERAPI_KEY
} from "./utils.ts";
import { 
  getCoordinates, 
  getWeatherData, 
  getAirPollutionData 
} from "./api.ts";

// Main request handler
export async function handleRequest(req: Request): Promise<Response> {
  try {
    const { location } = await req.json() as RequestBody;
    
    if (!location) {
      return new Response(
        JSON.stringify({ error: "Location is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Check if any API key is available
    if (!OPENWEATHER_API_KEY && !WEATHERAPI_KEY) {
      return new Response(
        JSON.stringify({ error: "No weather API keys are configured" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Log the API keys (masked for security)
    const hasConfiguredApi = logApiKey();
    if (!hasConfiguredApi) {
      console.warn("Running with limited API functionality");
    }
    
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
    
    // Process data and generate prediction
    const predictionData = generatePrediction(
      location, 
      weatherData, 
      airPollutionData, 
      lat, 
      lon, 
      vegetationData, 
      landCoverData
    );
    
    console.log(`Prediction completed for ${location}: probability=${predictionData.probability}%`);
    
    return new Response(
      JSON.stringify(predictionData),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error processing prediction:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Failed to process prediction" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
}

// Process all data and generate prediction results
function generatePrediction(
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
  
  // Calculate wildfire probability
  const probability = calculateWildfireProbability(
    weatherData.main.temp,
    weatherData.main.humidity,
    droughtIndex,
    co2Level,
    airQualityIndex,
    pm2_5,
    lat, 
    lon,
    vegetationData,
    landCoverData ? {
      forest_percent: landCoverData.forest_percent,
      grassland_percent: landCoverData.grassland_percent
    } : undefined
  );
  
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
    land_cover: landCoverData
  };
}
