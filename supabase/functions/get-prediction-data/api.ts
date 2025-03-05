import { WeatherData, AirPollutionData } from "./types.ts";
import { OPENWEATHER_API_KEY, WEATHERAPI_KEY } from "./utils.ts";

// Basic geocoding function with fallback
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
    
    // If OpenWeather geocoding fails, try WeatherAPI.com
    return await getCoordinatesFromWeatherAPI(cleanLocation);
  } catch (error) {
    console.error("Primary geocoding error:", error);
    console.log("Trying fallback geocoding API...");
    return await getCoordinatesFromWeatherAPI(location);
  }
}

// Fallback geocoding using WeatherAPI.com
async function getCoordinatesFromWeatherAPI(location: string): Promise<{ lat: number; lon: number }> {
  try {
    const cleanLocation = location.trim().replace(/,\s*$/, "");
    const geocodingUrl = `https://api.weatherapi.com/v1/search.json?key=${WEATHERAPI_KEY}&q=${encodeURIComponent(cleanLocation)}`;
    const response = await fetch(geocodingUrl);
    
    if (!response.ok) {
      throw new Error(`WeatherAPI.com returned ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      console.log(`Found coordinates using WeatherAPI.com: ${cleanLocation}`);
      return { 
        lat: parseFloat(data[0].lat), 
        lon: parseFloat(data[0].lon) 
      };
    } else {
      // If location contains commas, try with just the first part
      if (cleanLocation.includes(",")) {
        const cityOnly = cleanLocation.split(",")[0].trim();
        console.log(`Trying with city only: ${cityOnly}`);
        
        const simplifiedUrl = `https://api.weatherapi.com/v1/search.json?key=${WEATHERAPI_KEY}&q=${encodeURIComponent(cityOnly)}`;
        const simplifiedResponse = await fetch(simplifiedUrl);
        
        if (simplifiedResponse.ok) {
          const simplifiedData = await simplifiedResponse.json();
          if (simplifiedData && simplifiedData.length > 0) {
            console.log(`Found coordinates for simplified location: ${cityOnly}`);
            return { 
              lat: parseFloat(simplifiedData[0].lat), 
              lon: parseFloat(simplifiedData[0].lon) 
            };
          }
        }
      }
      
      throw new Error("Location not found in fallback API");
    }
  } catch (error) {
    console.error("Fallback geocoding error:", error);
    throw new Error("All geocoding services failed. Please try a different location name format (e.g. 'San Francisco' or 'Los Angeles, CA').");
  }
}

// Get weather data using coordinates with fallback
export async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
  try {
    // Try OpenWeather API first
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    const response = await fetch(weatherUrl);
    
    if (!response.ok) {
      throw new Error(`OpenWeather API returned ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data.main) {
      return data;
    }
    
    // If OpenWeather data is incomplete, try WeatherAPI.com
    return await getWeatherDataFromWeatherAPI(lat, lon);
  } catch (error) {
    console.error("Primary weather API error:", error);
    console.log("Trying fallback weather API...");
    return await getWeatherDataFromWeatherAPI(lat, lon);
  }
}

// Fallback weather data using WeatherAPI.com
async function getWeatherDataFromWeatherAPI(lat: number, lon: number): Promise<WeatherData> {
  try {
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${WEATHERAPI_KEY}&q=${lat},${lon}&aqi=yes`;
    const response = await fetch(weatherUrl);
    
    if (!response.ok) {
      throw new Error(`WeatherAPI.com returned ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data.current) {
      // Convert WeatherAPI.com format to OpenWeather format
      const adaptedData: WeatherData = {
        name: data.location.name,
        main: {
          temp: data.current.temp_c,
          humidity: data.current.humidity,
          pressure: data.current.pressure_mb,
          feels_like: data.current.feelslike_c
        },
        wind: {
          speed: data.current.wind_kph / 3.6, // convert to m/s
          deg: data.current.wind_degree
        },
        weather: [{
          main: data.current.condition.text,
          description: data.current.condition.text,
          icon: "01d" // Default icon
        }]
      };
      
      return adaptedData;
    } else {
      throw new Error("Weather data not available in fallback API");
    }
  } catch (error) {
    console.error("Fallback weather API error:", error);
    throw new Error("All weather services failed. Please try again later.");
  }
}

// Get air pollution data using coordinates with fallback
export async function getAirPollutionData(lat: number, lon: number): Promise<AirPollutionData> {
  try {
    // Try OpenWeather API first
    const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
    const response = await fetch(airPollutionUrl);
    
    if (!response.ok) {
      throw new Error(`OpenWeather API returned ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data.list && data.list.length > 0) {
      return data;
    }
    
    // If OpenWeather data is incomplete, try WeatherAPI.com
    return await getAirPollutionFromWeatherAPI(lat, lon);
  } catch (error) {
    console.error("Primary air pollution API error:", error);
    console.log("Trying fallback air pollution API...");
    return await getAirPollutionFromWeatherAPI(lat, lon);
  }
}

// Fallback air pollution data using WeatherAPI.com
async function getAirPollutionFromWeatherAPI(lat: number, lon: number): Promise<AirPollutionData> {
  try {
    const airPollutionUrl = `https://api.weatherapi.com/v1/current.json?key=${WEATHERAPI_KEY}&q=${lat},${lon}&aqi=yes`;
    const response = await fetch(airPollutionUrl);
    
    if (!response.ok) {
      throw new Error(`WeatherAPI.com returned ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data.current && data.current.air_quality) {
      // Convert WeatherAPI.com AQI format to OpenWeather format
      const aq = data.current.air_quality;
      
      // Determine AQI level (1-5) based on US EPA standard
      let aqiLevel = 1;
      const pm25 = aq.pm2_5 || 0;
      
      if (pm25 > 150) aqiLevel = 5;
      else if (pm25 > 55) aqiLevel = 4;
      else if (pm25 > 35) aqiLevel = 3;
      else if (pm25 > 12) aqiLevel = 2;
      
      const adaptedData: AirPollutionData = {
        list: [{
          main: {
            aqi: aqiLevel // 1-5 scale
          },
          components: {
            co: aq.co || 0,
            no: aq.no2 || 0, // Using NO2 as proxy for NO
            no2: aq.no2 || 0,
            o3: aq.o3 || 0,
            so2: aq.so2 || 0,
            pm2_5: aq.pm2_5 || 0,
            pm10: aq.pm10 || 0,
            nh3: 0 // Not provided by WeatherAPI
          }
        }]
      };
      
      return adaptedData;
    } else {
      throw new Error("Air pollution data not available in fallback API");
    }
  } catch (error) {
    console.error("Fallback air pollution API error:", error);
    throw new Error("All air pollution services failed. Please try again later.");
  }
}
