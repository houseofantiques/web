"use strict";

/*
  about.js (Rebuild - stable)
  - Uses window.I18N if available
  - Timeline slider: .tSlider .tViewport .tTrack .tSlide
  - Controls: [data-action="prev"], [data-action="next"], .tDots
  - Toggle: [data-action="toggleAll"]
*/


function normalizeLang(lang) {
  lang = (lang || "ar").toLowerCase().trim();
  // ✅ فقط عربي/انكليزي
  return (lang === "en") ? "en" : "ar";
}

function getLang() {
  try { return normalizeLang(localStorage.getItem("hoa_lang") || "ar"); }
  catch { return "ar"; }
}

function setLangStorage(lang) {
  try { localStorage.setItem("hoa_lang", normalizeLang(lang)); } catch {}
}

function i18nApi() {
  return (window.I18N && typeof window.I18N.apply === "function") ? window.I18N : null;
}

function t(lang, key) {
  lang = normalizeLang(lang);
  const api = i18nApi();

  // ✅ إذا i18n.js موجود، خذي منه
  if (api && api.DICT && api.DICT[lang] && key in api.DICT[lang]) {
    return api.DICT[lang][key];
  }

  // ✅ fallback عربي/انكليزي فقط
  return (FALLBACK[lang] && FALLBACK[lang][key]) || (FALLBACK.ar[key] || key);
}

function setDir(lang) {
  lang = normalizeLang(lang);
  document.documentElement.dir = (lang === "en") ? "ltr" : "rtl";
  document.documentElement.lang = lang; // ✅ ar أو en
}

function applyTranslations(lang) {
  lang = normalizeLang(lang);
  const api = i18nApi();
  if (api) {
    api.apply(lang);
    return;
  }
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = t(lang, key);
    if (val != null) el.textContent = val;
  });
}

function setLanguage(lang) {
  lang = normalizeLang(lang);
  setDir(lang);
  setLangStorage(lang);
  applyTranslations(lang);

  document.querySelectorAll(".lang__btn").forEach((b) => {
    b.classList.toggle("is-active", normalizeLang(b.dataset.lang) === lang);
  });
}


function setLanguage(lang) {
  lang = normalizeLang(lang);
  setDir(lang);
  setLangStorage(lang);
  applyTranslations(lang);

  document.querySelectorAll(".lang__btn").forEach((b) => {
    b.classList.toggle("is-active", normalizeLang(b.dataset.lang) === lang);
  });

  // keep toggle label in sync
  const toggle = document.querySelector('[data-action="toggleAll"]');
  if (toggle) {
  }

  // re-render slider for direction
}

/* =========================
   Read More buttons
========================= */
function initReadMore() {
  document.querySelectorAll(".overlayCard").forEach((card) => {
    const btn = card.querySelector(".readMore");
    if (!btn) return;

    const lang = getLang();
    btn.textContent = t(lang, "ui.more");

    btn.addEventListener("click", () => {
      const open = card.classList.toggle("is-open");
      btn.textContent = t(getLang(), open ? "ui.less" : "ui.more");
    });
  });
}

