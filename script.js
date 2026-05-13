//modal code

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
// slider code

const sliderTrack = document.getElementById("sliderTrack");
const dotsContainer = document.getElementById("sliderDots");

let originalCards = document.querySelectorAll(".recommendation-card");

let cardsToShow = window.innerWidth > 900 ? 3 : 1;



for (let i = 0; i < cardsToShow; i++) {
  const firstClone = originalCards[i].cloneNode(true);
  firstClone.classList.add("clone");
  sliderTrack.appendChild(firstClone);
}

for (let i = originalCards.length - cardsToShow; i < originalCards.length; i++) {
  const lastClone = originalCards[i].cloneNode(true);
  lastClone.classList.add("clone");
  sliderTrack.insertBefore(lastClone, sliderTrack.firstChild);
}

const cards = document.querySelectorAll(".recommendation-card");

let currentSlide = cardsToShow;

function getSliderValues() {
  const card = cards[0];

  const gap =
    parseInt(window.getComputedStyle(sliderTrack).gap) || 0;

  const cardWidth = card.offsetWidth;

  const step = cardWidth + gap;

  let sideOffset = 0;

  if (window.innerWidth > 900) {
    sideOffset = 130;
  }

  return { step, sideOffset };
}



function updateSlider(withTransition = true) {
  const { step, sideOffset } = getSliderValues();

  if (withTransition) {
    sliderTrack.style.transition = "transform 0.5s ease";
  } else {
    sliderTrack.style.transition = "none";
  }

  sliderTrack.style.transform = `translateX(${sideOffset - currentSlide * step}px)`;

  updateDots();
}



function updateDots() {
  const realIndex =
    (currentSlide - cardsToShow + originalCards.length) %
    originalCards.length;

  document.querySelectorAll(".slider-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === realIndex);
  });
}



originalCards.forEach((_, index) => {
  const dot = document.createElement("span");

  dot.classList.add("slider-dot");

  if (index === 0) {
    dot.classList.add("active");
  }

  dot.addEventListener("click", () => {
    currentSlide = index + cardsToShow;

    updateSlider();
  });

  dotsContainer.appendChild(dot);
});


function nextSlide() {
  currentSlide++;

  updateSlider();
}

let autoSlide = setInterval(nextSlide, 5000);


sliderTrack.addEventListener("transitionend", () => {
  const totalOriginal = originalCards.length;

  if (currentSlide >= totalOriginal + cardsToShow) {
    currentSlide = cardsToShow;

    updateSlider(false);
  }

  
  if (currentSlide < cardsToShow) {
    currentSlide = totalOriginal + currentSlide;

    updateSlider(false);
  }
});



window.addEventListener("resize", () => {
  location.reload();
});



updateSlider(false);


const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

if (hamburgerBtn && navMenu) {
  function setMenuState(isOpen) {
    hamburgerBtn.classList.toggle("active", isOpen);
    navMenu.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
    hamburgerBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }

  hamburgerBtn.addEventListener("click", () => {
    const isOpen = !navMenu.classList.contains("active");
    setMenuState(isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        setMenuState(false);
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      setMenuState(false);
    }
  });
}
