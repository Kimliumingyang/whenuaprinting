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

The homepage, all product enquiry modals and the standalone enquiry page send directly via FormSubmit native POST to `whenuaprinting@gmail.com`. It requires name, customer email address, phone number, company name, product and quantity; project details are optional. The mailbox owner must activate the FormSubmit destination using the confirmation email triggered by the first real submission. Check spam as well. End-to-end email delivery is not verified until activation and a real mailbox receipt are confirmed. Frontend success means the service accepted the submission, not proof of mailbox delivery.

Visitor details are sent to FormSubmit; the homepage discloses this. No mail password or API secret is embedded. The Copy enquiry fallback remains available before submitting; FormSubmit handles verification and submission errors during the native navigation. Product-page forms now share the homepage modal fields, styles and direct submission workflow; each defaults to its own product. The customer email is included as the Reply-To address. Automated tests mock the external service. An authorised real delivery test was attempted, but the environment proxy rejected the FormSubmit connection before submission; actual delivery remains unverified.

## Standalone enquiry page

`quote.html` follows the supplied banner/intro/form-card design, using the same required fields and FormSubmit delivery handler as the homepage modal. Project details remain optional. The customer email is used for Reply-To. It is linked from the homepage lower enquiry button and every page footer, included in the preview selector, and packaged by the Pages workflow. The homepage banner still opens its modal.

Styles are in `styles/quote.css`; submission logic stays shared in `scripts/home.js`. Native POST, validation, customer Reply-To, auto-response configuration and thank-you redirects have been tested with intercepted service requests; real delivery still depends on FormSubmit activation and receipt confirmation. No attachment input is shown because file upload transport has not been integrated. Screenshot email-app buttons have been replaced with one direct Send enquiry button plus the shared Copy enquiry fallback.

All green homepage enquiry buttons open the shared modal. Header envelope icons across the website open `quote.html`. Product-specific quote buttons and price tiers retain the product, quantity and specifications when opening the shared modal.

## Privacy Policy

`privacy-policy.html` reproduces the user-provided policy copy, dated 25 October 2026, with nine sections and supplied contact details. Styles are in `styles/policy.css` with responsive reading widths and print styles. All footer Privacy Policy links and the preview selector are connected; the page is included in the deployment artifact. Refund Policy and Terms and Conditions await user content.

## Refund and cancellation policy

`refund-policy.html` transcribes the supplied six-section policy, dated 26 October 2026, including the DEEP EARTH COLLECTIVE LIMITED trading-name statement and consumer-rights provisions. All footer Refund Policy links, preview selection and the deployment package are connected. The standard footer dinosaur is now white through shared CSS. Terms and Conditions remains pending.

## Terms and Conditions

`terms-and-conditions.html` is extracted directly from the user-provided Copy of WP TandCs.docx, dated 25 October 2026. It contains 137 nonempty source paragraphs, 14 main sections and 7 subsections. Rendered article wording is checked against the complete DOCX text with only whitespace normalised. All footer links, preview selection and deployment packaging are connected. No legal wording was invented or rewritten.

## Homepage FAQs

Ten user-provided questions and answers are reproduced in the native details/summary accordion at `index.html#faqs`, directly after How it works. The first answer is initially expanded; the named group opens one answer at a time in supported browsers. Keyboard access works without JavaScript. Footer FAQs links on every page target this section.

## How it works

`how-it-works.html` is the standalone process page, using existing original photographs, the three-step illustration set, supplied FAQ answers and ordering terms. It covers enquiry, quoting, written artwork approval/payment, production and delivery, with preparation guidance and shared direct enquiry modals. Global How it works navigation, the preview selector and Pages deployment are connected; the homepage process section remains in place. Styles are in `styles/how-it-works.css`.

The original homepage enquiry background is `assets/quote-banner.jpg.png`. The How it works page now includes all ten original FAQ questions and answers; its footer FAQs link remains on the process page rather than navigating to the homepage.

## Customer acknowledgement email

All enquiry forms now use a native POST to `https://formsubmit.co/whenuaprinting@gmail.com`, with the same `_autoresponse` message, customer `email`, dynamic `_replyto` and `_next` pointing to `thank-you.html`. AJAX handling has been removed because the requested FormSubmit auto-response feature is incompatible with AJAX. Service CAPTCHA is left enabled by default; forms navigate the top-level window so service verification is not trapped in the preview iframe. No email application opens.

The acknowledgement thanks the customer, confirms the enquiry and explains that it is not a final quote or order confirmation. It does not promise a specific response time. The service still needs an activated recipient. Complete a real submission and any verification, then confirm both the business notification and the customer acknowledgement, including spam folders. No genuine email delivery is inferred from mocked tests. Documentation access from this environment was blocked by the egress proxy.

## Recommended custom merchandise

The Products page now presents all 22 `WechatIMG19452.jpg`–`WechatIMG19473.jpg` uploads as illustrative branded product ideas, with six category filters, text search, image detail dialogs and product-specific enquiries. The original five print product links remain. Selecting a custom item preselects Something else and includes its name in project details, using the existing native FormSubmit acknowledgement flow. Images are original and lazy loaded, with no claimed pricing, stock, specifications or guaranteed availability. Product/image mapping is in `MERCHANDISE-CATALOGUE.md`; behavior is in `scripts/products.js`.
