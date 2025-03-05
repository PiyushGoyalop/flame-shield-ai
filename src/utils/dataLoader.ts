
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

// Function to load a CSV file
export const loadCSV = async (filePath: string) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}`);
    }
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error(`Error loading CSV file ${filePath}:`, error);
    return [];
  }
};

// Cache for loaded data
const dataCache: Record<string, any[]> = {};

// Function to get historic wildfire data
export const getHistoricWildfireData = async () => {
  if (!dataCache.wildfires) {
    dataCache.wildfires = await loadCSV('/src/data/historic_wildfires.csv');
  }
  return dataCache.wildfires;
};

// Function to get CO2 emissions data
export const getCO2EmissionsData = async () => {
  if (!dataCache.co2) {
    dataCache.co2 = await loadCSV('/src/data/co2_emissions.csv');
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
