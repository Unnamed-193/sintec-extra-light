import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function initComponentsAnimation() {
  const componentsSection = document.querySelector('.components');
  const isMobile = window.matchMedia('(max-width: 767.98px)').matches;

  // Общие настройки для всех анимаций
  const baseSettings = {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
  };

  if (isMobile) {
    // Мобильная версия - последовательная анимация при скролле
    const mobileElements = [
      '.components__title',
      '.components__subtitle',
      '.components__logo',
      '.components__right-title',
      '.components__top-text',
      'components__top-text--black',
      '.components__bottom-item:nth-child(1)',
      '.components__bottom-item:nth-child(2)',
      '.components__disclaimer'
    ];

    mobileElements.forEach((selector, index) => {
      gsap.from(selector, {
        ...baseSettings,
        scrollTrigger: {
          trigger: selector,
          start: 'top 90%',
          end: 'top 60%',
          toggleActions: 'play none none none',
          markers: false // можно включить для отладки
        }
      });
    });
  } else {
    // Десктоп версия - оригинальная анимация
    gsap.from('.components__title', {
      ...baseSettings,
      scrollTrigger: {
        trigger: componentsSection,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    });
    
    gsap.from('.components__subtitle', {
      ...baseSettings,
      delay: 0.3,
      scrollTrigger: {
        trigger: componentsSection,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    });
    
    gsap.from('.components__logo', {
      ...baseSettings,
      delay: 0.5,
      scrollTrigger: {
        trigger: componentsSection,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    });
    
    gsap.from('.components__right-title', {
      ...baseSettings,
      delay: 0.5,
      scrollTrigger: {
        trigger: componentsSection,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    });
    
    gsap.from('.components__top-text', {
      ...baseSettings,
      delay: 0.7,
      scrollTrigger: {
        trigger: componentsSection,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    });
    
    gsap.from('.components__bottom-item', {
      ...baseSettings,
      delay: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: componentsSection,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    });
    
    gsap.from('.components__disclaimer', {
      ...baseSettings,
      delay: 1.4,
      scrollTrigger: {
        trigger: componentsSection,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    });
  }
}

// Инициализация при загрузке страницы и при изменении размера
document.addEventListener('DOMContentLoaded', initComponentsAnimation);
window.addEventListener('resize', initComponentsAnimation);