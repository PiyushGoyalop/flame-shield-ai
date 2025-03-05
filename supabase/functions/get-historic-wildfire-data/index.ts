
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../get-prediction-data/utils.ts";

// Main edge function entry point
serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  
  try {
    return await handleRequest(req);
  } catch (error) {
    console.error("Unhandled error in edge function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});

// Main request handler
async function handleRequest(req: Request): Promise<Response> {
  try {
    const { location, lat, lon, radius } = await req.json();
    
    if ((!location && (!lat || !lon))) {
      return new Response(
        JSON.stringify({ error: "Either location or coordinates (lat/lon) are required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Set default radius if not provided (in kilometers)
    const searchRadius = radius || 50;
    
    console.log(`Fetching historic wildfire data for ${location || `lat: ${lat}, lon: ${lon}`} with radius ${searchRadius}km`);
    
    // Get historical wildfire data
    const historicData = await getHistoricWildfireData(location, lat, lon, searchRadius);
    
    return new Response(
      JSON.stringify(historicData),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error processing historic wildfire data:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Failed to process historic wildfire data" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
}

// Get historical wildfire data
// For this implementation, we're using a simulated dataset
// In a production environment, this would connect to a real API
async function getHistoricWildfireData(location?: string, lat?: number, lon?: number, radius: number = 50) {
  console.log("Generating historic wildfire data...");
  
  // Generate a seed based on location or coordinates for consistent results
  let seed = 0;
  if (location) {
    for (let i = 0; i < location.length; i++) {
      seed = ((seed << 5) - seed) + location.charCodeAt(i);
      seed |= 0;
    }
  } else if (lat && lon) {
    seed = Math.abs(lat * 10000 + lon * 10000);
  }
  seed = Math.abs(seed) / 2147483647;
  
  // Determine risk factor based on location pattern matching
  const isHighRiskName = /california|arizona|nevada|colorado|oregon|washington|utah|forest|mountain|canyon|valley|park|reserve/i.test(location || '');
  const baseFrequency = isHighRiskName ? 8 : 3;
  
  // Generate 5 years of historical data
  const currentYear = new Date().getFullYear();
  const historicData = {
    location: location || `Coordinates (${lat}, ${lon})`,
    radius_km: radius,
    total_incidents: 0,
    yearly_incidents: [],
    severity_distribution: { low: 0, medium: 0, high: 0, extreme: 0 },
    causes: { lightning: 0, human: 0, unknown: 0 },
    largest_fire_acres: 0,
    average_fire_size_acres: 0
  };
  
  let totalAcres = 0;
  
  // Generate yearly data
  for (let i = 0; i < 5; i++) {
    const year = currentYear - i - 1;
    const yearSeed = (seed + (i * 0.1)) % 1;
    
    // Calculate incidents with some randomness
    const incidents = Math.floor(baseFrequency + (yearSeed * 12));
    
    // Generate severity distribution
    const lowSeverity = Math.floor(incidents * (0.3 + yearSeed * 0.2));
    const mediumSeverity = Math.floor(incidents * (0.3 + yearSeed * 0.1));
    const highSeverity = Math.floor(incidents * (0.2 + yearSeed * 0.1));
    const extremeSeverity = incidents - lowSeverity - mediumSeverity - highSeverity;
    
    // Generate cause distribution
    const lightningCaused = Math.floor(incidents * (0.3 + yearSeed * 0.2));
    const humanCaused = Math.floor(incidents * (0.4 + yearSeed * 0.2));
    const unknownCaused = incidents - lightningCaused - humanCaused;
    
    // Calculate largest fire
    const largestFire = Math.round((5000 + yearSeed * 20000) * (isHighRiskName ? 2 : 1));
    
    // Calculate average fire size
    const averageSize = Math.round((100 + yearSeed * 500) * (isHighRiskName ? 1.5 : 1));
    totalAcres += averageSize * incidents;
    
    // Update totals
    historicData.total_incidents += incidents;
    historicData.severity_distribution.low += lowSeverity;
    historicData.severity_distribution.medium += mediumSeverity;
    historicData.severity_distribution.high += highSeverity;
    historicData.severity_distribution.extreme += extremeSeverity;
    historicData.causes.lightning += lightningCaused;
    historicData.causes.human += humanCaused;
    historicData.causes.unknown += unknownCaused;
    
    if (largestFire > historicData.largest_fire_acres) {
      historicData.largest_fire_acres = largestFire;
    }
    
    // Add yearly data
    historicData.yearly_incidents.push({
      year,
      incidents,
      severity: {
        low: lowSeverity,
        medium: mediumSeverity, 
        high: highSeverity,
        extreme: extremeSeverity
      },
      causes: {
        lightning: lightningCaused,
        human: humanCaused,
        unknown: unknownCaused
      },
      largest_fire_acres: largestFire,
      average_fire_size_acres: averageSize
    });
  }
  
  // Calculate overall average fire size
  historicData.average_fire_size_acres = Math.round(totalAcres / historicData.total_incidents) || 0;
  
  console.log(`Generated historic data with ${historicData.total_incidents} incidents over 5 years`);
  
  return historicData;
}
