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
    start: "top 80%",
  },
  opacity: 0,
  y: 30,
  duration: 0.6
});

/* ================= SERVICES ================= */

gsap.from(".service-card", {
  scrollTrigger: {
    trigger: ".services",
    start: "top 70%",
  },
  y: 80,
  opacity: 0,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out"
});

/* ================= WORK ================= */

gsap.from(".work-card", {
  scrollTrigger: {
    trigger: ".work",
    start: "top 70%",
  },
  x: 100,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out"
});

/* ================= WHY US ================= */

gsap.from(".why-card", {
  scrollTrigger: {
    trigger: ".why-us",
    start: "top 70%",
  },
  y: 60,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15
});

/* ================= FAQ ================= */

gsap.from(".faq-item", {
  scrollTrigger: {
    trigger: ".faq",
    start: "top 75%",
  },
  y: 40,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1
});

/* ================= CTA ================= */

gsap.from(".cta h3", {
  scrollTrigger: {
    trigger: ".cta",
    start: "top 80%",
  },
  scale: 0.9,
  opacity: 0,
  duration: 0.8
});

gsap.from(".cta p, .cta .btn-primary", {
  scrollTrigger: {
    trigger: ".cta",
    start: "top 80%",
  },
  y: 30,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2
});
