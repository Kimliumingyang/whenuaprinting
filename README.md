# Whenua Printing homepage

A responsive, single-page printing business website using original Whenua logos, banner and five product photographs. No build or dependencies required.

## Run locally

Open `index.html` in your browser, or run from this folder:

```sh
python3 -m http.server 3000
```

The quote form prepares an email in the visitor’s email application. The visitor must send it there; this site does not store enquiries or process payments.

## Publish with GitHub Pages

In repository Settings → Pages, choose Deploy from a branch, branch `main`, folder `/ (root)`, then Save. GitHub provides the published URL and deployment status.

Keep the `assets`, `styles` and `scripts` folders next to `index.html`.

Layout and breakpoints are in `styles/home.css`; product search, mobile navigation and email enquiry behavior are in `scripts/home.js`. The reference desktop layout is adapted for phones and tablets with an accessible collapsible navigation menu. The bottom enquiry section currently reuses the original business-card photo; a dedicated background can be substituted later.

Original assets still needed for a closer reference match: the dedicated enquiry background photograph and the footer fern artwork. Social account links have not been invented.
