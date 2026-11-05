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
| `about.html` | About Us (includes the Sharia-Compliant Banking section, `about.html#sharia`) |
| `services.html` | Our Services: Digital Banking, Buy Now Pay Later, Ethical Banking, Business Banking, Cards |
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
| `showUnverifiedStats` | Set this to `false` to hide the 175K+/24+/98%/40M+ figures until they are verified |

## Images

- The logo and icon (`eminence-logo.png`, `eminence-icon.webp`) are the original files, unmodified.
- All 20 photos were generated with Higgsfield (Soul 2.0): 6 page heroes plus card and section photos. Each shows a woman in a hijab, in the site's navy, teal and white colours.
- For now, the pages load these photos straight from Higgsfield's image server (`d8j0ntlcm91z4.cloudfront.net`). Before launch, run `python3 fetch-images.py` (needs internet and `pip install pillow`). It downloads every photo into `assets/img/` as an optimised JPEG and switches the pages to those local files, so the site no longer depends on Higgsfield.
- To replace a photo later, put the new file in `assets/img/` under the same name.
- `eminence-icon-transparent.png` is the original icon with its white background removed (colours unchanged). `preloader-navy.png` and `preloader-teal.png` are its two colour layers, used by the loading screen.

## Loading screen

Every page opens with a loading screen: the Eminence icon draws itself (navy hexagon, then the teal panel), with a teal loading bar. It stays for at least one full build (about 1.5 seconds), fades out once the page has loaded, and always closes within 5 seconds. Visitors who prefer reduced motion see a still logo for a moment instead. Visitors with JavaScript turned off never see it. The styles are under "Preloader" in `assets/css/styles.css`, and the timing is in the `PRELOADER` block of `assets/js/main.js`.

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
10. Testing of the contact form and all links
