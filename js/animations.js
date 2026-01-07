gsap.registerPlugin(ScrollTrigger);

/* ================= HERO LOAD ================= */

gsap.from(".hero-content h1", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
});

gsap.from(".hero-content p", {
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.3,
  ease: "power3.out"
});

gsap.from(".hero-content .btn-primary", {
  y: 20,
  opacity: 0,
  duration: 0.8,
  delay: 0.6,
  ease: "power3.out"
});

/* ================= CLIENTS ================= */

gsap.from(".clients-title", {
  scrollTrigger: {
    trigger: ".clients",
    start: "top 85%",
  },
  opacity: 0,
  y: 30,
  duration: 0.6
});

/* ================= PROCESS ================= */

gsap.from(".process-card", {
  scrollTrigger: {
    trigger: ".process",
    start: "top 75%",
  },
  y: 60,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power3.out"
});

/* ================= SERVICES ================= */

gsap.from(".service-card", {
  scrollTrigger: {
    trigger: ".services",
    start: "top 75%",
  },
  y: 60,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: "power3.out"
});

/* ================= WORK (Selected Work) ================= */

gsap.from(".work .work-card", {
  scrollTrigger: {
    trigger: ".work",
    start: "top 75%",
  },
  x: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: "power3.out"
});

/* ================= PROJECT TYPES ================= */

gsap.from(".project-type-card", {
  scrollTrigger: {
    trigger: ".project-types",
    start: "top 75%",
  },
  y: 80,
  opacity: 0,
  duration: 0.9,
  stagger: 0.15,
  ease: "power3.out"
});

/* ================= TESTIMONIALS ================= */

gsap.from(".testimonial-card", {
  scrollTrigger: {
    trigger: ".testimonials",
    start: "top 75%",
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power3.out"
});

/* ================= WHY US ================= */

gsap.from(".why-card", {
  scrollTrigger: {
    trigger: ".why-us",
    start: "top 75%",
  },
  y: 60,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: "power3.out"
});

/* ================= PRICING PHILOSOPHY ================= */

gsap.from(".philosophy-card", {
  scrollTrigger: {
    trigger: ".pricing-philosophy",
    start: "top 75%",
  },
  y: 60,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: "power3.out"
});

/* ================= FAQ ================= */

gsap.from(".faq-item", {
  scrollTrigger: {
    trigger: ".faq",
    start: "top 80%",
  },
  y: 30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: "power3.out"
});

/* ================= WORK WITH US (Recruitment) ================= */

gsap.from(".work-with-us .work-card", {
  scrollTrigger: {
    trigger: ".work-with-us",
    start: "top 75%",
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power3.out"
});

/* ================= ABOUT US ================= */

gsap.from(".about-card", {
  scrollTrigger: {
    trigger: ".about-us",
    start: "top 75%",
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.3,
  ease: "power3.out"
});

/* ================= SOCIAL MEDIA ================= */

gsap.from(".social-card", {
  scrollTrigger: {
    trigger: ".social-media",
    start: "top 75%",
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power3.out"
});

/* ================= CONTACT CTA ================= */

gsap.from(".extended-cta h2", {
  scrollTrigger: {
    trigger: ".extended-cta",
    start: "top 80%",
  },
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
});

gsap.from(".contact-form", {
  scrollTrigger: {
    trigger: ".extended-cta",
    start: "top 80%",
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  delay: 0.2,
  ease: "power3.out"
});