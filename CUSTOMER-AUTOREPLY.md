# Customer acknowledgement setup

The website posts ordinary forms to FormSubmit, preserving its default verification. Customer email is required and used for Reply-To and acknowledgement delivery. `_autoresponse` is identical in every enquiry form; `_next` returns successful submissions to the website’s thank-you page.

To check delivery after deployment:

1. Open the live website, not a file:// copy.
2. Submit a clearly marked test enquiry using a customer email address you control.
3. Complete the service verification if prompted.
4. If FormSubmit asks to activate the recipient, confirm that email in whenuaprinting@gmail.com.
5. Confirm the enquiry notification in the business inbox and the acknowledgement in the customer inbox, including spam folders.

An activated recipient is required. Native-flow tests intercepted the service request and did not actually send mail. External documentation and live email testing were blocked by this execution environment’s network proxy.
