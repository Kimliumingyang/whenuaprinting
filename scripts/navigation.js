'use strict';

// Shared navigation and dialog controls; loaded before quote and search scripts.
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

document.querySelectorAll('[data-close]').forEach((button) => {
  button.addEventListener('click', () => button.closest('dialog').close());
});
function closeMenu() {
  siteNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  siteNav.classList.toggle('is-open', !expanded);
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
});
siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
// Keep the main navigation consistent across collections and detail pages.
const currentPage = location.pathname.split('/').pop() || 'index.html';
const printPages = [
  'products.html',
  'business-cards.html',
  'flyers.html',
  'posters.html',
  'name-badges.html',
  'pull-up-banners.html',
];
siteNav.querySelectorAll('a').forEach((link) => {
  const destination = new URL(link.href).pathname.split('/').pop() || 'index.html';
  link.removeAttribute('aria-current');
  if (destination === currentPage) link.setAttribute('aria-current', 'page');
  else if (destination === 'products.html' && printPages.includes(currentPage))
    link.setAttribute('aria-current', 'location');
});

const mobileSearch = document.querySelector('.mobile-search');
if (mobileSearch)
  mobileSearch.addEventListener('click', () => {
    closeMenu();
    document.getElementById('searchButton').click();
  });
