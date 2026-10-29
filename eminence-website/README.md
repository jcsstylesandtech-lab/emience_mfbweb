# Eminence Microfinance Bank — Website

A static, multi-page website: plain HTML, CSS and JavaScript with no build step. To preview it, open `index.html` in a browser, or serve the folder with a local web server:

```bash
cd eminence-website && python3 -m http.server 8080
```

## Pages

| File | Page |
|---|---|
| `index.html` | Home / Landing |
| `personal.html` | Personal Banking |
| `business.html` | Business Banking |
| `about.html` | About Us |
| `services.html` | Our Services (also has the Naira rates table) |
| `sharia.html` | Sharia-Compliant Banking |
| `contact.html` | Contact Us (form, branches, support, FAQs) |
| `privacy.html` | Privacy Policy |
| `terms.html` | Terms and Conditions (marked as a draft for review) |

`assets/js/main.js` injects the header, navigation and footer into every page, so all pages share one design.

## Configuration: edit before launch

All bank-specific details live in one object at the top of `assets/js/main.js` (`EMINENCE_CONFIG`):

| Key | Purpose |
|---|---|
| `phone`, `altPhone`, `email`, `supportEmail`, `address`, `hours` | Contact details shown in the footer, contact page and legal pages |
| `internetBankingUrl` | Verified Internet Banking link. While empty, the button shows a "coming soon" notice. |
| `accountOpeningUrl` | Official onboarding flow. While empty, "Open an Account" goes to the contact form. |
| `formEndpoint` | Secure endpoint that receives the contact form as a JSON POST. While empty, the form directs visitors to email. |
| `appStoreUrl`, `playStoreUrl` | App store badges. While empty, they are disabled. |
| `socials` | Official social media links |
| `rateEndpoint` | Optional exchange-rate feed from the bank, in the form `{ base, rates, time }` |
| `showUnverifiedStats` | Set this to `false` to hide the 175K+/24+/98%/40M+ figures until they are verified |

## Currency calculator

- It covers NGN plus the major currencies used in Nigeria: USD, GBP, EUR, CNY, CAD, AED, SAR, JPY, CHF, AUD, INR, GHS, XOF, ZAR, KES and EGP.
- It tries sources in this order: the bank's own feed (`rateEndpoint`), then ExchangeRate-API (open.er-api.com), then the fawazahmed0 currency API. Results are cached for one hour. If no source can be reached, it falls back to built-in reference rates and labels them clearly as offline rates.
- It shows the rate, the time of the last update and the source. A notice says the rates are indicative, exclude fees and are not transaction rates.
- Features: searchable currency picker with keyboard support, a swap button, input validation, and quick buttons for popular currency pairs (wide layout).
- Where it appears: Home (hero), Personal, Business, Services (with a full Naira rates table) and Sharia (preset to SAR→NGN for Hajj and Umrah planning).

## Images

- The logo and icon (`eminence-logo.png`, `eminence-icon.webp`) are the original files, unmodified.
- All other photos were cropped from the supplied page mockups and upscaled. Before launch, replace them with the original high-resolution photography, using the same file names in `assets/img/`.

## Pre-publication checklist

Taken from the content document. Confirm each item before launch:

1. Legal name, registered address and official contact details
2. Licensing and regulatory statements, plus NDIC wording and limits
3. Account types, features, fees, rates and limits
4. Availability of Internet Banking, mobile banking, cards, POS and agency banking
5. Whether Buy Now, Pay Later is approved. It is currently labelled "Proposed — subject to approval".
6. Sharia governance arrangements and which products are approved
7. Evidence for the statistics
8. Privacy Policy details: effective dates and the data-protection contact
9. Legal review of the Terms and Conditions
10. Testing of the calculator, contact form and all links
