
// Type definitions for historic wildfire data API

export interface RequestBody {
  location?: string;
  lat?: number;
  lon?: number;
  radius?: number; // in kilometers
}

export interface YearlyIncident {
  year: number;
  incidents: number;
  severity: {
    low: number;
    medium: number;
    high: number;
    extreme: number;
  };
  causes: {
    lightning: number;
    human: number;
    unknown: number;
  };
  largest_fire_acres: number;
  average_fire_size_acres: number;
}

export interface HistoricWildfireData {
  location: string;
  radius_km: number;
  total_incidents: number;
  yearly_incidents: YearlyIncident[];
  severity_distribution: {
    low: number;
    medium: number;
    high: number;
    extreme: number;
  };
  causes: {
    lightning: number;
    human: number;
    unknown: number;
  };
  largest_fire_acres: number;
  average_fire_size_acres: number;
}

// USGS API Response Types
export interface USGSWildfireFeature {
  attributes: {
    FireDiscoveryDateTime: number;
    IncidentName?: string;
    IncidentTypeCategory?: string;
    FireCause?: string;
    DailyAcres?: number;
    CalculatedAcres?: number;
  }
}

export interface USGSWildfireResponse {
  features: USGSWildfireFeature[];
}
