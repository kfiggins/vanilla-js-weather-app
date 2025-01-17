import { weatherCodeToIcon } from "./config/weather-code-to-icon.js";
import { convertMetersToFeet } from "./helpers/convert-meters-to-feet.js";
import { convertToFahrenheit } from "../../utils/convert-to-fahrenheit.js";

export default async ({ appStore }) => {
  const currentLocation = appStore.getState().currentLocation;

  if (!currentLocation) {
    return `<h1>Could not get your location</h1>`;
  }

  const weatherData = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${currentLocation.coords.latitude}&longitude=${currentLocation.coords.longitude}&current_weather=true`,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  return `<div>
           <h1>Current Local Weather</h1>

           <p>Temperature: ${convertToFahrenheit(weatherData.current_weather.temperature)} F</p><p>Temperature: ${weatherData.current_weather.temperature} C</p>
           <p>Wind Speed: ${weatherData.current_weather.windspeed}</p>
           <p>Wind Direction: ${weatherData.current_weather.winddirection}</p>

          <p>Elevation: ${convertMetersToFeet(weatherData.elevation)} ft</p><p>Elevation: ${weatherData.elevation}m</p>

          <p>Weather Condition: ${weatherCodeToIcon[weatherData.current_weather.weathercode]}</p> </div>`;
};
