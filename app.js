"use strict";

const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));

/* =========================
   1) Mobile nav
========================= */
(function(){
const burger = $(".navV2__burger");
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
