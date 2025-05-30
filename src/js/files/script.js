// Подключение функционала "Чертоги Фрилансера"
// Подключение списка активных модулей


import './getCurrentYear.js';
import './gsap/components/circle.js';
import './gsap/components/components.js';
import './gsap/hero/hero.js';
import './counter/counter.js'
import './counter/counter-time.js'

import 'swiper/css';

const mmd1 = matchMedia('(min-width: 1920px)');
const md3 = matchMedia('(min-width: 1920px)');

if (navigator.userAgent.match(/Mac OS/i)) {
  document.documentElement.classList.add('_ismac');
}

document.addEventListener('DOMContentLoaded', ()=>{
  if (mmd1.matches) {
    setSvgWH();
  }

  setIndex('.item-advantages');
  setIndex('.item-evidence');
  setIndex('.assort__slide');

  const techItemWraps = document.querySelectorAll('.right-tech__itemwrap');
  if (techItemWraps.length) {
    setTechItemStyle(techItemWraps);
  }

  const advantagesBody = document.querySelector('.assort__list');
  let condition = 
    advantagesBody
    // &&isMobile.iOS();
  if (condition) {
    setScrollbar(advantagesBody);
  }
})

window.addEventListener('resize', (e)=>{
  const techItemWraps = document.querySelectorAll('.right-tech__itemwrap');
  if (techItemWraps.length) {
    setTechItemStyle(techItemWraps);
  }

  const advantagesBody = document.querySelector('.assort__list');
  let condition = 
    advantagesBody
    // &&isMobile.iOS();
  if (condition) {
    setScrollbar(advantagesBody);
  }
})


function setSvgWH() {
  const svgs = document.querySelectorAll('svg');
  if (!svgs.length) return

  svgs.forEach(svg=>{
    const width = svg.getAttribute('width') || svg.offsetWidth;
    const height = svg.getAttribute('height') || svg.offsetHeight;

    const widthRem = width / 16;
    const heightRem = height / 16;

    let checked = true;
    let selectorsArr = ['.header__logo'];

    selectorsArr.forEach(selector=>{
      if (svg.closest(selector)) {
        checked = false;
      }
    })

    if (checked) {
      svg.style.setProperty('min-width', `${widthRem}rem`)
      // svg.style.setProperty('flex-basis', `${widthRem}rem`)
      svg.style.setProperty('min-height', `${heightRem}rem`)
    }
  })
}

function setIndex(selector) {
  const items = document.querySelectorAll(selector);
  if (!items.length) return;

  items.forEach((el, i)=>{
    el.style.setProperty('--index', i+1);
  })
}

function setTechItemStyle(techItemWraps) {
  let w = 0;
  techItemWraps.forEach((e, i)=>{
    e.style.setProperty('--index', i+1);
    e.closest('.tech__container')?.style.setProperty('--max_index', i+1)

    const parent = e.closest('.right-tech');

    let width = parent.offsetWidth;
    
    e.style.setProperty('--width', `${width-4}px`);
  })
}

function setScrollbar(parent) {
  if (parent.offsetWidth >= parent.scrollWidth) return;
  const scrollbar = createScrollbar(parent);

  if (!scrollbar) return;

  const diff = ((parent.offsetWidth / parent.scrollWidth) * 100).toFixed(2);
  scrollbar.style.setProperty('--width', `${diff}%`);

  if (parent.isHandled) return;

  parent.isHandled = true;
  parent.addEventListener('scroll', (e) => {
    const offsetWidth = parent.offsetWidth;
    const scrollLeft = parent.scrollLeft;
    const scrollWidth = parent.scrollWidth;

    const prc = (offsetWidth / scrollWidth) * scrollLeft;
    scrollbar.style.setProperty('--translate', `${prc}px`)
  })
}

function createScrollbar(parent) {
  if (parent.querySelector('.scrollbar')) return parent.querySelector('.scrollbar');

  const scrollbar = document.createElement('div');
  scrollbar.classList.add('scrollbar');
  scrollbar.innerHTML = '<i></i>';

  parent.append(scrollbar);

  return scrollbar;
}

function updateVideoSource() { 
  console.log(1);
  
  const video = document.querySelector('.hero__video');
  if (!video) return;

  const isMobile = window.innerWidth <= 480;
  const basePath = isMobile ? 'video/hero_video_mobile' : 'video/hero_video';
  const poster = isMobile ? 'img/hero/poster_mobile.webp' : 'img/hero/poster.webp';
  const cacheBuster = `?t=${Date.now()}`;

  const newSources = `
    <source src="${basePath}.mp4${cacheBuster}" type="video/mp4">
    <source src="${basePath}.webm${cacheBuster}" type="video/webm">
  `;

  if (video.innerHTML.trim() !== newSources.trim()) {
    video.poster = poster;
    video.innerHTML = newSources;
    video.setAttribute('playsinline', ''); 
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', 'true'); // Обязательно для iOS
    video.load();
    const playPromise = video.play(); 

    if (playPromise !== undefined) {
      playPromise.catch(e => {
        // Создаем кнопку-заглушку для iOS
        if (isIOS()) {
          createFallbackButton(video);
        }
      });
    }
  }
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function createFallbackButton(video) {
  const container = video.parentElement;
  const button = document.createElement('button');
  button.className = 'ios-video-fallback';
  button.innerHTML = '▶ Play Video';
  button.style.cssText = `Add commentMore actions
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    padding: 12px 24px;
    background: rgba(0,0,0,0.7);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;
}
  window.addEventListener('load', function() {
    updateVideoSource();

    // Реинициализация при изменении ориентации
    window.addEventListener('orientationchange', function() {
      setTimeout(updateVideoSource, 300);
    });
  });



