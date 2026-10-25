'use strict';
const quoteDialog = document.getElementById('quoteDialog');
const productSelect = document.getElementById('product');
const emailStatus = document.getElementById('emailStatus');
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
function openQuote(product) {
  if (product) productSelect.value = product;
  emailStatus.textContent = '';
  quoteDialog.showModal();
}
document.querySelectorAll('.quote-open').forEach(button => {
  button.addEventListener('click', () => openQuote(button.closest('.custom-card') ? 'Something else' : undefined));
});
document.querySelectorAll('[data-product]').forEach(card => {
  card.addEventListener('click', event => {
    event.preventDefault();
    openQuote(card.dataset.product);
  });
});
document.querySelectorAll('[data-close]').forEach(button => {
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
siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
document.getElementById('quoteForm').addEventListener('submit', event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  const body = `Name: ${document.getElementById('name').value}\nProduct: ${productSelect.value}\nQuantity: ${document.getElementById('quantity').value}\n\n${document.getElementById('details').value}`;
  window.location.href = `mailto:whenuaprinting@gmail.com?subject=${encodeURIComponent('Printing quote enquiry')}&body=${encodeURIComponent(body)}`;
  emailStatus.textContent = 'Your email app has been requested. Please send the message there. If it does not open, email whenuaprinting@gmail.com directly. This form does not send or store your enquiry.';
});
const searchDialog = document.getElementById('searchDialog');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const productNames = Array.from(productSelect.options).map(option => option.value).filter(name => name !== 'Something else');
function renderSearch() {
  const query = searchInput.value.trim().toLowerCase();
  const matches = productNames.filter(name => name.toLowerCase().includes(query));
  searchResults.replaceChildren();
  matches.forEach(name => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = '#quote';
    link.textContent = name;
    link.addEventListener('click', event => {
      event.preventDefault();
      searchDialog.close();
      openQuote(name);
    });
    li.append(link);
    searchResults.append(li);
  });
  document.getElementById('searchStatus').textContent = matches.length ? `${matches.length} products found.` : 'No matching products. Email us for custom printing options.';
}
document.getElementById('searchButton').addEventListener('click', () => {
  searchInput.value = '';
  renderSearch();
  searchDialog.showModal();
  searchInput.focus();
});
searchInput.addEventListener('input', renderSearch);
