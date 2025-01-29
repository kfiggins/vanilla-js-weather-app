import { getCurrentLocation } from "./utils/get-current-location.js";
import { createStore } from "./lib/store/index.js";

export default async () => {
  const currentLocation = await getCurrentLocation();

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
    const value = prompt("Please enter a zip code.", "94102");
    if (!value) {
      return;
    }
    appStore.merge({ zip: value });
    localStorage.setItem("zip", value);
  }

  // Event listeners
  const zipInput = document.getElementById("zip");
  if (zipInput) {
    zipInput.addEventListener("change", (event) => {
      appStore.merge({ zip: event.target.value });
      localStorage.setItem("zip", event.target.value);
    });
  }

  return { state: { appStore } };
};
