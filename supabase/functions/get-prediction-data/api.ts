
import { WeatherData, AirPollutionData } from "./types.ts";
import { OPENWEATHER_API_KEY } from "./utils.ts";

// Basic geocoding function
export async function getCoordinates(location: string): Promise<{ lat: number; lon: number }> {
  try {
    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${OPENWEATHER_API_KEY}`;
    const response = await fetch(geocodingUrl);
    const data = await response.json();
    
    if (data && data.length > 0) {
      return { lat: data[0].lat, lon: data[0].lon };
    } else {
      throw new Error("Location not found");
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
}

// Get weather data using coordinates
export async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
  try {
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    const response = await fetch(weatherUrl);
    const data = await response.json();
    
    if (data && data.main) {
      return data;
    } else {
      throw new Error("Weather data not available");
    }
  } catch (error) {
    console.error("Weather API error:", error);
    throw error;
  }
}

// Get air pollution data using coordinates
export async function getAirPollutionData(lat: number, lon: number): Promise<AirPollutionData> {
  try {
    const airPollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
    const response = await fetch(airPollutionUrl);
    const data = await response.json();
    
    if (data && data.list && data.list.length > 0) {
      return data;
    } else {
      throw new Error("Air pollution data not available");
    }
  } catch (error) {
    console.error("Air Pollution API error:", error);
    throw error;
  }
}
