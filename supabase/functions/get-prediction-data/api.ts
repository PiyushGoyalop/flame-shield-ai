
import { WeatherData, AirPollutionData } from "./types.ts";
import { OPENWEATHER_API_KEY } from "./utils.ts";

// Basic geocoding function
export async function getCoordinates(location: string): Promise<{ lat: number; lon: number }> {
  try {
    // Clean up location string - remove extra spaces, commas at the end, etc.
    const cleanLocation = location.trim().replace(/,\s*$/, "");
    
    // Try direct city name for simplicity
    if (cleanLocation.includes(",")) {
      const parts = cleanLocation.split(",");
      // If we have a city and state/country format, try with just the city first
      const cityOnly = parts[0].trim();
      
      try {
        // Try with city only first
        const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityOnly)}&limit=1&appid=${OPENWEATHER_API_KEY}`;
        const response = await fetch(geocodingUrl);
        
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            console.log(`Found coordinates using city name: ${cityOnly}`);
            return { lat: data[0].lat, lon: data[0].lon };
          }
        }
      } catch (error) {
        console.log(`City-only geocoding failed, trying full location`);
      }
    }
    
    // Try OpenWeather geocoding with full location
    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cleanLocation)}&limit=1&appid=${OPENWEATHER_API_KEY}`;
    const response = await fetch(geocodingUrl);
    
    if (!response.ok) {
      throw new Error(`OpenWeather API returned ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      console.log(`Found coordinates for ${cleanLocation} using OpenWeather`);
      return { lat: data[0].lat, lon: data[0].lon };
    }
    
    throw new Error("Location not found. Please try a different location name format (e.g. 'San Francisco' or 'Los Angeles, CA').");
  } catch (error) {
    console.error("Geocoding error:", error);
    throw new Error("Unable to find coordinates for this location. Please try a different location name format (e.g. 'San Francisco' or 'Los Angeles, CA').");
  }
}

// Get weather data using coordinates
export async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    const response = await fetch(weatherUrl);
    
    if (!response.ok) {
      throw new Error(`OpenWeather API returned ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data || !data.main) {
      throw new Error("Incomplete weather data received");
    }
    
    return data;
  } catch (error) {
    console.error("Weather data error:", error);
    throw new Error("Failed to retrieve weather data. Please try again later.");
  }
}

// Get air pollution data using coordinates
export async function getAirPollutionData(lat: number, lon: number): Promise<AirPollutionData> {
  try {
    const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
    const response = await fetch(airPollutionUrl);
    
    if (!response.ok) {
      throw new Error(`OpenWeather API returned ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data || !data.list || data.list.length === 0) {
      throw new Error("Incomplete air pollution data received");
    }
    
    return data;
  } catch (error) {
    console.error("Air pollution data error:", error);
    throw new Error("Failed to retrieve air pollution data. Please try again later.");
  }
}
