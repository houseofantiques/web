"use strict";

/**
 * 1) Smooth scroll buttons
 */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-scroll]");
  if (!btn) return;

  const sel = btn.getAttribute("data-scroll");
  const el = document.querySelector(sel);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
});

/**
 * 2) Countdown
 * عدّل تاريخ المزاد هنا (صيغة: YYYY-MM-DDTHH:mm:ss+03:00)
 */
const AUCTION_DATE_ISO = "2026-01-30T19:00:00+03:00"; // مثال
const end = new Date(AUCTION_DATE_ISO).getTime();

const $d = document.getElementById("cdDays");
const $h = document.getElementById("cdHours");
const $m = document.getElementById("cdMins");
const $s = document.getElementById("cdSecs");

function pad2(n){ return String(n).padStart(2, "0"); }

function tick(){
  const now = Date.now();
  let diff = end - now;

  if (diff <= 0){
    // إذا وصلنا للوقت
    if ($d) $d.textContent = "00";
    if ($h) $h.textContent = "00";
    if ($m) $m.textContent = "00";
    if ($s) $s.textContent = "00";
    return;
  }

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  if ($d) $d.textContent = pad2(days);
  if ($h) $h.textContent = pad2(hours);
  if ($m) $m.textContent = pad2(mins);
  if ($s) $s.textContent = pad2(secs);
}

tick();
setInterval(tick, 1000);
