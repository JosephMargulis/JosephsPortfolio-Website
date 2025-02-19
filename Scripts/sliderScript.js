let list = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dots = document.querySelectorAll('.slider .dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0;
let lengthItems = items.length - 1;

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
    list.style.left = -checkLeft + 'px';

    let lastActiveDot = document.querySelector('.slider .dots li.active');
    lastActiveDot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshSlider);
    refreshSlider = setInterval(() => { next.click(); }, 5000);
}

dots.forEach((li, key) => {
    li.addEventListener('click', function () {
        active = key;
        reloadSlider();
    });
});

let touchStartX = 0;
let touchEndX = 0;

list.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});

list.addEventListener("touchmove", (e) => {
    touchEndX = e.touches[0].clientX;
});

list.addEventListener("touchend", () => {
    let swipeDistance = touchStartX - touchEndX;

    if (swipeDistance > 50) {
        moveSlide("next"); 
    } else if (swipeDistance < -50) {
        moveSlide("prev"); 
    }
});

list.style.touchAction = "pan-x"; 
