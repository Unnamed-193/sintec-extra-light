import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const evidenceSection = document.querySelector('.evidence');
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: evidenceSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true,   
      markers: true
    }
  });
  // Анимация для заголовка и подзаголовка

  tl.from('.evidence__title', {
    y: 30, 
    autoAlpha: 0, 
    duration: 0.5, 
    ease: "power1.out" 
  });
  
  // Анимация для подзаголовка
  tl.from('.evidence__subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
  });
  
  
  // Анимация для левой части (пробег, изображение, результат)
  tl.from('.evidence__mileage', {
    y: 50,
    opacity: 0,
    duration: 0.7,
  
  });

  tl.from('.evidence__result', {
    y: 50,
    opacity: 0,
    duration: 0.7,

  });

  tl.from('.evidence__btn', {
    y: 50,
    opacity: 0,
    duration: 0.7,

  });
  
  // Анимация для основного изображения (десктоп)
  tl.from('.evidence__img._md3dn', {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
 
  });
  
  // Анимация для мобильного изображения
  tl.from('.evidence__img-mobile', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",

  });
});