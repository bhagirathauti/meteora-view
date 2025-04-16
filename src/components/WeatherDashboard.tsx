
import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { CurrentWeather } from "./CurrentWeather";
import { WeatherForecast } from "./WeatherForecast";
import { ThemeToggle } from "./ThemeToggle";
import { WeatherData, WeatherForecast as ForecastType, fetchWeather, fetchForecast } from "@/utils/weatherApi";
import { CloudRain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function WeatherDashboard() {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
  };

  useEffect(() => {
    // Check if the user has previously searched for a city
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity && !city) {
      setCity(lastCity);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!city) return;

      setIsLoading(true);
      try {
        // Fetch both current weather and forecast data
        const [weather, forecast] = await Promise.all([
          fetchWeather(city),
          fetchForecast(city)
        ]);

        setWeatherData(weather);
        setForecastData(forecast);
        
        // Save the last searched city
        localStorage.setItem("lastCity", city);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        toast({
          title: "Error",
          description: "Could not fetch weather data. Please try another city.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (city) {
      fetchData();
    }
  }, [city, toast]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <CloudRain className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold">Weather Dashboard</h1>
          </div>
          <ThemeToggle />
        </div>

        <div className="mb-8">
          <SearchBar onCitySelect={handleCitySelect} />
        </div>

        <div className="space-y-8">
          <CurrentWeather weatherData={weatherData} isLoading={isLoading} />
          <WeatherForecast forecastData={forecastData?.list || null} isLoading={isLoading} />
        </div>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Weather data provided by{" "}
            <a
              href="https://openweathermap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              OpenWeatherMap
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
