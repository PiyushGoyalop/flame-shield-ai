
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
    const { location, dataType, startYear, endYear } = await req.json();
    
    if (!location) {
      return new Response(
        JSON.stringify({ error: "Location parameter is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Default to wildfire data if not specified
    const requestedDataType = dataType || 'wildfires';
    
    console.log(`Fetching failsafe ${requestedDataType} data for ${location}`);
    
    // Process the request based on data type
    let responseData;
    if (requestedDataType === 'wildfires') {
      // Filter by year range if provided
      responseData = await getHistoricWildfireData(location, startYear, endYear);
    } else if (requestedDataType === 'co2') {
      responseData = await getCO2EmissionsData(location);
    } else {
      return new Response(
        JSON.stringify({ error: `Unsupported data type: ${requestedDataType}` }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    return new Response(
      JSON.stringify(responseData),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error processing failsafe data request:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Failed to process failsafe data" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
}

// Function to get historic wildfire data
async function getHistoricWildfireData(location: string, startYear?: number, endYear?: number) {
  console.log("Getting historic wildfire failsafe data");
  
  // Note: In a real implementation, you would query your large CSV dataset
  // For now, we're using a small subset of data as an example
  
  // This is a placeholder for where you would implement your 
  // large CSV file processing logic. In a production environment, 
  // you would:
  // 1. Store the CSV in a bucket or database
  // 2. Use streaming to process it in chunks
  // 3. Use indexing to quickly find relevant data
  
  // Sample data structure (you would replace this with actual data access)
  const wildfireData = [
    {year: 2019, location: "California", incidents: 7860, acres_burned: 259823, fatalities: 3, structures_damaged: 732},
    {year: 2020, location: "California", incidents: 9917, acres_burned: 4257863, fatalities: 33, structures_damaged: 10488},
    {year: 2021, location: "California", incidents: 8835, acres_burned: 2568948, fatalities: 3, structures_damaged: 3629},
    {year: 2019, location: "Oregon", incidents: 2215, acres_burned: 79121, fatalities: 0, structures_damaged: 123},
    {year: 2020, location: "Oregon", incidents: 2215, acres_burned: 1221324, fatalities: 11, structures_damaged: 4009},
    {year: 2021, location: "Oregon", incidents: 1940, acres_burned: 828777, fatalities: 0, structures_damaged: 237}
  ];
  
  // Filter by location (case-insensitive partial match)
  const normalizedLocation = location.toLowerCase();
  let filteredData = wildfireData.filter(item => 
    item.location.toLowerCase().includes(normalizedLocation) || 
    normalizedLocation.includes(item.location.toLowerCase())
  );
  
  // If no data found for specific location, return default data
  if (filteredData.length === 0) {
    // Default to California data if no match found
    filteredData = wildfireData.filter(item => item.location === "California");
  }
  
  // Filter by year range if provided
  if (startYear) {
    filteredData = filteredData.filter(item => item.year >= startYear);
  }
  
  if (endYear) {
    filteredData = filteredData.filter(item => item.year <= endYear);
  }
  
  // For a real implementation with an 800MB file, you would:
  // 1. Store the file in Supabase storage or another suitable location
  // 2. Use a database (like PostgreSQL) to store indexed versions of the data
  // 3. Create efficient queries to retrieve only the needed data

  // Process data for response
  const yearlyIncidents = filteredData.map(item => ({
    year: item.year,
    incidents: item.incidents
  }));
  
  // Calculate totals and averages
  const totalIncidents = filteredData.reduce((sum, item) => sum + item.incidents, 0);
  const largestFireAcres = Math.max(...filteredData.map(item => item.acres_burned));
  const averageFireSizeAcres = Math.round(
    filteredData.reduce((sum, item) => sum + item.acres_burned, 0) / totalIncidents
  );
  
  // Generate mock severity and causes data based on the filtered data
  // In a real implementation, this would come from your CSV file
  const severityDistribution = {
    low: Math.round(totalIncidents * 0.5),
    medium: Math.round(totalIncidents * 0.3),
    high: Math.round(totalIncidents * 0.15),
    extreme: Math.round(totalIncidents * 0.05)
  };
  
  const causes = {
    lightning: Math.round(totalIncidents * 0.3),
    human: Math.round(totalIncidents * 0.6),
    unknown: Math.round(totalIncidents * 0.1)
  };
  
  return {
    location: location,
    total_incidents: totalIncidents,
    yearly_incidents: yearlyIncidents,
    severity_distribution: severityDistribution,
    causes: causes,
    largest_fire_acres: largestFireAcres,
    average_fire_size_acres: averageFireSizeAcres
  };
}

// Function to get CO2 emissions data
async function getCO2EmissionsData(location: string) {
  console.log("Getting CO2 emissions failsafe data");
  
  // Sample CO2 data (you would replace with actual data access)
  const co2Data = [
    {location: "California", average_co2_mt: 19.5, peak_co2_mt: 36.2, seasonal_variation: "High"},
    {location: "Oregon", average_co2_mt: 13.8, peak_co2_mt: 21.4, seasonal_variation: "Medium"},
    {location: "Washington", average_co2_mt: 12.7, peak_co2_mt: 18.9, seasonal_variation: "Medium"},
    {location: "Colorado", average_co2_mt: 15.1, peak_co2_mt: 23.6, seasonal_variation: "Medium"},
    {location: "Arizona", average_co2_mt: 17.9, peak_co2_mt: 30.2, seasonal_variation: "High"}
  ];
  
  // Filter by location (case-insensitive partial match)
  const normalizedLocation = location.toLowerCase();
  const matchingData = co2Data.find(item => 
    item.location.toLowerCase().includes(normalizedLocation) || 
    normalizedLocation.includes(item.location.toLowerCase())
  );
  
  // If no match found, return California data as default
  if (!matchingData) {
    return co2Data.find(item => item.location === "California");
  }
  
  return matchingData;
}
