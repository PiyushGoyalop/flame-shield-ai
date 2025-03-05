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
    
    // Get historical wildfire data from USGS API
    const historicData = await getUSGSWildfireData(location, lat, lon, searchRadius);
    
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

// Fetch historical wildfire data from USGS API
async function getUSGSWildfireData(location?: string, lat?: number, lon?: number, radius: number = 50) {
  console.log("Fetching USGS wildfire data...");
  
  // Build base URL for USGS wildfire data
  // Using the GeoMAC Wildfire API endpoint
  const baseUrl = "https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/USGS_Wildland_Fire_Combined_Dataset/FeatureServer/0/query";
  
  // Get current date and date 5 years ago for historical data
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 5);
  
  // Format dates for API query
  const startDateStr = startDate.toISOString().split('T')[0];
  const endDateStr = endDate.toISOString().split('T')[0];
  
  // If we have lat/lon, use them directly
  // Otherwise, try to geocode the location name to get coordinates
  let queryLat = lat;
  let queryLon = lon;
  
  if (!queryLat || !queryLon) {
    if (location) {
      try {
        // Attempt to geocode the location name to get coordinates
        const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
        const geocodeResponse = await fetch(geocodeUrl, {
          headers: {
            "User-Agent": "WildfireRiskPredictionApp/1.0"
          }
        });
        
        if (!geocodeResponse.ok) {
          throw new Error(`Geocoding failed with status ${geocodeResponse.status}`);
        }
        
        const geocodeData = await geocodeResponse.json();
        if (geocodeData && geocodeData.length > 0) {
          queryLat = parseFloat(geocodeData[0].lat);
          queryLon = parseFloat(geocodeData[0].lon);
        } else {
          throw new Error(`Location "${location}" could not be geocoded`);
        }
      } catch (error) {
        console.error("Geocoding error:", error);
        throw new Error(`Failed to geocode location: ${error.message}`);
      }
    } else {
      throw new Error("Either location name or coordinates are required");
    }
  }
  
  console.log(`Using coordinates: ${queryLat}, ${queryLon} with radius ${radius}km`);
  
  // Convert radius from km to degrees (approximate conversion)
  // 1 degree of latitude is approximately 111 km
  const radiusDegrees = radius / 111;
  
  // Prepare USGS API parameters
  const params = new URLSearchParams({
    where: `FireDiscoveryDateTime >= DATE '${startDateStr}' AND FireDiscoveryDateTime <= DATE '${endDateStr}'`,
    geometry: `${queryLon},${queryLat}`,
    geometryType: "esriGeometryPoint",
    distance: String(radiusDegrees),
    units: "esriSRUnit_Degree",
    outFields: "FireDiscoveryDateTime,IncidentName,IncidentTypeCategory,FireCause,DailyAcres,CalculatedAcres",
    returnGeometry: "false",
    spatialRel: "esriSpatialRelIntersects",
    outSR: "4326",
    f: "json"
  });
  
  try {
    // Make request to USGS API
    const response = await fetch(`${baseUrl}?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    if (!response.ok) {
      throw new Error(`USGS API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`USGS API returned ${data.features?.length || 0} wildfire records`);
    
    // Process and transform the data into our required format
    return processUSGSData(data, location || `Coordinates (${queryLat}, ${queryLon})`, radius);
  } catch (error) {
    console.error("USGS API request error:", error);
    throw new Error(`Failed to fetch USGS wildfire data: ${error.message}`);
  }
}

