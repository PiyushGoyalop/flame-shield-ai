import { corsHeaders } from "../shared/cors.ts";

// Environment variables
export const OPENWEATHER_API_KEY = Deno.env.get("OPENWEATHER_API_KEY") || "";
export const WEATHERAPI_KEY = Deno.env.get("WEATHERAPI_KEY") || "";

// Utility functions
export function logApiKey() {
  let primaryApiConfigured = false;
  let fallbackApiConfigured = false;
  
  if (!OPENWEATHER_API_KEY) {
    console.error("OpenWeather API key is not configured");
  } else {
    const maskedKey = OPENWEATHER_API_KEY.substring(0, 4) + "..." + 
      OPENWEATHER_API_KEY.substring(OPENWEATHER_API_KEY.length - 4);
    console.log(`Using OpenWeather API key: ${maskedKey}`);
    primaryApiConfigured = true;
  }
  
  if (!WEATHERAPI_KEY) {
    console.error("WeatherAPI.com key is not configured");
  } else {
    const maskedKey = WEATHERAPI_KEY.substring(0, 4) + "..." + 
      WEATHERAPI_KEY.substring(WEATHERAPI_KEY.length - 4);
    console.log(`Using WeatherAPI.com key as fallback: ${maskedKey}`);
    fallbackApiConfigured = true;
  }
  
  return primaryApiConfigured || fallbackApiConfigured;
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
  lon: number,
  vegetationIndex?: { ndvi: number, evi: number },
  landCover?: { forest_percent: number, grassland_percent: number }
): number {
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
  const tempFactor = Math.max(0, Math.min(1, (temperature - 5) / 30)); // 0 at 5°C, 1 at 35°C
  const humidityFactor = Math.max(0, Math.min(1, (100 - humidity) / 80)); // 0 at 100%, 1 at 20%
  const droughtFactor = droughtIndex / 100;
  const co2Factor = Math.max(0, Math.min(1, co2Level / 50));
  
  // Air quality index is 1-5, normalize to 0-1
  const aqiFactor = Math.max(0, Math.min(1, (airQualityIndex - 1) / 4));
  
  // PM2.5 normalization (typically 0-500 scale for AQI)
  const pm25Factor = Math.max(0, Math.min(1, pm2_5 / 100));
  
  // Vegetation factor - NDVI around 0.6-0.8 indicates dense vegetation (more fuel)
  // Lower values (0.1-0.3) indicate sparse vegetation (less fuel)
  let vegetationFactor = 0.5; // Default middle value
  if (vegetationIndex) {
    // Higher NDVI generally means more fuel for fires
    // But very high values might indicate green, moist vegetation which is less prone to burning
    const ndvi = vegetationIndex.ndvi;
    if (ndvi > 0.7) vegetationFactor = 0.7; // Very dense but possibly moist vegetation
    else if (ndvi > 0.5) vegetationFactor = 0.9; // Ideal fuel condition - dense but potentially dry
    else if (ndvi > 0.3) vegetationFactor = 0.7; // Moderate vegetation
    else if (ndvi > 0.1) vegetationFactor = 0.4; // Sparse vegetation
    else vegetationFactor = 0.2; // Very little vegetation
  }
  
  // Land cover factor - forests and grasslands provide more fuel
  let landCoverFactor = 0.5; // Default middle value
  if (landCover) {
    // Calculate based on forest and grassland percentages (main fuel sources)
    const fuelPercentage = (landCover.forest_percent + landCover.grassland_percent) / 100;
    landCoverFactor = Math.min(1, fuelPercentage);
  }
  
  // Check if location is in high-risk latitude band (most wildfires occur between 30-50 degrees)
  const latAbs = Math.abs(lat);
  const isHighRiskLatitude = (latAbs >= 30 && latAbs <= 50) ? 1.1 : 1.0;
  
  // Calculate base probability
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
  return Math.min(95, Math.round(probability * 100) / 100);
}
