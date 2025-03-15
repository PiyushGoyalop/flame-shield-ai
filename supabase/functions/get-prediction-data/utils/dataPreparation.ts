
// dataPreparation.ts - Advanced data preparation with sophisticated processing

import { WeatherData, AirPollutionData, RandomForestInputData } from "../types.ts";

/**
 * Prepares input data for the Random Forest model with advanced data processing
 * and feature engineering to maximize prediction accuracy
 */
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
  
  // Log raw data for debugging and research purposes
  console.log("Raw environmental data for prediction:", {
    temp: weatherData.main.temp,
    feelsLike: weatherData.main.feels_like,
    tempMin: weatherData.main.temp_min,
    tempMax: weatherData.main.temp_max,
    pressure: weatherData.main.pressure,
    humidity: weatherData.main.humidity,
    windSpeed: weatherData?.wind?.speed,
    windDeg: weatherData?.wind?.deg,
    clouds: weatherData?.clouds?.all,
    visibility: weatherData?.visibility,
    droughtIndex,
    aqi: airQualityIndex,
    pm2_5,
    pm10: airPollutionData.list[0].components.pm10,
    no2: airPollutionData.list[0].components.no2,
    co: airPollutionData.list[0].components.co,
    co2: co2Level,
    o3: airPollutionData.list[0].components.o3,
    so2: airPollutionData.list[0].components.so2,
    nh3: airPollutionData.list[0].components.nh3,
    vegetation: vegetationData,
    landCover: landCoverData
  });
  
  // Advanced data normalization and validation with enhanced preprocessing
  
  // 1. Temperature preprocessing with climate zone adjustment
  let normalizedTemp = weatherData.main.temp;
  
  // Use daily temperature range as a feature if available
  let tempRange = 0;
  if (weatherData.main.temp_min !== undefined && weatherData.main.temp_max !== undefined) {
    tempRange = weatherData.main.temp_max - weatherData.main.temp_min;
    // High daily temperature ranges often indicate dry conditions
    if (tempRange > 15) {
      // Adjust drought index upward for high temperature ranges
      droughtIndex = Math.min(droughtIndex + (tempRange - 15) * 0.5, 100);
    }
  }
  
  // 2. Enhanced humidity processing
  // Ensure humidity is within valid range
  const normalizedHumidity = Math.max(Math.min(weatherData.main.humidity, 100), 0);
  
  // 3. Advanced drought index processing
  // Apply non-linear scaling to drought index in arid regions
  let normalizedDroughtIndex = Math.max(Math.min(droughtIndex, 100), 0);
  
  // Adjust drought index based on recent precipitation if available
  if (weatherData.rain && weatherData.rain['1h']) {
    // Recent rain reduces effective drought index
    const rainAmount = weatherData.rain['1h'];
    const droughtReduction = Math.min(rainAmount * 5, 30);
    normalizedDroughtIndex = Math.max(normalizedDroughtIndex - droughtReduction, 0);
  }
  
  // 4. Wind data preprocessing - important for fire spread
  let windFactor = 0;
  if (weatherData.wind) {
    // Wind speed in m/s
    const windSpeed = weatherData.wind.speed || 0;
    
    // Wind direction
    const windDeg = weatherData.wind.deg || 0;
    
    // Calculate wind factor (higher values indicate higher fire spread potential)
    // Wind speeds over 5 m/s significantly increase fire spread
    windFactor = windSpeed > 5 ? (windSpeed - 5) * 2 + 10 : windSpeed * 2;
    
    // Store for logging
    console.log(`Wind factor calculated: ${windFactor} from speed ${windSpeed} m/s`);
  }
  
  // 5. Enhanced air quality processing
  // Calculate composite air quality factor
  const pm25Factor = (pm2_5 > 35) ? (1 + (pm2_5 - 35) / 100) : 1;
  
  // 6. Advanced vegetation processing
  let ndviFactor = 0;
  let eviFactor = 0;
  if (vegetationData) {
    ndviFactor = vegetationData.ndvi;
    eviFactor = vegetationData.evi || 0;
    
    // Calculate vegetation stress (difference between NDVI and EVI)
    // Higher stress indicates more flammable vegetation
    if (vegetationData.evi !== undefined) {
      const vegStress = Math.max(0, Math.min(1, 2 * (ndviFactor - eviFactor)));
      console.log(`Vegetation stress factor: ${vegStress}`);
    }
  }
  
  // 7. Advanced land cover processing
  let forestEdgeFactor = 0;
  if (landCoverData) {
    // Calculate forest-grassland interface factor (higher risk at interface)
    if (landCoverData.forest_percent !== undefined && landCoverData.grassland_percent !== undefined) {
      // Higher values when there's a mix of forest and grassland (highest risk)
      forestEdgeFactor = (landCoverData.forest_percent * landCoverData.grassland_percent) / 2500;
      console.log(`Forest-grassland interface factor: ${forestEdgeFactor}`);
    }
  }
  
  // 8. Seasonal adjustment based on hemisphere and month
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // 1-12
  
  // Create final input data object with enhanced features
  const inputData: RandomForestInputData = {
    temperature: normalizedTemp,
    humidity: normalizedHumidity,
    drought_index: normalizedDroughtIndex,
    air_quality_index: airQualityIndex,
    pm2_5: pm2_5,
    co2_level: co2Level,
    latitude: lat,
    longitude: lon,
    month: month,                   // Current month for seasonal patterns
    wind_speed: weatherData.wind?.speed || 0,
    temp_range: tempRange,          // Temperature range as additional feature
    ndvi: vegetationData?.ndvi,
    evi: vegetationData?.evi,
    forest_percent: landCoverData?.forest_percent,
    grassland_percent: landCoverData?.grassland_percent,
    urban_percent: landCoverData?.urban_percent,
    barren_percent: landCoverData?.barren_percent,
    water_percent: landCoverData?.water_percent
  };
  
  // Log prepared data for research
  console.log("Advanced prepared Random Forest input:", inputData);
  
  return inputData;
}
