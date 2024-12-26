// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Toggle menu
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking a nav link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !hamburger.contains(e.target) && 
        !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Image Slider
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');

// Clone first and last slides
const firstSlideClone = slides[0].cloneNode(true);
const lastSlideClone = slides[slides.length - 1].cloneNode(true);

// Add clones to slider
slider.appendChild(firstSlideClone);
slider.insertBefore(lastSlideClone, slides[0]);

let currentSlide = 1; // Start from first real slide (after clone)
let isTransitioning = false;
const totalSlides = slides.length + 2; // Including clones

// Initialize slider position
slider.style.transform = `translateX(-${currentSlide * 100}%)`;

function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentSlide = index;
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function handleSlideTransitionEnd() {
    isTransitioning = false;
    // If we're at the clone of the last slide, jump to the real last slide
    if (currentSlide === 0) {
        slider.style.transition = 'none';
        currentSlide = totalSlides - 2;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    // If we're at the clone of the first slide, jump to the real first slide
    if (currentSlide === totalSlides - 1) {
        slider.style.transition = 'none';
        currentSlide = 1;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    updateDots();
}

// Create navigation dots
const sliderNav = document.createElement('div');
sliderNav.className = 'slider-nav';
for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('div');
    dot.className = 'slider-dot';
    dot.addEventListener('click', () => goToSlide(i + 1));
    sliderNav.appendChild(dot);
}
document.querySelector('.slider-container').appendChild(sliderNav);

function updateDots() {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide - 1);
    });
}

function nextSlide() {
    if (isTransitioning) return;
    goToSlide(currentSlide + 1);
}

// Event Listeners
slider.addEventListener('transitionend', handleSlideTransitionEnd);

// Auto-advance slides
setInterval(nextSlide, 3000);

// Initialize dots
updateDots();

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
            observer.unobserve(aboutSection);
        }
    });
}, observerOptions);

observer.observe(aboutSection);