const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Start slider
setInterval(nextSlide, 3000);

// Scroll Animation for About Section
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const aboutSection = document.querySelector('.about-section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            aboutSection.classList.add('visible');
            // Once animation is triggered, stop observing
            observer.unobserve(aboutSection);
        }
    });
}, observerOptions);

observer.observe(aboutSection);