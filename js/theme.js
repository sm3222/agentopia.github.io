document.addEventListener("DOMContentLoaded", function () {
  // Theme toggle functionality
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const themeToggles = document.querySelectorAll("#theme-toggle, #theme-toggle-mobile");
  const html = document.documentElement;

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme");
  const systemTheme = darkModeMediaQuery.matches ? "dark" : "light";
  const currentTheme = savedTheme || systemTheme;

  // Apply initial theme
  setTheme(currentTheme);

  // Theme toggle click handler
  themeToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const newTheme = html.classList.contains("dark") ? "light" : "dark";
      setTheme(newTheme);
    });
  });

  // Function to set theme
  function setTheme(theme) {
    if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.classList.add("light");
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
    updateThemeIcons(theme);
  }

  // Update theme toggle icons
  function updateThemeIcons(theme) {
    const lightIcons = document.querySelectorAll(".light-mode-icon");
    const darkIcons = document.querySelectorAll(".dark-mode-icon");

    if (theme === "dark") {
      lightIcons.forEach((icon) => (icon.style.display = "inline"));
      darkIcons.forEach((icon) => (icon.style.display = "none"));
    } else {
      lightIcons.forEach((icon) => (icon.style.display = "none"));
      darkIcons.forEach((icon) => (icon.style.display = "inline"));
    }
  }

  // Listen for system theme changes
  darkModeMediaQuery.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "dark" : "light");
    }
  });
});
