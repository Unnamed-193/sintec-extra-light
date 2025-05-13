document.addEventListener("DOMContentLoaded", () => {
  const yearText = document.querySelector('.footer__year');
  yearText.textContent = new Date().getFullYear()
})