export default async () => {
  const weatherData = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=40.072720&longitude=-85.990140&current_weather=true",
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
           <h1>Local Weather</h1>

           <p>Temperature: ${convertToFahrenheit(weatherData.current_weather.temperature)} F</p><p>Temperature: ${weatherData.current_weather.temperature} C</p>
           <p>Wind Speed: ${weatherData.current_weather.windspeed}</p>
           <p>Wind Direction: ${weatherData.current_weather.winddirection}</p>

          </div>`;
};

const convertToFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
};
