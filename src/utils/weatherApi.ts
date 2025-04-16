
import axios from 'axios';

// OpenWeatherMap API configuration
const API_KEY = '1f42090ef6b3a90c23bc3d8556a5e661'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Types
export interface WeatherData {
  city: string;
  country: string;
  date: number;
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
}

export interface ForecastDay {
  date: number;
  min_temp: number;
  max_temp: number;
  description: string;
  icon: string;
}

export interface WeatherForecast {
  city: string;
  country: string;
  list: ForecastDay[];
}

// Fetch current weather data
export const fetchWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY,
      },
    });

    const data = response.data;
    
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000, // Convert to milliseconds
      temperature: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      sunrise: data.sys.sunrise * 1000, // Convert to milliseconds
      sunset: data.sys.sunset * 1000, // Convert to milliseconds
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Fetch 5-day forecast
export const fetchForecast = async (city: string): Promise<WeatherForecast> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY,
      },
    });

    const data = response.data;
    
    // Process the forecast data to get daily forecasts
    const dailyForecasts: ForecastDay[] = [];
    const forecastMap = new Map();
    
    // Group forecasts by day
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const day = date.toISOString().split('T')[0];
      
      if (!forecastMap.has(day)) {
        forecastMap.set(day, {
          temps: [],
          icons: [],
          descriptions: [],
          date: date.getTime(),
        });
      }
      
      const dayData = forecastMap.get(day);
      dayData.temps.push(item.main.temp);
      dayData.icons.push(item.weather[0].icon);
      dayData.descriptions.push(item.weather[0].description);
    });
    
    // Calculate min and max temperatures for each day
    forecastMap.forEach((value, key) => {
      const temps = value.temps;
      const min_temp = Math.round(Math.min(...temps));
      const max_temp = Math.round(Math.max(...temps));
      
      // Get the most common icon and description
      const iconCounts = value.icons.reduce((acc: any, icon: string) => {
        acc[icon] = (acc[icon] || 0) + 1;
        return acc;
      }, {});
      
      const descCounts = value.descriptions.reduce((acc: any, desc: string) => {
        acc[desc] = (acc[desc] || 0) + 1;
        return acc;
      }, {});
      
      const icon = Object.keys(iconCounts).reduce((a, b) => 
        iconCounts[a] > iconCounts[b] ? a : b, Object.keys(iconCounts)[0]);
      
      const description = Object.keys(descCounts).reduce((a, b) => 
        descCounts[a] > descCounts[b] ? a : b, Object.keys(descCounts)[0]);
      
      dailyForecasts.push({
        date: value.date,
        min_temp,
        max_temp,
        description,
        icon,
      });
    });
    
    // Sort by date and limit to 5 days
    dailyForecasts.sort((a, b) => a.date - b.date);
    
    return {
      city: data.city.name,
      country: data.city.country,
      list: dailyForecasts.slice(0, 5),
    };
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};

// Function to get city suggestions (simulating autocomplete)
export const getCitySuggestions = async (query: string): Promise<string[]> => {
  // In a real app, this would call a geocoding API like Google Places or OpenWeatherMap Geo API
  // For now, we'll use a simple simulation with common cities
  const cities = [
    'Pune, IN', 'London', 'New York', 'Tokyo', 'Paris', 'Berlin', 'Sydney', 
    'Beijing', 'Moscow', 'Rio de Janeiro', 'Cairo', 'Toronto',
    'Delhi', 'Mumbai', 'Dubai', 'Singapore', 'Barcelona', 'Madrid',
    'Rome', 'Athens', 'Amsterdam', 'Istanbul', 'Bangkok', 'Hong Kong',
    'Los Angeles', 'Chicago', 'Miami', 'San Francisco', 'Seattle',
    'Vancouver', 'Montreal', 'Mexico City', 'Buenos Aires', 'São Paulo',
    'Lagos', 'Cape Town', 'Helsinki', 'Stockholm', 'Oslo', 'Copenhagen',
    'Vienna', 'Prague', 'Budapest', 'Warsaw', 'Dublin', 'Edinburgh',
    'Brussels', 'Lisbon', 'Zurich', 'Geneva', 'Seoul', 'Manila',
    'Jakarta', 'Auckland', 'Wellington', 'Melbourne'
  ];
  
  // Filter cities that match the query
  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(query.toLowerCase())
  );
  
  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(filteredCities.slice(0, 5));
    }, 300);
  });
};

// Helper function to format date
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

// Helper function to format time
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Function to get weather icon URL
export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
