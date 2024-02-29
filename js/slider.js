
// Get the carousel elements
const slides = document.querySelectorAll('.slides');
const prevButton = document.querySelector('[data-banner-sliderbtns="prev"]');
const nextButton = document.querySelector('[data-banner-sliderbtns="next"]');
let currentIndex = 0;
let isTransitioning = false; // Flag to prevent multiple transitions
const transitionDuration = 1000; // Adjust the duration as desired
let slideInterval;

// Function to show a specific slide with a smooth transition
function showSlide(index) {
    if (!isTransitioning) {
        isTransitioning = true;
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
        setTimeout(() => {
            isTransitioning = false;
        }, transitionDuration);
    }
}

// Function to go to a specific slide with a smooth transition
function goToSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
    updateDotColors(); // Update dot colors when navigating to a slide
}

// Function to go to the next slide with a smooth transition
function nextSlide() {
    if (!isTransitioning) {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
        updateDotColors(); // Update dot colors when navigating to a slide
    }
}

// Function to go to the previous slide with a smooth transition
function prevSlide() {
    if (!isTransitioning) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
        updateDotColors(); // Update dot colors when navigating to a slide
    }
}

// Start automatic sliding
function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
}

// Stop automatic sliding
function stopSlideInterval() {
    clearInterval(slideInterval);
}

// Show the first slide initially
showSlide(currentIndex);

// Add click event listeners to the prev and next buttons
prevButton.addEventListener('click', () => {
    prevSlide();
    stopSlideInterval();
    startSlideInterval(); // Restart the interval on manual navigation
});

nextButton.addEventListener('click', () => {
    nextSlide();
    stopSlideInterval();
    startSlideInterval(); // Restart the interval on manual navigation
});

// Start the automatic slide interval
startSlideInterval();

// Add click event listeners to the dots for slide navigation
const dots = document.querySelectorAll('.dot');
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
        stopSlideInterval();
        startSlideInterval(); // Restart the interval on dot click
    });
});

// Function to update dot colors based on the current index
function updateDotColors() {
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active-dot'); // Apply a CSS class for the active dot
        } else {
            dot.classList.remove('active-dot'); // Remove the class from other dots
        }
    });
}
