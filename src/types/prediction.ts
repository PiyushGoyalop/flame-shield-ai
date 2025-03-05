
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
}
