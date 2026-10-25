# Whenua Printing homepage

A responsive, single-page printing business website using original Whenua logos, banner and five product photographs. No build or dependencies required.

## Run locally

Open `index.html` in your browser, or run from this folder:

```sh
python3 -m http.server 3000
```

The quote form validates contact details and prepares a complete email in the visitor’s email application. A Copy enquiry option supports webmail and long messages. The visitor must send it there; this site does not store enquiries or process payments.

## Publish with GitHub Pages

In repository Settings → Pages, choose Deploy from a branch, branch `main`, folder `/ (root)`, then Save. GitHub provides the published URL and deployment status.

Keep the `assets`, `styles` and `scripts` folders next to `index.html`.

Layout and breakpoints are in `styles/home.css`; product search, mobile navigation and email enquiry behavior are in `scripts/home.js`. The reference desktop layout is adapted for phones and tablets with an accessible collapsible navigation menu. The bottom enquiry section currently reuses the original business-card photo; a dedicated background can be substituted later.

Original assets still needed for a closer reference match: the dedicated enquiry background photograph and the footer fern artwork. Social account links have not been invented.

## Pull-up banner product page

`pull-up-banners.html` follows the supplied product-page layout and is linked from the homepage banner card and product search. Styles are in `styles/product.css`; the image viewer is in `scripts/product.js`. Request a quote preselects Pull up Banners.

The two product views currently use the supplied banner image and a CSS detail crop. The reference reception photographs and completed-project photographs have not been uploaded. The lower gallery shows the actual supplied product designs rather than claiming these are completed client projects.

## Business cards and poster pricing pages

`business-cards.html` and `posters.html` implement the supplied pricing designs. Shared pricing styles are in `styles/pricing.css`. Homepage product cards and search results link to their respective pages. Clicking a quantity opens an enquiry with the product, quantity and relevant specification already filled in.

Prices and supplied reference prices are transcribed from the design and labelled indicative NZD. Unknown `$XXX` reference-price placeholders are omitted. The poster breadcrumb is corrected to Posters; the A0 section’s final row is labelled A0 · 10 pcs. Final quotes confirm GST and delivery. The extra reference-design photographs are not yet in the repository, so pages use the original uploaded product artwork; the second business card view is a detail crop.
