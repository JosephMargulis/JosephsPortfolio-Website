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
const SWIPE_THRESHOLD = 15;
let autoSlideTimer;

function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
        moveSlide("next");
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideTimer);
}

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

function moveSlide(direction) {
    if (direction === "next") {
        active = (active + 1 > lengthItems) ? 0 : active + 1;
    } else if (direction === "prev") {
        active = (active - 1 < 0) ? lengthItems : active - 1;
    }
    reloadSlider();
}

function reloadSlider() {
    let checkLeft = items[active].offsetLeft;
    requestAnimationFrame(() => {
        list.style.transition = "transform 0.3s ease-in-out";
        list.style.transform = `translateX(-${checkLeft}px)`;
    });

    let lastActiveDot = document.querySelector(".slider .dots li.active");
    if (lastActiveDot) lastActiveDot.classList.remove("active");
    
    dots[active].classList.add("active");
}

dots.forEach((li, key) => {
    li.addEventListener("click", function () {
        stopAutoSlide();
        active = key;
        reloadSlider();
        startAutoSlide();
    });
});

list.addEventListener("touchstart", (e) => {
    stopAutoSlide();
    touchStartX = e.touches[0].clientX;
    isSwiping = true;
}, { passive: true });

list.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    e.preventDefault();
    touchEndX = e.touches[0].clientX;
}, { passive: false });

list.addEventListener("touchend", () => {
    if (!isSwiping) return;
    let swipeDistance = touchStartX - touchEndX;

    if (swipeDistance > SWIPE_THRESHOLD) {
        moveSlide("next");
    } else if (swipeDistance < -SWIPE_THRESHOLD) {
        moveSlide("prev");
    }

    isSwiping = false;
    touchStartX = 0;
    touchEndX = 0;
    startAutoSlide();
});

startAutoSlide();
