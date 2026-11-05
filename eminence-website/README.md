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
| `services.html` | Our Services: Digital Banking, Buy Now Pay Later, Ethical Banking, Business Banking, Cards |
| `contact.html` | Contact Us (form, branches, support, FAQs) |
| `privacy.html` | Privacy Policy |
| `terms.html` | Terms and Conditions (marked as a draft for review) |
| `cookies.html` | Cookies Policy |
| `offline.html` | Shown when a visitor is offline and the page they want isn't saved |
| `404.html` | Branded "Page not found" page for any missing address |

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
- The photos are stored in `assets/img/` as optimised JPEGs (heroes 1920 px wide, cards 900–1200 px), so the site doesn't depend on Higgsfield. Stray AI-generated lettering in the backgrounds was blurred out.
- To replace a photo later, put the new file in `assets/img/` under the same name.
- `eminence-icon-transparent.png` is the original icon with its white background removed (colours unchanged). `preloader-navy.png` and `preloader-teal.png` are its two colour layers, used by the loading screen.

## Loading screen

Every page opens with a loading screen: the Eminence icon draws itself (navy hexagon, then the teal panel), with a teal loading bar. It stays for at least one full build (about 1.5 seconds), fades out once the page has loaded, and always closes within 5 seconds. Visitors who prefer reduced motion see a still logo for a moment instead. Visitors with JavaScript turned off never see it. The styles are under "Preloader" in `assets/css/styles.css`, and the timing is in the `PRELOADER` block of `assets/js/main.js`.

## Cookies

- **Consent banner:** first-time visitors see a banner with *Accept all*, *Reject non-essential* and *Manage preferences*. The choice is saved in the `emfb_consent` cookie for 6 months. Visitors can reopen the settings from **Cookie Settings** in every footer.
- **Categories:** strictly necessary (always on), functional, analytics and marketing. The embedded Google map on the Contact page is functional: it loads only after consent, or when the visitor clicks **Show map**.
- **Adding analytics or other tracking later:** add the script so it runs only after consent, then list its cookies in `cookies.html`:
  ```html
  <script type="text/plain" data-consent="analytics" data-src="https://example.com/analytics.js"></script>
  ```

## Caching and offline support

- **`sw.js` (service worker):** saves the pages, styles, scripts and images on the visitor's device, so repeat visits load almost instantly and saved pages still open without a connection. Pages always check the network first, so visitors see updates. If a page isn't saved and there's no connection, `offline.html` is shown. It runs only on HTTPS (or `localhost`).
- **Server caching:** `.htaccess` (Apache/cPanel hosting) and `_headers` (Netlify/Cloudflare Pages) tell browsers to keep CSS and JS for a year, images for 30 days, and to always re-check HTML and `sw.js`.
- **When you change the CSS or JS:** change the version tag `?v=20261105` in every page **and** `VERSION` in `sw.js` to the same new value (for example today's date). Otherwise returning visitors keep the old files.

## 404 page

`404.html` is shown for any address that doesn't exist. On Apache/cPanel hosting, the `ErrorDocument 404 /404.html` line in `.htaccess` turns it on. Netlify and Cloudflare Pages use a `404.html` file automatically. The page uses `<base href="/">` so it works at any depth (for example `/old/deep/page`). This assumes the site sits at the root of its domain; if it's in a subfolder, change that line to the folder, such as `<base href="/eminence/">`, and update the `.htaccess` line to match.

## Pre-publication checklist

Taken from the content document. Confirm each item before launch:

1. Legal name, registered address and official contact details
2. Licensing and regulatory statements, plus NDIC wording and limits
3. Account types, features, fees, rates and limits
4. Availability of Internet Banking, mobile banking, cards, POS and agency banking
5. Whether Buy Now, Pay Later is approved. It is currently labelled "Proposed — subject to approval".
6. Evidence for the statistics
7. Privacy Policy details: effective dates and the data-protection contact
8. Legal review of the Terms and Conditions
9. Testing of the contact form and all links
