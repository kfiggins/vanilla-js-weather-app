import localWeather from "./views/local-weather/index.js";
import radar from "./views/radar/index.js";
import forcast from "./views/forcast/index.js";
import { createStore } from "./lib/store/index.js";

const renderPage = async () => {
  const app = document.getElementById("app");
  const route = window.location.hash.slice(1);

  const currentLocation = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  }).catch(() => null);

  const appStore = createStore({
    initialState: {
      currentLocation,
      zip: "",
    },
  });

  const zip = localStorage.getItem("zip");
  if (zip) {
    appStore.merge({ zip });
  }

  if (!currentLocation && !zip) {
    // ask for zipCode
    const value = prompt("Please enter a zip code.", "94102");
    if (!value) {
      return;
    }
    appStore.merge({ zip: value });
    localStorage.setItem("zip", value);
  }

  switch (route) {
    case "local":
      app.innerHTML = await localWeather({ appStore });
      break;
    case "radar":
      app.appendChild(await radar({ appStore }));
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

  // event listener
  const zipInput = document.getElementById("zip");
  if (zipInput) {
    zipInput.addEventListener("change", (event) => {
      appStore.merge({ zip: event.target.value });
      localStorage.setItem("zip", event.target.value);
    });
  }
};

addEventListener("hashchange", renderPage);
addEventListener("load", renderPage);
