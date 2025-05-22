// Подключение функционала "Чертоги Фрилансера"
// Подключение списка активных модулей
import Swiper from "swiper";
import { Pagination } from 'swiper/modules';
import './getCurrentYear.js';
import './gsap/hero/hero.js';
// import './gsap/ow/ow.js';

import 'swiper/css/pagination';

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
    video.load();
    
    // Попытка автовоспроизведения с обработкой ошибок
    video.play().catch(e => {
      console.log("Автовоспроизведение заблокировано. Нужен клик пользователя.");
    });
  }
}

// Запуск при загрузке и когда DOM готов
document.addEventListener('DOMContentLoaded', updateVideoSource);


const swiper = new Swiper(".swiper", {
  modules: [Pagination],
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  // Отключаем функциональность на больших экранах
  enabled: window.innerWidth < 768,
  spaceBetween: 15,
  breakpoints: {
    // При ширине экрана >= 768px
    768: {
      enabled: false,
      spaceBetween: 0,
    }
  }
});

// Обработчик изменения размера окна
window.addEventListener('resize', function() {
  if (window.innerWidth < 768) {
    swiper.enable();
  } else {
    swiper.disable();
  }
});

window.addEventListener('load', () => {
  if (window.innerWidth < 768) {
    swiper.enable();
  } else {
    swiper.disable();
  }
})