const backToTopButton = document.getElementById("backToTop");

// Show or hide back-to-top button on scroll
window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

backToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Scroll animations for left-to-right & right-to-left movement
const scrollSections = document.querySelectorAll(".scroll-section");

window.addEventListener("scroll", function () {
    scrollSections.forEach((el, index) => {
        const position = el.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight * 0.8) {
            el.style.transform = `translateX(${index % 2 === 0 ? '0px' : '-50px'})`;
            el.style.opacity = "1";
        } else {
            el.style.transform = `translateX(${index % 2 === 0 ? '-50px' : '50px'})`;
            el.style.opacity = "0";
        }
    });
});

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

function cycleServices(event) {
    if (isScrolling) return;
    isScrolling = true;

    if (event.deltaY > 0) {
        currentIndex = (currentIndex + 1) % totalCards;
    } else {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    }

    updateServiceInfo(currentIndex);
    updateImagePositions();

    setTimeout(() => {
        isScrolling = false;
    }, 300);
}

function enableScroll() {
    carousel.addEventListener("wheel", cycleServices);
}

function disableScroll() {
    carousel.removeEventListener("wheel", cycleServices);
}

updateServiceInfo(currentIndex);
updateImagePositions();
enableScroll();
