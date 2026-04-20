// main.js

const nav = document.querySelector(".navbar");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("primary-navigation");
const navAnchorLinks = navLinks ? navLinks.querySelectorAll('a[href^="#"]') : [];
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contact-status");

function closeMobileMenu() {
    if (!navLinks || !mobileMenuBtn) {
        return;
    }

    navLinks.classList.remove("active");
    document.body.classList.remove("menu-open");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    mobileMenuBtn.innerHTML = '<span aria-hidden="true">☰</span>';
}

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        document.body.classList.toggle("menu-open", isOpen);
        mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
        mobileMenuBtn.innerHTML = isOpen ? '<span aria-hidden="true">✕</span>' : '<span aria-hidden="true">☰</span>';
    });

    navAnchorLinks.forEach(anchor => {
        anchor.addEventListener("click", closeMobileMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 600) {
            closeMobileMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMobileMenu();
        }
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (!target) {
            return;
        }

        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

// Navbar shadow on scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        nav.style.boxShadow = "0 0 20px rgba(0,247,255,0.3)";
    } else {
        nav.style.boxShadow = "none";
    }
});

// Contact form fallback for static hosting like GitHub Pages
if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameField = document.getElementById("contact-name");
        const emailField = document.getElementById("contact-email");
        const messageField = document.getElementById("contact-message");

        const name = nameField ? nameField.value.trim() : "";
        const email = emailField ? emailField.value.trim() : "";
        const message = messageField ? messageField.value.trim() : "";

        if (!name || !email || !message) {
            if (contactStatus) {
                contactStatus.textContent = "Please fill in all fields before sending.";
            }
            return;
        }

        const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
        );

        window.location.href = `mailto:vinodkumarjaipal234@gmail.com?subject=${subject}&body=${body}`;

        if (contactStatus) {
            contactStatus.textContent = "Your email app is opening with the message ready to send.";
        }
    });
}