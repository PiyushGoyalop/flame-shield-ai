import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

interface RequestBody {
  location: string;
}

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
  name: string;
}

interface AirPollutionData {
  list: Array<{
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
  }>;
}

interface PredictionData {
  location: string;
  latitude: number;
  longitude: number;
  probability: number;
  co2_level: number;
  temperature: number;
  humidity: number;
  drought_index: number;
  air_quality_index?: number;
  pm2_5?: number;
  pm10?: number;
}

const OPENWEATHER_API_KEY = Deno.env.get("OPENWEATHER_API_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Basic geocoding function
async function getCoordinates(location: string): Promise<{ lat: number; lon: number }> {
  try {
    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${OPENWEATHER_API_KEY}`;
    const response = await fetch(geocodingUrl);
    const data = await response.json();
    
    if (data && data.length > 0) {
      return { lat: data[0].lat, lon: data[0].lon };
    } else {
      throw new Error("Location not found");
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
}

// Get weather data using coordinates
async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
  try {
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    const response = await fetch(weatherUrl);
    const data = await response.json();
    
    if (data && data.main) {
      return data;
    } else {
      throw new Error("Weather data not available");
    }
  } catch (error) {
    console.error("Weather API error:", error);
    throw error;
  }
}

// Get air pollution data using coordinates
async function getAirPollutionData(lat: number, lon: number): Promise<AirPollutionData> {
  try {
    const airPollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
    const response = await fetch(airPollutionUrl);
    const data = await response.json();
    
    if (data && data.list && data.list.length > 0) {
      return data;
    } else {
      throw new Error("Air pollution data not available");
    }
  } catch (error) {
    console.error("Air Pollution API error:", error);
    throw error;
  }
}

// Convert CO to CO2 equivalent (approximate conversion for visualization)
function convertCOToCO2Equivalent(coValue: number): number {
  // CO values from OpenWeatherMap are in μg/m³
  // Convert to a scale similar to our previous CO2 data (in MT)
  // This is a simplified conversion for consistency in the UI
  const scaleFactor = 0.2;
  return Math.round((coValue * scaleFactor) * 10) / 10;
}

// Calculate drought index based on temperature and humidity
function calculateDroughtIndex(temperature: number, humidity: number): number {
  // Simple formula: higher temp and lower humidity mean higher drought risk
  // In a real application, this would use a proper drought index calculation
  const tempFactor = Math.max(0, temperature - 15) / 20; // 0 at 15°C, 1 at 35°C
  const humidityFactor = Math.max(0, 100 - humidity) / 100; // 0 at 100% humidity, 1 at 0%
  
  return Math.round((tempFactor * 0.6 + humidityFactor * 0.4) * 100);
}

// Calculate wildfire probability based on all factors
function calculateWildfireProbability(
  temperature: number, 
  humidity: number, 
  droughtIndex: number, 
  co2Level: number,
  airQualityIndex: number,
  pm2_5: number,
  lat: number, 
  lon: number
): number {
  // Weight factors by importance
  const tempWeight = 0.25;
  const humidityWeight = 0.2;
  const droughtWeight = 0.3;
  const co2Weight = 0.1;
  const aqiWeight = 0.1;
  const pm25Weight = 0.05;
  
  // Normalize each factor to a 0-1 scale
  const tempFactor = Math.max(0, Math.min(1, (temperature - 5) / 30)); // 0 at 5°C, 1 at 35°C
  const humidityFactor = Math.max(0, Math.min(1, (100 - humidity) / 80)); // 0 at 100%, 1 at 20%
  const droughtFactor = droughtIndex / 100;
  const co2Factor = Math.max(0, Math.min(1, co2Level / 50));
  
  // Air quality index is 1-5, normalize to 0-1
  const aqiFactor = Math.max(0, Math.min(1, (airQualityIndex - 1) / 4));
  
  // PM2.5 normalization (typically 0-500 scale for AQI)
  const pm25Factor = Math.max(0, Math.min(1, pm2_5 / 100));
  
  // Check if location is in high-risk latitude band (most wildfires occur between 30-50 degrees)
  const latAbs = Math.abs(lat);
  const isHighRiskLatitude = (latAbs >= 30 && latAbs <= 50) ? 1.3 : 1.0;
  
  // Calculate base probability
  let probability = (
    tempFactor * tempWeight +
    humidityFactor * humidityWeight +
    droughtFactor * droughtWeight +
    co2Factor * co2Weight +
    aqiFactor * aqiWeight +
    pm25Factor * pm25Weight
  ) * 100 * isHighRiskLatitude;
  
  // Cap at 95%
  return Math.min(95, Math.round(probability * 100) / 100);
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  
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
    
    // Check if OpenWeather API key is available
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
    const maskedKey = OPENWEATHER_API_KEY.substring(0, 4) + "..." + OPENWEATHER_API_KEY.substring(OPENWEATHER_API_KEY.length - 4);
    console.log(`Using OpenWeather API key: ${maskedKey}`);
    
    // Get coordinates for the location
    const { lat, lon } = await getCoordinates(location);
    console.log(`Coordinates for ${location}: lat=${lat}, lon=${lon}`);
    
    // Get weather data
    const weatherData = await getWeatherData(lat, lon);
    console.log(`Weather data received for ${location}`);
    
    // Get air pollution data
    const airPollutionData = await getAirPollutionData(lat, lon);
    console.log(`Air pollution data received for ${location}`);
    
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
      lon
    );
    
    // Prepare prediction data
    const predictionData: PredictionData = {
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
      pm10: pm10
    };
    
    console.log(`Prediction completed for ${location}: probability=${probability}%`);
    
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
});
