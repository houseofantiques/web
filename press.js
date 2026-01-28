"use strict";

/* =========================================================
  HOA — press.js (fits your press.html exactly)
  - Builds year chips dynamically
  - Search
  - Grid cards
  - Lightbox (lbMeta style)
========================================================= */

/* 1) DATA — اربط الصور بأسماء ملفاتك داخل assets/press/
   نصيحة: خلي صورك بنفس أسماء id حتى ترتاح
*/
const PRESS_ITEMS = [
  {
    id: "1971-altaakhi",
    year: 1971,
    title: "رجل مهنته البحث عن الحلي القديمة",
    source: "جريدة التآخي — الخميس 22 تموز 1971",
    src: "press1.jpg"
  },
  {
    id: "1973-aljumhuriya",
    year: 1973,
    title: "الزمن والأشياء في بيت التحفيات",
    source: "جريدة الجمهورية — الخميس 23 آب 1973",
    src: "press2.jpg"
  },
  {
    id: "1989-althawra",
    year: 1989,
    title: "وفاءً لأمنية والده أقام بيت التحفيات",
    source: "جريدة الثورة — الخميس 1 حزيران 1989",
    src: "press3.jpg"
  },
  {
    id: "1989-aljumhuriya-home-or-museum",
    year: 1989,
    title: "بيت أم متحف للتحفيات البغدادية؟",
    source: "جريدة الجمهورية — السبت 14 تشرين الأول 1989",
    src: "press4.jpg"
  },
  {
    id: "1990-alnidaa-kuwait",
    year: 1990,
    title: "متحف صغير لبيع مخلفات الماضي الجميل",
    source: "جريدة النداء (الكويت) — كانون الأول 1990",
    src: "press5.jpg"
  },
  {
    id: "2002-alifbaa-excerpt",
    year: 2002,
    title: "حوار مجلة ألف باء مع الحفيدة هندرين طارق الألماني (مقتطف)",
    source: "Issue No. 1786 — Wednesday, December 18, 2002",
    src: "press6.jpg"
  },

  /* مواد إضافية بدون سنة واضحة بالملف المعروض:
     خليها “بدون سنة” مؤقتاً أو عيّن السنة إذا تعرفها
  */
  {
    id: "baghdad-fr-magazine",
    year: 0,
    title: "أخيراً… أصبحت الآثار موطنها بغداد",
    source: "مجلة بغداد (باللغة الفرنسية) — لقاء مع طارق محمد علي",
    src: "press7.jpg"
  },
  {
    id: "alhawadeth-heritage-houses",
    year: 0,
    title: "البيوت القديمة تحولت إلى متاحف — بغداد ترد الصفعة لهولاكو",
    source: "مجلة/جريدة الحوادث",
    src: "press8.jpg"
  },
  {
    id: "german-book-iraq",
    year: 0,
    title: "كتاب ألماني عن العراق يذكر بيت التحفيات كواجهة سياحية",
    source: "كتاب باللغة الألمانية عن العراق",
    src: "press9.jpg"
  }
];

/* 2) Elements (your press.html ids) */
const grid = document.getElementById("pressGrid");
const chipRow = document.getElementById("yearChips");
const search = document.getElementById("pressSearch");

const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbMeta = document.getElementById("lbMeta");
const lbClose = document.getElementById("lbClose");

/* 3) State */
let activeYear = "الكل";
let q = "";

/* 4) Build years list (ignore 0 years in chips) */
function getYears() {
  const ys = PRESS_ITEMS
    .map(x => x.year)
    .filter(y => Number(y) > 0);
  return Array.from(new Set(ys)).sort((a, b) => a - b);
}

/* 5) Chips */
function makeChip(label) {
  const b = document.createElement("button");
  b.className = "chip";
  b.type = "button";
  b.textContent = label;

  b.addEventListener("click", () => {
    activeYear = label;
    renderChips();
    renderGrid();
  });

  return b;
}

function renderChips() {
  if (!chipRow) return;
  chipRow.innerHTML = "";

  const years = getYears();
  const chips = ["الكل", ...years];

  chips.forEach(c => {
    const b = makeChip(c);
    if (String(c) === String(activeYear)) b.classList.add("active");
    chipRow.appendChild(b);
  });
}

/* 6) Matching */
function matches(item) {
  const yearOk =
    (activeYear === "الكل") ||
    (String(item.year) === String(activeYear));

  // إذا year = 0 (غير معروف) نخليه يظهر فقط لما يكون "الكل"
  if (item.year === 0 && activeYear !== "الكل") return false;
  if (!yearOk) return false;

  if (!q) return true;
  const hay = `${item.title} ${item.source} ${item.year}`.toLowerCase();
  return hay.includes(q.toLowerCase());
}

/* 7) Render grid */
function renderGrid() {
  if (!grid) return;
  grid.innerHTML = "";

  const items = PRESS_ITEMS.filter(matches);

  items.forEach(item => {
    const card = document.createElement("button");
    card.className = "pressCard reveal in";
    card.type = "button";

    const thumb = document.createElement("div");
    thumb.className = "pressThumb";
    thumb.style.backgroundImage = `url("${item.src}")`;

    const meta = document.createElement("div");
    meta.className = "pressMeta";

    const y = document.createElement("div");
    y.className = "pressYear";
    y.textContent = item.year ? item.year : "—";

    const t = document.createElement("div");
    t.className = "pressTitle";
    t.textContent = item.title;

    const s = document.createElement("div");
    s.className = "pressSource";
    s.textContent = item.source;

    meta.appendChild(y);
    meta.appendChild(t);
    meta.appendChild(s);

    card.appendChild(thumb);
    card.appendChild(meta);

    card.addEventListener("click", () => openLB(item));
    grid.appendChild(card);
  });

  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "pressEmpty";
    empty.textContent = "لا توجد نتائج حالياً.";
    grid.appendChild(empty);
  }
}

/* 8) Lightbox */
function openLB(item) {
  if (!lb) return;
  lbImg.src = item.src;
  const y = item.year ? item.year : "بدون سنة";
  lbMeta.textContent = `${y} — ${item.source} — ${item.title}`;
  lb.classList.add("show");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLB() {
  if (!lb) return;
  lb.classList.remove("show");
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  lbImg.src = "";
}

if (lbClose) lbClose.addEventListener("click", closeLB);
if (lb) lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLB(); });

/* 9) Search */
if (search) {
  search.addEventListener("input", () => {
    q = search.value.trim();
    renderGrid();
  });
}

/* 10) Init */
renderChips();
renderGrid();
