"use strict";

/* رابط الجولة — بدّله إذا عندك رابط Matterport مختلف */
const TOUR_URL = "https://my.matterport.com/show/?m=33mzsiPWyX2";

/* 1) ضع الرابط داخل iframe (يبقى بنفس الصفحة) */
const frame = document.getElementById("mpFrame");
if (frame) frame.src = TOUR_URL;

/* 2) Smooth scroll */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-scroll]");
  if (!btn) return;

  const sel = btn.getAttribute("data-scroll");
  if (!sel) return;

  if (sel === "body") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.querySelector(sel);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
});
