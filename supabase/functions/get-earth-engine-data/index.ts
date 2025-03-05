
import { serve } from 'https://deno.land/std@0.170.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  latitude: number;
  longitude: number;
}

interface VegetationData {
  ndvi: number;
  evi: number;
}

interface LandCoverData {
  forest_percent: number;
  grassland_percent: number;
  urban_percent: number;
  water_percent: number;
  barren_percent: number;
}

interface EarthEngineResponse {
  vegetation_index: VegetationData;
  land_cover: LandCoverData;
}

// Generate realistic mock data based on location
function generateMockEarthEngineData(lat: number, lon: number): EarthEngineResponse {
  // Create location-specific seed for consistent results
  const locationSeed = Math.abs(Math.sin(lat * lon)) * 0.7;
  
  // Adjust values based on latitude (assuming more vegetation in temperate zones)
  const isTemperateZone = Math.abs(lat) > 20 && Math.abs(lat) < 60;
  const isEquatorial = Math.abs(lat) < 20;
  const isPolar = Math.abs(lat) > 60;
  
  // Base vegetation values
  let ndviBase = isTemperateZone ? 0.6 : isEquatorial ? 0.8 : 0.3;
  let eviBase = isTemperateZone ? 0.5 : isEquatorial ? 0.7 : 0.2;
  
  // Adjust for randomness
  const ndvi = Math.min(1, Math.max(0, ndviBase + (locationSeed * 0.4 - 0.2)));
  const evi = Math.min(1, Math.max(0, eviBase + (locationSeed * 0.4 - 0.2)));
  
  // Land cover percentages - total should be 100%
  let forest = isTemperateZone ? 40 : isEquatorial ? 60 : 10;
  let grassland = isTemperateZone ? 30 : isEquatorial ? 20 : 20;
  let urban = 15;
  let water = 10;
  let barren = isPolar ? 50 : 5;
  
  // Adjust based on location seed
  forest = Math.min(100, Math.max(0, forest + (locationSeed * 30 - 15)));
  grassland = Math.min(100, Math.max(0, grassland + (locationSeed * 20 - 10)));
  urban = Math.min(100, Math.max(0, urban + (locationSeed * 15 - 7.5)));
  water = Math.min(100, Math.max(0, water + (locationSeed * 10 - 5)));
  barren = Math.min(100, Math.max(0, barren + (locationSeed * 20 - 10)));
  
  // Normalize to ensure total is 100%
  const total = forest + grassland + urban + water + barren;
  forest = Math.round((forest / total) * 100);
  grassland = Math.round((grassland / total) * 100);
  urban = Math.round((urban / total) * 100);
  water = Math.round((water / total) * 100);
  barren = Math.round((barren / total) * 100);
  
  // Final adjustment to ensure exactly 100%
  const finalTotal = forest + grassland + urban + water + barren;
  if (finalTotal < 100) forest += (100 - finalTotal);
  if (finalTotal > 100) forest -= (finalTotal - 100);
  
  return {
    vegetation_index: {
      ndvi: parseFloat(ndvi.toFixed(2)),
      evi: parseFloat(evi.toFixed(2))
    },
    land_cover: {
      forest_percent: forest,
      grassland_percent: grassland,
      urban_percent: urban,
      water_percent: water,
      barren_percent: barren
    }
  };
}

async function handleRequest(req: Request): Promise<Response> {
  console.log("Earth Engine API request received");
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { latitude, longitude } = await req.json() as RequestBody;
    
    if (!latitude || !longitude) {
      return new Response(
        JSON.stringify({ error: "Latitude and longitude are required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    console.log(`Processing Earth Engine request for coordinates: ${latitude}, ${longitude}`);
    
    // In a real implementation, we would call the Google Earth Engine API here
    // For now, we'll generate mock data that's realistic based on location
    const earthEngineData = generateMockEarthEngineData(latitude, longitude);
    
    console.log("Earth Engine data generated:", earthEngineData);
    
    return new Response(
      JSON.stringify(earthEngineData),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error processing Earth Engine request:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Failed to process Earth Engine data" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
}

serve(handleRequest);
