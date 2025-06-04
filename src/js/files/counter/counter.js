document.addEventListener('DOMContentLoaded', function() {
  const counter = document.getElementById('counter');
  const item = document.querySelector('.ow__item--1');
  const digitContainers = document.querySelectorAll('.digit-container');
  const startNumber = 149000;
  const endNumber = 155000;
  const duration = 7000;
  let animationId;
  let bgAnimationId;
  let isAnimating = false;
  let isMobile = window.innerWidth < 768;
  let wasAnimated = false;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  
  function resetAnimation() {
    cancelAnimationFrame(animationId);
    cancelAnimationFrame(bgAnimationId);
    isAnimating = false;
    
    // Анимируем возврат к начальному значению
    const currentNumber = getCurrentNumber();
    if (currentNumber !== startNumber) {
      animateToNumber(startNumber, 500); // 500ms - длительность анимации возврата
    }
    
    // Сбрасываем фон
    item.style.backgroundPositionX = '0px';
  }
  
  function getCurrentNumber() {
    let numberStr = '';
    digitContainers.forEach(container => {
      const digit = container.querySelector('.digit.current') || container.querySelector('.digit');
      numberStr += digit ? digit.textContent : '0';
    });
    return parseInt(numberStr, 10);
  }
  
  function animateToNumber(targetNumber, durationMs) {
    const startNumber = getCurrentNumber();
    const totalNumbers = targetNumber - startNumber;
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeInOutCubic(rawProgress);
      const currentNumber = Math.floor(startNumber + easedProgress * totalNumbers);
      
      updateDigits(currentNumber);
      
      if (rawProgress < 1) {
        animationId = requestAnimationFrame(update);
      }
    }
    
    animationId = requestAnimationFrame(update);
  }

  function animateCounter() {
    if (isAnimating || (isMobile && wasAnimated)) return;
    isAnimating = true;
    
    const startTime = performance.now();
    const totalNumbers = endNumber - startNumber;
    
    function animateBackground(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const bgCount = -500;
      const bgPosition = bgCount * progress; 
      
      item.style.backgroundPositionX = `${bgPosition}px`;
      
      if (progress < 1) {
        bgAnimationId = requestAnimationFrame(animateBackground);
      }
    }
    
    bgAnimationId = requestAnimationFrame(animateBackground);
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(rawProgress);
      const currentNumber = Math.floor(startNumber + easedProgress * totalNumbers);
      
      updateDigits(currentNumber);
      
      if (rawProgress < 1) {
        animationId = requestAnimationFrame(update);
      } else {
        isAnimating = false;
        wasAnimated = true;
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
      setTimeout(animateCounter, 1000);
    }
  }

  // Обработчики событий
  item.addEventListener('mouseenter', animateCounter);
  item.addEventListener('touchstart', animateCounter);
  item.addEventListener('mouseleave', resetAnimation);
  
  if (isMobile) {
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    checkVisibility();
  }

  return () => {
    cancelAnimationFrame(animationId);
    cancelAnimationFrame(bgAnimationId);
    if (isMobile) {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    }
  };
});