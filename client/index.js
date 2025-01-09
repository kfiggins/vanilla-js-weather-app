import { localWeather } from "./views";

const radar = () => {
  return `<h1>Radar</h1>`;
};

const renderPage = () => {
  const app = document.getElementById("app");
  const route = window.location.hash.slice(1);
  console.log(app, route);

  switch (route) {
    case "local":
      app.innerHTML = localWeather();
      break;
    case "radar":
      app.innerHTML = radar();
      break;
    default:
      app.innerHTML = `<h1>Welcome to the weather app</h1>
      <a href="#local">Local Weather</a>
      <a href="#radar">Radar</a>`;
  }
};

addEventListener("hashchange", renderPage);
addEventListener("load", renderPage);
