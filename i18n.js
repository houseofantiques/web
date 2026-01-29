/* =========================
   i18n.js — AR / EN ONLY (FULL for index + footer)
   - Works with old keys (brandAr, navAbout...) AND new keys (brand.name...)
   - Binds [data-lang="ar|en"] buttons
   - Applies [data-i18n="key"] textContent
   - Saves language in localStorage
========================= */

(function () {
  "use strict";

  const SUPPORTED = ["ar", "en"];
  const DEFAULT_LANG = "ar";
  const STORAGE_KEY = "hoa_lang";

  const DICT = {
    ar: {
      /* ====== Brand (old + new) ====== */
      brandAr: "بيت التحفيات",
      brandEn: "House of Antiques",
      "brand.name": "بيت التحفيات",
      "brand.sub": "House of Antiques",

      /* ====== Nav ====== */
      navAbout: "نبذة",
      navExplore: "استكشف",
      navStats: "الأرقام",
      navTimeline: "الخط الزمني",
      navTour: "جولة افتراضية",
      navContact: "تواصل معنا",

      /* ====== Hero ====== */
      heroTopline: "STATUE",
      heroTitleBig1: "بيت التحفيات",
      heroTitleBig2: "ذاكرة بغداد",
      heroLead:
        "بيت بغدادي يجمع التحف النادرة والسجاد والنحاس والخشب والكريستال والأعمال الفنية… بتجربة متحفية فاخرة.",
      ctaExplore: "استكشف الأقسام",
      ctaMore: "اقرأ أكثر",

      heroInfo1K: "ساعات الزيارة",
      heroInfo1V: "حسب الحجز",
      heroInfo2K: "الموقع",
      heroInfo2V: "بغداد",
      heroInfo3K: "جولة 360",
      heroInfo3V: "داخل الموقع",

      /* ====== Entrances ====== */
      entrancesTitle: "بوابات بيت التحفيات",
      entrancesDesc: "اختر طريقك إلى الذاكرة… ولكل باب حكاية.",

      ex1K: "نبذة",
      ex1T: "نبذة عن بيت التحفيات",
      ex1P: "قصة بيت بغدادي جمع التحف النادرة… من ذاكرة العائلة إلى وجهة ثقافية اليوم.",
      ex1M1: "قصة • إرث",
      ex1M2: "قراءة 3 دقائق",
      moreAbout: "المزيد",

      ex2K: "المتجر",
      ex2T: "تسوّق التحف",
      ex2P: "قطع نادرة مختارة بعناية… اكتشف السجاد والنحاس والخشب والكريستال وغيرها.",
      ex2M1: "قطع نادرة",
      ex2M2: "تحديثات مستمرة",
      goStore: "ادخل المتجر",

      ex3K: "الحجز",
      ex3T: "احجزي زيارتك",
      ex3P: "زيارة متحفية • تصوير • فعالية خاصة… احجزي بسهولة واختر وقتك.",
      ex3M1: "زيارة • تصوير",
      ex3M2: "حجز سريع",
      goBooking: "اذهب للحجز",

      ex4K: "صحافة",
      ex4T: "تغطيات وأخبار",
      ex4P: "مقالات • فيديو • أرشيف… تابع كل ما كُتب وقيل عن بيت التحفيات.",
      ex4M1: "مقالات",
      ex4M2: "فيديو",
      goPress: "ادخل",

      ex5K: "المزاد",
      ex5T: "المزاد القادم",
      ex5P: "قطع مختارة بعناية تُعرض قبل المزاد… تفاصيل الحضور والحجز قريباً.",
      ex5M1: "عرض مسبق",
      ex5M2: "حجز • تفاصيل",
      goAuction: "تفاصيل المزاد",

      ex6K: "جولة 360",
      ex6T: "جولة افتراضية داخل البيت",
      ex6P: "استكشف المكان قبل الزيارة… جولة تفاعلية داخل بيت التحفيات.",
      ex6M1: "Matterport",
      ex6M2: "داخل الصفحة",
      goTour: "ابدأ الجولة",

      /* ====== About + Stats ====== */
      aboutTitle: "بيت غنيّ بالتفاصيل",
      aboutDesc: "من متجر أنتيك إلى وجهة متحفية وثقافية…",
      s1: "عمر البيت (سنة)",
      s2: "عدد الغرف",
      s3: "عدد التحف",
      s4: "عدد الزوار منذ الثمانينات",
      c1t: "تجربة متحفية فاخرة",
      c1p: "تصميم داكن أنيق ومسارات واضحة للزيارة ومداخل سريعة للمتجر والحجز والجولة.",
      c2t: "هوية بغداد داخل بيت",
      c2p: "السجاد والنحاس والخشب والكريستال… كل قطعة تحمل قصة وتاريخ.",
      c3t: "UX قوي للموبايل",
      c3p: "أزرار كبيرة، سكرول ناعم، حركات خفيفة، وتجربة محترمة بدون ثقل.",

      /* ====== Footer (new keys) ====== */
      "footer.cta.title": "جاهز تستكشف بيت التحفيات؟",
      "footer.cta.sub": "احجز زيارتك أو شاهد الجولة الافتراضية",
      "footer.cta.book": "احجز الآن",
      "footer.cta.tour": "الجولة الافتراضية",
      "footer.note":
        "منصة تعريفية ثقافية توثق قصة البيت والعائلة والتحف، وتعرض خدمات الزيارات والفعاليات.",
      "footer.quick": "روابط سريعة",
      "footer.about": "نبذة",
      "footer.press": "الصحافة",
      "footer.store": "المتجر",
      "footer.auction": "المزاد",
      "footer.legal": "القانون والسياسات",
      "footer.terms": "الأحكام",
      "footer.privacy": "الخصوصية",
      "footer.contact": "تواصل",
      "footer.addr": "بغداد — شارع أبو نؤاس",
      "footer.copy": "© 2026 بيت التحفيات — جميع الحقوق محفوظة"
    },

    en: {
      /* ====== Brand (old + new) ====== */
      brandAr: "House of Antiques",
      brandEn: "House of Antiques",
      "brand.name": "House of Antiques",
      "brand.sub": "House of Antiques",

      /* ====== Nav ====== */
      navAbout: "About",
      navExplore: "Explore",
      navStats: "Stats",
      navTimeline: "Timeline",
      navTour: "Virtual Tour",
      navContact: "Contact",

      /* ====== Hero ====== */
      heroTopline: "STATUE",
      heroTitleBig1: "House of Antiques",
      heroTitleBig2: "Baghdad’s Memory",
      heroLead:
        "A Baghdadi house that gathers rare antiques, rugs, brass, wood, crystal, and artworks… in a refined museum-like experience.",
      ctaExplore: "Explore Sections",
      ctaMore: "Read More",

      heroInfo1K: "Visiting Hours",
      heroInfo1V: "By booking",
      heroInfo2K: "Location",
      heroInfo2V: "Baghdad",
      heroInfo3K: "360 Tour",
      heroInfo3V: "On-site",

      /* ====== Entrances ====== */
      entrancesTitle: "House of Antiques Gates",
      entrancesDesc: "Choose your path into memory… every gate has a story.",

      ex1K: "About",
      ex1T: "About the House",
      ex1P: "A Baghdadi house that gathered rare pieces… from family memory to a cultural destination today.",
      ex1M1: "Story • Heritage",
      ex1M2: "3 min read",
      moreAbout: "More",

      ex2K: "Store",
      ex2T: "Shop Antiques",
      ex2P: "Curated rare pieces… discover rugs, brass, wood, crystal, and more.",
      ex2M1: "Rare items",
      ex2M2: "Ongoing updates",
      goStore: "Enter Store",

      ex3K: "Booking",
      ex3T: "Book Your Visit",
      ex3P: "Museum visit • Photoshoot • Private event… book easily and pick your time.",
      ex3M1: "Visit • Photoshoot",
      ex3M2: "Fast booking",
      goBooking: "Go to Booking",

      ex4K: "Press",
      ex4T: "Coverage & News",
      ex4P: "Articles • Video • Archive… follow what’s been written and said about the House.",
      ex4M1: "Articles",
      ex4M2: "Video",
      goPress: "Enter",

      ex5K: "Auction",
      ex5T: "Upcoming Auction",
      ex5P: "Carefully selected items shown before the auction… attendance & booking details soon.",
      ex5M1: "Preview",
      ex5M2: "Booking • Details",
      goAuction: "Auction Details",

      ex6K: "360 Tour",
      ex6T: "Virtual Tour Inside",
      ex6P: "Explore before you visit… an interactive tour inside the House.",
      ex6M1: "Matterport",
      ex6M2: "In-page",
      goTour: "Start Tour",

      /* ====== About + Stats ====== */
      aboutTitle: "A House Rich in Detail",
      aboutDesc: "From an antique store to a museum & cultural destination…",
      s1: "House age (years)",
      s2: "Rooms",
      s3: "Antiques count",
      s4: "Visitors since the 80s",
      c1t: "Premium museum experience",
      c1p: "Elegant dark design, clear visit paths, and quick entrances to store, booking, and tour.",
      c2t: "Baghdad’s identity in one house",
      c2p: "Rugs, brass, wood, crystal… each piece carries a story and history.",
      c3t: "Strong mobile UX",
      c3p: "Big buttons, smooth scroll, light motion, and a clean experience.",

      /* ====== Footer ====== */
      "footer.cta.title": "Ready to explore the House of Antiques?",
      "footer.cta.sub": "Book your visit or view the virtual tour",
      "footer.cta.book": "Book Now",
      "footer.cta.tour": "Virtual Tour",
      "footer.note":
        "A cultural platform documenting the story of the house, the family, and the antiques—plus visits and events.",
      "footer.quick": "Quick Links",
      "footer.about": "About",
      "footer.press": "Press",
      "footer.store": "Store",
      "footer.auction": "Auction",
      "footer.legal": "Legal & Policies",
      "footer.terms": "Terms",
      "footer.privacy": "Privacy",
      "footer.contact": "Contact",
      "footer.addr": "Baghdad — Abu Nuwas St.",
      "footer.copy": "© 2026 House of Antiques — All rights reserved"
    }
  };

  function normalize(lang) {
    return SUPPORTED.includes(lang) ? lang : DEFAULT_LANG;
  }

  function applyLang(lang) {
    const L = normalize(lang);
    const dict = DICT[L];

    document.documentElement.lang = L;
    document.documentElement.dir = (L === "ar") ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const val = dict[key];
      if (typeof val === "string") el.textContent = val;
    });

    document.querySelectorAll("[data-lang]").forEach(btn => {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === L);
    });

    try { localStorage.setItem(STORAGE_KEY, L); } catch {}
  }

  window.setLang = applyLang;

  document.addEventListener("DOMContentLoaded", () => {
    const saved = (() => {
      try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
    })();

    const initial = normalize(saved || DEFAULT_LANG);
    applyLang(initial);

    document.querySelectorAll("[data-lang]").forEach(btn => {
      btn.addEventListener("click", () => applyLang(btn.getAttribute("data-lang")));
    });
  });
})();
