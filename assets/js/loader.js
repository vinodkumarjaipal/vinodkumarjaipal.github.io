// loader.js
const loader = document.getElementById("loader");
const percentText = document.getElementById("load-percent");
const progressBar = document.getElementById("loader-progress-bar");

if (loader && percentText && progressBar) {
    let percent = 0;
    let hideScheduled = false;
    const minVisibleMs = 900;
    const bootStart = Date.now();

    function updateProgress(nextPercent) {
        percent = Math.max(0, Math.min(100, nextPercent));
        percentText.textContent = percent + "%";
        progressBar.style.width = percent + "%";
    }

    function hideLoaderWithDelay() {
        if (hideScheduled) {
            return;
        }

        hideScheduled = true;
        updateProgress(100);

        const elapsed = Date.now() - bootStart;
        const remaining = Math.max(0, minVisibleMs - elapsed);

        window.setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.pointerEvents = "none";
            window.setTimeout(() => {
                loader.style.display = "none";
            }, 350);
        }, remaining);
    }

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        updateProgress(100);
        hideLoaderWithDelay();
    } else {
        const loading = window.setInterval(() => {
            if (percent < 92) {
                updateProgress(percent + 4);
                return;
            }

            window.clearInterval(loading);
            updateProgress(92);
        }, 25);

        const finishLoading = () => {
            window.clearInterval(loading);
            hideLoaderWithDelay();
        };

        if (document.readyState === "complete") {
            finishLoading();
        } else {
            window.addEventListener("load", finishLoading, { once: true });
        }

        window.setTimeout(finishLoading, 3000);
    }
}