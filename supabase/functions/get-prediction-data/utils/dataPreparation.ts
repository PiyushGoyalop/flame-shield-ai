
// dataPreparation.ts - Contains functions for preparing input data

import { WeatherData, AirPollutionData, RandomForestInputData } from "../types.ts";

/**
 * Prepares input data for the Random Forest model
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
