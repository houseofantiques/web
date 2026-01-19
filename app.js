"use strict";

const LINKS = {
  STORE_URL: "https://houseofantiques.github.io/mtjer01/",
  TOUR_URL: "https://my.matterport.com/show/?m=33mzsiPWyX2&back=1&fbclid=PAT01DUAPawcpleHRuA2FlbQIxMABzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAadjoQT5XpxWVUdKfnlnBygkOZHeMM2c-ghTfwWkFUX8YKZuuyj1k8tFVdCoug_aem_Wnz6h5ciQmwtd0RLwuvspg",
  BOOKING_URL: "https://houseofantiques.github.io/Booking-/",
  AUCTION_URL: "auction.html",

  // ✅ عدّلي هنا روابط التواصل
  WHATSAPP_NUMBER_INTL: "964777045599",
  PHONE_INTL: "+9647777045599",
  EMAIL: "houseofantique30@gmail.com",
  FACEBOOK_URL: "https://web.facebook.com/profile.php?id=61576091652992",
  INSTAGRAM_URL: "https://www.instagram.com/house_ofantiques/?__pwa=1"
};

const HERO_SLIDES = [
  "assetshero-1.jpg",
  "assetshero-2.jpg",
  "assetshero-3.jpg",
  "assetshero-4.jpg",
  "assetshero-5.jpg"
];

const CARD_IMAGES = [
  "assetscard-aboutus.jpg",
  "assetscard-store.jpg",
  "assetscard-tour.jpg",
  "assetscard-booking.jpg",
  "assetscard-auction.jpg"
];

const LANGS = ["ar","en","ku"];
const RTL_LANGS = new Set(["ar","ku"]);
const LS_KEY = "hoa_lang";

let lang = localStorage.getItem(LS_KEY) || "ar";
if (!LANGS.includes(lang)) lang = "ar";

/* ✅ أرقام الإحصاءات (عدليها بسهولة) */
const STATS = {
  // سنة الافتتاح الفعلي حتى نحسب عمر البيت
  openedYear: 1920,

  // عدلي هذني حسب اللي تريدينه
  rooms: 14,
  antiques: 12000,
  visitorsTotal: 50000
};

