let list = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dots = document.querySelectorAll('.slider .dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0;
let lengthItems = items.length - 1;
let touchStartX = 0;
let touchEndX = 0;
let isSwiping = false;
const SWIPE_THRESHOLD = 50;
let startX, moveX, diffX;

// Get the slider container width (used for calculating transform distance)
function getSliderWidth() {
    return document.querySelector('.slider').offsetWidth;
}

// Reset all dot styles
function resetDots() {
    dots.forEach(dot => {
        dot.classList.remove("active");
        dot.style.transform = "scale(1)";
    });
}

// Reload Slider with Smooth Transition
function reloadSlider() {
    const sliderWidth = getSliderWidth();
    list.style.transition = "transform 0.3s ease-in-out";
    list.style.transform = `translateX(-${active * sliderWidth}px)`;

    resetDots();
    dots[active].classList.add("active");
    dots[active].style.transform = "scale(1.5)";

    setTimeout(() => {
        isSwiping = false;
    }, 300);
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

// Button Controls
next.onclick = function () {
    if (!isSwiping) {
        isSwiping = true;
        moveSlide("next");
    }
};

prev.onclick = function () {
    if (!isSwiping) {
        isSwiping = true;
        moveSlide("prev");
    }
};

// Dot Click Controls
dots.forEach((li, key) => {
    li.addEventListener("click", function () {
        active = key;
        reloadSlider();
    });
});

// Touch Events for Mobile Swipe
list.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
    list.style.transition = "none"; // Disable animation on touch start
}, { passive: true });

list.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    moveX = e.touches[0].clientX;
    diffX = moveX - startX;
    const sliderWidth = getSliderWidth();

    // Apply real-time movement effect
    list.style.transform = `translateX(calc(-${active * sliderWidth}px + ${diffX}px))`;
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

    setTimeout(() => {
        isSwiping = false;
    }, 300);
});
