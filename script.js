/* ================= RECOMMENDATIONS SLIDER ================= */

const sliderTrack = document.getElementById("sliderTrack");
const sliderDotsContainer = document.getElementById("sliderDots");

const recommendationCards = document.querySelectorAll(".recommendation-card");

let currentSlide = 0;
const totalSlides = recommendationCards.length;

function createDots() {
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.classList.add("slider-dot");

    if (i === 0) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", function () {
      currentSlide = i;
      updateSlider();
    });

    sliderDotsContainer.appendChild(dot);
  }
}

function updateSlider() {
  const cardWidth = recommendationCards[0].offsetWidth + 25;

  sliderTrack.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

  const dots = document.querySelectorAll(".slider-dot");

  dots.forEach(function (dot, index) {
    if (index === currentSlide) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function autoSlide() {
  currentSlide++;

  if (currentSlide >= totalSlides) {
    currentSlide = 0;
  }

  updateSlider();
}

if (sliderTrack && sliderDotsContainer && recommendationCards.length > 0) {
  createDots();
  setInterval(autoSlide, 5000);
}


/* ================= CONTACT FORM MODAL ================= */

const contactForm = document.getElementById("contactForm");
const modalOverlay = document.getElementById("modalOverlay");
const modalCloseBtn = document.getElementById("modalCloseBtn");

if (contactForm && modalOverlay && modalCloseBtn) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    modalOverlay.classList.add("active");

    contactForm.reset();
  });

  modalCloseBtn.addEventListener("click", function () {
    modalOverlay.classList.remove("active");
  });

  modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      modalOverlay.classList.remove("active");
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      modalOverlay.classList.remove("active");
    }
  });
}