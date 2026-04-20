const body = document.body;
const themeBtn = document.querySelector(".theme-btn");
const favicon = document.getElementById("favicon");
const logo = document.getElementById("siteLogo");

function safeGetTheme() {
    try {
        return localStorage.getItem("theme");
    } catch (error) {
        return null;
    }
}

function safeSetTheme(value) {
    try {
        localStorage.setItem("theme", value);
    } catch (error) {
        return;
    }
}

function updateThemeAssets(isLight) {
    // favicon
    if (favicon) {
        favicon.href = isLight
            ? "./assets/images/favicon-light.png"
            : "./assets/images/favicon-dark.png";
    }

    // logo
    if (logo) {
        logo.src = isLight
            ? "./assets/images/favicon-light.png"
            : "./assets/images/favicon-dark.png";
    }

    if (themeBtn) {
        themeBtn.setAttribute("aria-pressed", String(isLight));
        themeBtn.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
        themeBtn.textContent = isLight ? "☀️" : "🌙";
    }
}

if (themeBtn) {
    const savedTheme = safeGetTheme();
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    const isLightTheme = savedTheme ? savedTheme === "light" : prefersLight;

    body.classList.toggle("light-theme", isLightTheme);
    updateThemeAssets(isLightTheme);

    themeBtn.addEventListener("click", () => {
        const nextIsLight = !body.classList.contains("light-theme");

        body.classList.toggle("light-theme", nextIsLight);
        safeSetTheme(nextIsLight ? "light" : "dark");
        updateThemeAssets(nextIsLight);
    });
}