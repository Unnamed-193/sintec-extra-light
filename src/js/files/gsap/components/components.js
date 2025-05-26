import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function initComponentsAnimation() {
  const componentsSection = document.querySelector('.components');


  gsap.from('.components__title', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: componentsSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
  
  // Анимация для подзаголовка
  gsap.from('.components__subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.3,
    scrollTrigger: {
      trigger: componentsSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
  
  
  // Анимация для левой части (лого и текст)
  gsap.from('.components__logo', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.5,
    scrollTrigger: {
      trigger: componentsSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
  gsap.from('.components__right-title', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    delay: 0.5,
    scrollTrigger: {
      trigger: componentsSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
  
  // Анимация для правой части (видео и контент)
  gsap.from('.components__top-text', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.7,
    scrollTrigger: {
      trigger: componentsSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
  
  gsap.from('.components__bottom-item', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: componentsSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
  
  // Анимация для нижних элементов (поочередно)
  
  // Анимация для примечания
  gsap.from('.components__disclaimer', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    delay: 1.4,
    scrollTrigger: {
      trigger: componentsSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initComponentsAnimation);