
export interface HistoricData {
  total_incidents: number;
  largest_fire_acres: number;
  average_fire_size_acres: number;
  yearly_incidents: {
    year: number;
    incidents: number;
    severity?: {
      low: number;
      medium: number;
      high: number;
      extreme: number;
    };
    causes?: {
      lightning: number;
      human: number;
      unknown: number;
    };
  }[];
  severity_distribution?: {
    low: number;
    medium: number;
    high: number;
    extreme: number;
  };
  causes?: {
    lightning: number;
    human: number;
    unknown: number;
  };
}

export interface PredictionData {
  location: string;
  probability: number;
  co2Level: number;
  temperature: number;
  humidity: number;
  droughtIndex: number;
  latitude?: number;
  longitude?: number;
  air_quality_index?: number;
  pm2_5?: number;
  pm10?: number;
  historic_data?: HistoricData;
  vegetation_index?: {
    ndvi: number; // Normalized Difference Vegetation Index (0-1)
    evi: number;  // Enhanced Vegetation Index (0-1)
  };
  land_cover?: {
    forest_percent: number;
    grassland_percent: number;
    urban_percent: number;
    water_percent: number;
    barren_percent: number;
  };
}
