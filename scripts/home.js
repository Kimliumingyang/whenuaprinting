'use strict';
const quoteDialog = document.getElementById('quoteDialog');
const productSelect = document.getElementById('product');
const emailStatus = document.getElementById('emailStatus');
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
function openQuote(product) {
  if (product) productSelect.value = product;
  emailStatus.textContent = '';
  document.getElementById('enquiryFallback').hidden = true;
  quoteDialog.showModal();
}
document.querySelectorAll('.quote-open').forEach(button => {
  button.addEventListener('click', () => openQuote(button.dataset.quoteProduct || (button.closest('.custom-card') ? 'Something else' : undefined)));
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
const quoteForm = document.getElementById('quoteForm');
const enquiryFallback = document.getElementById('enquiryFallback');
const enquiryText = document.getElementById('enquiryText');
function enquiryMessage() {
  return `Hello Whenua Printing,\n\nI’d like a quote for the following project:\n\nName: ${document.getElementById('name').value.trim()}\nEmail: ${document.getElementById('email').value.trim()}\nPhone: ${document.getElementById('phone').value.trim() || 'Not provided'}\nProduct: ${productSelect.value}\nQuantity: ${document.getElementById('quantity').value}\n\nProject details:\n${document.getElementById('details').value.trim()}\n\nPlease confirm pricing, delivery costs and turnaround. Thank you!`;
}
quoteForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) return;
  const body = enquiryMessage();
  enquiryText.value = body;
  enquiryFallback.hidden = false;
  // Keep long enquiries intact rather than risk truncating a mailto URL.
  if (encodeURIComponent(body).length > 1800) {
    emailStatus.textContent = 'Your enquiry is ready. Use Copy enquiry and paste it into an email to whenuaprinting@gmail.com.';
    return;
  }
  window.location.href = `mailto:whenuaprinting@gmail.com?subject=${encodeURIComponent('Printing quote enquiry — ' + productSelect.value)}&body=${encodeURIComponent(body)}`;
  emailStatus.textContent = 'Continue in your email app and press Send. If it does not open, use Copy enquiry and email the message to whenuaprinting@gmail.com. Your enquiry has not been sent by this website.';
});
document.getElementById('copyEnquiry').addEventListener('click', async () => {
  if (!quoteForm.reportValidity()) return;
  const body = enquiryMessage();
  enquiryText.value = body;
  enquiryFallback.hidden = false;
  try {
    await navigator.clipboard.writeText(body);
    emailStatus.textContent = 'Enquiry copied. Paste it into an email to whenuaprinting@gmail.com and send it there.';
  } catch {
    enquiryText.focus();
    enquiryText.select();
    emailStatus.textContent = 'Select and copy the message below, then email it to whenuaprinting@gmail.com.';
  }
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
    link.href = name === 'Pull up Banners' ? 'pull-up-banners.html' : '#quote';
    link.textContent = name;
    link.addEventListener('click', event => {
      if (name === 'Pull up Banners') return;
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
