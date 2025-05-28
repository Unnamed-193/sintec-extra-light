
document.querySelector(".middle__btn").addEventListener("click", function() {
  const elements = {
    redLine: document.querySelector('.middle__red-line'),
    text: document.querySelector('.middle__text'),
    line: document.querySelector('.middle__line'),
    grey: document.querySelector('.middle__grey'),
    light: document.querySelector('.middle__light'),
    yellow: document.querySelector('.middle__yellow')
  };
  
  // Сброс анимаций
  for (const key in elements) {
    if (elements[key]) {
      elements[key].style.animation = 'none';
      void elements[key].offsetWidth;
    }
  }

  this.remove();
  
  // Запуск анимаций
  elements.redLine.style.animation = 'draw 2s forwards ease';
  elements.yellow.style.animation = 'yellow 2s   forwards ease';
  elements.text.style.animation = 'text 2s 0.05s forwards ease';
  elements.line.style.animation = 'line 2s forwards ease';
  elements.grey.style.animation = 'grey 1.5s 2s forwards ease';
  elements.light.style.animation = 'light 1.4s 2.9s forwards ease';
  
});