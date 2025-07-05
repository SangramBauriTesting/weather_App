import {
	getCurrentWeatherUsingCoordinate,
	getCurrentWeatherUsingCityName,
} from "./api.js";
import { CurrentWeatherUI, ForecastWeatherUI } from "./ui.js";

const content = document.querySelector("#content");
const loading = document.querySelector("#loading");
content.style.visibility = "hidden";
loading.style.visibility = "visible";

//immediate excute when page load
(async () => {
	const response = await getCurrentWeatherUsingCoordinate();
	console.log("Current weather data:", response.current);
	console.log("Forecast data:", response.forecast);

	if (
		response.current != null &&
		response.current != undefined &&
		response.forecast != null &&
		response.forecast != undefined
	) {
		CurrentWeatherUI(response.current);
		ForecastWeatherUI(response.forecast);

		content.style.visibility = "visible";
		loading.style.visibility = "hidden";
	}
})();

//select search input
const userInput = document.getElementById("cityInput");

userInput.addEventListener("keydown", async (e) => {
	if (e.key === "Enter") {
		const response = await getCurrentWeatherUsingCityName(userInput.value);
		console.log("Current weather data: city", response.current);
		console.log("Forecast data: city", response.forecast);
		if (
			response.current != null &&
			response.current != undefined &&
			response.forecast != null &&
			response.forecast != undefined
		) {
			CurrentWeatherUI(response.current);
			ForecastWeatherUI(response.forecast);
			userInput.value = "";
		}
	}
});

//after click the location btn

const getLocationBtn = document.querySelector(".locationIcon");
console.log(getLocationBtn);

async function getWeatherDataAfterClickLoc() {
	const response = await getCurrentWeatherUsingCoordinate();
	console.log("Current weather data:", response.current);
	console.log("Forecast data:", response.forecast);
	if (
		response.current != null &&
		response.current != undefined &&
		response.forecast != null &&
		response.forecast != undefined
	) {
		CurrentWeatherUI(response.current);
		ForecastWeatherUI(response.forecast);
	}
}

getLocationBtn.addEventListener("click", getWeatherDataAfterClickLoc);
