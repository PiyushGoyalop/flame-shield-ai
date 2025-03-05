import { findMatchingLocation, getCO2EmissionsData, getHistoricWildfireData } from "./dataLoader";
import { supabase } from "@/integrations/supabase/client";

// Keep the interface for internal type consistency
interface CustomDataCache {
  wildfires: any[];
  co2: any[];
}

const getLocationSeed = (location: string): number => {
  let hash = 0;
  for (let i = 0; i < location.length; i++) {
    hash = ((hash << 5) - hash) + location.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) / 2147483647;
};

export const getMockPredictionData = async (location: string) => {
  const seed = getLocationSeed(location);
  
  try {
    // Try to load datasets from the default files
    const wildfireData = await getHistoricWildfireData();
    const co2Data = await getCO2EmissionsData();
    
    console.log("Using wildfire data:", wildfireData.length, "records");
    console.log("Using CO2 data:", co2Data.length, "records");
    
    // Try to find matching locations in our datasets
    const matchingWildfireLocation = findMatchingLocation(wildfireData, location);
    const matchingCO2Location = findMatchingLocation(co2Data, location);
    
    // Continue with existing mock data generation using available data
    const isHighRiskState = /california|arizona|nevada|colorado|oregon|washington|utah/.test(location.toLowerCase());
    const isCoastal = /beach|coast|ocean|bay|gulf|sea/.test(location.toLowerCase());
    const isForested = /forest|wood|pine|redwood|national park/.test(location.toLowerCase());
    const isUrban = /city|downtown|urban|metro/.test(location.toLowerCase());
    const isDesert = /desert|valley|canyon|mesa/.test(location.toLowerCase());
    
    let baseProbability = 0;
    if (isHighRiskState) baseProbability += 40;
    if (isForested) baseProbability += 25;
    if (isCoastal) baseProbability -= 15;
    if (isUrban) baseProbability -= 10;
    if (isDesert) baseProbability += 15;
    
    const locationFactor = seed * 35;
    
    // Use CO2 data from dataset if available
    let co2Level = matchingCO2Location 
      ? (matchingCO2Location.average_co2_mt as number) + (seed * 5) 
      : 5 + (seed * 40) + (isUrban ? 15 : 0);
    
    // Adjust probability based on historic wildfire data if available
    if (matchingWildfireLocation) {
      const recentYearData = wildfireData.filter(item => 
        item.location === matchingWildfireLocation.location && 
        (item.year as number) >= 2020
      );
      
      if (recentYearData.length > 0) {
        // Calculate average incidents per year
        const avgIncidents = recentYearData.reduce((sum, item) => sum + (item.incidents as number), 0) / recentYearData.length;
        // Calculate average acres burned per year
        const avgAcres = recentYearData.reduce((sum, item) => sum + (item.acres_burned as number), 0) / recentYearData.length;
        
        // Adjust probability based on historic data
        if (avgIncidents > 2000 || avgAcres > 500000) {
          baseProbability += 15; // High historical fire activity
        } else if (avgIncidents > 1000 || avgAcres > 100000) {
          baseProbability += 8; // Moderate historical fire activity
        }
      }
    }
    
    const probability = Math.min(95, Math.max(5, baseProbability + locationFactor));
    const temperature = 10 + (seed * 25);
    const humidity = isCoastal ? 50 + (seed * 30) : 20 + (seed * 40);
    const droughtIndex = isHighRiskState ? 80 - humidity : 60 - humidity;
    
    // Generate vegetation indices
    const ndvi = isForested ? 0.7 + (seed * 0.3) : 
                isUrban ? 0.1 + (seed * 0.2) : 
                isDesert ? 0.05 + (seed * 0.15) : 
                0.3 + (seed * 0.4);
    
    const evi = Math.max(0, Math.min(1, ndvi * 0.9 + (seed * 0.1 - 0.05)));
    
    // Generate land cover data
    let forestPercent = isForested ? 60 + (seed * 30) : 20 + (seed * 30);
    let grasslandPercent = isDesert ? 10 + (seed * 20) : 20 + (seed * 40);
    let urbanPercent = isUrban ? 50 + (seed * 40) : 5 + (seed * 15);
    let waterPercent = isCoastal ? 15 + (seed * 20) : 2 + (seed * 8);
    let barrenPercent = isDesert ? 40 + (seed * 30) : 5 + (seed * 15);
    
    // Normalize to ensure total is 100%
    const total = forestPercent + grasslandPercent + urbanPercent + waterPercent + barrenPercent;
    forestPercent = Math.round((forestPercent / total) * 100);
    grasslandPercent = Math.round((grasslandPercent / total) * 100);
    urbanPercent = Math.round((urbanPercent / total) * 100);
    waterPercent = Math.round((waterPercent / total) * 100);
    barrenPercent = Math.round((barrenPercent / total) * 100);
    
    // Final adjustment to ensure exactly 100%
    const finalTotal = forestPercent + grasslandPercent + urbanPercent + waterPercent + barrenPercent;
    if (finalTotal < 100) forestPercent += (100 - finalTotal);
    if (finalTotal > 100) forestPercent -= (finalTotal - 100);
    
    // Generate historic data based on the real dataset if we have a match
    const historic_data = matchingWildfireLocation ? generateHistoricData(wildfireData, matchingWildfireLocation.location as string) : undefined;
    
    return {
      probability: Math.round(probability * 100) / 100,
      temperature: Math.round(temperature * 10) / 10,
      humidity: Math.round(humidity),
      co2Level: Math.round(co2Level * 10) / 10,
      droughtIndex: Math.round(Math.max(0, droughtIndex)),
      air_quality_index: Math.round(1 + seed * 4),  // AQI from 1-5
      pm2_5: Math.round(seed * 50 * 10) / 10,
      pm10: Math.round(seed * 70 * 10) / 10,
      vegetation_index: {
        ndvi: Math.round(ndvi * 100) / 100,
        evi: Math.round(evi * 100) / 100
      },
      land_cover: {
        forest_percent: forestPercent,
        grassland_percent: grasslandPercent,
        urban_percent: urbanPercent,
        water_percent: waterPercent,
        barren_percent: barrenPercent
      },
      historic_data
    };
  } catch (error) {
    console.error("Error in mock data generation, trying failsafe endpoint:", error);
    
    // If local data loading fails, try the failsafe endpoint
    try {
      const { data: failsafeData, error: failsafeError } = await supabase.functions.invoke('get-historic-data-failsafe', {
        body: { location, dataType: 'wildfires' }
      });
      
      if (failsafeError) {
        console.error("Failsafe data endpoint also failed:", failsafeError);
      } else if (failsafeData) {
        console.log("Using failsafe data from endpoint:", failsafeData);
        
        // Generate basic prediction data with the failsafe historic data
        return generateBasicPredictionWithFailsafeData(location, seed, failsafeData);
      }
    } catch (failsafeError) {
      console.error("Failed to access failsafe endpoint:", failsafeError);
    }
    
    // Last resort: generate completely synthetic data
    return generateSyntheticData(location, seed);
  }
};

