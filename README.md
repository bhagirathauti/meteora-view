
# Weather Dashboard

A modern, responsive weather application built with React, TypeScript, and Tailwind CSS. Get real-time weather data and forecasts for any city.

![Weather Dashboard Preview](https://openweathermap.org/img/wn/02d@2x.png)

## Features

- **Location Search**: Search for any city with autocomplete suggestions
- **Current Weather**: View detailed current weather conditions
- **5-Day Forecast**: See upcoming weather with daily high/low temperatures
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark Mode**: Toggle between light and dark themes
- **Persistent Preferences**: Remembers your last searched city and theme preference

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies
```sh
npm install
```

3. Set up your API Key
   - Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
   - Open `src/utils/weatherApi.ts` and replace `YOUR_OPENWEATHERMAP_API_KEY` with your actual API key

4. Start the development server
```sh
npm run dev
```

5. Open your browser and navigate to `http://localhost:8080`

## Technologies Used

- **React**: UI component library
- **TypeScript**: Static typing
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool
- **shadcn/ui**: Reusable UI components
- **Axios**: HTTP client
- **Lucide React**: Icon library
- **OpenWeatherMap API**: Weather data provider

## Project Structure

- `src/components`: React components
  - `WeatherDashboard.tsx`: Main container component
  - `SearchBar.tsx`: City search with autocomplete
  - `CurrentWeather.tsx`: Current weather display
  - `WeatherForecast.tsx`: 5-day forecast container
  - `ForecastCard.tsx`: Individual day forecast
  - `ThemeToggle.tsx`: Dark/light mode toggle
- `src/utils`: Utility functions
  - `weatherApi.ts`: API calls and data formatting
- `src/hooks`: Custom React hooks

## Customization

- **Theme**: Modify the theme in `src/index.css` and `tailwind.config.ts`
- **API Integration**: Change API endpoints and params in `src/utils/weatherApi.ts`
- **UI Components**: Customize UI components in the `src/components/ui` directory

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing weather data
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [shadcn/ui](https://ui.shadcn.com/) for reusable UI components
