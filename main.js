import { getCurrentWeatherUsingCoordinate ,  getCurrentWeatherUsingCityName} from "./api.js";
import {CurrentWeatherUI , ForecastWeatherUI} from "./ui.js";


//immediate excute when page load
(async () => {
  const response = await getCurrentWeatherUsingCoordinate();
  console.log("Current weather data:", response.current);
  console.log("Forecast data:", response.forecast);

  // You could call your UI functions here if you want
  CurrentWeatherUI(response.current);
  ForecastWeatherUI(response.forecast);
})();


//select search input 
const userInput = document.getElementById("cityInput");

userInput.addEventListener("keydown",async (e)=>{
   if (e.key === "Enter")
    {
  const response = await getCurrentWeatherUsingCityName(userInput.value);
  console.log("Current weather data: city", response.current);
  console.log("Forecast data: city", response.forecast);

  CurrentWeatherUI(response.current);
  ForecastWeatherUI(response.forecast);
  userInput.value='';
    }
})


//after click the location btn 

const getLocationBtn = document.querySelector('.locationIcon');
console.log(getLocationBtn);

async function getWeatherDataAfterClickLoc() {
  
    const response = await getCurrentWeatherUsingCoordinate();
    console.log("Current weather data:", response.current);
    console.log("Forecast data:", response.forecast);
    
    CurrentWeatherUI(response.current);
  ForecastWeatherUI(response.forecast);
   
 
}

getLocationBtn.addEventListener('click',getWeatherDataAfterClickLoc);





