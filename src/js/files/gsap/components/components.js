import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрация плагина
gsap.registerPlugin(ScrollTrigger);

// Основная функция инициализации анимаций
function initAnimations() {
  // Настройки по умолчанию для ScrollTrigger
  ScrollTrigger.defaults({
    markers: false,
    scroller: window,
    anticipatePin: 1
  });

  // 1. Анимация для секции Line (первая)
  initLineAnimation();

  // 2. Анимация для секции Components (вторая)
  initComponentsAnimation();

  // 3. Анимация для секции Evidence (последняя)
  initEvidenceAnimation();
}

// Функция для анимации секции Line
function initLineAnimation() {
  const lineSection = document.querySelector('.line');
  
  const lineTl = gsap.timeline({
    scrollTrigger: {
      trigger: lineSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true
    }
  });

  lineTl
    .from('.line__title', { y: 30, opacity: 0, duration: 0.8 })
    .from('.line__subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
    .from('.line__left', { x: -30, opacity: 0, duration: 0.8 }, '-=0.4')
    .from('.line__list-item', { 
      x: 30, 
      opacity: 0, 
      duration: 0.8, 
      stagger: 0.2 
    }, '-=0.4');
}

// Функция для анимации секции Components
function initComponentsAnimation() {
  const componentsSection = document.querySelector('.components');
  const isMobile = window.matchMedia('(max-width: 767.98px)').matches;

  const baseSettings = {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
  };

  if (isMobile) {
    // Мобильная версия
    gsap.utils.toArray([
      '.components__title',
      '.components__subtitle',
      '.components__logo',
      '.components__left-text',
      '.components__right-title',
      '.components__right-text',
      '.components__bottom-item:nth-child(1)',
      '.components__bottom-item:nth-child(2)',
      '.components__disclaimer'
    ]).forEach((selector, i) => {
      gsap.from(selector, {
        ...baseSettings,
        scrollTrigger: {
          trigger: componentsSection,
          start: 'top 90%',
          end: 'top 60%',
          toggleActions: 'play none none none'
        },
        delay: i * 0.1
      });
    });
  } else {
    // Десктоп версия
    const componentsTl = gsap.timeline({
      scrollTrigger: {
        trigger: componentsSection,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true
      }
    });
    
    componentsTl
      .from('.components__title', baseSettings)
      .from('.components__subtitle', baseSettings, '-=0.3')
      .from('.components__logo', baseSettings, '-=0.2')
      .from('.components__left-text', baseSettings, '-=0.2')
      .from('.components__right-title', baseSettings, '-=0.2')
      .from('.components__right-text', baseSettings, '-=0.2')
      .from('.components__bottom-item', { 
        ...baseSettings,
        stagger: 0.2 
      }, '-=0.2')
      .from('.components__disclaimer', baseSettings, '-=0.2');
  }
}

// Функция для анимации секции Evidence
function initEvidenceAnimation() {
  const evidenceSection = document.querySelector('.evidence');
  
  const evidenceTl = gsap.timeline({
    scrollTrigger: {
      trigger: evidenceSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true
    }
  });

  evidenceTl
    .from('.evidence__title', { y: 30, autoAlpha: 0, duration: 0.5, ease: "power1.out" })
    .from('.evidence__subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.3')
    .from('.evidence__mileage', { y: 50, opacity: 0, duration: 0.7 }, '-=0.3')
    .from('.evidence__result', { y: 50, opacity: 0, duration: 0.7 }, '-=0.3')
    .from('.evidence__btn', { y: 50, opacity: 0, duration: 0.7 }, '-=0.3')
    .from('.evidence__img._md3dn', { x: 100, opacity: 0, duration: 1, ease: "power2.out" }, '-=0.3')
    .from('.evidence__img-mobile', { y: 50, opacity: 0, duration: 0.8, ease: "power2.out" }, '-=0.3');
}

// Обработчик ресайза с дебаунсом
let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    initAnimations();
    ScrollTrigger.refresh();
  }, 200);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация с небольшой задержкой для стабильности
  setTimeout(() => {
    initAnimations();
    ScrollTrigger.refresh();
    
    // Добавляем обработчик ресайза
    window.addEventListener('resize', handleResize, { passive: true });
  }, 500);
});

// Убираем обработчики при unmount (если используется в SPA)
window.addEventListener('beforeunload', () => {
  window.removeEventListener('resize', handleResize);
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});