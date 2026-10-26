'use strict';
const quoteDialog = document.getElementById('quoteDialog');
const productSelect = document.getElementById('product');
const emailStatus = document.getElementById('emailStatus');
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
function openQuote(product, options = {}) {
  if (product) productSelect.value = product;
  if (options.quoteQuantity) document.getElementById('quantity').value = options.quoteQuantity;
  if (options.quoteDetails) document.getElementById('details').value = options.quoteDetails;
  emailStatus.textContent = '';
  document.getElementById('enquiryFallback').hidden = true;
  quoteDialog.showModal();
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
let sendingEnquiry = false;
quoteForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (!quoteForm.reportValidity() || sendingEnquiry) return;
  const body = enquiryMessage();
  if (quoteForm.dataset.delivery === 'direct') {
    const submitButton = quoteForm.querySelector('[type="submit"]');
    const copyButton = document.getElementById('copyEnquiry');
    const payload = new FormData(quoteForm);
    const replyEmail = document.getElementById('email')?.value.trim();
    if (replyEmail) payload.set('_replyto', replyEmail);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    sendingEnquiry = true;
    submitButton.disabled = true;
    copyButton.disabled = true;
    quoteForm.setAttribute('aria-busy', 'true');
    submitButton.textContent = 'Sending…';
    emailStatus.textContent = 'Sending your enquiry…';
    enquiryFallback.hidden = true;
    try {
      const response = await fetch(quoteForm.action, { method: 'POST', body: payload, headers: { Accept: 'application/json' }, signal: controller.signal });
      const result = await response.json();
      if (!response.ok || !(result.success === true || result.success === 'true')) throw new Error('Submission not accepted');
      quoteForm.reset();
      emailStatus.textContent = 'Thank you! Your enquiry has been submitted. We’ll contact you by email or phone.';
    } catch {
      enquiryText.value = body;
      enquiryFallback.hidden = false;
      emailStatus.textContent = 'We couldn’t confirm your submission. Your details are still here. Please check before retrying, or copy your enquiry and email whenuaprinting@gmail.com.';
    } finally {
      clearTimeout(timeout);
      sendingEnquiry = false;
      submitButton.disabled = false;
      copyButton.disabled = false;
      submitButton.textContent = 'Send enquiry';
      quoteForm.removeAttribute('aria-busy');
    }
    return;
  }
  enquiryText.value = body;
  enquiryFallback.hidden = false;
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
