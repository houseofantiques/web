"use strict";

/*
  about.js (Clean rebuild)
  - Language: AR / EN / KU (Sorani Arabic script)
  - Applies [data-i18n] textContent using window.I18N if موجود، وإلا FALLBACK
  - Timeline:
      1) Slider view (existing .tSlider)
      2) Full Timeline view (line + years + expandable text)
      Toggle button switches between them (show/hide)
*/

const FALLBACK = {
  ar: {
    "ui.more": "اقرأ المزيد",
    "ui.less": "أقل",
    "timeline.toggle.show": "عرض كل المحطات",
    "timeline.toggle.hide": "إخفاء المحطات",
  },
  en: {
    "ui.more": "Read more",
    "ui.less": "Less",
    "timeline.toggle.show": "Show all milestones",
    "timeline.toggle.hide": "Hide milestones",
  },
  ku: {
    "ui.more": "زیاتر بخوێنەوە",
    "ui.less": "کەمتر",
    "timeline.toggle.show": "هەموو خاڵەکان پیشان بدە",
    "timeline.toggle.hide": "خاڵەکان بشارەوە",
  }
};

function getLang() {
  try { return localStorage.getItem("hoa_lang") || "ar"; } catch { return "ar"; }
}
function setLangStorage(lang) {
  try { localStorage.setItem("hoa_lang", lang); } catch {}
}

function i18nApi() {
  // your i18n.js exports window.I18N = { DICT, getLang, setLang, apply }
  return (window.I18N && typeof window.I18N.apply === "function") ? window.I18N : null;
}
function t(lang, key) {
  const api = i18nApi();
  if (api && api.DICT && api.DICT[lang] && key in api.DICT[lang]) return api.DICT[lang][key];
  return (FALLBACK[lang] && FALLBACK[lang][key]) || (FALLBACK.ar[key] || key);
}

function setDir(lang) {
  // EN => LTR, AR/KU(Sorani) => RTL
  document.documentElement.dir = (lang === "en") ? "ltr" : "rtl";
  document.documentElement.lang = (lang === "ku") ? "ckb" : lang;
}

function applyTranslations(lang) {
  const api = i18nApi();
  if (api) {
    // rely on your i18n.js to fill [data-i18n] elements
    api.apply(lang);
    return;
  }

  // fallback simple apply
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = t(lang, key);
    if (val != null) el.textContent = val;
  });
}

function bindLangButtons() {
  document.querySelectorAll(".lang__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang || "ar";
      setLanguage(lang);
    });
  });
}

function setLanguage(lang) {
  setDir(lang);
  setLangStorage(lang);
  applyTranslations(lang);

  document.querySelectorAll(".lang__btn").forEach((b) => {
    b.classList.toggle("is-active", b.dataset.lang === lang);
  });

  // update timeline toggle label if exists
  const toggle = document.querySelector('[data-action="toggleAll"]');
  if (toggle) {
    const isOpen = document.documentElement.classList.contains("timeline-open");
    toggle.textContent = t(lang, isOpen ? "timeline.toggle.hide" : "timeline.toggle.show");
  }

  // if slider exists, re-render position on direction change
  if (typeof window.__hoaTimelineGoTo === "function") {
    window.__hoaTimelineGoTo(window.__hoaTimelineIndex || 0, true);
  }
}

function initReadMore() {
  document.querySelectorAll(".overlayCard").forEach((card) => {
    const btn = card.querySelector(".readMore");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const open = card.classList.toggle("is-open");
      const lang = getLang();
      btn.textContent = open ? t(lang, "ui.less") : t(lang, "ui.more");
    });

    // set initial label
    const lang = getLang();
    btn.textContent = t(lang, "ui.more");
  });
}

/* =========================
   TIMELINE: Slider + Full view (Line + years)
========================= */

