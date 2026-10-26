'use strict';
const imageDialog = document.getElementById('imageDialog');
document.querySelectorAll('[data-zoom]').forEach((button) => {
  button.addEventListener('click', () => {
    const source = button.querySelector('img') || document.querySelector('.gallery-photo img');
    if (source) {
      const image = imageDialog.querySelector('img');
      image.src = source.currentSrc || source.src;
      image.alt = source.alt;
    }
    imageDialog.showModal();
  });
});