const I18N = {
  ar: {
    brand1:"بيت التحفيات",
    brand2:"House of Antiques",
    nav_home:"الرئيسية",
    nav_about:"نبذة",
    nav_store:"المتجر",
    nav_tour:"الجولة",
    nav_booking:"الحجز",
    nav_auction:"المزاد",

    kicker:"وجهة تراثية — بغداد",
    h1a:"مرحباً بكِ في",
    h1b:"بيت التحفيات",
    sub:"تجربة متحفية مع مقتنيات نادرة، قصص عائلة، وجولات افتراضية—واستكشاف القطع الفريدة عبر متجرنا.",
    cta1:"استكشف المتجر",
    cta2:"شاهد الجولة الافتراضية",

    story_label1:"نبذة عن البيت",
    story_title1:"بيت التحفيات… ذاكرة بغداد",
    story_text1:"في قلب بغداد، وعلى ضفاف الذكريات، يعود بيت التحفيات ليحكي حكاية عائلة عريقة، جمعت بين الفن والتاريخ، وبين الذوق الرفيع والحب العميق للتراث. أسسه طارق محمد علي طاهر الألماني، أحد أبرز جامعي التحف في العراق خلال القرن العشرين، ليكون مقرًا لمجموعة فريدة من القطع النادرة، والصور، والمخطوطات، والقطع الفنية من مختلف أنحاء العالم.",

    story_label2:"3 أجيال",
    story_title2:"قصة عائلة… من الجد إلى الأحفاد",
    story_text2:"تمتد الحكاية عبر ثلاثة أجيال: حلم الجد، شغف الأب، ثم عودة الأحفاد لإحياء المكان وترميمه… ليبقى بيت التحفيات واجهة تراثية وفنية في بغداد.",

    stats_title:"بيتٌ غني بالتفاصيل",
    stats_sub:"أرقام تُلخّص التجربة — قابلة للتحديث لاحقاً.",
    stat_age:"عمر البيت (سنة)",
    stat_rooms:"عدد الغرف",
    stat_antiques:"عدد التحف",
    stat_visitors:"عدد الزوار منذ الثمانينات",

    timeline_title:"الخط الزمني",
    timeline_sub:"محطات مفصلية صنعت هوية بيت التحفيات.",
    tl_1989_t:"الافتتاح",
    tl_1989_d:"في عام 1989، افتتح طارق محمد علي طاهر الألماني بيت التحفيات رسميًا كمتحف خاص، ليحتضن مجموعة نادرة من التحف والأعمال الفنية. شكّل البيت منذ بدايته وجهة ثقافية راقية استقبلت الزوار والمهتمين بالتراث من داخل العراق وخارجه.",


    tl_2004_t:"الإغلاق",
    tl_2004_d:"في عام 2004، أُغلق بيت التحفيات نتيجة الأوضاع الأمنية الصعبة، وتراجع حركة السياحة والاهتمام بالتحف والأنتيك. دخل البيت مرحلة صمت طويلة، لكنه ظلّ محتفظًا بروحه وذاكرته.",
    tl_2022_t:"العودة والترميم",
    tl_2022_d:"في عام 2022، عاد أزاد طارق الألماني لإحياء بيت التحفيات من جديد. وبدعمٍ من إخوته، أُعيد ترميم البيت وافتُتح كواجهة ثقافية وتراثية وفنية، تجمع بين الأصالة والحداثة، وتكمل مسيرة ثلاثة أجيال.",
    nav_press:"الصحافة",
press_title:"الصحافة",
press_sub:"أرشيف مختار من الصحف والمجلات التي تناولت بيت التحفيات عبر السنوات.",


    cards:[
      {t:"نبذة عن بيت التحفيات", d:"القصة، التاريخ، الصور", href:"about.html"},
      {t:"متجر بيت التحفيات", d:"تصفّح القطع كاملة", href:"https://houseofantiques.github.io/mtjer01/"},
      {t:"جولة افتراضية", d:"360° داخل بيت التحفيات", href:"tour.html"},
      {t:"احجز في بيت التحفيات", d:"فورما الحجز والزيارات", href:"https://houseofantiques.github.io/Booking-/"},
      {t:"مزاد بيت التحفيات", d:"الموعد القادم / قريباً", href:"auction.html"},
    ]
  },

  en: {
    brand1:"House of Antiques",
    brand2:"Baghdad Heritage",
    nav_home:"Home",
    nav_about:"About",
    nav_store:"Store",
    nav_tour:"Virtual Tour",
    nav_booking:"Booking",
    nav_auction:"Auction",

    kicker:"Heritage Destination — Baghdad",
    h1a:"WELCOME TO",
    h1b:"HOUSE OF ANTIQUES",
    sub:"A museum-like experience with rare pieces, family stories, and a virtual tour—plus a full online store to explore unique items.",
    cta1:"Explore Store",
    cta2:"View Virtual Tour",

    story_label1:"About the House",
    story_title1:"A Living Memory of Baghdad",
    story_text1:"Not just a store—an immersive, museum-like experience filled with heritage: doors, carpets, copper, crystal, and art—inside a timeless atmosphere.",

    story_label2:"3 Generations",
    story_title2:"A Family Story Across Time",
    story_text2:"Three generations shaped the journey: the grandfather’s dream, the father’s passion, and the grandchildren’s return to restore and revive the house as a cultural landmark.",

    stats_title:"A House Rich in Detail",
    stats_sub:"Key figures that summarize the experience — easy to update.",
    stat_age:"House age (years)",
    stat_rooms:"Number of rooms",
    stat_antiques:"Number of antiques",
    stat_visitors:"Visitors since the 1980s",

    timeline_title:"Timeline",
    timeline_sub:"Key moments that shaped House of Antiques.",
    tl_1989_t:"Opening",
    tl_1989_d:"Opened as an antique & collectibles store.",
    tl_2004_t:"Closure",
    tl_2004_d:"Closed due to the war.",
    tl_2022_t:"Return & Restoration",
    tl_2022_d:"Azad Tareq returned to restore and revive the house.",
    nav_press:"Press",
press_title:"Press",
press_sub:"Selected archive of newspapers & magazines that featured House of Antiques.",


    cards:[
      {t:"About", d:"Story, history, photos", href:"about.html"},
      {t:"Store", d:"Browse all items", href:"store.html"},
      {t:"Virtual Tour", d:"360° inside the house", href:"tour.html"},
      {t:"Booking", d:"Booking form & visits", href:"booking.html"},
      {t:"Auction", d:"Next date / Coming soon", href:"auction.html"},
    ]
  },

  ku: {
    brand1:"ماڵی کەلەپوورییەکان",
    brand2:"House of Antiques",
    nav_home:"سەرەکی",
    nav_about:"دەربارە",
    nav_store:"فرۆشگا",
    nav_tour:"گەشت",
    nav_booking:"حەجز",
    nav_auction:"مزاد",

    kicker:"شوێنێکی کەلەپووری — بەغدا",
    h1a:"بەخێربێیت بۆ",
    h1b:"ماڵی کەلەپوورییەکان",
    sub:"تاقیکردنەوەیەکی مۆزەیی لەگەڵ شتێکی نادر، چیرۆک و گەشتی 360° — هەروەها فرۆشگای تەواو.",
    cta1:"بینینی فرۆشگا",
    cta2:"بینینی گەشتی 360°",

    story_label1:"دەربارەی ماڵەکە",
    story_title1:"یادگارییەکی زیندووی بەغدا",
    story_text1:"تەنها فرۆشگا نییە—تجربەیەکی وەک مۆزە کە پڕە لە دەرگا، سجاد، نەحاس، کریستال و کاری هونەری.",

    story_label2:"3 نەوە",
    story_title2:"چیرۆکێکی خێزانی",
    story_text2:"چیرۆکەکە لە سێ نەوە درێژ دەبێت: ئارەزووی باوان، خۆشەویستی باوک، و گەڕانەوەی نەوەکان بۆ چاککردن و ژیاندنەوەی شوێنەکە.",

    stats_title:"ماڵێک پڕ لە وردەکاری",
    stats_sub:"ژمارەکان دەتوانرێت بە ئاسانی نوێ بکرێنەوە.",
    stat_age:"تەمەنی ماڵ (ساڵ)",
    stat_rooms:"ژمارەی ژوورەکان",
    stat_antiques:"ژمارەی کەلەپوورییەکان",
    stat_visitors:"میوانان لە 80کانەوە",

    timeline_title:"کاتی خێزانی",
    timeline_sub:"قۆناغە سەرەکییەکان.",
    tl_1989_t:"دەستپێکردن",
    tl_1989_d:"کردنەوە وەک فرۆشگای کەلەپووری.",
    tl_2004_t:"داخستن",
    tl_2004_d:"داخراو بوو بەهۆی جەنگ.",
    tl_2022_t:"گەڕانەوە و چاکسازی",
    tl_2022_d:"ئازاد تارق گەڕایەوە بۆ چاکسازی و ژیاندنەوە.",
    

    cards:[
      {t:"دەربارە", d:"چیرۆک، مێژوو، وێنەکان", href:"about.html"},
      {t:"فرۆشگا", d:"بینینی هەموو پارچەکان", href:"store.html"},
      {t:"گەشتی 360°", d:"ناو ماڵەکە بە 360°", href:"tour.html"},
      {t:"حەجز", d:"فۆرمی حەجز و سەردان", href:"booking.html"},
      {t:"مزاد", d:"کات/بەزووترین کات", href:"auction.html"},
    ]
  }
};

