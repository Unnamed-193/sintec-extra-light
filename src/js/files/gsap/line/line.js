import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Функция для инициализации анимации
function initLineAnimation() {
  
  const lineSection = document.querySelector('.line');
  
  // Анимация для заголовка
  gsap.from('.line__title', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: lineSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
  
  // Анимация для подзаголовка
  gsap.from('.line__subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.3,
    scrollTrigger: {
      trigger: lineSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
  
  // Анимация для изображения
  gsap.from('.line__left', {
    x: -30,
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    scrollTrigger: {
      trigger: lineSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  gsap.from('.line__list-item', {
    x: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    stagger: 0.2,
    scrollTrigger: {
      trigger: lineSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
}

// Инициализируем анимацию при загрузке страницы
document.addEventListener('DOMContentLoaded', initLineAnimation);