
import { ForecastDay } from "@/utils/weatherApi";
import { ForecastCard } from "./ForecastCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WeatherForecastProps {
  forecastData: ForecastDay[] | null;
  isLoading: boolean;
}

export function WeatherForecast({ forecastData, isLoading }: WeatherForecastProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="h-7 bg-muted rounded w-1/4 animate-pulse"></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="h-32 bg-muted rounded animate-pulse"></div>
              ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!forecastData || forecastData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Search for a city to see the forecast
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {forecastData.map((day, index) => (
            <ForecastCard key={index} forecast={day} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