function applyDir(){
  const isRTL = RTL_LANGS.has(lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = isRTL ? "rtl" : "ltr";
}
function t(key){ return I18N[lang]?.[key] ?? ""; }

function setLang(newLang){
  lang = newLang;
  localStorage.setItem(LS_KEY, lang);
  renderAll();
}

function bindLangButtons(){
  document.querySelectorAll("[data-lang]").forEach(btn=>{
    btn.addEventListener("click", ()=> setLang(btn.dataset.lang));
  });
}
function markActiveLang(){
  document.querySelectorAll("[data-lang]").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

/* HERO SLIDER */
let slideIndex = 0;
let slideTimer = null;

function setHeroSlide(i){
  slideIndex = (i + HERO_SLIDES.length) % HERO_SLIDES.length;
  const bg = document.getElementById("heroBg");
  const count = document.getElementById("slideCount");
  if (!bg) return;

  bg.style.opacity = "0";
  window.setTimeout(()=>{
    bg.style.backgroundImage = `url("${HERO_SLIDES[slideIndex]}")`;
    bg.style.opacity = "1";
    if (count) count.textContent = `${slideIndex+1}/${HERO_SLIDES.length}`;
  }, 240);
}

function startSlider(){
  stopSlider();
  slideTimer = window.setInterval(()=> setHeroSlide(slideIndex + 1), 4000);
}
function stopSlider(){
  if (slideTimer) window.clearInterval(slideTimer);
  slideTimer = null;
}
function bindSliderButtons(){
  const prev = document.getElementById("prevSlide");
  const next = document.getElementById("nextSlide");
  if (prev) prev.addEventListener("click", ()=> { setHeroSlide(slideIndex-1); startSlider(); });
  if (next) next.addEventListener("click", ()=> { setHeroSlide(slideIndex+1); startSlider(); });
}

/* CARDS */
function renderCards(){
  const grid = document.getElementById("cardsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  I18N[lang].cards.forEach((c, idx)=>{
    const a = document.createElement("a");
    a.className = "card reveal";
    a.href = c.href;

    const thumb = document.createElement("div");
    thumb.className = "thumb";
    thumb.style.backgroundImage = `url("${CARD_IMAGES[idx] || CARD_IMAGES[0]}")`;

    const meta = document.createElement("div");
    meta.className = "meta";

    const title = document.createElement("p");
    title.className = "title";
    title.textContent = c.t;

    const desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = c.d;

    meta.appendChild(title);
    meta.appendChild(desc);
    a.appendChild(thumb);
    a.appendChild(meta);
    grid.appendChild(a);
  });
}

/* HEADER TEXTS */
function renderHeader(){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if (key && t(key)) el.textContent = t(key);
  });
  markActiveLang();
}

