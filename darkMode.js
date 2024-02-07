if (loadThemeState() === null && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  console.log("dark-mode: auto detect");
  console.log("aaaaa");
  console.log(loadThemeState());

  saveThemeState("dark");
  applyTheme()
}

function saveThemeState(theme) {
  localStorage.setItem("theme", theme);
}

function loadThemeState() {
  return localStorage.getItem("theme");
}

window.addEventListener("load", applyTheme);

const toggleDarkModeButton = document.getElementById("toggleDarkMode");
toggleDarkModeButton.addEventListener("click", darkMode);

function applyTheme() {
  if (loadThemeState() === "dark") {
    document.body.classList.add("dark-mode");
    console.log("dark-mode");
  }
  else {
    document.body.classList.remove("dark-mode");
    console.log("light-mode");
  }
}

function darkMode() {
  const isDarkMode = document.body.classList.contains("dark-mode");
  saveThemeState(isDarkMode ? "light" : "dark");
  applyTheme();
}