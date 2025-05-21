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

// Оптимизированный ресайз с троттлингом
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(updateVideoSource, 100);
});

// Запуск при загрузке и когда DOM готов
document.addEventListener('DOMContentLoaded', updateVideoSource);

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.ow__items');
  const indicators = document.querySelectorAll('.ow__indicator');
  let currentSlide = 0;
  let isDragging = false;
  let startPosX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  const slideCount = document.querySelectorAll('.ow__item').length;
  
  // Инициализация слайдера
  function initSlider() {
    slider.addEventListener('touchstart', touchStart);
    slider.addEventListener('touchend', touchEnd);
    slider.addEventListener('touchmove', touchMove);
    
    // Для мыши/тачпада
    slider.addEventListener('mousedown', touchStart);
    slider.addEventListener('mouseup', touchEnd);
    slider.addEventListener('mouseleave', touchEnd);
    slider.addEventListener('mousemove', touchMove);
    
    // Остановка автопереключения при взаимодействии
    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', () => {
      autoSlideInterval = setInterval(nextSlide, 5000);
    });
  }
  
  // Переключение слайдов
  function goToSlide(index) {
    if (index < 0 || index >= slideCount) return;
    
    currentSlide = index;
    updateSliderPosition();
    updateIndicators();
  }
  
  function nextSlide() {
    goToSlide((currentSlide + 1) % slideCount);
  }
  
  function prevSlide() {
    goToSlide((currentSlide - 1 + slideCount) % slideCount);
  }
  
  function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  
  function updateIndicators() {
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === currentSlide);
    });
  }
  
  // Обработчики свайпа
  function touchStart(e) {
    if (e.type === 'touchstart') {
      startPosX = e.touches[0].clientX;
    } else {
      startPosX = e.clientX;
      e.preventDefault(); // Для мыши
    }
    
    isDragging = true;
    slider.style.transition = 'none';
  }
  
  function touchEnd() {
    isDragging = false;
    slider.style.transition = 'transform 0.5s ease';
    
    const movedBy = currentTranslate - prevTranslate;
    
    if (movedBy < -50 && currentSlide < slideCount - 1) {
      nextSlide();
    } else if (movedBy > 50 && currentSlide > 0) {
      prevSlide();
    } else {
      updateSliderPosition();
    }
  }
  
  function touchMove(e) {
    if (!isDragging) return;
    
    const currentPosition = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    currentTranslate = prevTranslate + currentPosition - startPosX;
    
    // Ограничение свайпа для первого и последнего слайда
    if (currentSlide === 0 && currentTranslate > 0) {
      currentTranslate = 0;
    } else if (currentSlide === slideCount - 1 && currentTranslate < 0) {
      currentTranslate = 0;
    }
    
    slider.style.transform = `translateX(calc(-${currentSlide * 100}% + ${currentTranslate}px))`;
  }
  
  // Клик по индикаторам
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });
  
  // Инициализация
  initSlider();
  goToSlide(0);
});