const renderPage = () => {
  const app = document.getElementById("app");
  const route = window.location.hash.slice(1);
  console.log(app, route);

  switch (route) {
    case "home":
      app.innerHTML = `<h1>Home Page</h1>`;
      break;
    case "other":
      app.innerHTML = `<h1>Other Page</h1>`;
      break;
    default:
      app.innerHTML = `<h1>Choose page</h1>
      <a href="#home">Home</a>
      <a href="#other">Other</a>`;
  }
};

addEventListener("hashchange", renderPage);
addEventListener("load", renderPage);