/* STATS */
function numberFormat(n){
  try{ return new Intl.NumberFormat(lang === "ar" ? "ar-IQ" : "en-US").format(n); }
  catch{ return String(n); }
}
function renderStats(){
  const nowYear = new Date().getFullYear();
  const age = Math.max(0, nowYear - STATS.openedYear);

  const a = document.getElementById("statAge");
  const r = document.getElementById("statRooms");
  const an = document.getElementById("statAntiques");
  const v = document.getElementById("statVisitors");

  if (a) a.textContent = numberFormat(age);
  if (r) r.textContent = numberFormat(STATS.rooms);
  if (an) an.textContent = numberFormat(STATS.antiques);
  if (v) v.textContent = numberFormat(STATS.visitorsTotal);
}

/* SOCIAL DOCK LINKS */
function bindDock(){
  const wa = document.getElementById("dockWhatsApp");
  const call = document.getElementById("dockCall");
  const email = document.getElementById("dockEmail");
  const fb = document.getElementById("dockFacebook");
  const ig = document.getElementById("dockInstagram");

  if (wa) wa.href = `https://wa.me/${LINKS.WHATSAPP_NUMBER_INTL}`;
  if (call) call.href = `tel:${LINKS.PHONE_INTL}`;
  if (email) email.href = `mailto:${LINKS.EMAIL}`;
  if (fb) fb.href = LINKS.FACEBOOK_URL;
  if (ig) ig.href = LINKS.INSTAGRAM_URL;
}

