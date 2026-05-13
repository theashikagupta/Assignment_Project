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



// //slider code

//   const sliderTrack = document.getElementById("sliderTrack");
//   const sliderDots = document.getElementById("sliderDots");

//   const originalCards = Array.from(sliderTrack.children);

//   const cardWidth = 340;
//   const gap = 25;
//   const halfCard = cardWidth / 2; // 170
//   const step = cardWidth + gap;   // 365

//   // We need clones because only 5 real cards are not enough
//   const lastClone = originalCards[originalCards.length - 1].cloneNode(true);
//   sliderTrack.insertBefore(lastClone, sliderTrack.firstChild);

//   // first 4 cards clone karke end me daalo
//   originalCards.slice(0, 4).forEach((card) => {
//     sliderTrack.appendChild(card.cloneNode(true));
//   });

//   let currentSlide = 0;
//   let autoSlide;

//   // dots create
//   sliderDots.innerHTML = "";
//   originalCards.forEach((_, index) => {
//     const dot = document.createElement("span");
//     dot.classList.add("slider-dot");
//     if (index === 0) dot.classList.add("active");

//     dot.addEventListener("click", () => {
//       currentSlide = index;
//       updateSlider(true);
//       resetAutoSlide();
//     });

//     sliderDots.appendChild(dot);
//   });

//   const dots = sliderDots.querySelectorAll(".slider-dot");

//   function updateDots() {
//     dots.forEach((dot) => dot.classList.remove("active"));
//     dots[currentSlide % originalCards.length].classList.add("active");
//   }

//   function updateSlider(animate = true) {
//     if (!animate) {
//       sliderTrack.style.transition = "none";
//     } else {
//       sliderTrack.style.transition = "transform 0.5s ease";
//     }

//     const translateX = -(halfCard + currentSlide * step);
//     sliderTrack.style.transform = `translateX(${translateX}px)`;

//     updateDots();
//   }

//   function nextSlide() {
//     currentSlide++;
//     updateSlider(true);
//   }

//   sliderTrack.addEventListener("transitionend", () => {
//     if (currentSlide === originalCards.length) {
//       currentSlide = 0;
//       updateSlider(false);

//       // force reflow so browser transition reset properly
//       void sliderTrack.offsetWidth;

//       sliderTrack.style.transition = "transform 0.5s ease";
//       updateDots();
//     }
//   });

//   function startAutoSlide() {
//     autoSlide = setInterval(nextSlide, 5000);
//   }

//   function resetAutoSlide() {
//     clearInterval(autoSlide);
//     startAutoSlide();
//   }

//   updateSlider(false);
//   startAutoSlide();


const sliderTrack = document.getElementById("sliderTrack");
const cards = document.querySelectorAll(".recommendation-card");
const dotsContainer = document.getElementById("sliderDots");

let currentSlide = 0;

function getSliderValues() {
  const card = cards[0];
  const gap = parseInt(window.getComputedStyle(sliderTrack).gap) || 0;
  const cardWidth = card.offsetWidth;
  const step = cardWidth + gap;

  let sideOffset = 0;

  /*
    Desktop design:
    Keep fixed side padding and move only cards.
    This helps maintain half-card visibility.
  */
  if (window.innerWidth > 900) {
    sideOffset = 130;
  } else {
    sideOffset = 0;
  }

  return { step, sideOffset };
}

function updateSlider() {
  const { step, sideOffset } = getSliderValues();

  sliderTrack.style.transform = `translateX(${sideOffset - currentSlide * step}px)`;

  document.querySelectorAll(".slider-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

cards.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("slider-dot");

  if (index === 0) {
    dot.classList.add("active");
  }

  dot.addEventListener("click", () => {
    currentSlide = index;
    updateSlider();
  });

  dotsContainer.appendChild(dot);
});

setInterval(() => {
  currentSlide++;

  if (currentSlide >= cards.length) {
    currentSlide = 0;
  }

  updateSlider();
}, 5000);

window.addEventListener("resize", () => {
  currentSlide = 0;
  updateSlider();
});

updateSlider();


const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
  navMenu.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburgerBtn.classList.remove("active");
    navMenu.classList.remove("active");
  });
});