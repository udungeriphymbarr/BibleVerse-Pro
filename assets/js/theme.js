function toggleTheme() {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  localStorage.setItem("theme", isDark ? "dark" : "light");

  updateThemeButton(isDark);
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");

    updateThemeButton(true);
  } else {
    updateThemeButton(false);
  }
}

function updateThemeButton(isDark) {
  themeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}