// Process and transform USGS data into our application format
function processUSGSData(usgsData: any, locationName: string, radius: number) {
  // Default response structure
  const historicData = {
    location: locationName,
    radius_km: radius,
    total_incidents: 0,
    yearly_incidents: [],
    severity_distribution: { low: 0, medium: 0, high: 0, extreme: 0 },
    causes: { lightning: 0, human: 0, unknown: 0 },
    largest_fire_acres: 0,
    average_fire_size_acres: 0
  };
  
  // If no data or no features, return default structure
  if (!usgsData || !usgsData.features || !Array.isArray(usgsData.features)) {
    console.warn("No wildfire data found for this location");
    return historicData;
  }
  
  const features = usgsData.features;
  const totalIncidents = features.length;
  historicData.total_incidents = totalIncidents;
  
  // Initialize tracking variables
  let totalAcres = 0;
  let yearlyData = {};
  const currentYear = new Date().getFullYear();
  
  // Process each wildfire incident
  features.forEach(feature => {
    const attributes = feature.attributes;
    
    // Skip if missing critical data
    if (!attributes || !attributes.FireDiscoveryDateTime) {
      return;
    }
    
    // Parse fire date and get year
    const fireDate = new Date(attributes.FireDiscoveryDateTime);
    const fireYear = fireDate.getFullYear();
    
    // Only process data within the 5-year window
    if (fireYear < currentYear - 5 || fireYear > currentYear) {
      return;
    }
    
    // Initialize year data if not exists
    if (!yearlyData[fireYear]) {
      yearlyData[fireYear] = {
        year: fireYear,
        incidents: 0,
        severity: { low: 0, medium: 0, high: 0, extreme: 0 },
        causes: { lightning: 0, human: 0, unknown: 0 },
        largest_fire_acres: 0,
        average_fire_size_acres: 0,
        total_acres: 0
      };
    }
    
    // Increment incident count
    yearlyData[fireYear].incidents++;
    
    // Extract fire size (acres)
    let fireSize = 0;
    if (attributes.CalculatedAcres) {
      fireSize = parseFloat(attributes.CalculatedAcres);
    } else if (attributes.DailyAcres) {
      fireSize = parseFloat(attributes.DailyAcres);
    }
    
    // Validate fire size
    if (!isNaN(fireSize) && fireSize > 0) {
      totalAcres += fireSize;
      yearlyData[fireYear].total_acres += fireSize;
      
      // Update largest fire size
      if (fireSize > historicData.largest_fire_acres) {
        historicData.largest_fire_acres = fireSize;
      }
      
      if (fireSize > yearlyData[fireYear].largest_fire_acres) {
        yearlyData[fireYear].largest_fire_acres = fireSize;
      }
      
      // Categorize severity based on fire size
      if (fireSize < 100) {
        historicData.severity_distribution.low++;
        yearlyData[fireYear].severity.low++;
      } else if (fireSize < 1000) {
        historicData.severity_distribution.medium++;
        yearlyData[fireYear].severity.medium++;
      } else if (fireSize < 10000) {
        historicData.severity_distribution.high++;
        yearlyData[fireYear].severity.high++;
      } else {
        historicData.severity_distribution.extreme++;
        yearlyData[fireYear].severity.extreme++;
      }
    }
    
    // Categorize fire cause
    const fireCause = (attributes.FireCause || "").toLowerCase();
    if (fireCause.includes("lightning")) {
      historicData.causes.lightning++;
      yearlyData[fireYear].causes.lightning++;
    } else if (fireCause.includes("human") || 
               fireCause.includes("campfire") || 
               fireCause.includes("equipment") || 
               fireCause.includes("arson") || 
               fireCause.includes("debris") || 
               fireCause.includes("railroad") || 
               fireCause.includes("powerline") || 
               fireCause.includes("smoking")) {
      historicData.causes.human++;
      yearlyData[fireYear].causes.human++;
    } else {
      historicData.causes.unknown++;
      yearlyData[fireYear].causes.unknown++;
    }
  });
  
  // Calculate average fire size
  if (totalIncidents > 0) {
    historicData.average_fire_size_acres = Math.round(totalAcres / totalIncidents);
  }
  
  // Calculate yearly averages and create sorted yearly incidents array
  historicData.yearly_incidents = Object.values(yearlyData)
    .map(yearData => {
      const year = yearData as any;
      if (year.incidents > 0) {
        year.average_fire_size_acres = Math.round(year.total_acres / year.incidents);
      }
      delete year.total_acres; // Remove temporary property
      return year;
    })
    .sort((a: any, b: any) => a.year - b.year);
  
  console.log(`Processed ${totalIncidents} wildfire incidents spanning ${historicData.yearly_incidents.length} years`);
  
  return historicData;
}
