import { createStore } from "../../lib/store/index.js";

const id_prefix = "radar_";

export default () => {
  const store = createStore({
    initialState: {
      count: 0,
      message: "Hello world",
    },
  });

  const template = document.createElement("div");

  template.innerHTML = `
          <div>
            <h1>Radar</h1>
            <button id="${id_prefix}increment">Click me</button>
            <p id="${id_prefix}count">${store.getState().count}</p>
            <button id="${id_prefix}log">Console log state</button>
          </div>`;

  const increment = template.querySelector(`#${id_prefix}increment`);
  increment.onclick = () => {
    store.merge({ count: store.getState().count + 1 });
    const count = template.querySelector(`#${id_prefix}count`);
    count.innerHTML = store.getState().count;
  };

  const log = template.querySelector(`#${id_prefix}log`);
  log.onclick = () => {
    console.log(store.getState());
  };

  return template;
};
