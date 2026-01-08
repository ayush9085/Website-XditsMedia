/* =========================================================
   SCROLL REVEAL (Intersection Observer)
========================================================= */
// Replaced by GSAP in js/animations.js


/* =========================================================
   SCROLL PROGRESS BAR
========================================================= */

const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  if (scrollProgress) {
    scrollProgress.style.width = scrollPercent + "%";
  }
});


/* =========================================================
   NAVBAR SCROLL BEHAVIOR
========================================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("nav-scrolled");
  } else {
    navbar.classList.remove("nav-scrolled");
  }
});

/* =========================================================
   FAQ ACCORDION (SINGLE OPEN)
========================================================= */

document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentItem = btn.parentElement;

    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== currentItem) {
        item.classList.remove("active");
      }
    });

    currentItem.classList.toggle("active");
  });
});

/* =========================================================
   MOBILE MENU TOGGLE
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".mobile-link, .mobile-cta").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".navbar")) {
    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
  }
});


/* =========================================================
   BUTTON RIPPLE EFFECT
========================================================= */

document.querySelectorAll(".btn-primary").forEach((btn) => {
  btn.addEventListener("click", function(e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    const rect = this.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left) + "px";
    ripple.style.top = (e.clientY - rect.top) + "px";
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* =========================================================
   PAGE LOAD ANIMATION
========================================================= */    

 window.addEventListener("load", () => {
  document.body.classList.remove("preload");
  document.body.classList.add("loaded");
});

/* =========================================================
   PORTFOLIO MODALS
========================================================= */

// Open portfolio modal
document.querySelectorAll("[data-portfolio]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const portfolioId = btn.getAttribute("data-portfolio");
    const modal = document.getElementById(`portfolio-${portfolioId}`);
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

// Close portfolio modal with close button
document.querySelectorAll(".portfolio-close").forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".portfolio-modal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

// Close portfolio modal when clicking outside content
document.querySelectorAll(".portfolio-modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

// Close portfolio modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".portfolio-modal.active").forEach((modal) => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }
});
