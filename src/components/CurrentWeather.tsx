
import { WeatherData, formatDate, formatTime, getWeatherIconUrl } from "@/utils/weatherApi";
import { Card, CardContent } from "@/components/ui/card";
import { Thermometer, Droplets, Wind, Sunrise, Sunset } from "lucide-react";

interface CurrentWeatherProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
}

export function CurrentWeather({ weatherData, isLoading }: CurrentWeatherProps) {
  if (isLoading) {
    return (
      <Card className="w-full h-64 animate-pulse">
        <CardContent className="p-6">
          <div className="h-7 bg-muted rounded w-1/3 mb-4"></div>
          <div className="h-16 bg-muted rounded w-1/2 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-4/6"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Search for a city to see current weather
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-primary/80 to-accent/80 text-white p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">
                {weatherData.city}, {weatherData.country}
              </h2>
              <p className="text-sm opacity-90">{formatDate(weatherData.date)}</p>
            </div>
            <div className="flex items-center mt-4 md:mt-0">
              <img
                src={getWeatherIconUrl(weatherData.icon)}
                alt={weatherData.description}
                className="w-16 h-16"
              />
              <div className="ml-2">
                <p className="text-4xl font-bold">{weatherData.temperature}°C</p>
                <p className="text-sm capitalize">{weatherData.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 text-primary mr-2" />
            <div>
              <p className="text-sm text-muted-foreground">Feels Like</p>
              <p className="font-medium">{weatherData.feels_like}°C</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Droplets className="h-5 w-5 text-primary mr-2" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-medium">{weatherData.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Wind className="h-5 w-5 text-primary mr-2" />
            <div>
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="font-medium">{weatherData.wind_speed} m/s</p>
            </div>
          </div>
          
          <div className="flex items-center col-span-2 md:col-span-1">
            <div className="flex items-center">
              <Sunrise className="h-5 w-5 text-primary mr-2" />
              <div>
                <p className="text-sm text-muted-foreground">Sunrise</p>
                <p className="font-medium">{formatTime(weatherData.sunrise)}</p>
              </div>
            </div>
            <div className="flex items-center ml-4">
              <Sunset className="h-5 w-5 text-primary mr-2" />
              <div>
                <p className="text-sm text-muted-foreground">Sunset</p>
                <p className="font-medium">{formatTime(weatherData.sunset)}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
