
// CORS headers for cross-origin requests
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Environment variables
export const OPENWEATHER_API_KEY = Deno.env.get("OPENWEATHER_API_KEY") || "";

// Utility functions
export function logApiKey() {
  if (!OPENWEATHER_API_KEY) {
    console.error("OpenWeather API key is not configured");
    return false;
  }
  
  const maskedKey = OPENWEATHER_API_KEY.substring(0, 4) + "..." + 
    OPENWEATHER_API_KEY.substring(OPENWEATHER_API_KEY.length - 4);
  console.log(`Using OpenWeather API key: ${maskedKey}`);
  return true;
}

// Convert CO to CO2 equivalent (approximate conversion for visualization)
export function convertCOToCO2Equivalent(coValue: number): number {
  // CO values from OpenWeatherMap are in μg/m³
  // Convert to a scale similar to our previous CO2 data (in MT)
  // This is a simplified conversion for consistency in the UI
  const scaleFactor = 0.2;
  return Math.round((coValue * scaleFactor) * 10) / 10;
}

// Calculate drought index based on temperature and humidity
export function calculateDroughtIndex(temperature: number, humidity: number): number {
  // Simple formula: higher temp and lower humidity mean higher drought risk
  // In a real application, this would use a proper drought index calculation
  const tempFactor = Math.max(0, temperature - 15) / 20; // 0 at 15°C, 1 at 35°C
  const humidityFactor = Math.max(0, 100 - humidity) / 100; // 0 at 100% humidity, 1 at 0%
  
  return Math.round((tempFactor * 0.6 + humidityFactor * 0.4) * 100);
}

// Calculate wildfire probability based on all factors
export function calculateWildfireProbability(
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
