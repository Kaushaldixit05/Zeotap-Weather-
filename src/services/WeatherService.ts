import axios from 'axios';
import { WeatherData, City } from '../types/WeatherTypes';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (city: City): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`);
    const { main, weather, dt } = response.data;
    return {
      main: weather[0].main,
      temp: main.temp,
      feels_like: main.feels_like,
      dt: dt
    };
  } catch (error) {
    console.error(`Error fetching weather data for ${city.name}:`, error);
    throw error;
  }
};

export const kelvinToCelsius = (kelvin: number): number => {
  return kelvin - 273.15;
};