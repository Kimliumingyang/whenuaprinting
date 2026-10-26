"""Browser smoke checks. External email requests are intercepted, never sent.

Install: python3 -m pip install playwright && python3 -m playwright install chromium
Run: python3 tests/smoke.py
Optional: CHROMIUM_EXECUTABLE=/path/to/chromium python3 tests/smoke.py
"""

import functools
import os
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass


def check_site(origin, browser):
    page = browser.new_page()
    errors = []
    requests = []
    page.on("pageerror", lambda error: errors.append(str(error)))

    def intercept_email(route):
        requests.append(route.request)
        route.fulfill(status=303, headers={"Location": origin + "/thank-you.html"})

    # Fail closed for external traffic, then explicitly mock the email endpoint.
    page.route("https://**/*", lambda route: route.abort())
    page.route("https://formsubmit.co/whenuaprinting@gmail.com", intercept_email)

    for width in (320, 390, 768, 1440):
        page.set_viewport_size({"width": width, "height": 1000})
        for source in ROOT.glob("*.html"):
            page.goto(origin + "/" + source.name)
            assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), (
                source.name, width
            )

    page.goto(origin + "/index.html")
    assert page.locator("#faqs details").count() == 10
    page.locator(".hero .quote-open").click()
    page.locator("#quoteForm button[type=submit]").click()
    assert not requests, "Required fields must prevent submission"
    for field, value in {
        "name": "Smoke check",
        "email": "customer@example.com",
        "phone": "021 123 4567",
        "company": "Example business",
        "quantity": "10",
    }.items():
        page.locator("#" + field).fill(value)
    page.locator("#quoteForm button[type=submit]").click()
    page.wait_for_url("**/thank-you.html")
    request = requests[-1]
    fields = parse_qs(request.post_data)
    assert request.method == "POST" and request.is_navigation_request()
    assert fields["email"] == fields["_replyto"] == ["customer@example.com"]
    assert fields["_autoresponse"] and fields.get("_captcha") != ["false"]

    page.goto(origin + "/products.html")
    assert page.locator(".merch-card").count() == 22
    page.locator("[data-merch-filter=drinkware]").click()
    assert page.locator(".merch-card:visible").count() == 3
    page.locator("[data-merch-filter=all]").click()
    page.locator("#merchSearch").fill("umbrellas")
    assert page.locator(".merch-card:visible").count() == 1
    page.locator(".merch-card:visible [data-merch-view]").click()
    page.locator("#merchDetailEnquire").click()
    assert page.locator("#product").input_value() == "Something else"
    assert "Umbrellas" in page.locator("#details").input_value()
    page.keyboard.press("Escape")

    page.set_viewport_size({"width": 390, "height": 844})
    page.locator("#menuToggle").click()
    page.locator(".mobile-search").click()
    assert page.locator("#searchDialog").evaluate("dialog => dialog.open")
    page.locator("#searchInput").fill("flyers")
    page.locator("#searchResults a").click()
    page.wait_for_url("**/flyers.html")
    page.locator(".product-quote .quote-open").click()
    assert page.locator("#product").input_value() == "Flyers"
    assert not errors, errors
    browser.close()


def main():
    handler = functools.partial(QuietHandler, directory=str(ROOT))
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as playwright:
            executable = os.environ.get("CHROMIUM_EXECUTABLE")
            options = {"executable_path": executable} if executable else {}
            browser = playwright.chromium.launch(**options)
            check_site(f"http://127.0.0.1:{server.server_port}", browser)
        print("PASS: responsive pages, native quote POST, merchandise, menu and search")
    finally:
        server.shutdown()
        server.server_close()


if __name__ == "__main__":
    main()