/* =========================
   Timeline (Slider + Full view)
========================= */
function initTimeline() {
  const slider = document.querySelector(".tSlider");
  if (!slider) return;

  const viewport = slider.querySelector(".tViewport");
  const track = slider.querySelector(".tTrack");
  const slides = Array.from(slider.querySelectorAll(".tSlide"));

  if (!viewport || !track || slides.length === 0) return;

  const btnPrev = slider.querySelector('[data-action="prev"]') || slider.querySelector(".tPrev");
  const btnNext = slider.querySelector('[data-action="next"]') || slider.querySelector(".tNext");
  const dotsWrap = slider.querySelector(".tDots");
  const toggleBtn = document.querySelector('[data-action="toggleAll"]');

  const i18nSelector =
    "[data-i18n],[data-i18n-html],[data-i18n-placeholder],[data-i18n-title],[data-i18n-aria],[data-i18n-alt]";

  const isRTL = () => getComputedStyle(document.documentElement).direction === "rtl";

  let index = 0;
  let lock = false;

  // Make sure track is wide enough (in case CSS didn't)
  track.style.display = track.style.display || "flex";

  function render(immediate = false) {
    const x = (isRTL() ? 1 : -1) * (index * 100);
    track.style.transition = immediate ? "none" : "transform .38s ease";
    track.style.transform = `translate3d(${x}%,0,0)`;

    if (dotsWrap) {
      dotsWrap.querySelectorAll(".tDot").forEach((d, i) =>
        d.classList.toggle("is-active", i === index)
      );
    }
  }

  function clamp(i) {
    const max = slides.length - 1;
    if (i < 0) return max;
    if (i > max) return 0;
    return i;
  }

  function goTo(i, immediate = false) {
    if (lock && !immediate) return;
    lock = true;
    index = clamp(i);
    window.__hoaTimelineIndex = index;
    render(immediate);
    setTimeout(() => { lock = false; }, 420);
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  // Dots
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

  btnNext?.addEventListener("click", (e) => { e.preventDefault(); next(); });
  btnPrev?.addEventListener("click", (e) => { e.preventDefault(); prev(); });

  // Swipe
  let startX = 0, dx = 0, dragging = false;

  viewport.style.touchAction = "pan-y"; // IMPORTANT for pointer events

  viewport.addEventListener("pointerdown", (e) => {
    if (document.documentElement.classList.contains("timeline-open")) return; // disabled when openAll
    dragging = true;
    startX = e.clientX;
    dx = 0;
    track.style.transition = "none";
    viewport.setPointerCapture?.(e.pointerId);
  });

  viewport.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    dx = e.clientX - startX;

    const base = index * 100;
    const moved = base - (dx / Math.max(1, viewport.clientWidth)) * 100;
    const x = (isRTL() ? 1 : -1) * moved;

    track.style.transform = `translate3d(${x}%,0,0)`;
  });

  window.addEventListener("pointerup", () => {
    if (!dragging) return;
    dragging = false;

    const threshold = Math.max(35, viewport.clientWidth * 0.12);
    if (Math.abs(dx) > threshold) {
      const swipeLeft = dx < 0;
      if (!isRTL()) swipeLeft ? next() : prev();
      else swipeLeft ? prev() : next();
    } else {
      render(false);
    }
  });

  // Full timeline view (from slides)
  let allLine = document.querySelector("[data-timeline-line]");
  const allWrap = document.querySelector("[data-all]"); // optional old grid

  function extractSlideData(slide) {
    const year = slide.querySelector(".tYear")?.textContent?.trim() || "";
    const tag = slide.querySelector(".tTag")?.textContent?.trim() || "";
    const text = slide.querySelector(".tText")?.textContent?.trim() || "";
    return { year, tag, text };
  }

  function ensureFullTimelineContainer() {
    if (allWrap) allWrap.style.display = "none";

    if (!allLine) {
      allLine = document.createElement("div");
      allLine.setAttribute("data-timeline-line", "1");
      allLine.style.marginTop = "16px";
      slider.parentElement.appendChild(allLine);
    }
  }

  function buildFullTimeline() {
    ensureFullTimelineContainer();

    const data = slides.map(extractSlideData);

    allLine.innerHTML = `
      <div class="tlLine">
        <div class="tlYears"></div>
        <div class="tlPanel" aria-live="polite"></div>
      </div>
    `;

    const yearsWrap = allLine.querySelector(".tlYears");
    const panel = allLine.querySelector(".tlPanel");

    // inject minimal css once
    if (!document.getElementById("tlLineStyle")) {
      const style = document.createElement("style");
      style.id = "tlLineStyle";
      style.textContent = `
        [data-timeline-line]{border-radius:18px;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.18);padding:14px;overflow:hidden}
        .tlLine{display:grid;gap:12px}
        .tlYears{display:flex;gap:10px;flex-wrap:wrap;align-items:center;justify-content:flex-start}
        .tlYearBtn{border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);color:rgba(239,233,223,.92);padding:10px 12px;border-radius:999px;cursor:pointer;font-size:12px;white-space:nowrap}
        .tlYearBtn.is-active{background:rgba(239,233,223,.92);color:#111;border-color:rgba(239,233,223,.92)}
        .tlPanel{border:1px solid rgba(255,255,255,.14);background:rgba(245,242,236,.92);color:#111;border-radius:16px;padding:12px;display:none}
        .tlPanel.is-open{display:block}
        .tlTop{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px}
        .tlTag{font-size:11px;padding:8px 10px;border-radius:999px;border:1px solid rgba(0,0,0,.10);background:rgba(0,0,0,.03);color:rgba(17,17,17,.72)}
        .tlText{margin:0;line-height:1.9;font-size:13px;color:rgba(17,17,17,.86)}
      `;
      document.head.appendChild(style);
    }

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
      b.textContent = it.year || `#${i + 1}`;
      b.addEventListener("click", () => openAt(i));
      yearsWrap.appendChild(b);
    });

    openAt(0);
  }

  function openAll() {
    document.documentElement.classList.add("timeline-open");
    slider.style.opacity = "0.35";
    slider.style.pointerEvents = "none";

    buildFullTimeline();
    allLine.style.display = "block";

    if (toggleBtn) toggleBtn.textContent = t(getLang(), "timeline.toggle.hide");
  }

  function closeAll() {
    document.documentElement.classList.remove("timeline-open");
    slider.style.opacity = "";
    slider.style.pointerEvents = "";

    if (allLine) allLine.style.display = "none";

    if (toggleBtn) toggleBtn.textContent = t(getLang(), "timeline.toggle.show");

    // رجّع السلايدر طبيعي
    render(true);
  }

  function toggleAll() {
    const open = document.documentElement.classList.contains("timeline-open");
    open ? closeAll() : openAll();
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", (e) => { e.preventDefault(); toggleAll(); });
    toggleBtn.textContent = t(getLang(), "timeline.toggle.show");
  }

  // Export render for language dir changes
  window.__hoaTimelineRender = (immediate) => render(!!immediate);

  // init
  buildDots();
  goTo(0, true);
  closeAll();
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
/* =========================
   House Today Slider + Lightbox
========================= */
(function () {
  const slider = document.querySelector('[data-ht-slider]');
  if (!slider) return;

  const track = slider.querySelector('.htTrack');
  const slides = Array.from(slider.querySelectorAll('.htSlide'));
  const btnPrev = slider.querySelector('[data-ht-prev]');
  const btnNext = slider.querySelector('[data-ht-next]');
  const dotsWrap = slider.querySelector('[data-ht-dots]');

  let index = 0;

  function update() {
    const slideWidth = slides[0].offsetWidth + 12;
    track.style.transform = `translateX(${index * slideWidth}px)`;

    if (dotsWrap) {
      dotsWrap.querySelectorAll('button').forEach((d, i) => {
        d.classList.toggle('is-active', i === index);
      });
    }
  }

  btnNext?.addEventListener('click', () => {
    if (index < slides.length - 1) index++;
    update();
  });

  btnPrev?.addEventListener('click', () => {
    if (index > 0) index--;
    update();
  });

  if (dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.addEventListener('click', () => {
        index = i;
        update();
      });
      dotsWrap.appendChild(dot);
    });
  }

  update();

  /* ===== Lightbox ===== */
  const lightbox = document.querySelector('[data-ht-lightbox]');
  const lbImg = document.querySelector('[data-ht-img]');
  const lbClose = document.querySelector('[data-ht-close]');

  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      const src = slide.getAttribute('data-ht-open');
      if (!src) return;
      lbImg.src = src;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  lbClose?.addEventListener('click', closeLb);
  lightbox?.addEventListener('click', e => {
    if (e.target === lightbox) closeLb();
  });

  function closeLb() {
    lightbox.hidden = true;
    lbImg.src = '';
    document.body.style.overflow = '';
  }
})();
/* =========================
   FIX: ReadMore button
   - binds click reliably
   - toggles .overlayCard.is-open
   - swaps text (AR/EN)
========================= */
(() => {
  const TXT = {
    more: { ar: "اكمل القصة", en: "Read more" },
    less: { ar: "إخفاء", en: "Show less" }
  };

  function getLang() {
    try { return (localStorage.getItem("hoa_lang") || "ar"); }
    catch { return "ar"; }
  }

  function refreshReadMoreLabels() {
    const l = getLang() === "en" ? "en" : "ar";
    document.querySelectorAll(".overlayCard").forEach(card => {
      const btn = card.querySelector(".readMore");
      if (!btn) return;
      const open = card.classList.contains("is-open");
      btn.textContent = open ? TXT.less[l] : TXT.more[l];
    });
  }

  function bindReadMore() {
    document.querySelectorAll(".overlayCard .readMore").forEach(btn => {
      if (btn.dataset.bound === "1") return;
      btn.dataset.bound = "1";

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const card = btn.closest(".overlayCard");
        if (!card) return;
        card.classList.toggle("is-open");
        refreshReadMoreLabels();
      }, { passive: false });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindReadMore();
    refreshReadMoreLabels();

    // لما تتبدّل اللغة من أزرار i18n.js
    document.querySelectorAll("[data-lang]").forEach(b => {
      b.addEventListener("click", () => setTimeout(refreshReadMoreLabels, 0));
    });
  });
})();
