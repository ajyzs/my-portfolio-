
/* =========================
   TYPING ANIMATION
========================= */

const typingText = document.querySelector(".typing-text");

const words = [
    "IT Student",
    "Aspiring Developer",
    "Creative Learner",
    "Future IT Professional"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;

            setTimeout(typeEffect, 1200);
            return;
        }

        setTimeout(typeEffect, 100);

    } else {

        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;

            setTimeout(typeEffect, 400);
            return;
        }

        setTimeout(typeEffect, 50);

    }

}

typeEffect();


/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(function (element) {
    revealObserver.observe(element);
});


/* =========================
   NAVBAR ACTIVE LINK
========================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNav);


/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinksContainer = document.getElementById("navLinks");

if (menuToggle && navLinksContainer) {

    menuToggle.addEventListener("click", function () {

        navLinksContainer.classList.toggle("show");

        const icon = menuToggle.querySelector("i");

        if (navLinksContainer.classList.contains("show")) {
            icon.classList.replace("fa-bars", "fa-xmark");
        } else {
            icon.classList.replace("fa-xmark", "fa-bars");
        }

    });


    // Close menu after clicking a navigation link

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinksContainer.classList.remove("show");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* =========================
   SCROLL PROGRESS BAR
========================= */

const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    let progress = 0;

    if (pageHeight > 0) {
        progress = (scrollTop / pageHeight) * 100;
    }

    if (scrollProgress) {
        scrollProgress.style.width = progress + "%";
    }

}

window.addEventListener("scroll", updateScrollProgress);


/* =========================
   BACK TO TOP BUTTON
========================= */

const backToTop = document.getElementById("backToTop");

function toggleBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

}

window.addEventListener("scroll", toggleBackToTop);

if (backToTop) {

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================
   FOOTER YEAR
========================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================
   INITIAL UPDATE
========================= */

updateActiveNav();
updateScrollProgress();
toggleBackToTop();

/* =========================
   DARK MODE / LIGHT MODE
========================= */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle?.querySelector("i");

// Load saved theme
const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeIcon?.classList.replace("fa-moon", "fa-sun");
}

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("light-mode");

        const isLightMode = document.body.classList.contains("light-mode");

        if (isLightMode) {
            themeIcon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("portfolioTheme", "light");
        } else {
            themeIcon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("portfolioTheme", "dark");
        }

    });

}
