import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({ delay: 0.2, defaults: { duration: 0.4, ease: "power1.in" } });
  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  // 1. Анимация заголовка и текста
  tl.from('.hero__title', { 
    y: 30, 
    autoAlpha: 0, 
    ease: "none"
  }, 'text')
    tl.from('.hero__text', { 
      delay: 0.09,
      y: 30, 
      autoAlpha: 0, 
      ease: "sine.in"
    }, 'text');
    tl.from('.hero__slogan', { 
      delay: 0.09,
      y: 30, 
      autoAlpha: 0, 
      ease: "sine.in"
    });

  // 2. Анимация slogan-box (после текста, перед кнопкой)

  // 3. Анимация кнопки (после slogan-box)
  tl.from('.hero__button', { 
    y: 30, 
    autoAlpha: 0, 
  }, "+=0.2"); // Задержка после slogan-box

});