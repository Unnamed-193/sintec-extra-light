import Swiper from "swiper";
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

function animateAllDigits(start, end, duration) {
  const counterTime = document.getElementById('counterTime');
  const item = document.querySelector('.ow__item--2');
  const digitItems = counterTime.querySelectorAll('.ow__counter-list-item');
  const separators = counterTime.querySelectorAll('.ow__counter-list-separator');
  let animationId;
  let isAnimating = false;
  
  // Устанавливаем разделители
  separators[0].textContent = ' ';
  separators[1].textContent = ':';
  
  function formatNumber(num) {
    const str = String(num).padStart(6, '0');
    return [
      str[0], str[1], ' ', str[2], str[3], str[4], ':', str[5], '0'
    ];
  }
  
  function updateDisplay(digits) {
    digits.forEach((digit, index) => {
      if (index === 2 || index === 6) return;
      const item = digitItems[index > 6 ? index - 2 : (index > 2 ? index - 1 : index)];
      item.textContent = digit;
    });
  }

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function getCurrentNumber() {
    const digits = Array.from(digitItems).map(item => item.textContent);
    return parseInt(digits.slice(0, 2).join('') + digits.slice(2, 5).join('') + digits[5], 10);
  }

  function resetAnimation() {
    cancelAnimationFrame(animationId);
    isAnimating = false;
    
    const currentNumber = getCurrentNumber();
    if (currentNumber !== start) {
      animateToNumber(start, 500);
    }
  }

  function animateToNumber(targetNumber, durationMs) {
    const currentNumber = getCurrentNumber();
    const totalNumbers = targetNumber - currentNumber;
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeOutExpo(rawProgress);
      const currentValue = currentNumber + Math.floor(easedProgress * totalNumbers);
      
      updateDisplay(formatNumber(currentValue));
      
      if (rawProgress < 1) {
        animationId = requestAnimationFrame(update);
      }
    }
    
    animationId = requestAnimationFrame(update);
  }

  function startAnimation() {
    if (isAnimating) return;
    isAnimating = true;
    
    const startTime = performance.now();
    const totalNumbers = end - start;
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(rawProgress);
      const currentNumber = start + Math.floor(easedProgress * totalNumbers);
      
      updateDisplay(formatNumber(currentNumber));
      
      if (rawProgress < 1) {
        animationId = requestAnimationFrame(update);
      } else {
        isAnimating = false;
      }
    }
    
    updateDisplay(formatNumber(start));
    animationId = requestAnimationFrame(update);
  }

  item.addEventListener('mouseenter', startAnimation);
  item.addEventListener('mouseleave', resetAnimation);
  
  updateDisplay(formatNumber(end));

  return startAnimation;
}
const isMobile = window.innerWidth < 768;
const startAnimation = animateAllDigits(80000, 100000, 7000);

const swiper = new Swiper(".swiper", {
  direction: 'horizontal',
  modules: [Pagination],
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  enabled: isMobile,
  spaceBetween: 15,
  breakpoints: {
    768: {
      enabled: false,
      spaceBetween: 0,
    }
  },
  on: {
    // Запускаем анимацию при переходе на второй слайд
    slideChange: function(swiper) {
      if (isMobile && swiper.activeIndex === 1) {
        startAnimation();
      }
    }
  }
});

// Для мобильных запускаем сразу если второй слайд активен
if (isMobile && document.querySelector('.swiper-slide-active').classList.contains('ow__item--2')) {
  startAnimation();
}

window.addEventListener('resize', function() {
  if (window.innerWidth < 768) {
    swiper.enable();
  } else {
    swiper.disable();
  }
});

window.addEventListener('load', () => {
  if (window.innerWidth < 768) {
    swiper.enable();
  } else {
    swiper.disable();
  }
});