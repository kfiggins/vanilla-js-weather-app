import localWeather from "./views/local-weather/index.js";
import radar from "./views/radar/index.js";

const renderPage = async () => {
  const app = document.getElementById("app");
  const route = window.location.hash.slice(1);

  switch (route) {
    case "local":
      app.innerHTML = await localWeather();
      break;
    case "radar":
      app.innerHTML = await radar();
      break;
    default:
      app.innerHTML = `<h1>Welcome to the weather app</h1>
      <div style="display:flex; flex-direction:column;">
        <a href="#local">Local Weather</a>
        <a href="#radar">Radar</a>
      </div>`;
  }
};

addEventListener("hashchange", renderPage);
addEventListener("load", renderPage);
