'use strict';
const quoteDialog = document.getElementById('quoteDialog');
const productSelect = document.getElementById('product');
const emailStatus = document.getElementById('emailStatus');
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
function openQuote(product, options = {}) {
  productSelect.value = product || document.body.dataset.quoteDefault || 'Business Cards';
  if (options.quoteQuantity) document.getElementById('quantity').value = options.quoteQuantity;
  if (options.quoteDetails) document.getElementById('details').value = options.quoteDetails;
  emailStatus.textContent = '';
  document.getElementById('enquiryFallback').hidden = true;
  if (quoteDialog) {
    quoteDialog.showModal();
  } else {
    document.getElementById('quoteForm').scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('name').focus({ preventScroll: true });
  }
}
document.querySelectorAll('.quote-open').forEach(button => {
  button.addEventListener('click', () => openQuote(button.dataset.quoteProduct || (button.closest('.custom-card') ? 'Something else' : undefined), button.dataset));
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
  const value = id => document.getElementById(id)?.value.trim() || '';
  const lines = ['Hello Whenua Printing,', '', 'I’d like a quote for the following project:', '', `Name: ${value('name')}`];
  if (document.getElementById('email')) lines.push(`Email: ${value('email')}`);
  if (document.getElementById('company')) lines.push(`Company: ${value('company')}`);
  lines.push(`Phone: ${value('phone') || 'Not provided'}`, `Product: ${productSelect.value}`, `Quantity: ${value('quantity')}`, '', 'Project details:', value('details') || 'Not provided', '', 'Please confirm pricing, delivery costs and turnaround. Thank you!');
  return lines.join('\n');
}
// FormSubmit auto-response requires a standard form POST, not AJAX.
quoteForm.addEventListener('submit', event => {
  if (!quoteForm.reportValidity()) {
    event.preventDefault();
    return;
  }
  const email = document.getElementById('email')?.value.trim();
  if (email) {
    let replyTo = quoteForm.querySelector('input[name="_replyto"]');
    if (!replyTo) {
      replyTo = document.createElement('input');
      replyTo.type = 'hidden';
      replyTo.name = '_replyto';
      quoteForm.append(replyTo);
    }
    replyTo.value = email;
  }
  // Leave the browser's native submission and service verification enabled.
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
const productPages = { 'Flyers': 'flyers.html', 'Name badges': 'name-badges.html', 'Business Cards': 'business-cards.html', 'Posters': 'posters.html', 'Pull up Banners': 'pull-up-banners.html' };
const productNames = Array.from(productSelect.options).map(option => option.value).filter(name => name !== 'Something else');
function renderSearch() {
  const query = searchInput.value.trim().toLowerCase();
  const matches = productNames.filter(name => name.toLowerCase().includes(query));
  searchResults.replaceChildren();
  matches.forEach(name => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = productPages[name] || '#quote';
    link.textContent = name;
    link.addEventListener('click', event => {
      if (productPages[name]) return;
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

// Keep the main navigation consistent across collections and detail pages.
const currentPage = location.pathname.split('/').pop() || 'index.html';
const printPages = ['products.html', 'business-cards.html', 'flyers.html', 'posters.html', 'name-badges.html', 'pull-up-banners.html'];
siteNav.querySelectorAll('a').forEach(link => {
  const destination = new URL(link.href).pathname.split('/').pop() || 'index.html';
  link.removeAttribute('aria-current');
  if (destination === currentPage) link.setAttribute('aria-current', 'page');
  else if (destination === 'products.html' && printPages.includes(currentPage)) link.setAttribute('aria-current', 'location');
});
