
import { serve } from 'https://deno.land/std@0.170.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  latitude: number;
  longitude: number;
}

// Generate realistic mock data based on location
function generateMockEarthEngineData(lat: number, lon: number) {
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
  
  // Land cover percentages
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
  const forestPercent = Math.round((forest / total) * 100);
  const grasslandPercent = Math.round((grassland / total) * 100);
  const urbanPercent = Math.round((urban / total) * 100);
  const waterPercent = Math.round((water / total) * 100);
  const barrenPercent = Math.round((barren / total) * 100);
  
  return {
    vegetation_index: {
      ndvi: parseFloat(ndvi.toFixed(2)),
      evi: parseFloat(evi.toFixed(2)),
      data_source: 'simulated_data',
      request_timestamp: new Date().toISOString()
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

serve(async (req: Request) => {
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
    
    const mockData = generateMockEarthEngineData(latitude, longitude);
    
    return new Response(
      JSON.stringify(mockData),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
    
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to process request",
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});

