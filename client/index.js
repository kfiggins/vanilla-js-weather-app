import forcast from "./views/forcast/index.js";
import localWeather from "./views/local-weather/index.js";
import radar from "./views/radar/index.js";
import useController from "./use-controller.js";

const renderPage = async () => {
  const app = document.getElementById("app");
  const route = window.location.hash.slice(1);
  const {
    state: { appStore },
  } = await useController();

  switch (route) {
    case "local":
      app.innerHTML = await localWeather({ appStore });
      break;
    case "radar":
      app.appendChild(radar({ appStore }));
      break;
    case "forcast":
      app.innerHTML = await forcast({ appStore });
      break;
    default:
      app.innerHTML = `<h1>Welcome to the weather app</h1>
      <div style="display:flex; flex-direction:column;">
        <div>Enter zip code</div>
        <input id="zip" style="width: 100px;" value="${appStore.getState().zip}" />
        <a href="#local">Local Weather</a>
        <a href="#radar">Radar</a>
        <a href="#forcast">Forcast</a>
      </div>`;
  }
};

addEventListener("hashchange", renderPage);
addEventListener("load", renderPage);
