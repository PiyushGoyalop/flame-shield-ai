
// Type definitions
export interface RequestBody {
  location: string;
}

export interface WeatherData {
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

export interface AirPollutionData {
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

export interface PredictionData {
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
  vegetation_index?: {
    ndvi: number;
    evi: number;
  };
  land_cover?: {
    forest_percent: number;
    grassland_percent: number;
    urban_percent: number;
    water_percent: number;
    barren_percent: number;
  };
}
