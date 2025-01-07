addEventListener("hashchange", () => {
  const hash = window.location.hash;
  console.log(hash);
});

window.location.hash = "#newHash";