/* REVEAL ON SCROLL */
function setupReveal(){
  const els = Array.from(document.querySelectorAll(".reveal"));
  if (!els.length) return;

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting){
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el=> io.observe(el));
}

/* TIMELINE PROGRESS */
function setupTimelineProgress(){
  const prog = document.getElementById("timelineProg");
  const rail = document.getElementById("timeline");
  if (!prog || !rail) return;

  function onScroll(){
    const rect = rail.getBoundingClientRect();
    const vh = window.innerHeight || 1;

    // يبدأ من دخول السكشن إلى منتصف الشاشة
    const start = vh * 0.2;
    const end = vh * 0.85;

    const total = rect.height + (end - start);
    const passed = (start - rect.top);

    let p = passed / total;
    p = Math.max(0, Math.min(1, p));

    prog.style.width = `${p * 100}%`;
  }

  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();
}

/* TOPBAR SOLID ON SCROLL */
function setupTopbar(){
  const topbar = document.getElementById("topbar");
  if (!topbar) return;
  const onScroll = ()=>{
    topbar.classList.toggle("isSolid", window.scrollY > 22);
  };
  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();
}

function renderAll(){
  applyDir();
  renderHeader();
  renderCards();
  renderStats();
  bindDock();

  // بعد ما تنرسم الكروت نعيد تفعيل reveal
  setupReveal();
}

document.addEventListener("DOMContentLoaded", ()=>{
  bindLangButtons();
  bindSliderButtons();

  setupTopbar();
  renderAll();

  setHeroSlide(0);
  startSlider();

function setupTimelineV2(){
  const track = document.getElementById("tlTrack");
  const dotsBox = document.getElementById("tlDots");
  const prog = document.getElementById("tlProg");
  const yearLabel = document.getElementById("tlActiveYear");
  const prev = document.getElementById("tlPrev");
  const next = document.getElementById("tlNext");

  if (!track || !dotsBox || !prog || !yearLabel) return;

  const slides = Array.from(track.querySelectorAll(".tlSlide"));
  if (!slides.length) return;

  // dots
  dotsBox.innerHTML = "";
  slides.forEach((_, i)=>{
    const d = document.createElement("span");
    if (i === 0) d.classList.add("active");
    d.addEventListener("click", ()=>{
      slides[i].scrollIntoView({ behavior:"smooth", inline:"start", block:"nearest" });
    });
    dotsBox.appendChild(d);
  });

  function setActive(idx){
    const dots = Array.from(dotsBox.children);
    dots.forEach((x,i)=> x.classList.toggle("active", i===idx));
    yearLabel.textContent = slides[idx].dataset.year || "—";
    prog.style.width = `${(idx/(slides.length-1 || 1))*100}%`;
  }

  // observe slides for active state
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (!e.isIntersecting) return;
      const idx = slides.indexOf(e.target);
      if (idx >= 0) setActive(idx);
    });
  }, { root: track, threshold: 0.6 });

  slides.forEach(s=> io.observe(s));

  function currentIndex(){
    // أقرب سلايد للـ scrollLeft
    const rect = track.getBoundingClientRect();
    let best = 0, bestDist = Infinity;
    slides.forEach((s,i)=>{
      const r = s.getBoundingClientRect();
      const dist = Math.abs(r.left - rect.left);
      if (dist < bestDist){ bestDist = dist; best = i; }
    });
    return best;
  }

  if (prev) prev.addEventListener("click", ()=>{
    const i = currentIndex();
    const n = Math.max(0, i-1);
    slides[n].scrollIntoView({ behavior:"smooth", inline:"start", block:"nearest" });
  });
  if (next) next.addEventListener("click", ()=>{
    const i = currentIndex();
    const n = Math.min(slides.length-1, i+1);
    slides[n].scrollIntoView({ behavior:"smooth", inline:"start", block:"nearest" });
  });

  setActive(0);
}
});
