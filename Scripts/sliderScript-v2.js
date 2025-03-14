let list = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dots = document.querySelectorAll('.slider .dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0;
let lengthItems = items.length - 1;
let autoSlideTimer;
const SWIPE_THRESHOLD = 50;
let startX = 0, diffX = 0;
let isSwiping = false;

// Start Auto Slide
function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
        moveSlide("next");
    }, 5000);
}

// Stop Auto Slide
function stopAutoSlide() {
    clearInterval(autoSlideTimer);
}

// Move Slide Function
function moveSlide(direction) {
    if (direction === "next") {
        active = (active + 1 > lengthItems) ? 0 : active + 1;
    } else if (direction === "prev") {
        active = (active - 1 < 0) ? lengthItems : active - 1;
    }
    reloadSlider();
}

// Reload Slider with Smooth Transition
function reloadSlider() {
    let checkLeft = items[active].offsetLeft;
    list.style.transition = "transform 0.3s ease-in-out";
    list.style.transform = `translateX(-${checkLeft}px)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[active].classList.add("active");
}

// Button Controls
next.onclick = function () {
    stopAutoSlide();
    moveSlide("next");
    startAutoSlide();
};

prev.onclick = function () {
    stopAutoSlide();
    moveSlide("prev");
    startAutoSlide();
};

// Dot Click Controls
dots.forEach((li, key) => {
    li.addEventListener("click", function () {
        stopAutoSlide();
        active = key;
        reloadSlider();
        startAutoSlide();
    });
});

// Touch Events for Mobile Swipe
list.addEventListener("touchstart", (e) => {
    stopAutoSlide();
    startX = e.touches[0].clientX;
    diffX = 0; // Reset diffX on new touch
    isSwiping = true;
    list.style.transition = "none"; // Disable animation on touch start
}, { passive: true });

list.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    let moveX = e.touches[0].clientX;
    diffX = moveX - startX;

    // Apply real-time movement effect
    list.style.transform = `translateX(calc(-${items[active].offsetLeft}px + ${diffX}px))`;
}, { passive: true });

list.addEventListener("touchend", () => {
    if (!isSwiping) return;

    if (diffX < -SWIPE_THRESHOLD) {
        moveSlide("next");
    } else if (diffX > SWIPE_THRESHOLD) {
        moveSlide("prev");
    } else {
        reloadSlider();
    }

    // Reset swipe variables
    diffX = 0;
    isSwiping = false;

    setTimeout(() => {
        startAutoSlide();
    }, 300);
});

// Start auto slide when the script loads
startAutoSlide();
