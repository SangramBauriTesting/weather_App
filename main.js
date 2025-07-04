import { getCurrentWeatherUsingCoordinate } from "./api.js";
import {CurrentWeatherUI , ForecastWeatherUI} from "./ui.js";

(async () => {
  const response = await getCurrentWeatherUsingCoordinate();
  console.log("Current weather data:", response.current);
  console.log("Forecast data:", response.forecast);

  // You could call your UI functions here if you want
  CurrentWeatherUI(response.current);
  ForecastWeatherUI(response.forecast);
})();
