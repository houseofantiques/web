"use strict";

const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));

/* =========================
   1) Mobile nav
========================= */
(function(){
  const burger = $(".nav__burger");
  const links = $("#navLinks");
  if(!burger || !links) return;

  const close = () => {
    links.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  };

  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });

  links.addEventListener("click", (e)=>{
    if(e.target.closest("a")) close();
  });

  document.addEventListener("click", (e)=>{
    if(!links.classList.contains("is-open")) return;
    if(links.contains(e.target) || burger.contains(e.target)) return;
    close();
  });

  document.addEventListener("keydown",(e)=>{ if(e.key==="Escape") close(); });
})();

/* =========================
   2) Hero background slider
   (real images already in HTML)
========================= */
const heroImgs = $$(".hero__bgImg");
let heroIndex = 0;
const prev = $("#prevHero");
const next = $("#nextHero");
const dots = $("#heroDots");

function renderDots(){
  if(!dots) return;
  dots.innerHTML = heroImgs.map((_,i)=>`<button class="dot ${i===0?"is-active":""}" type="button" data-dot="${i}" aria-label="Hero ${i+1}"></button>`).join("");
  dots.addEventListener("click",(e)=>{
    const b = e.target.closest("[data-dot]");
    if(!b) return;
    goHero(Number(b.dataset.dot));
    restartHero();
  });
}

function updateHero(){
  heroImgs.forEach((img,i)=> img.classList.toggle("is-active", i===heroIndex));
  if(dots){
    $$(".dot", dots).forEach((d,i)=> d.classList.toggle("is-active", i===heroIndex));
  }
}

function goHero(n){
  const len = heroImgs.length || 1;
  heroIndex = (n + len) % len;
  updateHero();
}

prev && prev.addEventListener("click", ()=>{ goHero(heroIndex-1); restartHero(); });
next && next.addEventListener("click", ()=>{ goHero(heroIndex+1); restartHero(); });

let heroTimer = null;
function startHero(){
  stopHero();
  heroTimer = setInterval(()=>goHero(heroIndex+1), 5200);
}
function stopHero(){
  if(heroTimer) clearInterval(heroTimer);
  heroTimer = null;
}
function restartHero(){ stopHero(); startHero(); }

// swipe on hero
const hero = $(".hero");
if(hero){
  let x0=null;
  hero.addEventListener("pointerdown",(e)=> x0=e.clientX);
  hero.addEventListener("pointerup",(e)=>{
    if(x0==null) return;
    const dx = e.clientX - x0;
    x0=null;
    if(dx < -40){ goHero(heroIndex+1); restartHero(); }
    if(dx > 40){ goHero(heroIndex-1); restartHero(); }
  });
}

renderDots();
updateHero();
startHero();

/* =========================
   3) Count-up stats
========================= */
(function(){
  const nums = $$(".num[data-count]");
  if(!nums.length) return;

  const ease = t => 1 - Math.pow(1-t, 3);

  const run = (el) => {
    const target = Number(el.dataset.count || "0");
    const dur = 900;
    const t0 = performance.now();

    const step = (now) => {
      const p = Math.min(1, (now - t0)/dur);
      const v = Math.round(target * ease(p));
      el.textContent = v.toLocaleString("ar-IQ");
      if(p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        run(en.target);
        io.unobserve(en.target);
      }
    });
  }, {threshold:.35});

  nums.forEach(n=>io.observe(n));
})();

/* =========================
   4) Timeline switch
========================= */
const TL = {
  1989: { img:"assetstimeline1989.jpg", title:"الافتتاح", text:"في عام 1989 بدأ بيت التحفيات كمتجر أنتيك وتحف نادرة بذوق رفيع." },
  2004: { img:"assetstimeline1989.jpg", title:"الإغلاق", text:"في عام 2004 توقّف البيت بسبب الظروف، لكنه بقي محافظًا على روحه وذاكرته." },
  2022: { img:"assetstimeline1989.jpg", title:"العودة والترميم", text:"في عام 2022 بدأت مرحلة العودة والترميم لإحياء البيت كوجهة متحفية وثقافية." },
};

const tlCard = $("#tlCard");
const tlTitle = $("#tlTitle");
const tlText = $("#tlText");
const yearBtns = $$(".y[data-year]");

