import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Переменная для хранения таймлайнов
let componentAnimations = {
  desktop: null,
  mobile: null
};

function initComponentsAnimation() {
  // Сначала убиваем все старые анимации
  killComponentAnimations();
  
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
    const mobileElements = [
      '.components__title',
      '.components__subtitle',
      '.components__logo',
      '.components__left-text',
      '.components__right-title',
      '.components__right-text',
      '.components__bottom-item:nth-child(1)',
      '.components__bottom-item:nth-child(2)',
      '.components__disclaimer'
    ];

    componentAnimations.mobile = mobileElements.map(selector => {
      return gsap.from(selector, {
        ...baseSettings,
        scrollTrigger: {
          trigger: selector,
          start: 'top 90%',
          end: 'top 60%',
          toggleActions: 'play none none none',
          markers: false
        }
      });
    });
  } else {
    // Десктоп версия
    componentAnimations.desktop = gsap.timeline({
      scrollTrigger: {
        trigger: componentsSection,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
    
    componentAnimations.desktop
      .from('.components__title', baseSettings)
      .from('.components__subtitle', { ...baseSettings, delay: 0.3 }, 0)
      .from('.components__logo', { ...baseSettings, delay: 0.5 }, 0)
      .from('.components__left-text', { ...baseSettings, delay: 0.7 }, 0)
      .from('.components__right-title', { ...baseSettings, delay: 0.5 }, 0)
      .from('.components__right-text', { ...baseSettings, delay: 0.7 }, 0)
      .from('.components__bottom-item', { 
        ...baseSettings, 
        delay: 1,
        stagger: 0.2 
      }, 0)
      .from('.components__disclaimer', { ...baseSettings, delay: 1.4 }, 0);
  }
}

function killComponentAnimations() {
  // Убиваем все ScrollTrigger'ы
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  // Убиваем таймлайны
  if (componentAnimations.desktop) {
    componentAnimations.desktop.kill();
  }
  
  if (componentAnimations.mobile) {
    componentAnimations.mobile.forEach(anim => anim.kill());
  }
  
  componentAnimations = { desktop: null, mobile: null };
}

// Дебаунс для ресайза
let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    initComponentsAnimation();
  }, 200);
}

document.addEventListener('DOMContentLoaded', initComponentsAnimation);
window.addEventListener('resize', handleResize);