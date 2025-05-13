import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".ow",       // Элемент, который триггерит анимацию
      start: "top 45%", 
      toggleActions: "play none none none", // play при входе, ничего при выходе/входе с конца/начале
      once: true,   
      // markers: true,        // Включите для отладки (покажет метки в браузере)
    }
  });

  tl.from('.ow__title', { 
    y: 30, 
    autoAlpha: 0, 
    duration: 0.5, 
    ease: "power1.out" 
  })
  .from('.ow__text', { 
    y: 30, 
    autoAlpha: 0, 
    duration: 0.5, 
    ease: "power1.out" 
  });
});