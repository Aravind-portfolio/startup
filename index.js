// Back to top Button
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    backToTopButton.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Services Animation - Wheel
const carousel = document.getElementById("services-carousel");
const serviceTitle = document.getElementById("service-title");
const serviceDescription = document.getElementById("service-description");
const cards = document.querySelectorAll(".service-card");

let currentIndex = 0;
let isScrolling = false;
const totalCards = cards.length;
const radius = 300;
const angleIncrement = (2 * Math.PI) / totalCards; 

function updateServiceInfo(index) {
    if (!cards[index]) return;
    serviceTitle.textContent = cards[index].getAttribute("data-title");
    serviceDescription.textContent = cards[index].getAttribute("data-description");
}

function updateImagePositions() {
    cards.forEach((card, i) => {
        let angle = angleIncrement * ((i - currentIndex + totalCards) % totalCards); // Circular rotation
        let x = Math.cos(angle) * radius;
        let y = Math.sin(angle) * radius;

        card.style.transform = `translate(${x}px, ${y}px)`;
        card.classList.remove('active');
    });
    cards[currentIndex].classList.add('active')
    cards[currentIndex].style.transform = `scale(${2.3})`
}

function cycleServices(dir) {
    if (isScrolling) return;
    isScrolling = true;

    if (dir > 0) {
        currentIndex = (currentIndex + 1) % totalCards;
    } else {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    }

    updateServiceInfo(currentIndex);
    updateImagePositions();

    setTimeout(() => {
        isScrolling = false;
    }, 650);
}

function handleWheel(event) {
    event.preventDefault();
    cycleServices(event.deltaY > 0 ? 1 : -1);
}

function enableScroll() {
    carousel.addEventListener("wheel", handleWheel, {passive: false});
}

// Services Animation - Swipe
let startY = 0;
let endY = 0;
let threshold = 50;
const servicesContainer = document.getElementById("services-container");

servicesContainer.addEventListener("touchstart", (event) => {
    startY = event.touches[0].clientY;
    event.preventDefault(); 
}, {passive: false});

servicesContainer.addEventListener("touchmove", (event) => {
    endY = event.touches[0].clientY;
    event.preventDefault(); 
}, {passive: false});

servicesContainer.addEventListener("touchend", () => {
    let swipeDistance = endY - startY;
    if (Math.abs(swipeDistance) > threshold) {
        if (swipeDistance < 0) {
            currentIndex = (currentIndex + 1) % totalCards;
        } else {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        }

        updateServiceInfo(currentIndex);
        updateImagePositions();
    }
});

// Services Animation - Drag on Mouse
let isDragging = false;
let dragStartY = 0;
servicesContainer.addEventListener("mousedown", (event) => {
    isDragging = true;
    dragStartY = event.clientY;
    event.preventDefault(); 
});

servicesContainer.addEventListener("mousemove", (event) => {
    if (!isDragging) return;
    let moveDistance = event.clientY - dragStartY;
    if (Math.abs(moveDistance) > threshold) {
        if (moveDistance < 0) {
            currentIndex = (currentIndex + 1) % totalCards;
        } else {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        }

        updateServiceInfo(currentIndex);
        updateImagePositions();
        isDragging = false;
    }
});

servicesContainer.addEventListener("mouseup", () => {
    isDragging = false;
});

servicesContainer.addEventListener("mouseleave", () => {
    isDragging = false;
});

updateServiceInfo(currentIndex);
updateImagePositions();
enableScroll();
