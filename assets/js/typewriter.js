// typewriter.js
const words = [
    "Full-Stack Software Engineer",
    "Privacy-First SaaS Builder",
    "Temporary Email Platform Engineer",
    "Secure API & Worker Pipelines",
    "Browser-Native Media Processing",
    "Product-Focused Full-Stack Engineer"
];

let wordIndex = 0;
let charIndex = 0;
let currentWord = "";
const typeTarget = document.getElementById("typewriter");

const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typeTarget) {
    if (prefersReducedMotion) {
        typeTarget.textContent = words[0];
    } else {
        function typeEffect() {
            if (charIndex < words[wordIndex].length) {
                currentWord += words[wordIndex].charAt(charIndex);
                typeTarget.textContent = currentWord;
                charIndex++;
                setTimeout(typeEffect, 100);
            } else {
                setTimeout(eraseEffect, 1500);
            }
        }

        function eraseEffect() {
            if (charIndex > 0) {
                currentWord = currentWord.slice(0, -1);
                typeTarget.textContent = currentWord;
                charIndex--;
                setTimeout(eraseEffect, 60);
            } else {
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeEffect, 500);
            }
        }

        typeEffect();
    }
}