function initTimeline() {
  const root = document.querySelector('[data-slider="timeline"]') || document.querySelector(".tSlider")?.closest("[data-slider='timeline']") || document;
  const slider = document.querySelector(".tSlider");
  if (!slider) return;

  const viewport = slider.querySelector(".tViewport");
  const track = slider.querySelector(".tTrack");
  const slides = Array.from(slider.querySelectorAll(".tSlide"));

  const btnPrev = slider.querySelector('[data-action="prev"]') || slider.querySelector(".tPrev");
  const btnNext = slider.querySelector('[data-action="next"]') || slider.querySelector(".tNext");
  const dotsWrap = slider.querySelector(".tDots");

  const toggleBtn = document.querySelector('[data-action="toggleAll"]');
  let allWrap = document.querySelector("[data-all]");      // optional existing
  let allLine = document.querySelector("[data-timeline-line]"); // our generated full view

  if (!viewport || !track || slides.length === 0) return;

  // build dots (stable)
  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "tDot" + (i === 0 ? " is-active" : "");
      b.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(b);
    });
  }

  function setDots(i) {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll(".tDot").forEach((d, idx) => d.classList.toggle("is-active", idx === i));
  }

  const isRTL = () => (getComputedStyle(document.documentElement).direction === "rtl");

  let index = 0;
  let animLock = false;

  function render(immediate = false) {
    const w = viewport.clientWidth;
    const offset = index * w;
    const x = isRTL() ? offset : -offset;

    track.style.transition = immediate ? "none" : "transform .38s ease";
    track.style.transform = `translate3d(${x}px,0,0)`;
    setDots(index);
  }

  function clamp(i) {
    const max = slides.length - 1;
    if (i < 0) return max;
    if (i > max) return 0;
    return i;
  }

  function goTo(i, immediate = false) {
    if (animLock && !immediate) return;
    index = clamp(i);
    animLock = true;
    render(immediate);
    window.__hoaTimelineIndex = index;
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  track.addEventListener("transitionend", () => { animLock = false; });

  btnNext?.addEventListener("click", (e) => { e.preventDefault(); next(); });
  btnPrev?.addEventListener("click", (e) => { e.preventDefault(); prev(); });

  // Swipe (tight)
  let startX = 0, dx = 0, dragging = false;

  function onDown(e) {
    dragging = true;
    startX = e.clientX;
    dx = 0;
    track.style.transition = "none";
    viewport.setPointerCapture?.(e.pointerId);
  }
  function onMove(e) {
    if (!dragging) return;
    dx = e.clientX - startX;

    const w = viewport.clientWidth;
    const base = index * w;
    const moved = base - dx;
    const x = isRTL() ? moved : -moved;

    track.style.transform = `translate3d(${x}px,0,0)`;
  }
  function onUp() {
    if (!dragging) return;
    dragging = false;
    track.style.transition = "transform .38s ease";

    const w = viewport.clientWidth;
    const threshold = Math.max(50, w * 0.15);

    if (Math.abs(dx) > threshold) {
      const swipeLeft = dx < 0;
      if (!isRTL()) swipeLeft ? next() : prev();
      else swipeLeft ? prev() : next();
    } else {
      render(false);
    }
  }

  viewport.addEventListener("pointerdown", onDown);
  viewport.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);

  // Resize safe (no jumping)
  let raf = null;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => render(true));
  });

  // Export for language change rerender
  window.__hoaTimelineGoTo = (i, immediate) => goTo(i, !!immediate);

  // Build Full Timeline (line + years + accordion) from slides
  function extractSlideData(slide) {
    const year = slide.querySelector(".tYear")?.textContent?.trim() || "";
    const tag = slide.querySelector(".tTag")?.textContent?.trim() || "";
    const text = slide.querySelector(".tText")?.textContent?.trim() || "";
    return { year, tag, text };
  }

  function buildFullTimeline() {
    // if there's old grid view, hide it and use our line instead
    if (allWrap) allWrap.style.display = "none";

    if (!allLine) {
      allLine = document.createElement("div");
      allLine.setAttribute("data-timeline-line", "1");
      allLine.style.marginTop = "16px";

      // inject minimal CSS (so ما تحتاجين تروحين تعدلين CSS هسه)
      const style = document.createElement("style");
      style.textContent = `
        [data-timeline-line]{
          border-radius:18px;
          border:1px solid rgba(255,255,255,.14);
          background: rgba(0,0,0,.18);
          padding:14px;
          overflow:hidden;
        }
        .tlLine{
          position:relative;
          display:grid;
          gap:12px;
        }
        .tlYears{
          display:flex;
          gap:10px;
          flex-wrap:wrap;
          align-items:center;
          justify-content:flex-start;
        }
        html[dir="rtl"] .tlYears{justify-content:flex-start}
        .tlYearBtn{
          border:1px solid rgba(255,255,255,.18);
          background: rgba(255,255,255,.06);
          color: rgba(239,233,223,.92);
          padding:10px 12px;
          border-radius:999px;
          cursor:pointer;
          font-size:12px;
          white-space:nowrap;
        }
        .tlYearBtn.is-active{
          background: rgba(239,233,223,.92);
          color:#111;
          border-color: rgba(239,233,223,.92);
        }
        .tlPanel{
          border:1px solid rgba(255,255,255,.14);
          background: rgba(245,242,236,.92);
          color:#111;
          border-radius:16px;
          padding:12px 12px;
          display:none;
        }
        .tlPanel.is-open{display:block}
        .tlTop{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:10px;
          margin-bottom:8px;
        }
        .tlTag{
          font-size:11px;
          padding:8px 10px;
          border-radius:999px;
          border:1px solid rgba(0,0,0,.10);
          background: rgba(0,0,0,.03);
          color: rgba(17,17,17,.72);
        }
        .tlText{
          margin:0;
          line-height:1.9;
          font-size:13px;
          color: rgba(17,17,17,.86);
        }
      `;
      document.head.appendChild(style);

      // append after slider block
      slider.parentElement.appendChild(allLine);
    }

    const data = slides.map(extractSlideData);

    allLine.innerHTML = `
      <div class="tlLine">
        <div class="tlYears"></div>
        <div class="tlPanel" aria-live="polite"></div>
      </div>
    `;

    const yearsWrap = allLine.querySelector(".tlYears");
    const panel = allLine.querySelector(".tlPanel");

    function openAt(i) {
      const item = data[i];
      if (!item) return;

      yearsWrap.querySelectorAll(".tlYearBtn").forEach((b, idx) => {
        b.classList.toggle("is-active", idx === i);
      });

      panel.innerHTML = `
        <div class="tlTop">
          <strong>${item.year}</strong>
          <span class="tlTag">${item.tag}</span>
        </div>
        <p class="tlText">${item.text}</p>
      `;
      panel.classList.add("is-open");
    }

    data.forEach((it, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "tlYearBtn";
      b.textContent = it.year || `#${i+1}`;
      b.addEventListener("click", () => openAt(i));
      yearsWrap.appendChild(b);
    });

    // open first by default
    openAt(0);
  }

  function openAll() {
    document.documentElement.classList.add("timeline-open");
    // show full timeline, and soften slider (optional)
    slider.style.opacity = "0.35";
    slider.style.pointerEvents = "none";

    buildFullTimeline();
    allLine.style.display = "block";

    const lang = getLang();
    if (toggleBtn) toggleBtn.textContent = t(lang, "timeline.toggle.hide");
  }

  function closeAll() {
    document.documentElement.classList.remove("timeline-open");
    slider.style.opacity = "";
    slider.style.pointerEvents = "";

    if (allLine) allLine.style.display = "none";

    const lang = getLang();
    if (toggleBtn) toggleBtn.textContent = t(lang, "timeline.toggle.show");
  }

  function toggleAll() {
    const open = document.documentElement.classList.contains("timeline-open");
    open ? closeAll() : openAll();
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", (e) => { e.preventDefault(); toggleAll(); });
    // initial label
    toggleBtn.textContent = t(getLang(), "timeline.toggle.show");
  }

  // init slider
  buildDots();
  goTo(0, true);
  closeAll(); // make sure starts closed
}

/* =========================
   Boot
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const start = getLang();
  setLanguage(start);
  bindLangButtons();
  initReadMore();
  initTimeline();
});
