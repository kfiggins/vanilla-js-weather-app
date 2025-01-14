import { convertToFahrenheit } from "../../utils/convert-to-fahrenheit.js";

export default async () => {
  const currentLocation = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  }).catch((error) => {
    console.error("There was a problem with the geolocation operation:", error);
  });

  if (!currentLocation) {
    return `<h1>Could not get your location</h1>`;
  }

  const weatherData = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${currentLocation.coords.latitude}&longitude=${currentLocation.coords.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`,
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

  const forcastData = weatherData.daily.time.map((time, index) => {
    return `<div>
              <p>Date: ${time}</p>     
              <p>Max Temperature: ${convertToFahrenheit(weatherData.daily.temperature_2m_max[index])} F</p>
              <p>Min Temperature: ${convertToFahrenheit(weatherData.daily.temperature_2m_min[index])} F</p>
              <p>Precipitation: ${weatherData.daily.precipitation_sum[index]} mm</p>
            </div>`;
  });

  return `<div>
           <h1>Daily Forcast</h1>
           ${forcastData.join("")}
         </div>`;
};
