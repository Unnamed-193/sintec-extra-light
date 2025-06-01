document.addEventListener('DOMContentLoaded', function() {
  const counter = document.getElementById('counter');
  const item = document.querySelector('.ow__item--1');
  const digitContainers = document.querySelectorAll('.digit-container');
  const startNumber = 149000;
  const endNumber = 155000;
  const duration = 7000;
  let animationId;
  let isAnimating = false;
  let isMobile = window.innerWidth < 768;
  let wasAnimated = false; // Флаг, чтобы анимация запускалась только один раз
  
  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }
  
  function resetAnimation() {
    cancelAnimationFrame(animationId);
    isAnimating = false;
    item.style.animation = 'none';
  }
  
  function animateCounter() {
    if (isAnimating || (isMobile && wasAnimated)) return;
    isAnimating = true;
    
      item.style.animation = 'bg 7s forwards linear';
    
    const startTime = performance.now();
    const totalNumbers = endNumber - startNumber;
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(rawProgress);
      const currentNumber = Math.floor(startNumber + easedProgress * totalNumbers);
      
      updateDigits(currentNumber);
      
      if (rawProgress < 1) {
        animationId = requestAnimationFrame(update);
      } else {
        isAnimating = false;
        wasAnimated = true; // Устанавливаем флаг после завершения анимации
      }
    }
    
    animationId = requestAnimationFrame(update);
  }

  function updateDigits(number) {
    const numberStr = String(number).padStart(6, '0');
    
    digitContainers.forEach((container, index) => {
      if (index < 3) {
        const currentDigit = container.querySelector('.digit.current');
        const newValue = numberStr[index];
        
        if (!currentDigit || currentDigit.textContent !== newValue) {
          const newDigit = document.createElement('span');
          newDigit.className = 'digit next';
          newDigit.textContent = newValue;
          container.appendChild(newDigit);
          
          requestAnimationFrame(() => {
            if (currentDigit) {
              currentDigit.className = 'digit prev';
            }
            newDigit.className = 'digit current';
            
            setTimeout(() => {
              if (currentDigit && currentDigit.parentNode === container) {
                container.removeChild(currentDigit);
              }
            }, 100);
          });
        }
      } else {
        const currentDigit = container.querySelector('.digit');
        const newValue = numberStr[index];
        
        if (!currentDigit || currentDigit.textContent !== newValue) {
          container.innerHTML = `<span class="digit">${newValue}</span>`;
        }
      }
    });
  }

  // Функция проверки видимости элемента
  function checkVisibility() {
    if (!isMobile || wasAnimated) return;
    
    const rect = item.getBoundingClientRect();
    const isVisible = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    
    if (isVisible) {
      animateCounter();
    }
  }

  // Обработчики событий
  item.addEventListener('mouseenter', animateCounter);
  item.addEventListener('touchstart', animateCounter);
  item.addEventListener('mouseleave', resetAnimation);
  
  // Проверяем видимость при скролле и ресайзе
  if (isMobile) {
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    // Проверяем сразу при загрузке
    checkVisibility();
  }

  return () => {
    cancelAnimationFrame(animationId);
    if (isMobile) {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    }
  };
});