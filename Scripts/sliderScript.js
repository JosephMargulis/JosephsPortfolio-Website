let list = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dots = document.querySelectorAll('.slider .dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0;
let lengthItems = items.length - 1;
let isSwiping = false;

next.onclick = function () {
    moveSlide("next");
};

prev.onclick = function () {
    moveSlide("prev");
};

let refreshSlider = setInterval(() => { next.click(); }, 5000);

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
    list.style.transition = "transform 0.5s ease-in-out"; 
    list.style.transform = `translateX(-${checkLeft}px)`;

    let lastActiveDot = document.querySelector(".slider .dots li.active");
    if (lastActiveDot) lastActiveDot.classList.remove("active");
    
    dots[active].classList.add("active");

    clearInterval(refreshSlider);
    refreshSlider = setInterval(() => { next.click(); }, 5000);
}


dots.forEach((li, key) => {
    li.addEventListener("click", function () {
        active = key;
        reloadSlider();
    });
});


let touchStartX = 0;
let touchEndX = 0;
const SWIPE_THRESHOLD = 5; 

list.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    isSwiping = true;
}, { passive: true });

list.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    touchEndX = e.touches[0].clientX;
}, { passive: true });

list.addEventListener("touchend", () => {
    if (!isSwiping) return;
    let swipeDistance = touchStartX - touchEndX;

    if (swipeDistance > SWIPE_THRESHOLD) {
        moveSlide("next"); 
    } else if (swipeDistance < -SWIPE_THRESHOLD) {
        moveSlide("prev"); 
    }
    isSwiping = false;
});