function setYear(y){
  yearBtns.forEach(b=> b.classList.toggle("is-active", b.dataset.year===String(y)));
  const data = TL[y] || TL[1989];
  if(tlCard){
    const img = tlCard.querySelector(".tlImg img");
    if(img) img.src = data.img;
  }
  if(tlTitle) tlTitle.textContent = data.title;
  if(tlText) tlText.textContent = data.text;
  const yearEl = tlCard ? tlCard.querySelector(".tlYear") : null;
  if(yearEl) yearEl.textContent = String(y);
}

yearBtns.forEach(b=>{
  b.addEventListener("click", ()=> setYear(Number(b.dataset.year)));
});

/* =========================
   5) Language (basic)
   (جاهز نطوره بعدين)
========================= */
const I18N = {
  ar: {
    dir:"rtl",
    brandAr:"بيت التحفيات", brandEn:"House of Antiques",
    navAbout:"نبذة", navExplore:"استكشف", navStats:"الأرقام", navTimeline:"الخط الزمني",
    heroPill:"جولات يومية", heroMeta:"11 صباحًا • 2 ظهرًا",
    heroTitle1:"مرحبًا بكم في", heroTitle2:"بيت التحفيات",
    heroDesc:"ذاكرة بغداد… بيت يجمع التحف النادرة والسجاد والنحاس والخشب والكريستال والأعمال الفنية في تجربة متحفية فاخرة.",
    ctaExplore:"استكشف الأقسام", ctaMore:"اقرأ أكثر",
    entrancesTitle:"مداخل الصفحات", entrancesDesc:"اختاري وجهتك بسرعة…",
    t1Tag:"نبذة", t1Title:"قصة بيت التحفيات", t1Sub:"ذاكرة بغداد",
    t2Tag:"المتجر", t2Title:"تسوق التحف", t2Sub:"قطع نادرة",
    t3Tag:"الحجز", t3Title:"احجزي زيارتك", t3Sub:"زيارة • تصوير • فعالية",
    t4Tag:"صحافة", t4Title:"تغطيات وأخبار", t4Sub:"مقالات • فيديو",
    t5Tag:"المزاد", t5Title:"المزاد القادم", t5Sub:"تفاصيل وحجز",
    t6Tag:"جولة 360", t6Title:"جولة افتراضية", t6Sub:"استكشاف قبل الزيارة",
    aboutTitle:"بيت غنيّ بالتفاصيل", aboutDesc:"من متجر أنتيك إلى وجهة متحفية وثقافية…",
    s1:"عمر البيت (سنة)", s2:"عدد الغرف", s3:"عدد التحف", s4:"عدد الزوار منذ الثمانينات",
    c1t:"تجربة متحفية فاخرة", c1p:"تصميم داكن أنيق ومسارات واضحة للزيارة ومداخل سريعة للمتجر والحجز والجولة.",
    c2t:"هوية بغداد داخل بيت", c2p:"السجاد والنحاس والخشب والكريستال… كل قطعة تحمل قصة وتاريخ.",
    c3t:"UX قوي للموبايل", c3p:"أزرار كبيرة، سكرول ناعم، حركات خفيفة، وتجربة محترمة بدون ثقل.",
    timelineTitle:"الخط الزمني", timelineDesc:"ثلاث محطات صنعت قصة البيت",
    top:"للأعلى"
  },
  en: {
    dir:"ltr",
    brandAr:"House of Antiques", brandEn:"Baghdad",
    navAbout:"About", navExplore:"Explore", navStats:"Stats", navTimeline:"Timeline",
    heroPill:"Daily tours", heroMeta:"11 AM • 2 PM",
    heroTitle1:"WELCOME TO", heroTitle2:"HOUSE OF ANTIQUES",
    heroDesc:"Baghdad’s memory—rare antiques, carpets, copper, wood, crystal and fine art in a premium museum-like experience.",
    ctaExplore:"Explore sections", ctaMore:"Read more",
    entrancesTitle:"Quick entrances", entrancesDesc:"Choose your destination…",
    t1Tag:"ABOUT", t1Title:"Our Story", t1Sub:"Baghdad’s memory",
    t2Tag:"STORE", t2Title:"Shop antiques", t2Sub:"Rare pieces",
    t3Tag:"BOOKING", t3Title:"Book your visit", t3Sub:"Visit • Photos • Events",
    t4Tag:"PRESS", t4Title:"News & Coverage", t4Sub:"Articles • Video",
    t5Tag:"AUCTION", t5Title:"Upcoming auction", t5Sub:"Details & Booking",
    t6Tag:"360 TOUR", t6Title:"Virtual tour", t6Sub:"Explore before visiting",
    aboutTitle:"A house rich in details", aboutDesc:"From an antique store to a cultural museum destination…",
    s1:"House age (years)", s2:"Rooms", s3:"Antiques", s4:"Visitors since the 80s",
    c1t:"Premium museum experience", c1p:"Elegant dark design, clear paths, and fast entrances to store/booking/tour.",
    c2t:"Baghdad’s identity in one house", c2p:"Carpets, copper, wood, crystal—each piece tells a story.",
    c3t:"Strong mobile UX", c3p:"Big tap targets, smooth scroll, subtle motion—clean experience.",
    timelineTitle:"Timeline", timelineDesc:"Three milestones",
    top:"Top"
  },
  ku: {
    dir:"rtl",
    brandAr:"بيت التحفيات", brandEn:"بەغدا • House of Antiques",
    navAbout:"دەربارە", navExplore:"گەڕان", navStats:"ژمارەکان", navTimeline:"هێڵی کات",
    heroPill:"گەشتی ڕۆژانە", heroMeta:"١١ بەیانی • ٢ نیوەڕۆ",
    heroTitle1:"بەخێربێن بۆ", heroTitle2:"بيت التحفيات",
    heroDesc:"یادگاری بەغدا… تحفەی دەگمەن و هونەری ڕەسەن لە ئەزموونێکی مۆزەیی لوکسدا.",
    ctaExplore:"ببینە بەشەکان", ctaMore:"زیاتر بخوێنەوە",
    entrancesTitle:"دەرچوونەکان", entrancesDesc:"شوێنەکەت هەڵبژێرە…",
    t1Tag:"دەربارە", t1Title:"چیرۆکی ماڵ", t1Sub:"یادگاری بەغدا",
    t2Tag:"فرۆشگا", t2Title:"فرۆشتنی تحف", t2Sub:"پارچەی دەگمەن",
    t3Tag:"حجز", t3Title:"حجز بکە", t3Sub:"سەردان • وێنە • بۆنە",
    t4Tag:"ڕۆژنامە", t4Title:"هەواڵ و ڕاپۆرت", t4Sub:"وتار • ڤیدیۆ",
    t5Tag:"مزاد", t5Title:"مزادی داهاتوو", t5Sub:"وردەکاری و حجز",
    t6Tag:"٣٦٠", t6Title:"گەشتی ئەلیکترۆنی", t6Sub:"پێش سەردان ببینە",
    aboutTitle:"ماڵێک پڕ لە وردەکاری", aboutDesc:"لە فرۆشگای ئەنتیکەوە بۆ شوێنێکی کلتوری مۆزەیی…",
    s1:"تەمەنی ماڵ (ساڵ)", s2:"ژمارەی ژوورەکان", s3:"ژمارەی تحف", s4:"ژمارەی میوانان",
    c1t:"ئەزموونی مۆزەیی لوکس", c1p:"دیザインی تاریک و شیک، ڕێگای ڕوون، و دەرچوونی خێرا.",
    c2t:"ناسنامەی بەغدا", c2p:"هەر پارچەیەک چیرۆکێکی هەیە.",
    c3t:"باش بۆ مۆبایل", c3p:"کلیکە گەورە و جوڵەی نەرم.",
    timelineTitle:"هێڵی کات", timelineDesc:"سێ قۆناغی سەرەکی",
    top:"سەرەوە"
  }
};

let lang = localStorage.getItem("hoa_lang") || "ar";
function applyLang(l){
  const d = I18N[l] || I18N.ar;
  lang = l;
  document.documentElement.dir = d.dir;
  $$(".chip").forEach(b=>b.classList.toggle("is-active", b.dataset.lang===l));
  $$("[data-i18n]").forEach(el=>{
    const key = el.dataset.i18n;
    if(d[key]!=null) el.textContent = d[key];
  });
  localStorage.setItem("hoa_lang", l);
}
$$(".chip").forEach(b=> b.addEventListener("click", ()=> applyLang(b.dataset.lang)));
applyLang(lang);
