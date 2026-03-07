window.addEventListener("load", () => {

    const left = document.querySelector(".door-left");
    const right = document.querySelector(".door-right");
    const loader = document.getElementById("loader");

    left.classList.add("open-left");
    right.classList.add("open-right");

    setTimeout(() => {
        loader.style.display = "none";
    },1500);

});

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

let menuOpen = false;

menuBtn.addEventListener("click", () => {

    if(!menuOpen){
        mobileMenu.style.transform = "translateY(0)";
        menuOpen = true;
    }else{
        mobileMenu.style.transform = "translateY(-100%)";
        menuOpen = false;
    }

});
const video = document.getElementById("video-grow");
const section = document.querySelector(".about-sec");

window.addEventListener("scroll", () => {

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // progress of section in viewport
    let progress = (windowHeight - rect.top) / (windowHeight + rect.height);

    // clamp progress between 0 and 1
    progress = Math.max(0, Math.min(progress, 1));

    // scale from 0.6 → 1.2
    let scale = 0.6 + progress * 1.0;

    // stopping point
    scale = Math.min(scale, 1.4);

    video.style.transform = `scale(${scale})`;

});

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const targetDate = new Date("August 30, 2026 00:00:00").getTime();

function updateCountdown(){

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

setInterval(updateCountdown,1000);
updateCountdown();

const msection = document.getElementById("movie-section")
const track = document.getElementById("movie-track")

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

const buttons = document.querySelectorAll(".day-btn");
const overlay = document.getElementById("day-overlay");
const dialog = document.getElementById("day-dialog");

const title = document.getElementById("dialog-title");
const text = document.getElementById("dialog-text");


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


function openDialog(day){

  const d = data[day];

  title.textContent = d.title;
  text.textContent = d.text;

  dialog.style.backgroundImage = d.bg;

  overlay.classList.add("active");

}


function closeDialog(){
  overlay.classList.remove("active");
}


/* ---------- DESKTOP HOVER ---------- */

buttons.forEach(btn => {

  btn.addEventListener("mouseenter", () => {
    openDialog(btn.dataset.day);
  });

});


overlay.addEventListener("mouseleave", closeDialog);


/* ---------- MOBILE TAP ---------- */

buttons.forEach(btn => {

  btn.addEventListener("click", (e) => {

    if(window.innerWidth <= 768){

      e.stopPropagation();
      openDialog(btn.dataset.day);

    }

  });

});


/* click outside closes */

overlay.addEventListener("click", (e)=>{

  if(e.target === overlay){
    closeDialog();
  }

});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

  const btn = item.querySelector(".faq-question");

  btn.addEventListener("click", () => {

    const active = document.querySelector(".faq-item.active");

    if(active && active !== item){
      active.classList.remove("active");
    }

    item.classList.toggle("active");

  });

});