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

// Typewriter Animation Trigger
const servicesSection = document.getElementById("services-container");
const typewriterText = document.querySelector(".typewriter h1");

let textContent = typewriterText.textContent.trim();
let isTyping = false;
let lastScrollY = window.scrollY;
let hasAppeared = false; 

const typeWriterEffect = (text, forward = true) => {
    let index = forward ? 0 : text.length;
    isTyping = true;
        
    const interval = setInterval(() => {
        typewriterText.textContent = text.slice(0, index + 1);

        if (forward && index === text.length) {
            typewriterText.classList.add("no-cursor"); 
        } else if (!forward && index === text.length - 1) {
            typewriterText.classList.remove("no-cursor"); 
        }

        if (forward) {
            typewriterText.style.opacity = "1";
            index++;
            if (index > text.length) {
                clearInterval(interval);
                isTyping = false;
                hasAppeared = true; 
            }
        } else {
            index--;
            if (index < 0) {
                clearInterval(interval);
                typewriterText.style.opacity = "0";
                isTyping = false;
                hasAppeared = false; 
            }
        }
    }, 100);
};

window.addEventListener("scroll", () => {
    let currentScrollY = window.scrollY;
    let sectionTop = servicesSection.offsetTop;
    let sectionHeight = servicesSection.offsetHeight;

    if (currentScrollY > lastScrollY) {
        if (!hasAppeared && currentScrollY + window.innerHeight >= sectionTop + sectionHeight / 2) {
            if (!isTyping) {
                typeWriterEffect(textContent, true); 
            }
        }
    } else {
        if (hasAppeared && currentScrollY + window.innerHeight < sectionTop + sectionHeight / 2) {
            if (!isTyping) {
                typeWriterEffect(textContent, false);
            }
        }
    }

    lastScrollY = currentScrollY; 
});

// Services Animation - Wheel
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
    serviceTitle.classList.remove('active');
    serviceDescription.classList.remove('active');
    setTimeout(() => {
        serviceTitle.textContent = cards[index].getAttribute("data-title");
        serviceDescription.textContent = cards[index].getAttribute("data-description");

        serviceTitle.classList.add('active');
        serviceDescription.classList.add('active');
    }, 200);
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
const servicesCarousel = document.getElementById("services-carousel");

servicesCarousel.addEventListener("touchstart", (event) => {
    startY = event.touches[0].clientY;
    event.preventDefault(); 
}, {passive: false});

servicesCarousel.addEventListener("touchmove", (event) => {
    endY = event.touches[0].clientY;
    event.preventDefault(); 
}, {passive: false});

servicesCarousel.addEventListener("touchend", () => {
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
servicesCarousel.addEventListener("mousedown", (event) => {
    isDragging = true;
    dragStartY = event.clientY;
    event.preventDefault(); 
});

servicesCarousel.addEventListener("mousemove", (event) => {
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

servicesCarousel.addEventListener("mouseup", () => {
    isDragging = false;
});

servicesCarousel.addEventListener("mouseleave", () => {
    isDragging = false;
});

updateServiceInfo(currentIndex);
updateImagePositions();
enableScroll();