function generateHistoricData(wildfireData: any[], location: string) {
  const locationData = wildfireData.filter(item => (item.location as string) === location);
  
  if (locationData.length === 0) return undefined;
  
  // Calculate total incidents and averages
  const total_incidents = locationData.reduce((sum, item) => sum + (item.incidents as number), 0);
  const largest_fire_acres = Math.max(...locationData.map(item => item.acres_burned as number));
  const average_fire_size_acres = Math.round(locationData.reduce((sum, item) => sum + (item.acres_burned as number), 0) / total_incidents);
  
  // Generate severity distribution
  const severity_distribution = {
    low: Math.round(30 + Math.random() * 20),
    medium: Math.round(25 + Math.random() * 20),
    high: Math.round(10 + Math.random() * 15),
    extreme: Math.round(5 + Math.random() * 10)
  };
  
  // Normalize to 100%
  const severityTotal = severity_distribution.low + severity_distribution.medium + 
                        severity_distribution.high + severity_distribution.extreme;
  
  severity_distribution.low = Math.round((severity_distribution.low / severityTotal) * 100);
  severity_distribution.medium = Math.round((severity_distribution.medium / severityTotal) * 100);
  severity_distribution.high = Math.round((severity_distribution.high / severityTotal) * 100);
  severity_distribution.extreme = Math.round((severity_distribution.extreme / severityTotal) * 100);
  
  // Adjust to ensure total is 100%
  const finalSeverityTotal = severity_distribution.low + severity_distribution.medium + 
                            severity_distribution.high + severity_distribution.extreme;
  
  if (finalSeverityTotal < 100) severity_distribution.low += (100 - finalSeverityTotal);
  if (finalSeverityTotal > 100) severity_distribution.low -= (finalSeverityTotal - 100);
  
  // Generate causes
  const causes = {
    lightning: Math.round(20 + Math.random() * 30),
    human: Math.round(40 + Math.random() * 30),
    unknown: Math.round(10 + Math.random() * 20)
  };
  
  // Normalize causes to 100%
  const causesTotal = causes.lightning + causes.human + causes.unknown;
  causes.lightning = Math.round((causes.lightning / causesTotal) * 100);
  causes.human = Math.round((causes.human / causesTotal) * 100);
  causes.unknown = Math.round((causes.unknown / causesTotal) * 100);
  
  // Adjust to ensure total is 100%
  const finalCausesTotal = causes.lightning + causes.human + causes.unknown;
  if (finalCausesTotal < 100) causes.lightning += (100 - finalCausesTotal);
  if (finalCausesTotal > 100) causes.lightning -= (finalCausesTotal - 100);
  
  // Create yearly incidents data
  const yearly_incidents = locationData.map(item => ({
    year: item.year as number,
    incidents: item.incidents as number
  }));
  
  return {
    total_incidents,
    largest_fire_acres,
    average_fire_size_acres,
    yearly_incidents,
    severity_distribution,
    causes
  };
}

