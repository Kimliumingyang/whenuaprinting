# Whenua Printing

Responsive static website for Whenua Printing. HTML, CSS and browser JavaScript; no application build, framework or runtime dependencies.

- [Website](https://kimliumingyang.github.io/whenuaprinting/)
- [Interactive preview](https://kimliumingyang.github.io/whenuaprinting/preview.html)
- [中文维护与交接说明](WEBSITE-MAINTENANCE.md)

## Local preview

```sh
python3 -m http.server 8000
```

Open http://localhost:8000/. Enquiry forms use a real external service: do not submit customer information while checking visual changes.

## Code map

| Location | Responsibility |
| --- | --- |
| Root `*.html` | Editable page content, shared static navigation/footer/form markup |
| `assets/` | Original product images, photographs and logos |
| `styles/home.css` | Shared foundation and homepage styles |
| `styles/refinements.css` | Final shared design adjustments; load after page styles |
| Other `styles/*.css` | Page-specific layout and responsive rules |
| `scripts/navigation.js` | Mobile menu, current-page state and shared dialog closing |
| `scripts/quote.js` | Quote defaults, native form submission and copy fallback |
| `scripts/search.js` | Header product search |
| `scripts/product.js` | Product-detail image viewer |
| `scripts/products.js` | Merchandise filters, search and detail dialog |
| `scripts/stamp-build.py` | Deployment-only asset revision URLs and build metadata |
| `preview.html` | Independent preview workbench with desktop/tablet/mobile modes |
| `preview/` | Reference screenshots; not deployed to the public site |

Shared scripts are classic deferred scripts loaded in this order: navigation, quote, search, then page-specific scripts. `quote.js` intentionally exposes `openQuote` for the merchandise dialog and `productSelect` for product search. Keep this order when adding a page. Standard website pages contain the shared form and search markup; `quote.html` renders its form inline rather than inside a dialog.

Navigation, footer and modal markup remain directly editable in each HTML file. Synchronise changes across pages. This keeps GitHub editing and plain static hosting available without introducing a template compiler.

CSS rules retain their established cascade order to preserve the approved design. Start shared visual adjustments in `styles/refinements.css`; use a page stylesheet for page-specific changes. Avoid reordering existing overrides without checking all breakpoints.

## Formatting

Formatting conventions are saved in `.prettierrc.json`. To format source files with a pinned formatter:

```sh
npx --yes prettier@3.6.2 --write '*.html' 'styles/*.css' 'scripts/*.js'
```

The first run downloads the formatter. This is an optional development tool, not a website dependency. Python deployment code uses standard-library modules only.

## Deployment

Pushes to `main` run `.github/workflows/pages.yml` and deploy to GitHub Pages. The workflow copies an explicit list of HTML pages plus assets/styles/scripts into `_site`, stamps CSS/JS URLs with the Git commit, and publishes that directory. Add any new HTML page to the workflow copy list. Preview status displays the deployed revision.

Before publishing, check:

- Homepage, product pages, About, process, quote and policy links.
- Layout at 1440px desktop and 390px / 320px mobile.
- Mobile navigation, header search, image dialogs and all ten FAQs.
- Product category filters, search, empty results and merchandise enquiries.
- Quote product defaults and quantity presets; required fields and optional project details.
- Native POST destination, customer `email`, auto-response and thank-you redirect.

Browser tests can intercept form requests to avoid sending email. Actual notification and customer acknowledgement require a real authorised submission and mailbox confirmation.

## Repeatable browser check

```sh
python3 -m pip install playwright
python3 -m playwright install chromium
python3 tests/smoke.py
```

For an existing system Chromium, set `CHROMIUM_EXECUTABLE=/path/to/chromium`. The check serves the website locally, checks all pages at four widths, and exercises mobile search, merchandise and quote submission. External traffic is blocked and the FormSubmit request is intercepted; no emails are sent.

## Enquiry and content notes

Forms POST natively to FormSubmit for `info@whenuaprinting.com`, retaining service verification and automatic customer acknowledgements. No mailbox credentials are stored. Do not replace the native submission with AJAX or disable CAPTCHA without checking the service's acknowledgement requirements. See [CUSTOMER-AUTOREPLY.md](CUSTOMER-AUTOREPLY.md).

Prices are indicative NZD; final specifications, GST, delivery and availability are confirmed by quote. The 22 merchandise images illustrate potential products rather than confirmed stock. Their mapping is recorded in [MERCHANDISE-CATALOGUE.md](MERCHANDISE-CATALOGUE.md). Legal text comes from the supplied policies and Terms DOCX. About-page reviews are labelled sample testimonials pending authentic feedback. Social profile URLs are still awaiting confirmation.

For approved design decisions, image updates, content locations and future handover, read [WEBSITE-MAINTENANCE.md](WEBSITE-MAINTENANCE.md).
