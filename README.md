# Whenua Printing homepage

A responsive, single-page printing business website using original Whenua logos, banner and five product photographs. No build or dependencies required.

## Run locally

Open `index.html` in your browser, or run from this folder:

```sh
python3 -m http.server 3000
```

Enquiry forms submit directly via FormSubmit after destination activation. Copy enquiry remains available as a fallback. The site does not process payments.

## Publish with GitHub Pages

The repository includes `.github/workflows/pages.yml` to publish all four pages together on pushes to `main`. In Settings → Pages, select GitHub Actions as the build source. The Publish Whenua website workflow reports the deployment result and published URL. `.nojekyll` also supports static branch publishing if that source is retained.

Keep the `assets`, `styles` and `scripts` folders next to `index.html`.

Layout and breakpoints are in `styles/home.css`; product search, mobile navigation and email enquiry behavior are in `scripts/home.js`. The reference desktop layout is adapted for phones and tablets with an accessible collapsible navigation menu. The bottom enquiry section currently reuses the original business-card photo; a dedicated background can be substituted later.

Original assets still needed for a closer reference match: the dedicated enquiry background photograph and the footer fern artwork. Social account links have not been invented.

## Pull-up banner product page

`pull-up-banners.html` follows the supplied product-page layout and is linked from the homepage banner card and product search. Styles are in `styles/product.css`; the image viewer is in `scripts/product.js`. Request a quote preselects Pull up Banners.

The two product views currently use the supplied banner image and a CSS detail crop. The reference reception photographs and completed-project photographs have not been uploaded. The lower gallery shows the actual supplied product designs rather than claiming these are completed client projects.

## Business cards and poster pricing pages

`business-cards.html` and `posters.html` implement the supplied pricing designs. Shared pricing styles are in `styles/pricing.css`. Homepage product cards and search results link to their respective pages. Clicking a quantity opens an enquiry with the product, quantity and relevant specification already filled in.

Prices and supplied reference prices are transcribed from the design and labelled indicative NZD. Unknown `$XXX` reference-price placeholders are omitted. The poster breadcrumb is corrected to Posters; the A0 section’s final row is labelled A0 · 10 pcs. Final quotes confirm GST and delivery. The extra reference-design photographs are not yet in the repository, so pages use the original uploaded product artwork; the second business card view is a detail crop.

## Flyers and staff name badges

`flyers.html` and `name-badges.html` follow the supplied designs and are included in the Pages deployment package. All five homepage cards and product search entries now open product pages. Each flyer size/quantity and badge type/quantity preselects the enquiry form.

Flyer prices: A5 500/$89, 1000/$139, 2000/$288; A4 500/$134, 1000/$230, 2000/$534. Badge prices are transcribed exactly from the design, including non-monotonic pin-back/acrylic quantity tiers: magnetic 10/$55, 50/$194; pin-back 50/$39, 10/$65; acrylic 50/$65, 10/$75. The single-piece emergency statement is from the supplied design; quotes confirm availability. The badge special-order wording is corrected from banner to name badges. Unuploaded lifestyle photographs are represented by the existing original artwork and detail views.

## About us

`about.html` implements the supplied About us layout with the split hero, vertical heading, four story paragraphs, logo watermark and three review cards. It is linked from every page and included in the deployment workflow. Styles are in `styles/about.css`.

The original About us photographs are connected: `assets/about-service.jpg` for the customer handover and `assets/about-delivery.jpg` for the delivery section. Review cards are explicitly labelled as sample testimonials from the supplied design pending confirmation of authentic customer feedback.

## Homepage direct enquiry email

The homepage, all product enquiry modals and the standalone enquiry page send directly via FormSubmit AJAX to `whenuaprinting@gmail.com`. It requires name, customer email address, phone number, company name, product and quantity; project details are optional. The mailbox owner must activate the FormSubmit destination using the confirmation email triggered by the first real submission. Check spam as well. End-to-end email delivery is not verified until activation and a real mailbox receipt are confirmed. Frontend success means the service accepted the submission, not proof of mailbox delivery.

Visitor details are sent to FormSubmit; the homepage discloses this. No mail password or API secret is embedded. Failed or unconfirmed submissions retain the entered values and offer a copy/email fallback. Product-page forms now share the homepage modal fields, styles and direct submission workflow; each defaults to its own product. The customer email is included as the Reply-To address. Automated tests mock the external service. An authorised real delivery test was attempted, but the environment proxy rejected the FormSubmit connection before submission; actual delivery remains unverified.

## Standalone enquiry page

`quote.html` follows the supplied banner/intro/form-card design, using the same required fields and FormSubmit delivery handler as the homepage modal. Project details remain optional. The customer email is used for Reply-To. It is linked from the homepage lower enquiry button and every page footer, included in the preview selector, and packaged by the Pages workflow. The homepage banner still opens its modal.

Styles are in `styles/quote.css`; submission logic stays shared in `scripts/home.js`. Success, validation and failure retention have been tested with mocked service responses; real delivery still depends on FormSubmit activation. No attachment input is shown because file upload transport has not been integrated. Screenshot email-app buttons have been replaced with one direct Send enquiry button plus the shared Copy enquiry fallback.

All green homepage enquiry buttons open the shared modal. Header envelope icons across the website open `quote.html`. Product-specific quote buttons and price tiers retain the product, quantity and specifications when opening the shared modal.