function generateBasicPredictionWithFailsafeData(location: string, seed: number, failsafeData: any) {
  const isHighRiskState = /california|arizona|nevada|colorado|oregon|washington|utah/.test(location.toLowerCase());
  const isCoastal = /beach|coast|ocean|bay|gulf|sea/.test(location.toLowerCase());
  const isForested = /forest|wood|pine|redwood|national park/.test(location.toLowerCase());
  const isDesert = /desert|valley|canyon|mesa/.test(location.toLowerCase());
  
  // Calculate basic prediction values
  const probability = Math.min(95, Math.max(5, 40 + (seed * 35)));
  const temperature = 10 + (seed * 25);
  const humidity = isCoastal ? 50 + (seed * 30) : 20 + (seed * 40);
  const droughtIndex = isHighRiskState ? 80 - humidity : 60 - humidity;
  const co2Level = 15 + (seed * 20);
  
  // Generate vegetation indices
  const ndvi = isForested ? 0.7 + (seed * 0.3) : 0.3 + (seed * 0.4);
  const evi = Math.max(0, Math.min(1, ndvi * 0.9 + (seed * 0.1 - 0.05)));
  
  // Generate basic land cover percentages
  const forestPercent = 40;
  const grasslandPercent = 30;
  const urbanPercent = 20;
  const waterPercent = 5;
  const barrenPercent = 5;
  
  return {
    probability: Math.round(probability * 100) / 100,
    temperature: Math.round(temperature * 10) / 10,
    humidity: Math.round(humidity),
    co2Level: Math.round(co2Level * 10) / 10,
    droughtIndex: Math.round(Math.max(0, droughtIndex)),
    air_quality_index: Math.round(1 + seed * 4),
    pm2_5: Math.round(seed * 50 * 10) / 10,
    pm10: Math.round(seed * 70 * 10) / 10,
    historic_data: failsafeData,
    vegetation_index: {
      ndvi: Math.round(ndvi * 100) / 100,
      evi: Math.round(evi * 100) / 100
    },
    land_cover: {
      forest_percent: forestPercent,
      grassland_percent: grasslandPercent,
      urban_percent: urbanPercent,
      water_percent: waterPercent,
      barren_percent: barrenPercent
    }
  };
}

function generateSyntheticData(location: string, seed: number) {
  const isHighRiskState = /california|arizona|nevada|colorado|oregon|washington|utah/.test(location.toLowerCase());
  
  // Generate completely synthetic historic data
  const yearlyIncidents = [2019, 2020, 2021, 2022, 2023].map(year => ({
    year,
    incidents: Math.round(500 + (1500 * seed) + (year - 2019) * 200)
  }));
  
  const totalIncidents = yearlyIncidents.reduce((sum, item) => sum + item.incidents, 0);
  
  const historicData = {
    total_incidents: totalIncidents,
    largest_fire_acres: Math.round(50000 + seed * 950000),
    average_fire_size_acres: Math.round(100 + seed * 1900),
    yearly_incidents: yearlyIncidents,
    severity_distribution: {
      low: Math.round(totalIncidents * 0.5),
      medium: Math.round(totalIncidents * 0.3),
      high: Math.round(totalIncidents * 0.15),
      extreme: Math.round(totalIncidents * 0.05)
    },
    causes: {
      lightning: Math.round(totalIncidents * 0.3),
      human: Math.round(totalIncidents * 0.6),
      unknown: Math.round(totalIncidents * 0.1)
    }
  };
  
  // Generate basic prediction values
  const probability = Math.min(95, Math.max(5, isHighRiskState ? 60 + (seed * 30) : 30 + (seed * 40)));
  const temperature = 10 + (seed * 25);
  const humidity = 30 + (seed * 40);
  const droughtIndex = 60 - humidity;
  const co2Level = 15 + (seed * 20);
  
  return {
    probability: Math.round(probability * 100) / 100,
    temperature: Math.round(temperature * 10) / 10,
    humidity: Math.round(humidity),
    co2Level: Math.round(co2Level * 10) / 10,
    droughtIndex: Math.round(Math.max(0, droughtIndex)),
    air_quality_index: Math.round(1 + seed * 4),
    pm2_5: Math.round(seed * 50 * 10) / 10,
    pm10: Math.round(seed * 70 * 10) / 10,
    historic_data: historicData,
    vegetation_index: {
      ndvi: Math.round((0.3 + seed * 0.4) * 100) / 100,
      evi: Math.round((0.2 + seed * 0.3) * 100) / 100
    },
    land_cover: {
      forest_percent: 40,
      grassland_percent: 30,
      urban_percent: 20,
      water_percent: 5,
      barren_percent: 5
    }
  };
}
