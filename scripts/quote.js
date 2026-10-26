'use strict';

// Quote form and modal. openQuote is shared with the merchandise gallery.
const quoteDialog = document.getElementById('quoteDialog');
const productSelect = document.getElementById('product');
const emailStatus = document.getElementById('emailStatus');
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
document.querySelectorAll('.quote-open').forEach((button) => {
  button.addEventListener('click', () =>
    openQuote(
      button.dataset.quoteProduct ||
        (button.closest('.custom-card') ? 'Something else' : undefined),
      button.dataset
    )
  );
});
document.querySelectorAll('[data-product]').forEach((card) => {
  card.addEventListener('click', (event) => {
    event.preventDefault();
    openQuote(card.dataset.product);
  });
});
const quoteForm = document.getElementById('quoteForm');
const enquiryFallback = document.getElementById('enquiryFallback');
const enquiryText = document.getElementById('enquiryText');
function enquiryMessage() {
  const value = (id) => document.getElementById(id)?.value.trim() || '';
  const lines = [
    'Hello Whenua Printing,',
    '',
    'I’d like a quote for the following project:',
    '',
    `Name: ${value('name')}`,
  ];
  if (document.getElementById('email')) lines.push(`Email: ${value('email')}`);
  if (document.getElementById('company')) lines.push(`Company: ${value('company')}`);
  lines.push(
    `Phone: ${value('phone') || 'Not provided'}`,
    `Product: ${productSelect.value}`,
    `Quantity: ${value('quantity')}`,
    '',
    'Project details:',
    value('details') || 'Not provided',
    '',
    'Please confirm pricing, delivery costs and turnaround. Thank you!'
  );
  return lines.join('\n');
}
// FormSubmit auto-response requires a standard form POST, not AJAX.
quoteForm.addEventListener('submit', (event) => {
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
    emailStatus.textContent =
      'Enquiry copied. Paste it into an email to whenuaprinting@gmail.com and send it there.';
  } catch {
    enquiryText.focus();
    enquiryText.select();
    emailStatus.textContent =
      'Select and copy the message below, then email it to whenuaprinting@gmail.com.';
  }
});
