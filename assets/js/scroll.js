// scroll.js

const sections = document.querySelectorAll(".glass-section");
document.documentElement.classList.add("js");

if (sections.length) {
    sections.forEach(section => section.classList.add("reveal-ready"));

    const revealAllSections = () => {
        sections.forEach(section => section.classList.add("show"));
    };

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        revealAllSections();
    } else if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observerInstance.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -10% 0px"
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    } else {
        const revealOnScroll = () => {
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const trigger = window.innerHeight - 100;

                if (sectionTop < trigger) {
                    section.classList.add("show");
                }
            });
        };

        window.addEventListener("scroll", revealOnScroll);
        window.addEventListener("load", revealOnScroll);
        revealOnScroll();
    }

    // Fail-safe: ensure content becomes visible even if observer/scroll events misfire.
    window.setTimeout(revealAllSections, 1200);
}