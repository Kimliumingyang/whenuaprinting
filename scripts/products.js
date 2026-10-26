'use strict';
const merchandiseCards = Array.from(document.querySelectorAll('.merch-card'));
const merchandiseFilters = Array.from(document.querySelectorAll('[data-merch-filter]'));
const merchandiseSearch = document.getElementById('merchSearch');
let merchandiseCategory = 'all';
function filterMerchandise() {
  const query = merchandiseSearch.value.trim().toLowerCase();
  let visible = 0;
  merchandiseCards.forEach(card => {
    const text = `${card.dataset.merchName} ${card.querySelector('.merch-category').textContent} ${card.dataset.merchDescription}`.toLowerCase();
    const matches = (merchandiseCategory === 'all' || card.dataset.merchCategory === merchandiseCategory) && text.includes(query);
    card.hidden = !matches;
    if (matches) visible += 1;
  });
  document.getElementById('merchCount').textContent = `${visible} ${visible === 1 ? 'idea' : 'ideas'} to explore`;
  document.getElementById('merchEmpty').hidden = visible !== 0;
  merchandiseFilters.forEach(button => {
    const selected = button.dataset.merchFilter === merchandiseCategory;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}
merchandiseFilters.forEach(button => button.addEventListener('click', () => {
  merchandiseCategory = button.dataset.merchFilter;
  filterMerchandise();
}));
merchandiseSearch.addEventListener('input', filterMerchandise);
document.getElementById('merchReset').addEventListener('click', () => {
  merchandiseCategory = 'all';
  merchandiseSearch.value = '';
  filterMerchandise();
  merchandiseSearch.focus();
});
document.querySelector('.merch-controls').hidden = false;
const merchandiseDialog = document.getElementById('merchDialog');
let selectedMerchandise = null;
merchandiseCards.forEach(card => card.querySelector('[data-merch-view]').addEventListener('click', () => {
  selectedMerchandise = card;
  const image = document.getElementById('merchDetailImage');
  image.src = card.dataset.merchImage;
  image.alt = card.querySelector('img').alt;
  document.getElementById('merchDetailTitle').textContent = card.dataset.merchName;
  document.getElementById('merchDetailCategory').textContent = card.querySelector('.merch-category').textContent;
  document.getElementById('merchDetailDescription').textContent = card.dataset.merchDescription;
  merchandiseDialog.showModal();
}));
document.getElementById('merchDetailEnquire').addEventListener('click', () => {
  if (!selectedMerchandise) return;
  const name = selectedMerchandise.dataset.merchName;
  merchandiseDialog.close();
  openQuote('Something else', { quoteDetails: `Product interest: ${name}. Please confirm available options, branding, quantities and lead time.` });
});
