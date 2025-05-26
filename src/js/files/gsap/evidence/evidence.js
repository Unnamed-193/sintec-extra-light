import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function initEvidenceAnimation() {
  const evidenceSection = document.querySelector('.evidence');
  
  // Анимация для заголовка и подзаголовка

  gsap.from('.evidence__title', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: evidenceSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
  
  // Анимация для подзаголовка
  gsap.from('.evidence__subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.3,
    scrollTrigger: {
      trigger: evidenceSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
  
  
  // Анимация для левой части (пробег, изображение, результат)
  gsap.from('.evidence__mileage', {
    y: 50,
    opacity: 0,
    duration: 0.7,
    delay: 0.5,
    scrollTrigger: {
      trigger: evidenceSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  gsap.from('.evidence__result', {
    y: 50,
    opacity: 0,
    duration: 0.7,
    delay: 0.8,
    scrollTrigger: {
      trigger: evidenceSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  gsap.from('.evidence__btn', {
    y: 50,
    opacity: 0,
    duration: 0.7,
    delay: 1,
    scrollTrigger: {
      trigger: evidenceSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
  
  // Анимация для основного изображения (десктоп)
  gsap.from('.evidence__img._md3dn', {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: evidenceSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
  
  // Анимация для мобильного изображения
  gsap.from('.evidence__img-mobile', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: evidenceSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
  
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initEvidenceAnimation);