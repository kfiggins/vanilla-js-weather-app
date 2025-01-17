import { convertToFahrenheit } from "../../utils/convert-to-fahrenheit.js";
const fetchCoordinatesFromZip = async (zip) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?postalcode=${zip}&country=US&format=json`,
  );
  const data = await response.json();

  if (data.length === 0) throw new Error("No results found");
  const { lat, lon } = data[0];
  return {
    latitude: parseFloat(lat),
    longitude: parseFloat(lon),
    displayName: data[0].display_name,
  };
};

export default async ({ appStore }) => {
  const { currentLocation, zip } = appStore.getState();

  let latitude;
  let longitude;
  let displayName;

  if (!currentLocation) {
    const coordinates = await fetchCoordinatesFromZip(zip);
    latitude = coordinates.latitude;
    longitude = coordinates.longitude;
    displayName = coordinates.displayName;
  } else {
    latitude = currentLocation.coords.latitude;
    longitude = currentLocation.coords.longitude;
  }

  const weatherData = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`,
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
           <h1>Daily Forcast for ${displayName}</h1>
           ${forcastData.join("")}
         </div>`;
};
