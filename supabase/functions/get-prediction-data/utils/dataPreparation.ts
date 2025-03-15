
// dataPreparation.ts - Contains functions for preparing input data

import { WeatherData, AirPollutionData, RandomForestInputData } from "../types.ts";

/**
 * Prepares input data for the Random Forest model with enhanced data processing
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
  
  // Log raw data for debugging
  console.log("Raw data for Random Forest preparation:", {
    temp: weatherData.main.temp,
    humidity: weatherData.main.humidity,
    droughtIndex,
    aqi: airQualityIndex,
    pm2_5,
    co2: co2Level,
    vegetation: vegetationData,
    landCover: landCoverData
  });
  
  // Enhanced data normalization and validation
  const normalizedTemp = weatherData.main.temp;
  const normalizedHumidity = Math.max(Math.min(weatherData.main.humidity, 100), 0);
  const normalizedDroughtIndex = Math.max(Math.min(droughtIndex, 100), 0);
  
  // Create input data object with enhanced normalization
  const inputData: RandomForestInputData = {
    temperature: normalizedTemp,
    humidity: normalizedHumidity,
    drought_index: normalizedDroughtIndex,
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
  
  // Log prepared data for debugging
  console.log("Prepared Random Forest input data:", inputData);
  
  return inputData;
}
