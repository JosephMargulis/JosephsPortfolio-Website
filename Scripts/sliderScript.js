let list = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dots = document.querySelectorAll('.slider .dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0;
let lengthItems = items.length - 1;

// Click event for Next button
next.onclick = function () {
    moveSlide("next");
};

// Click event for Previous button
prev.onclick = function () {
    moveSlide("prev");
};

// Auto slide every 5 seconds
let refreshSlider = setInterval(() => { next.click(); }, 5000);

// Function to move slides
function moveSlide(direction) {
    if (direction === "next") {
        active = (active + 1 > lengthItems) ? 0 : active + 1;
    } else if (direction === "prev") {
        active = (active - 1 < 0) ? lengthItems : active - 1;
    }
    reloadSlider();
}

// Reload slider function
function reloadSlider() {
    let checkLeft = items[active].offsetLeft;
    list.style.left = -checkLeft + "px";

    let lastActiveDot = document.querySelector(".slider .dots li.active");
    if (lastActiveDot) lastActiveDot.classList.remove("active");
    
    dots[active].classList.add("active");

    clearInterval(refreshSlider);
    refreshSlider = setInterval(() => { next.click(); }, 5000);
}

// Dot navigation
dots.forEach((li, key) => {
    li.addEventListener("click", function () {
        active = key;
        reloadSlider();
    });
});

// **Touch Swipe for Mobile**
let touchStartX = 0;
let touchEndX = 0;
let swipeThreshold = 5; // **Smaller stroke for more sensitivity**

list.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});

list.addEventListener("touchmove", (e) => {
    touchEndX = e.touches[0].clientX;
});

list.addEventListener("touchend", () => {
    let swipeDistance = touchStartX - touchEndX;

    if (swipeDistance > swipeThreshold) {
        moveSlide("next"); // Swipe Left → Next Slide
    } else if (swipeDistance < -swipeThreshold) {
        moveSlide("prev"); // Swipe Right → Previous Slide
    }
});
