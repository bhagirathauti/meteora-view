
import { ForecastDay, formatDate, getWeatherIconUrl } from "@/utils/weatherApi";
import { Card, CardContent } from "@/components/ui/card";
import { Thermometer } from "lucide-react";

interface ForecastCardProps {
  forecast: ForecastDay;
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardContent className="p-4 text-center">
        <h3 className="font-medium text-sm mb-2">{formatDate(forecast.date)}</h3>
        
        <div className="flex justify-center mb-2">
          <img 
            src={getWeatherIconUrl(forecast.icon)} 
            alt={forecast.description}
            className="w-12 h-12" 
          />
        </div>
        
        <p className="text-xs capitalize mb-3">{forecast.description}</p>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center">
            <Thermometer className="h-3 w-3 text-blue-500 mr-1" />
            <span>{forecast.min_temp}°</span>
          </div>
          <div className="h-0.5 w-3 bg-muted mx-1"></div>
          <div className="flex items-center">
            <Thermometer className="h-3 w-3 text-orange-500 mr-1" />
            <span>{forecast.max_temp}°</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
