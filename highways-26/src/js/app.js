window.addEventListener("load", () => {

    const left = document.querySelector(".door-left");
    const right = document.querySelector(".door-right");
    const loader = document.getElementById("loader");
 
    if (!left || !right || !loader) return;

    left.classList.add("open-left");
    right.classList.add("open-right");

    setTimeout(() => {
        loader.style.display = "none";
    },1500);

});

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

let menuOpen = false;

function setMenuOpen(nextOpen) {
  menuOpen = nextOpen;

  if (!menuBtn || !mobileMenu) return;

  mobileMenu.classList.toggle("translate-y-0", nextOpen);
  mobileMenu.classList.toggle("-translate-y-full", !nextOpen);

  menuBtn.setAttribute("aria-expanded", String(nextOpen));
  mobileMenu.setAttribute("aria-hidden", String(!nextOpen));
}

setMenuOpen(false);

menuBtn?.addEventListener("click", () => setMenuOpen(!menuOpen));

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuOpen) setMenuOpen(false);
});
const video = document.getElementById("video-grow");
const section = document.querySelector(".about-sec");
 
if (video && section) {
window.addEventListener("scroll", () => {
 
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // progress of section in viewport
    let progress = (windowHeight - rect.top) / (windowHeight + rect.height);

    // clamp progress between 0 and 1
    progress = Math.max(0, Math.min(progress, 1));

    // scale from 0.6 to 1.2
    let scale = 0.6 + progress * 1.0;

    // stopping point
    scale = Math.min(scale, 1.4);

    video.style.transform = `scale(${scale})`;
 
});
}

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const targetDate = new Date("August 30, 2026 00:00:00").getTime();
 
function updateCountdown(){

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
 
  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000*60*60*24));
  const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((distance % (1000*60)) / 1000);

  daysEl.textContent = String(days).padStart(2,"0");
  hoursEl.textContent = String(hours).padStart(2,"0");
  minutesEl.textContent = String(minutes).padStart(2,"0");
  secondsEl.textContent = String(seconds).padStart(2,"0");
 
}
 
if (daysEl && hoursEl && minutesEl && secondsEl) {
  setInterval(updateCountdown,1000);
  updateCountdown();
}
 
const msection = document.getElementById("movie-section")
const track = document.getElementById("movie-track")

if (msection && track) {
 
let currentX = 0
let targetX = 0

function lerp(start,end,factor){
  return start + (end - start) * factor
}

function onScroll(){

  const rect = msection.getBoundingClientRect()
  const msectionHeight = msection.offsetHeight
  const viewportHeight = window.innerHeight

  const scrollableDistance = msectionHeight - viewportHeight

  if(scrollableDistance <= 0) return

  const scrolled = -rect.top
  const progress = Math.max(0,Math.min(1, scrolled / scrollableDistance))

  const contentWidth = 6100
  const maxTranslate = contentWidth - window.innerWidth + 100

  targetX = progress * maxTranslate
}

function animate(){

  const diff = Math.abs(targetX - currentX)
  const factor = diff > 50 ? 0.12 : 0.06

  currentX = lerp(currentX,targetX,factor)

  if(diff < 0.5){
    currentX = targetX
  }

  track.style.transform = `translate3d(-${currentX}px,0,0)`

  requestAnimationFrame(animate)
}

window.addEventListener("scroll", onScroll)
 
animate()
}

const buttons = document.querySelectorAll(".day-btn");
const overlay = document.getElementById("day-overlay");
const dialog = document.getElementById("day-dialog");
const dialogCloseBtn = document.getElementById("dialog-close");
 
const title = document.getElementById("dialog-title");
const text = document.getElementById("dialog-text");

let lastFocusedEl = null;


const data = {

  1:{
    title:"Day 1 — Opening Ceremony",
    text:"Music performances, cultural showcases and the beginning of Highways.",
    bg:"url('./src/assets/day1.webp')"
  },

  2:{
    title:"Day 2 — Competitions",
    text:"Workshops, gaming events and student competitions.",
    bg:"url('./src/assets/day2.webp')"
  },

  3:{
    title:"Day 3 — Grand Finale",
    text:"Celebrity night and closing performances.",
    bg:"url('./src/assets/day3.webp')"
  }

};
 
if (overlay && dialog && title && text) {
 
function openDialog(day, { focus = false } = {}) {
 
  const d = data[day];
  if (!d) return;
 
  title.textContent = d.title;
  text.textContent = d.text;

  dialog.style.backgroundImage = d.bg;

  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");

  if (focus) {
    lastFocusedEl = document.activeElement;
    dialog.focus();
    dialogCloseBtn?.focus();
  }
 
}


function closeDialog(){
  overlay.classList.remove("active");
  overlay.setAttribute("aria-hidden", "true");

  if (lastFocusedEl instanceof HTMLElement) {
    lastFocusedEl.focus();
  }
  lastFocusedEl = null;
}


buttons.forEach(btn => {

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    openDialog(btn.dataset.day, { focus: true });

  });

});


/* click outside closes */

overlay.addEventListener("click", (e)=>{

  if(e.target === overlay){
    closeDialog();
  }

});

dialogCloseBtn?.addEventListener("click", closeDialog);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("active")) closeDialog();
});
}

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

  const btn = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  if (!btn || !answer) return;

  function syncAria() {
    const expanded = item.classList.contains("active");
    btn.setAttribute("aria-expanded", String(expanded));
    answer.setAttribute("aria-hidden", String(!expanded));
  }

  syncAria();

  btn.addEventListener("click", () => {

    const active = document.querySelector(".faq-item.active");

    if(active && active !== item){
      active.classList.remove("active");
      const activeBtn = active.querySelector(".faq-question");
      const activeAnswer = active.querySelector(".faq-answer");
      activeBtn?.setAttribute("aria-expanded", "false");
      activeAnswer?.setAttribute("aria-hidden", "true");
    }

    item.classList.toggle("active");
    syncAria();

  });

});

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)

  gsap.utils.toArray(".scroll-paper").forEach((paper)=>{

  gsap.to(paper,{
  scaleY:1,
  duration:1.3,
  ease:"power3.out",
  scrollTrigger:{
  trigger:paper,
  start:"top 80%"
  }
  })

  })
}
