
import { supabase } from "@/integrations/supabase/client";

/**
 * Utility functions to load and parse CSV data files
 */

// Function to parse CSV data
export const parseCSV = (csvText: string) => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj: Record<string, string | number>, header, index) => {
      // Convert numeric values
      const value = values[index];
      obj[header] = /^\d+(\.\d+)?$/.test(value) ? parseFloat(value) : value;
      return obj;
    }, {});
  });
};

// Function to load a CSV file with a size-aware approach
export const loadCSV = async (filePath: string, maxRows = 1000) => {
  try {
    console.log(`Loading CSV data from ${filePath} (limit: ${maxRows} rows)`);
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}: ${response.status}`);
    }
    
    // Check if the response is streamed
    const reader = response.body?.getReader();
    
    if (reader) {
      // For very large files, process the data in chunks
      console.log("Using streaming approach for large CSV file");
      
      let csvText = '';
      let rowCount = 0;
      let headerRead = false;
      let header = '';
      
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        // Decode the chunk
        const chunk = new TextDecoder().decode(value);
        
        if (!headerRead) {
          // Extract header from first chunk
          const headerEndIndex = chunk.indexOf('\n');
          if (headerEndIndex !== -1) {
            header = chunk.substring(0, headerEndIndex);
            headerRead = true;
          }
        }
        
        // Count the rows in this chunk
        const newLines = (chunk.match(/\n/g) || []).length;
        rowCount += newLines;
        
        // Append chunk to the accumulated text
        csvText += chunk;
        
        // If we've reached our limit, stop reading
        if (rowCount >= maxRows) {
          console.log(`Reached row limit (${maxRows}). Stopping CSV read.`);
          break;
        }
      }
      
      return parseCSV(csvText);
    } else {
      // Fallback for smaller files or browsers that don't support streaming
      console.log("Using standard approach for CSV file");
      const csvText = await response.text();
      
      // Limit the number of rows processed
      const lines = csvText.trim().split('\n');
      const limitedText = lines.slice(0, maxRows + 1).join('\n'); // +1 for header
      
      return parseCSV(limitedText);
    }
  } catch (error) {
    console.error(`Error loading CSV file ${filePath}:`, error);
    
    // Try to get data from the failsafe endpoint
    try {
      const fileType = filePath.includes('wildfire') ? 'wildfires' : 'co2';
      console.log(`Attempting to get failsafe data for ${fileType}`);
      
      const { data, error: failsafeError } = await supabase.functions.invoke('get-historic-data-failsafe', {
        body: { 
          location: 'California', // Default location
          dataType: fileType 
        }
      });
      
      if (failsafeError) {
        console.error("Failsafe endpoint also failed:", failsafeError);
        return [];
      }
      
      if (data) {
        console.log("Using failsafe data from endpoint");
        return fileType === 'wildfires' ? data.yearly_incidents || [] : [data];
      }
    } catch (failsafeError) {
      console.error("Error accessing failsafe endpoint:", failsafeError);
    }
    
    return [];
  }
};

// Cache for loaded data
const dataCache: Record<string, any[]> = {};

// Function to get historic wildfire data
export const getHistoricWildfireData = async () => {
  if (!dataCache.wildfires) {
    try {
      // First try to load from local file
      dataCache.wildfires = await loadCSV('/src/data/historic_wildfires.csv');
      
      // If no data was loaded, try the failsafe endpoint
      if (dataCache.wildfires.length === 0) {
        throw new Error("No data loaded from CSV");
      }
    } catch (error) {
      console.error("Error loading wildfire data from file:", error);
      console.log("Trying failsafe endpoint for wildfire data");
      
      try {
        const { data, error: failsafeError } = await supabase.functions.invoke('get-historic-data-failsafe', {
          body: { 
            location: 'California', // Default location
            dataType: 'wildfires' 
          }
        });
        
        if (failsafeError) {
          console.error("Failsafe endpoint also failed:", failsafeError);
          dataCache.wildfires = [];
        } else if (data && data.yearly_incidents) {
          // Transform the data to match the expected format
          dataCache.wildfires = data.yearly_incidents.map((item: any) => ({
            year: item.year,
            location: data.location,
            incidents: item.incidents,
            acres_burned: data.largest_fire_acres / data.yearly_incidents.length, // Estimate
            fatalities: 0,
            structures_damaged: 0
          }));
        } else {
          dataCache.wildfires = [];
        }
      } catch (failsafeError) {
        console.error("Error accessing failsafe endpoint:", failsafeError);
        dataCache.wildfires = [];
      }
    }
  }
  return dataCache.wildfires;
};

// Function to get CO2 emissions data
export const getCO2EmissionsData = async () => {
  if (!dataCache.co2) {
    try {
      // First try to load from local file
      dataCache.co2 = await loadCSV('/src/data/co2_emissions.csv');
      
      // If no data was loaded, try the failsafe endpoint
      if (dataCache.co2.length === 0) {
        throw new Error("No data loaded from CSV");
      }
    } catch (error) {
      console.error("Error loading CO2 data from file:", error);
      console.log("Trying failsafe endpoint for CO2 data");
      
      try {
        const { data, error: failsafeError } = await supabase.functions.invoke('get-historic-data-failsafe', {
          body: { 
            location: 'California', // Default location
            dataType: 'co2'
          }
        });
        
        if (failsafeError) {
          console.error("Failsafe endpoint also failed:", failsafeError);
          dataCache.co2 = [];
        } else if (data) {
          dataCache.co2 = [data];
        } else {
          dataCache.co2 = [];
        }
      } catch (failsafeError) {
        console.error("Error accessing failsafe endpoint:", failsafeError);
        dataCache.co2 = [];
      }
    }
  }
  return dataCache.co2;
};

// Function to find the best matching location in the dataset
export const findMatchingLocation = (dataset: any[], location: string) => {
  const normalizedLocation = location.toLowerCase();
  
  // Try to find an exact match first
  const exactMatch = dataset.find(item => 
    (item.location as string).toLowerCase() === normalizedLocation
  );
  
  if (exactMatch) return exactMatch;
  
  // Try to find a partial match
  for (const item of dataset) {
    if (normalizedLocation.includes((item.location as string).toLowerCase()) || 
        (item.location as string).toLowerCase().includes(normalizedLocation)) {
      return item;
    }
  }
  
  // Return the first item as a fallback or null if dataset is empty
  return dataset[0] || null;
};
