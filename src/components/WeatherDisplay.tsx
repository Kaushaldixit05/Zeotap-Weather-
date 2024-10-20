import React from 'react';
import { WeatherData, City } from '../types/WeatherTypes';
import { kelvinToCelsius } from '../services/WeatherService';
import { Cloud, Sun, CloudRain, Snowflake } from 'lucide-react';

interface WeatherDisplayProps {
  city: City;
  weatherData: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city, weatherData }) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case 'clouds':
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case 'rain':
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      case 'snow':
        return <Snowflake className="w-8 h-8 text-blue-200" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-2">
      <h2 className="text-xl font-bold mb-2">{city.name}</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-semibold">
            {kelvinToCelsius(weatherData.temp).toFixed(1)}°C
          </p>
          <p className="text-sm text-gray-600">
            Feels like: {kelvinToCelsius(weatherData.feels_like).toFixed(1)}°C
          </p>
        </div>
        <div className="flex flex-col items-center">
          {getWeatherIcon(weatherData.main)}
          <p className="text-sm mt-1">{weatherData.main}</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Last updated: {new Date(weatherData.dt * 1000).toLocaleTimeString()}
      </p>
    </div>
  );
};

export default WeatherDisplay;