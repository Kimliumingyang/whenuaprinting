'use strict';
const imageDialog = document.getElementById('imageDialog');
document.querySelectorAll('[data-zoom]').forEach(button => {
  button.addEventListener('click', () => imageDialog.showModal());
});
