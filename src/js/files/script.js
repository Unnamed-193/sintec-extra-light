// Подключение функционала "Чертоги Фрилансера"
// Подключение списка активных модулей

import './getCurrentYear.js';
import './gsap/hero/hero.js';
// import './gsap/ow/ow.js';

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
