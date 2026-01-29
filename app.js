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
  1989: { img:"assetstimeline1989.jpg", title:"الافتتاح", text:"في عام 1989، اشترى طارق محمد علي الألماني بيت التحفيات تحقيقًا لأمنية والده، ليكون بيتًا يحتضن جميع التحف التي جمعها عبر السنين. لم يكن الافتتاح مجرد بداية لمكان، بل ولادة واجهة ثقافية وتراثية وسياحية جمعت الذوق الرفيع والهوية البغدادية. وسرعان ما أصبح بيت التحفيات مقصدًا لزوار من مختلف دول العالم، من دبلوماسيين وإعلاميين وصحفيين، لما يحمله من فرادة وقيمة ثقافية جعلته علامة مميزة في ذاكرة بغداد." },
  2004: { img:"cover.jpg", title:"الإغلاق", text:"في عام 2004، ومع تصاعد الأوضاع الأمنية والحرب في بغداد، أُجبر بيت التحفيات على إغلاق أبوابه. كانت مرحلة صعبة فرضت على العائلة مغادرة البلاد، لتتوقف الحركة داخل البيت، دون أن تنطفئ روحه. ورغم الإغلاق، بقيت التحف محفوظة بذاكرتها وقيمتها، انتظارًا ليوم تعود فيه الحياة إلى المكان، وتستكمل الحكاية من حيث توقفت." },
  2022: { img:"aboutgrandson.jpg", title:"العودة والترميم", text:"في عام 2022، عاد الحفيد أزاد طارق محمد علي الألماني إلى بغداد حاملًا إرث العائلة ووصيتها، ليبدأ مرحلة ترميم شاملة لبيت التحفيات بعد سنوات طويلة من الإغلاق. لم تكن العودة مجرد ترميمٍ لجدران أو ترتيبٍ لتحف، بل كانت فعل وفاء لذاكرة المكان، ومحاولة لإحياء روح البيت كما كان، مع الحفاظ على أصالته وهويته التراثية. عمل أزاد على إعادة تنظيم التحف وترميم البيت بعناية، واضعًا نصب عينيه أن يعود بيت التحفيات واجهة ثقافية ومتحفية وسياحية تعكس تاريخ بغداد وذوقها العريق، وتفتح أبوابها من جديد للزوار، لتستمر الحكاية عبر جيل ثالث آمن بأن التراث يُصان بالعودة إليه وإحيائه." },
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
    heroTitle1:"مرحبًا بكم في", heroTitle2:"بيت التحفيات",
    heroDesc:"ذاكرة بغداد… بيت يجمع التحف النادرة والسجاد والنحاس والخشب والكريستال والأعمال الفنية في تجربة متحفية فاخرة.",
    ctaExplore:"استكشف الأقسام", ctaMore:"اقرأ أكثر",
    entrancesTitle:"بوابات بيت التحفيات", entrancesDesc:"اختر طريقك إلى الذاكرة… ولكل باب حكاية.",
    t1Tag:"نبذة", t1Title:"قصة بيت التحفيات", t1Sub:"ذاكرة بغداد",
    t2Tag:"المتجر", t2Title:"تسوق التحف", t2Sub:"قطع نادرة",
    t3Tag:"الحجز", t3Title:"احجزي زيارتك", t3Sub:"زيارة • تصوير • فعالية",
    t4Tag:"صحافة", t4Title:"تغطيات وأخبار", t4Sub:"مقالات • فيديو",
    t5Tag:"المزاد", t5Title:"المزاد القادم", t5Sub:"تفاصيل وحجز",
    t6Tag:"جولة 360", t6Title:"جولة افتراضية", t6Sub:"استكشاف قبل الزيارة",
    aboutTitle:"بيت غنيّ بالتفاصيل", aboutDesc:"من متجر أنتيك إلى وجهة متحفية وثقافية…",
    s1:"عمر البيت (سنة)", s2:"عدد الغرف", s3:"عدد التحف", s4:"عدد الزوار منذ الثمانينات",
    c1t:"الفكرة التي بدأت بالحلم", c1p:"بيت التحفيات مساحة ثقافية تنبض بذاكرة بغداد، تلتقي فيها التحف النادرة مع حكايات الزمن، بيتٌ يحتضن الفن والذوق والتاريخ في مكان واحد، ويفتح أبوابه لكل من يبحث عن الجمال والمعنى، بعيدًا عن العابر… وقريبًا من الذاكرة.",
    c2t:"هوية بغداد داخل بيت", c2p:"تتجلى هوية بغداد داخل بيت التحفيات في كل زاوية وتفصيلة، من السجاد العتيق والنحاس المصقول إلى الخشب المنحوت والكريستال، حيث تحضر المدينة بروحها وذاكرتها العريقة. هنا لا تُعرض القطع كتحف صامتة، بل كشواهد حيّة تحكي ذوق بغداد وتاريخها، وتمنح الزائر تجربة ثقافية تعكس عمق المكان وأصالته.",
    c3t:"ثلاثة أجيال… وذاكرة واحدة", c3p:"امتدّ بيت التحفيات عبر ثلاثة أجيال حملت الشغف نفسه، وحافظت على روح الأنتيك والتراث دون انقطاع. جيلٌ أسّس الذوق، وجيلٌ صانه وطوّره، وجيلٌ أعاد إحياءه بروح معاصرة، لتبقى التحف شاهدة على تاريخ عائلة آمنت بأن التراث ليس ماضيًا يُحفظ، بل هو هوية تُورَّث وتُعاش.",
    timelineTitle:"الخط الزمني", timelineDesc:"ثلاث محطات صنعت قصة البيت",
    top:"للأعلى"
  },
   en: {
    dir:"ltr",
    brandAr:"بيت التحفيات", brandEn:"House of Antiques",
    navAbout:"About", navExplore:"Explore", navStats:"Statistics", navTimeline:"Timeline",
    heroTitle1:"Welcome to", heroTitle2:"House of Antiques",
    heroDesc:"The memory of Baghdad… a house that brings together rare antiques, carpets, brass, wood, crystal, and artworks in a refined museum experience.",
    ctaExplore:"Explore Sections", ctaMore:"Read More",
    entrancesTitle:"Gateways of the House", entrancesDesc:"Choose your path into memory… every door tells a story.",
    t1Tag:"About", t1Title:"The Story of the House", t1Sub:"Baghdad’s Memory",
    t2Tag:"Store", t2Title:"Antiques Shop", t2Sub:"Rare Pieces",
    t3Tag:"Booking", t3Title:"Book Your Visit", t3Sub:"Visit • Photography • Events",
    t4Tag:"Press", t4Title:"Media & Coverage", t4Sub:"Articles • Videos",
    t5Tag:"Auction", t5Title:"Upcoming Auction", t5Sub:"Details & Booking",
    t6Tag:"360 Tour", t6Title:"Virtual Tour", t6Sub:"Explore Before You Visit",
    aboutTitle:"A House Rich in Detail", aboutDesc:"From an antique store to a cultural and museum destination…",
    s1:"House Age (Years)", s2:"Number of Rooms", s3:"Number of Antiques", s4:"Visitors Since the 1980s",
    c1t:"A Refined Museum Experience",
    c1p:"House of Antiques is a cultural space that breathes with the memory of Baghdad, where rare pieces meet the stories of time. It embraces art, taste, and history in one place, opening its doors to those seeking beauty and meaning—far from the ordinary, and close to memory.",
    c2t:"The Identity of Baghdad Within",
    c2p:"The identity of Baghdad reveals itself throughout the House of Antiques, from antique carpets and polished brass to carved wood and crystal. Here, the city lives through its heritage, as each piece becomes a living witness that reflects Baghdad’s taste, history, and enduring soul.",
    c3t:"Three Generations… One Memory",
    c3p:"The House of Antiques spans three generations united by the same passion, preserving the spirit of antiques and heritage without interruption. One generation established the taste, another protected and refined it, and a third revived it with a contemporary vision—proving that heritage is not a preserved past, but a living identity passed on and experienced.",
    timelineTitle:"Timeline", timelineDesc:"Three milestones that shaped the story of the house",
    top:"Back to Top"
  
  },
  ku: {
  dir:"rtl",
  brandAr:"بيت التحفيات", brandEn:"House of Antiques",
  navAbout:"دەربارە", navExplore:"بگەڕێ", navStats:"ئامارەکان", navTimeline:"هێڵی کات",
  heroTitle1:"بەخێربێن بۆ", heroTitle2:"ماڵی کەلوپەلی دەگمەن",
  heroDesc:"یادەوەریی بەغدا… ماڵێک کە کەلوپەلی دەگمەن، قالی، مس، دار، کریستال و کاری هونەری تێکەڵ دەکات لە ئەزموونێکی مۆزەیی و فاخر.",
  ctaExplore:"بەشەکان ببینە", ctaMore:"زیاتر بخوێنەوە",
  entrancesTitle:"دەرگاکانی ماڵی کەلوپەلی دەگمەن", entrancesDesc:"ڕێگات هەڵبژێرە بۆ ناو یادەوەری… هەر دەرگایەک چیرۆکێکی تایبەتی هەیە.",
  t1Tag:"دەربارە", t1Title:"چیرۆکی ماڵی کەلوپەلی دەگمەن", t1Sub:"یادەوەریی بەغدا",
  t2Tag:"فرۆشگا", t2Title:"بازاڕی کەلوپەلی دەگمەن", t2Sub:"پارچە دەگمەنەکان",
  t3Tag:"حجز", t3Title:"سەردانت تۆمار بکە", t3Sub:"سەردان • وێنەگرتن • چالاکی",
  t4Tag:"میڈیا", t4Title:"هەواڵ و ڕاپۆرتەکان", t4Sub:"وتار • ڤیدیۆ",
  t5Tag:"مزاد", t5Title:"مزادی داهاتوو", t5Sub:"وردەکاری و تۆمارکردن",
  t6Tag:"360 گەشت", t6Title:"گەشتی مجازی", t6Sub:"پێش سەردان بگەڕێ",
  aboutTitle:"ماڵێک پڕ لە وردەکاری",
  aboutDesc:"لە فرۆشگای کەلوپەلی دەگمەنەوە بۆ شوێنێکی مۆزەیی و کولتووری…",
  s1:"تەمەنی ماڵ (ساڵ)", s2:"ژمارەی ژوورەکان", s3:"ژمارەی کەلوپەلەکان", s4:"ژمارەی سەردانکاران لە ٨٠یەکانەوە",
  c1t:"ئەزموونێکی مۆزەیی و فاخر",
  c1p:"ماڵی کەلوپەلی دەگمەن بۆشاییەکی کولتوورییە کە بە یادەوەریی بەغدا هەناسە دەدات، لێرەدا کەلوپەلی دەگمەن لەگەڵ چیرۆکەکانی کات تێکەڵ دەبن. هونەر، ذوق و مێژوو لە شوێنێکدا کۆ دەکاتەوە، و دەرگاکانی دەکاتەوە بۆ ئەوانەی بەدوای جوانی و مانا دەگەڕێن، دوور لە عابەر… نزیک لە یادەوەری.",
  c2t:"ناسنامەی بەغدا لە ناو ماڵدا",
  c2p:"ناسنامەی بەغدا لە هەموو گوشە و وردەکارییەکانی ماڵی کەلوپەلی دەگمەن دیارە، لە قالی کۆن و مسی ڕووناکەوە بۆ داری نەخشکراو و کریستال. لێرەدا شار بە ڕۆح و یادەوەرییەکەی ئامادەیە، و هەر پارچەیەک دەبێت بە شایەتی زیندوو کە ذوق و مێژووی بەغدا دەگوازێتەوە.",
  c3t:"سێ نەوە… یادیەک",
  c3p:"ماڵی کەلوپەلی دەگمەن بە درێژایی سێ نەوە بەردەوام بووە، هەموویان هەمان خۆشەویستیان هەبوو و ڕۆحی کەلوپەلی دەگمەن و میراتیان پاراستووە. نەوەیەک ذوقی دامەزراند، نەوەیەک پاراستی و پەرەپێدرا، و نەوەی سێیەم بە ڕۆحێکی هاوچەرخ دووبارە زیندووی کردەوە، بۆ ئەوەی میرات تەنها ڕابردوو نەبێت، بەڵکو ناسنامەیەک بێت کە دەگوازرێتەوە و دەژی.",
  timelineTitle:"هێڵی کات",
  timelineDesc:"سێ قۆناغ کە چیرۆکی ماڵەکەیان دروست کرد",
  top:"بۆ سەرەوە"
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
