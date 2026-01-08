gsap.registerPlugin(ScrollTrigger);

/* ================= CHECK FOR MOBILE ================= */
const isMobile = window.innerWidth <= 768;

/* ================= CUSTOM EASING ================= */
const popOutEase = "back.out(1.4)";

/* ================= SET INITIAL VISIBLE STATE ================= */
// Ensure all elements start visible, GSAP will animate them
gsap.set([
  ".service-card", ".process-card", ".testimonial-card", 
  ".why-card", ".philosophy-card", ".project-type-card",
  ".work-card", ".social-card", ".about-card", ".faq-item",
  ".client-item", ".hero-content h1", ".hero-content p",
  ".hero-content .btn-primary", ".hero-image",
  ".testimonial-scroll-container", ".work-with-us .work-card"
], { opacity: 1, visibility: "visible", clearProps: isMobile ? "all" : "" });

/* ================= HERO LOAD ================= */

if (!isMobile) {
  gsap.from(".hero-content h1", {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: popOutEase
  });

  gsap.from(".hero-content p", {
    y: 40,
    opacity: 0,
    duration: 0.9,
    delay: 0.2,
    ease: "power3.out"
  });

  gsap.from(".hero-content .btn-primary", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: popOutEase
  });

  gsap.from(".hero-image", {
    x: 40,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: popOutEase
  });
}

/* ================= CLIENTS ================= */

if (!isMobile) {
  gsap.from(".clients-title", {
    scrollTrigger: {
      trigger: ".clients",
      start: "top 85%",
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: popOutEase
  });

  gsap.from(".client-item", {
    scrollTrigger: {
      trigger: ".clients",
      start: "top 80%",
    },
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.03,
    ease: popOutEase
  });

  /* ================= PROCESS ================= */

  gsap.from(".process-card", {
    scrollTrigger: {
      trigger: ".process",
      start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: popOutEase
  });

  /* ================= SERVICES ================= */

  gsap.from(".service-card", {
    scrollTrigger: {
      trigger: ".services",
      start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: popOutEase
  });

  /* ================= WORK (Selected Work) ================= */

  gsap.from(".work .work-card", {
    scrollTrigger: {
      trigger: ".work",
      start: "top 80%",
    },
    x: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.08,
    ease: popOutEase
  });

  /* ================= PROJECT TYPES ================= */

  gsap.from(".project-type-card", {
    scrollTrigger: {
      trigger: ".project-types",
      start: "top 80%",
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: popOutEase
  });

  /* ================= TESTIMONIALS ================= */

  gsap.from(".testimonial-scroll-container", {
    scrollTrigger: {
      trigger: ".testimonials",
      start: "top 80%",
    },
    opacity: 0,
    duration: 0.6,
    ease: popOutEase
  });

  gsap.from(".testimonial-card", {
    scrollTrigger: {
      trigger: ".testimonials",
      start: "top 80%",
    },
    x: 50,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: popOutEase
  });

  /* ================= WHY US ================= */

  gsap.from(".why-card", {
    scrollTrigger: {
      trigger: ".why-us",
      start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: popOutEase
  });

  /* ================= PRICING PHILOSOPHY ================= */

  gsap.from(".philosophy-card", {
    scrollTrigger: {
      trigger: ".pricing-philosophy",
      start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: popOutEase
  });

  /* ================= FAQ ================= */

  gsap.from(".faq-item", {
    scrollTrigger: {
      trigger: ".faq",
      start: "top 85%",
    },
    x: -30,
    opacity: 0,
    duration: 0.5,
    stagger: 0.06,
    ease: popOutEase
  });

  /* ================= WORK WITH US ================= */

  gsap.from(".work-with-us .work-card", {
    scrollTrigger: {
      trigger: ".work-with-us",
      start: "top 80%",
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: popOutEase
  });

  /* ================= ABOUT US ================= */

  gsap.from(".about-card", {
    scrollTrigger: {
      trigger: ".about-us",
      start: "top 80%",
    },
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: popOutEase
  });

  /* ================= SOCIAL MEDIA ================= */

  gsap.from(".social-card", {
    scrollTrigger: {
      trigger: ".social-media",
      start: "top 80%",
    },
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: popOutEase
  });

  /* ================= CONTACT CTA ================= */

  gsap.from(".extended-cta h2", {
    scrollTrigger: {
      trigger: ".extended-cta",
      start: "top 85%",
    },
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: popOutEase
  });

  gsap.from(".contact-form", {
    scrollTrigger: {
      trigger: ".extended-cta",
      start: "top 85%",
    },
    y: 40,
    opacity: 0,
    duration: 0.7,
    delay: 0.15,
    ease: popOutEase
  });

  /* ================= SECTION TITLES ================= */

  gsap.utils.toArray("section > h2").forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 90%",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: popOutEase
    });
  });

  /* ================= HOVER EFFECTS (3D Tilt) ================= */

  document.querySelectorAll('.service-card, .process-card, .project-type-card, .testimonial-card, .why-card, .philosophy-card, .social-card, .about-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(card, {
        rotationY: x * 0.02,
        rotationX: -y * 0.02,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.4,
        ease: popOutEase
      });
    });
  });
}
