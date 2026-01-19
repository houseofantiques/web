"use strict";

/* Reveal on scroll (slide down -> up) */
(function () {
  const els = Array.from(document.querySelectorAll(".reveal"));
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();

/* Optional: header solid on scroll (خفة) */
(function(){
  const topbar = document.getElementById("topbar");
  if (!topbar) return;

  const onScroll = () => {
    topbar.style.background = window.scrollY > 20
      ? "rgba(0,0,0,.72)"
      : "rgba(0,0,0,.55)";
  };

  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();
})();
