/* ==========================================================================
   Eminence Microfinance Bank — Site script
   Shared header/footer, smooth scrolling, scroll reveal, currency calculator,
   search, FAQ, contact form and legal-page table of contents.
   ========================================================================== */

/* --------------------------------------------------------------------------
   SITE CONFIGURATION
   Replace the bracketed values with verified details before launch. Empty
   URLs keep the related button in a safe "not yet available" state.
   -------------------------------------------------------------------------- */
window.EMINENCE_CONFIG = Object.assign({
  phone: "+234 (0) 916 910 4520",
  phoneHref: "+2349169104520",
  altPhone: "",
  email: "info@eminencemfb.com",
  supportEmail: "",
  branchName: "Kubwa",
  address: "Plot No. 009, Cadastral Zone F15, Kubwa Extension District",
  location: "FCT Abuja, Nigeria",
  hours: "[Confirmed working hours]",
  internetBankingUrl: "",            // verified secure Internet Banking platform
  accountOpeningUrl: "",             // official onboarding flow
  formEndpoint: "",                  // approved secure endpoint for the contact form (POST, JSON)
  mapQuery: "Kubwa Extension District, Kubwa, FCT Abuja, Nigeria", // used for the map and "Get Directions"
  appStoreUrl: "https://apps.apple.com/app/eminence-mobile-banking/id6767839310",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.eminence_mobile",
  bizAppStoreUrl: "https://apps.apple.com/app/eminence-business/id6777817889",
  bizPlayStoreUrl: "https://play.google.com/store/apps/details?id=com.eminence.biz",
  socials: { facebook: "", linkedin: "", x: "", instagram: "", youtube: "" },
  rateEndpoint: "",                  // optional bank rate feed: { base:"USD", rates:{NGN:..}, time:"ISO" }
  showUnverifiedStats: true,         // statistics are shown with a "pending verification" note
  year: new Date().getFullYear()
}, window.EMINENCE_CONFIG || {});

(function () {
  "use strict";
  const C = window.EMINENCE_CONFIG;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.remove("no-js");

  const openAccountHref = C.accountOpeningUrl || "contact.html?subject=Open%20an%20Account#message";

  /* ------------------------------------------------------------------------
     HEADER
     ------------------------------------------------------------------------ */
  const NAV = [
    { id: "home", label: "Home", href: "index.html" },
    { id: "personal", label: "Personal", href: "personal.html", children: [
      ["piggy-bank", "Savings Accounts", "personal.html#accounts"],
      ["wallet", "Current Accounts", "personal.html#accounts"],
      ["graduation-cap", "Youth Accounts", "personal.html#accounts"],
      ["heart-handshake", "Women's Banking", "personal.html#accounts"],
      ["smartphone", "Digital Banking", "personal.html#digital"],
      ["hand-coins", "Personal Financing", "personal.html#financing"],
    ]},
    { id: "business", label: "Business", href: "business.html", children: [
      ["briefcase-business", "Business Current Account", "business.html#solutions"],
      ["database", "Business Savings Account", "business.html#solutions"],
      ["chart-column-increasing", "Business Financing", "business.html#solutions"],
      ["calculator", "Merchant & POS Services", "business.html#solutions"],
      ["monitor-smartphone", "Digital Tools for Business", "business.html#digital"],
      ["arrow-left-right", "Currency Calculator", "business.html#currency"],
    ]},
    { id: "about", label: "About Us", href: "about.html" },
    { id: "services", label: "Our Services", href: "services.html" },
    { id: "sharia", label: "Sharia-Compliant Banking", href: "sharia.html" },
    { id: "contact", label: "Contact Us", href: "contact.html" },
  ];

  const page = document.body.dataset.page || "";

  function headerHTML() {
    const items = NAV.map((n) => {
      const active = n.id === page ? " is-active" : "";
      const current = n.id === page ? ' aria-current="page"' : "";
      if (!n.children) return `<li><a class="nav-link${active}" href="${n.href}"${current}>${n.label}</a></li>`;
      const sub = [[`arrow-right`, `${n.label} Banking overview`, n.href]].concat(n.children)
        .map(([ic, t, h]) => `<li><a href="${h}"><i data-lucide="${ic}"></i>${t}</a></li>`).join("");
      return `<li class="has-dropdown">
        <button class="nav-link${active}" type="button" aria-expanded="false" aria-haspopup="true"${current}>${n.label}<i data-lucide="chevron-down"></i></button>
        <ul class="dropdown">${sub}</ul></li>`;
    }).join("");
    return `
    <div class="container nav">
      <a class="brand" href="index.html" aria-label="Eminence Microfinance Bank — Home">
        <img src="assets/img/eminence-logo.png" alt="Eminence Microfinance Bank" width="166" height="46">
      </a>
      <ul class="nav-menu" id="nav-menu">${items}
        <li class="mobile-only"><div class="btn-row">
          <a class="btn btn--outline btn--block" href="#" data-link="internetBanking"><i data-lucide="lock"></i>Internet Banking</a>
          <a class="btn btn--primary btn--block" href="${openAccountHref}"><i data-lucide="user"></i>Open an Account</a>
        </div></li>
      </ul>
      <div class="nav-actions">
        <button class="icon-btn" type="button" data-search-open aria-label="Search the website"><i data-lucide="search"></i></button>
        <span class="nav-divider" aria-hidden="true"></span>
        <a class="btn btn-ib" href="#" data-link="internetBanking" title="Internet Banking" aria-label="Internet Banking"><i data-lucide="lock"></i>Internet Banking</a>
        <a class="btn btn--primary btn-open" href="${openAccountHref}"><i data-lucide="user"></i><span>Open an Account</span></a>
        <button class="icon-btn nav-toggle" type="button" aria-controls="nav-menu" aria-expanded="false" aria-label="Open menu"><i data-lucide="menu"></i></button>
      </div>
    </div>`;
  }

  /* ------------------------------------------------------------------------
     FOOTER
     ------------------------------------------------------------------------ */
  function footerHTML() {
    const biz = page === "business";
    const appName = biz ? "Eminence Business" : "Eminence Mobile Banking";
    const s = C.socials;
    const soc = [["facebook", "Facebook", s.facebook], ["linkedin", "LinkedIn", s.linkedin], ["twitter", "X", s.x], ["instagram", "Instagram", s.instagram], ["youtube", "YouTube", s.youtube]]
      .map(([ic, name, url]) => url
        ? `<li><a href="${url}" target="_blank" rel="noopener" aria-label="Eminence on ${name}"><i data-lucide="${ic}"></i></a></li>`
        : `<li><a href="#" aria-disabled="true" data-soon="Our verified ${name} page will be linked here soon." aria-label="${name} (coming soon)"><i data-lucide="${ic}"></i></a></li>`).join("");
    const tel = C.phoneHref ? `<a href="tel:${C.phoneHref}">${C.phone}</a>` : C.phone;
    return `
    <div class="container footer-top">
      <div class="footer-brand">
        <a class="logo-plate" href="index.html" aria-label="Eminence Microfinance Bank — Home"><img src="assets/img/eminence-logo.png" alt="Eminence Microfinance Bank" width="160" height="44"></a>
        <p>Secure Banking. Smart Solutions. Sustainable Growth.</p>
        <ul class="socials">${soc}</ul>
        <p class="footer-app-title">${biz ? "Download the Eminence Business app" : "Download our mobile app"}</p>
        <div class="store-badges store-badges--footer">
          <a class="store-badge" href="#" data-store="${biz ? "biz-google" : "google"}" aria-label="Get the ${appName} app on Google Play"><i data-lucide="play"></i><span>Get it on<b>Google Play</b></span></a>
          <a class="store-badge" href="#" data-store="${biz ? "biz-apple" : "apple"}" aria-label="Download the ${appName} app on the App Store"><i data-lucide="apple"></i><span>Download on the<b>App Store</b></span></a>
        </div>
      </div>
      <div class="footer-col"><h3>Quick Links</h3><ul>
        <li><a href="index.html">Home</a></li><li><a href="personal.html">Personal Banking</a></li>
        <li><a href="business.html">Business Banking</a></li><li><a href="about.html">About Us</a></li>
        <li><a href="services.html">Our Services</a></li><li><a href="sharia.html">Sharia-Compliant Banking</a></li>
        <li><a href="contact.html">Contact Us</a></li></ul></div>
      <div class="footer-col"><h3>Our Services</h3><ul>
        <li><a href="services.html#investment">Investment Opportunities</a></li><li><a href="services.html#digital">Digital Banking</a></li>
        <li><a href="services.html#agency">Agency Banking <small>(where available)</small></a></li><li><a href="services.html#ethical">Ethical Banking</a></li>
        <li><a href="services.html#business">Business Banking</a></li><li><a href="services.html#cards">Debit &amp; Virtual Card Services</a></li>
        <li><a href="services.html#bnpl">Buy Now, Pay Later <small>(if approved)</small></a></li></ul></div>
      <div class="footer-col"><h3>Support</h3><ul>
        <li><a href="contact.html#faqs">FAQs</a></li><li><a href="contact.html#support">Complaints</a></li>
        <li><a href="contact.html#branches">Branch Locator</a></li><li><a href="contact.html#support">Help &amp; Support</a></li>
        <li><a href="contact.html#support">Report a Lost or Stolen Card</a></li></ul></div>
      <div class="footer-col"><h3>Legal</h3><ul>
        <li><a href="privacy.html">Privacy Policy</a></li><li><a href="terms.html">Terms and Conditions</a></li>
        <li><a href="privacy.html#cookies">Cookies Policy</a></li></ul></div>
      <div class="footer-col"><h3>Contact Us</h3><ul class="footer-contact" style="gap:12px">
        <li><i data-lucide="map-pin"></i><span><strong style="color:#fff;font-weight:600">${C.branchName}</strong><br>${C.address}, ${C.location}</span></li>
        <li><i data-lucide="mail"></i><a href="mailto:${C.email}">${C.email}</a></li>
        <li><i data-lucide="phone"></i><span>${tel}</span></li>
        <li><i data-lucide="clock"></i><span>${C.hours}</span></li></ul></div>
    </div>
    <div class="footer-bottom"><div class="container">
      <span>&copy; ${C.year} Eminence Microfinance Bank Limited. All rights reserved.</span>
      <span>Banking with integrity. Serving our communities.</span>
    </div></div>`;
  }

  const header = $("#site-header");
  const footer = $("#site-footer");
  if (header) { header.className = "site-header"; header.innerHTML = headerHTML(); }
  if (footer) { footer.className = "site-footer"; footer.innerHTML = footerHTML(); }

  // Search overlay + back-to-top + toast
  document.body.insertAdjacentHTML("beforeend", `
    <div class="search-panel" role="dialog" aria-modal="true" aria-label="Search the website" data-lenis-prevent>
      <div class="search-box">
        <form role="search" onsubmit="return false"><i data-lucide="search"></i>
          <input type="search" placeholder="Search accounts, services, financing…" aria-label="Search" autocomplete="off">
          <button class="icon-btn" type="button" data-search-close aria-label="Close search"><i data-lucide="x"></i></button></form>
        <ul class="search-results" aria-live="polite"></ul>
      </div>
    </div>
    <button class="back-top" type="button" aria-label="Back to top"><i data-lucide="arrow-up"></i></button>
    <div class="toast" role="status" aria-live="polite" style="position:fixed;left:50%;bottom:24px;transform:translate(-50%,30px);background:#022244;color:#fff;padding:12px 18px;border-radius:10px;font-size:14px;box-shadow:0 12px 30px rgba(0,0,0,.25);opacity:0;pointer-events:none;transition:opacity .3s,transform .3s;z-index:300;max-width:calc(100% - 32px)"></div>`);

  // Config-driven text
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(C.mapQuery)}`;
  $$("[data-config]").forEach((el) => {
    const key = el.dataset.config, v = C[key];
    if (v == null) return;
    if (v === "") { el.hidden = true; return; }
    if (key === "phone" && C.phoneHref) el.innerHTML = `<a href="tel:${C.phoneHref}">${v}</a>`;
    else el.textContent = v;
  });
  $$("[data-directions]").forEach((a) => { a.href = mapsLink; a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-map]").forEach((box) => {
    box.innerHTML = `<iframe title="Map of Eminence Microfinance Bank, ${C.branchName}" src="https://maps.google.com/maps?q=${encodeURIComponent(C.mapQuery)}&z=14&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
  });
  $$("[data-open-account]").forEach((a) => a.setAttribute("href", openAccountHref));

  /* ------------------------------------------------------------------------
     ICONS
     ------------------------------------------------------------------------ */
  function icons() { if (window.lucide) window.lucide.createIcons({ attrs: { "aria-hidden": "true" } }); }
  icons();

  /* ------------------------------------------------------------------------
     TOAST + "not yet available" links
     ------------------------------------------------------------------------ */
  const toastEl = $(".toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.style.opacity = "1"; toastEl.style.transform = "translate(-50%,0)";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.style.opacity = "0"; toastEl.style.transform = "translate(-50%,30px)"; }, 4200);
  }
  $$('[data-link="internetBanking"]').forEach((a) => {
    if (C.internetBankingUrl) { a.href = C.internetBankingUrl; a.target = "_blank"; a.rel = "noopener"; }
    else a.addEventListener("click", (e) => { e.preventDefault(); toast("Our verified Internet Banking platform link will be published here soon. Never enter your details on unofficial sites."); });
  });
  $$('[data-store]').forEach((a) => {
    const url = { "google": C.playStoreUrl, "apple": C.appStoreUrl, "biz-google": C.bizPlayStoreUrl, "biz-apple": C.bizAppStoreUrl }[a.dataset.store];
    if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; a.querySelector(".soon")?.remove(); }
    else { a.setAttribute("aria-disabled", "true"); a.addEventListener("click", (e) => { e.preventDefault(); toast("Our official mobile app links will be published once available."); }); }
  });
  $$("[data-soon]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); toast(a.dataset.soon); }));

  /* ------------------------------------------------------------------------
     SMOOTH SCROLL (Lenis) + anchor handling
     ------------------------------------------------------------------------ */
  let lenis = null;
  const headerOffset = () => -((header?.offsetHeight || 72) + (document.querySelector(".svc-nav")?.offsetHeight || 0) + 14);
  if (window.Lenis && !reduceMotion) {
    lenis = new window.Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  function scrollToTarget(target) {
    if (lenis) lenis.scrollTo(target, { offset: headerOffset() });
    else if (typeof target === "number") window.scrollTo({ top: target, behavior: reduceMotion ? "auto" : "smooth" });
    else target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href*="#"]');
    if (!a || a.dataset.link || a.hasAttribute("data-soon")) return;
    const url = new URL(a.getAttribute("href"), location.href);
    if (url.pathname !== location.pathname || !url.hash || url.hash === "#") return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    e.preventDefault();
    closeMenu();
    scrollToTarget(target);
    history.pushState(null, "", url.hash);
  });
  // Arriving from another page with a hash
  if (location.hash) {
    const t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (t) window.addEventListener("load", () => setTimeout(() => scrollToTarget(t), 80));
  }

  /* ------------------------------------------------------------------------
     NAV behaviour
     ------------------------------------------------------------------------ */
  const menu = $("#nav-menu");
  const toggle = $(".nav-toggle");
  function closeMenu() {
    if (!menu?.classList.contains("is-open")) return;
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    toggle.innerHTML = '<i data-lucide="menu"></i>'; icons();
    lenis?.start(); document.body.style.overflow = "";
  }
  toggle?.addEventListener("click", () => {
    if (menu.classList.contains("is-open")) return closeMenu();
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    toggle.innerHTML = '<i data-lucide="x"></i>'; icons();
    lenis?.stop(); document.body.style.overflow = "hidden";
  });
  menu?.setAttribute("data-lenis-prevent", "");
  $$(".has-dropdown > button").forEach((btn) => btn.addEventListener("click", () => {
    const li = btn.parentElement;
    const open = !li.classList.contains("is-open");
    $$(".has-dropdown.is-open").forEach((o) => { o.classList.remove("is-open"); o.firstElementChild.setAttribute("aria-expanded", "false"); });
    li.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
  }));
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".has-dropdown")) $$(".has-dropdown.is-open").forEach((o) => { o.classList.remove("is-open"); o.firstElementChild.setAttribute("aria-expanded", "false"); });
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 1180) closeMenu(); });

  const backTop = $(".back-top");
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 8);
    backTop.classList.toggle("is-visible", y > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  backTop.addEventListener("click", () => scrollToTarget(0));

  /* ------------------------------------------------------------------------
     SCROLL REVEAL
     ------------------------------------------------------------------------ */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }), { threshold: 0, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else revealEls.forEach((el) => el.classList.add("is-in"));
  // Stagger children
  $$("[data-stagger]").forEach((wrap) => Array.from(wrap.children).forEach((c, i) => c.style.setProperty("--d", `${i * 0.08}s`)));

  /* ------------------------------------------------------------------------
     SEARCH
     ------------------------------------------------------------------------ */
  const INDEX = [
    ["Open an Account", "Start your banking journey", openAccountHref],
    ["Personal Banking", "Savings, current, youth and women's accounts", "personal.html"],
    ["Savings Account", "Save for a brighter future", "personal.html#accounts"],
    ["Current Account", "For your everyday transactions", "personal.html#accounts"],
    ["Youth Account", "Build a strong financial future", "personal.html#accounts"],
    ["Women's Banking", "Financial solutions for your ambitions", "personal.html#accounts"],
    ["Digital Banking", "Bank anytime, anywhere", "services.html#digital"],
    ["Personal Financing", "Turn your plans into reality", "personal.html#financing"],
    ["Personal Banking FAQs", "Account opening, documents, PIN reset", "personal.html#faqs"],
    ["Business Banking", "Partners in your business growth", "business.html"],
    ["Business Current Account", "Everyday business transactions", "business.html#solutions"],
    ["Business Savings Account", "Organise funds and plan ahead", "business.html#solutions"],
    ["Business Financing", "Working capital, assets and expansion", "business.html#solutions"],
    ["Merchant & POS Services", "Accept customer payments", "business.html#solutions"],
    ["Bulk Payments & Payroll", "Digital tools for a smarter business", "business.html#digital"],
    ["Currency Calculator", "Convert Naira and major currencies", "business.html#currency"],
    ["Exchange Rates", "Indicative Naira rates for major currencies", "services.html#rates"],
    ["Investment Opportunities", "Make your money work towards your goals", "services.html#investment"],
    ["Agency Banking", "Banking services closer to you", "services.html#agency"],
    ["Ethical Banking", "Responsible finance, clearer choices", "services.html#ethical"],
    ["Debit & Virtual Cards", "Convenient payments, greater flexibility", "services.html#cards"],
    ["Buy Now, Pay Later", "Proposed service — subject to approval", "services.html#bnpl"],
    ["Sharia-Compliant Banking", "Faith-aligned banking for a better tomorrow", "sharia.html"],
    ["Islamic Savings & Current Accounts", "Sharia-compliant account options", "sharia.html#products"],
    ["Murabaha Asset Financing", "Islamic asset financing", "sharia.html#products"],
    ["Islamic Business Financing", "For eligible entrepreneurs and businesses", "sharia.html#products"],
    ["About Eminence", "Vision, mission and values", "about.html"],
    ["Contact Us", "Call, email or send us a message", "contact.html"],
    ["Report a Lost or Stolen Card", "Emergency card support", "contact.html#support"],
    ["Complaints and Feedback", "How to submit a complaint", "contact.html#support"],
    ["Branch Locator", "Find a branch or agent", "contact.html#branches"],
    ["Privacy Policy", "How we protect your information", "privacy.html"],
    ["Cookies", "Cookies and similar technologies", "privacy.html#cookies"],
    ["Terms and Conditions", "Account terms and conditions", "terms.html"],
  ];
  const panel = $(".search-panel");
  const sInput = $("input", panel);
  const sResults = $(".search-results", panel);
  function renderSearch(q) {
    q = q.trim().toLowerCase();
    const list = q ? INDEX.filter(([t, d]) => (t + " " + d).toLowerCase().includes(q)) : INDEX.slice(0, 7);
    sResults.innerHTML = list.length
      ? list.map(([t, d, h]) => `<li><a href="${h}">${t}<small>${d}</small></a></li>`).join("")
      : `<li class="search-empty">No results for “${q.replace(/[<>&"]/g, "")}”. Try “savings”, “POS” or “financing”.</li>`;
  }
  function openSearch() { panel.classList.add("is-open"); renderSearch(""); lenis?.stop(); setTimeout(() => sInput.focus(), 50); }
  function closeSearch() { panel.classList.remove("is-open"); lenis?.start(); sInput.value = ""; }
  $$("[data-search-open]").forEach((b) => b.addEventListener("click", openSearch));
  $("[data-search-close]", panel).addEventListener("click", closeSearch);
  panel.addEventListener("click", (e) => { if (e.target === panel) closeSearch(); if (e.target.closest(".search-results a")) closeSearch(); });
  sInput.addEventListener("input", () => renderSearch(sInput.value));
  sInput.addEventListener("keydown", (e) => { if (e.key === "Enter") { const f = $(".search-results a", panel); if (f) f.click(); } });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeSearch(); closeMenu(); $$(".cur-select.is-open").forEach((s) => s._close && s._close()); }
    if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); }
  });

  /* ------------------------------------------------------------------------
     CURRENCY CALCULATOR
     Rates are stored as "units per 1 USD" so any cross rate is rates[to]/rates[from].
     ------------------------------------------------------------------------ */
  const CURRENCIES = [
    // code, name, flag (ISO country), group
    ["NGN", "Nigerian Naira", "ng", "Local"],
    ["USD", "US Dollar", "us", "Major"],
    ["GBP", "British Pound", "gb", "Major"],
    ["EUR", "Euro", "eu", "Major"],
    ["CNY", "Chinese Yuan", "cn", "Major"],
    ["CAD", "Canadian Dollar", "ca", "Major"],
    ["AED", "UAE Dirham", "ae", "Major"],
    ["SAR", "Saudi Riyal", "sa", "Major"],
    ["JPY", "Japanese Yen", "jp", "Major"],
    ["CHF", "Swiss Franc", "ch", "Major"],
    ["AUD", "Australian Dollar", "au", "Major"],
    ["INR", "Indian Rupee", "in", "Major"],
    ["GHS", "Ghanaian Cedi", "gh", "Africa"],
    ["XOF", "West African CFA Franc", "sn", "Africa"],
    ["ZAR", "South African Rand", "za", "Africa"],
    ["KES", "Kenyan Shilling", "ke", "Africa"],
    ["EGP", "Egyptian Pound", "eg", "Africa"],
  ];
  const CUR = Object.fromEntries(CURRENCIES.map(([c, n, f, g]) => [c, { code: c, name: n, flag: f, group: g }]));
  // Offline reference rates (units per USD). Used only when no live source is reachable.
  const FALLBACK = {
    base: "USD", time: "2026-10-01T00:00:00Z", source: "offline reference rates", live: false,
    rates: { USD: 1, NGN: 1465.0, GBP: 0.752, EUR: 0.862, CNY: 7.12, CAD: 1.392, AED: 3.6725, SAR: 3.75, JPY: 151.4, CHF: 0.802, AUD: 1.528, INR: 88.4, GHS: 11.2, XOF: 565.4, ZAR: 17.45, KES: 129.2, EGP: 47.6 },
  };
  const CACHE_KEY = "emfb-rates-v1";
  const CACHE_TTL = 60 * 60 * 1000;

  function flagHTML(code) {
    const c = CUR[code];
    return `<img class="flag" src="https://flagcdn.com/w40/${c.flag}.png" srcset="https://flagcdn.com/w80/${c.flag}.png 2x" alt="" width="24" height="16" onerror="this.outerHTML='<span class=&quot;flag-fallback&quot;>${code}</span>'">`;
  }

  async function fetchJSON(url, ms = 7000) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), ms);
    try { const r = await fetch(url, { signal: ctrl.signal, cache: "no-store" }); if (!r.ok) throw new Error(r.status); return await r.json(); }
    finally { clearTimeout(t); }
  }
  function normaliseRates(rates) {
    const out = {};
    Object.keys(CUR).forEach((c) => { const v = Number(rates[c] ?? rates[c.toLowerCase()]); if (v > 0 && isFinite(v)) out[c] = v; });
    return out.USD && out.NGN ? out : null;
  }
  const SOURCES = [
    async () => { // the bank's own feed, when configured
      if (!C.rateEndpoint) throw new Error("none");
      const j = await fetchJSON(C.rateEndpoint);
      const base = (j.base || "USD").toUpperCase();
      let r = normaliseRates(j.rates || {});
      if (r && base !== "USD") { const k = r.USD; Object.keys(r).forEach((c) => (r[c] = r[c] / k)); }
      return { rates: r, time: j.time || new Date().toISOString(), source: "Eminence MFB rate feed" };
    },
    async () => {
      const j = await fetchJSON("https://open.er-api.com/v6/latest/USD");
      if (j.result !== "success") throw new Error("bad");
      return { rates: normaliseRates(j.rates), time: new Date(j.time_last_update_unix * 1000).toISOString(), source: "ExchangeRate-API (mid-market)" };
    },
    async () => {
      const j = await fetchJSON("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json");
      return { rates: normaliseRates(j.usd || {}), time: new Date(j.date + "T00:00:00Z").toISOString(), source: "fawazahmed0 Currency API (mid-market)" };
    },
  ];
  let ratesPromise = null;
  function getRates() {
    if (ratesPromise) return ratesPromise;
    ratesPromise = (async () => {
      try {
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
        if (cached && Date.now() - cached.fetched < CACHE_TTL && cached.rates?.NGN) return { ...cached, live: true };
      } catch (_) { /* storage unavailable */ }
      for (const src of SOURCES) {
        try {
          const d = await src();
          if (d.rates) {
            const data = { ...d, base: "USD", live: true, fetched: Date.now() };
            try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch (_) {}
            return data;
          }
        } catch (_) { /* try next source */ }
      }
      return FALLBACK;
    })();
    return ratesPromise;
  }

  const fmtNum = (n, code) => {
    const dp = Math.abs(n) >= 1 ? 2 : Math.abs(n) >= 0.01 ? 4 : 6;
    return new Intl.NumberFormat("en-NG", { minimumFractionDigits: code === "JPY" && Math.abs(n) >= 1 ? 0 : Math.min(2, dp), maximumFractionDigits: dp }).format(n);
  };
  const fmtTime = (iso) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos", timeZoneName: "short" }).format(new Date(iso)).replace("GMT+1", "WAT");
  const parseAmount = (s) => {
    const clean = String(s).replace(/[,\s₦$£€]/g, "");
    if (clean === "") return { empty: true };
    if (!/^\d*\.?\d*$/.test(clean) || clean === ".") return { invalid: true };
    const v = parseFloat(clean);
    if (!isFinite(v)) return { invalid: true };
    if (v > 1e12) return { tooBig: true };
    return { value: v };
  };

  let uid = 0;
  function currencySelect(name, initial, onChange) {
    const id = `cur-${++uid}`;
    const wrap = document.createElement("div");
    wrap.className = "cur-select";
    let value = initial;
    let active = -1;
    wrap.innerHTML = `
      <button type="button" class="cur-select__btn" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="${id}-lbl ${id}-btn" id="${id}-btn"></button>
      <div class="cur-select__panel" data-lenis-prevent>
        <input class="cur-select__search" type="text" placeholder="Search currency" aria-label="Search currency" autocomplete="off">
        <ul class="cur-select__list" role="listbox" id="${id}-list" aria-label="${name}" tabindex="-1"></ul>
      </div>`;
    const btn = $(".cur-select__btn", wrap);
    const list = $(".cur-select__list", wrap);
    const search = $(".cur-select__search", wrap);
    function paintBtn() {
      const c = CUR[value];
      btn.innerHTML = `${flagHTML(value)}<span>${c.code} - ${c.name}</span><i data-lucide="chevron-down" class="chev"></i>`;
      icons();
    }
    function paintList(q = "") {
      q = q.trim().toLowerCase();
      let last = "";
      const items = CURRENCIES.filter(([c, n]) => !q || c.toLowerCase().includes(q) || n.toLowerCase().includes(q));
      list.innerHTML = items.map(([c, n, , g]) => {
        const head = !q && g !== last ? `<li class="cur-select__group" role="presentation">${(last = g) === "Local" ? "Local currency" : g === "Major" ? "Major currencies" : "African currencies"}</li>` : "";
        return `${head}<li role="option" data-code="${c}" id="${id}-${c}" aria-selected="${c === value}">${flagHTML(c)}<span>${c} - ${n}</span></li>`;
      }).join("") || `<li class="cur-select__group">No matching currency</li>`;
      active = -1;
    }
    const options = () => $$('[role="option"]', list);
    function setActive(i) {
      const o = options(); if (!o.length) return;
      active = (i + o.length) % o.length;
      o.forEach((el, k) => el.classList.toggle("is-active", k === active));
      o[active].scrollIntoView({ block: "nearest" });
      list.setAttribute("aria-activedescendant", o[active].id);
    }
    function open() {
      $$(".cur-select.is-open").forEach((s) => s !== wrap && s._close());
      wrap.classList.add("is-open"); btn.setAttribute("aria-expanded", "true");
      search.value = ""; paintList();
      const sel = options().findIndex((o) => o.dataset.code === value);
      setActive(sel < 0 ? 0 : sel);
      setTimeout(() => search.focus(), 10);
    }
    function close(focus) { wrap.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); if (focus) btn.focus(); }
    function choose(code) { if (!CUR[code]) return; value = code; paintBtn(); close(true); onChange(code); }
    wrap._close = close;
    btn.addEventListener("click", () => (wrap.classList.contains("is-open") ? close() : open()));
    btn.addEventListener("keydown", (e) => { if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); open(); } });
    search.addEventListener("input", () => { paintList(search.value); setActive(0); });
    search.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
      else if (e.key === "Enter") { e.preventDefault(); const o = options()[active]; if (o) choose(o.dataset.code); }
      else if (e.key === "Escape") { e.stopPropagation(); close(true); }
      else if (e.key === "Tab") close();
    });
    list.addEventListener("click", (e) => { const o = e.target.closest('[role="option"]'); if (o) choose(o.dataset.code); });
    document.addEventListener("click", (e) => { if (!wrap.contains(e.target)) close(); });
    paintBtn();
    return { el: wrap, get: () => value, set: (v) => { value = v; paintBtn(); }, labelId: `${id}-lbl` };
  }

  function buildCalculator(host) {
    const variant = host.dataset.variant || "compact";
    let from = host.dataset.from || "USD";
    let to = host.dataset.to || "NGN";
    const title = host.dataset.title || "Currency Calculator";
    const headTag = host.dataset.headTag || "h2";
    const n = ++uid;
    host.classList.add("calc");
    if (variant === "wide") host.classList.add("calc--wide");
    if (host.dataset.flat !== undefined) host.classList.add("calc--flat");
    host.innerHTML = `
      <div class="calc__head"><span class="ic-circle" aria-hidden="true"><i data-lucide="arrow-left-right"></i></span>
        <div><${headTag}>${title}</${headTag}><p>Get exchange-rate information for supported currencies and estimate the value of a conversion.</p></div></div>
      <form class="calc__form" novalidate>
        <div class="calc__grid">
          <div class="c-from"><span class="lbl" data-lbl="from">From</span><div data-slot="from"></div></div>
          <div class="calc__row">
            <div><label class="sr-only" for="calc-amt-${n}">Amount</label>
              <input type="text" inputmode="decimal" id="calc-amt-${n}" value="${host.dataset.amount || "1"}" aria-describedby="calc-err-${n}" autocomplete="off"></div>
            <button type="button" class="calc__swap" aria-label="Swap currencies" title="Swap currencies"><i data-lucide="arrow-left-right"></i></button>
            <div><label class="sr-only" for="calc-out-${n}">Converted amount</label>
              <input type="text" id="calc-out-${n}" readonly tabindex="-1" placeholder="Converted"></div>
          </div>
          <div class="c-to"><span class="lbl" data-lbl="to">To</span><div data-slot="to"></div></div>
        </div>
        <div class="calc__error" id="calc-err-${n}" role="alert"></div>
        <div class="calc__result" aria-live="polite" title="Converted amount">—</div>
        <div class="calc__rate">Loading exchange rates…</div>
        <p class="calc__meta"></p>
        <button type="submit" class="btn btn--navy btn--block">Convert Currency</button>
        ${variant === "wide" ? `<div class="calc__popular" aria-label="Popular conversions"><button type="button" data-pair="USD-NGN">USD → NGN</button><button type="button" data-pair="GBP-NGN">GBP → NGN</button><button type="button" data-pair="EUR-NGN">EUR → NGN</button><button type="button" data-pair="CNY-NGN">CNY → NGN</button><button type="button" data-pair="SAR-NGN">SAR → NGN</button><button type="button" data-pair="NGN-USD">NGN → USD</button></div>` : ""}
      </form>`;
    const amt = $(`#calc-amt-${n}`, host);
    const out = $(`#calc-out-${n}`, host);
    const err = $(".calc__error", host);
    const result = $(".calc__result", host);
    const rateEl = $(".calc__rate", host);
    const meta = $(".calc__meta", host);
    const selFrom = currencySelect("From currency", from, (v) => { from = v; update(); });
    const selTo = currencySelect("To currency", to, (v) => { to = v; update(); });
    $('[data-slot="from"]', host).appendChild(selFrom.el);
    $('[data-slot="to"]', host).appendChild(selTo.el);
    $('[data-lbl="from"]', host).id = selFrom.labelId;
    $('[data-lbl="to"]', host).id = selTo.labelId;
    let data = null;

    function update(flash) {
      if (!data) return;
      const p = parseAmount(amt.value);
      const rFrom = data.rates[from], rTo = data.rates[to];
      amt.setAttribute("aria-invalid", p.invalid || p.tooBig ? "true" : "false");
      if (!rFrom || !rTo) {
        err.textContent = `The ${!rFrom ? from : to} rate is currently unavailable. Please choose another currency or try again later.`;
        out.value = ""; result.textContent = "Rate unavailable"; rateEl.textContent = ""; return;
      }
      const rate = rTo / rFrom;
      rateEl.textContent = `1 ${from} = ${fmtNum(rate, to)} ${to}`;
      if (p.invalid) { err.textContent = "Please enter a valid amount using numbers only (e.g. 1,000 or 250.50)."; out.value = ""; result.textContent = "—"; return; }
      if (p.tooBig) { err.textContent = "That amount is too large to estimate. Please enter a smaller amount."; out.value = ""; result.textContent = "—"; return; }
      err.textContent = "";
      if (p.empty) { out.value = ""; result.textContent = "—"; return; }
      const v = p.value * rate;
      out.value = fmtNum(v, to);
      result.textContent = `${fmtNum(p.value, from)} ${from} = ${fmtNum(v, to)} ${to}`;
      if (flash && !reduceMotion) result.animate([{ background: "#d9f1f7" }, { background: "#f3f7fb" }], { duration: 700 });
    }
    amt.addEventListener("input", () => update());
    amt.addEventListener("blur", () => { const p = parseAmount(amt.value); if (p.value != null) amt.value = fmtNum(p.value, from); });
    amt.addEventListener("focus", () => { amt.value = amt.value.replace(/,/g, ""); });
    $(".calc__swap", host).addEventListener("click", () => {
      [from, to] = [to, from]; selFrom.set(from); selTo.set(to);
      const p = parseAmount(amt.value); if (p.value != null && document.activeElement !== amt) amt.value = fmtNum(p.value, from);
      update(true);
    });
    $$("[data-pair]", host).forEach((b) => b.addEventListener("click", () => {
      [from, to] = b.dataset.pair.split("-"); selFrom.set(from); selTo.set(to); update(true);
    }));
    $("form", host).addEventListener("submit", (e) => { e.preventDefault(); update(true); });

    getRates().then((d) => {
      data = d;
      const when = fmtTime(d.time);
      meta.innerHTML = d.live
        ? `<span class="dot is-live" aria-hidden="true"></span>Live indicative rate · Updated ${when} · Source: ${d.source}. Rates are indicative, exclude fees and may differ from the rate applied to an actual bank transaction.`
        : `<span class="dot is-fallback" aria-hidden="true"></span>Live rates are temporarily unavailable — showing offline reference rates (as of ${when}). For estimation only; not a bank transaction rate and excludes fees.`;
      update();
    });
    icons();
  }
  $$("[data-currency-calculator]").forEach(buildCalculator);

  // Rates table (Naira value of 1 unit of each major currency)
  $$("[data-rates-table]").forEach((tbl) => {
    getRates().then((d) => {
      const rows = CURRENCIES.filter(([c]) => c !== "NGN").map(([c, name]) => {
        const v = d.rates[c] ? d.rates.NGN / d.rates[c] : null;
        return `<tr><td><span class="cur">${flagHTML(c)}${c} <small>${name}</small></span></td><td>${v ? "₦" + fmtNum(v, "NGN") : "Unavailable"}</td></tr>`;
      }).join("");
      tbl.innerHTML = `<thead><tr><th scope="col">Currency</th><th scope="col">1 unit in Naira (NGN)</th></tr></thead><tbody>${rows}</tbody>`;
      const cap = tbl.parentElement.parentElement.querySelector("[data-rates-meta]");
      if (cap) cap.textContent = d.live
        ? `Indicative mid-market rates · Updated ${fmtTime(d.time)} · Source: ${d.source}. Not a quote; excludes fees and bank margins.`
        : `Offline reference rates (as of ${fmtTime(d.time)}) — live rates are temporarily unavailable. For estimation only.`;
    });
  });

  /* ------------------------------------------------------------------------
     CONTACT FORM
     ------------------------------------------------------------------------ */
  const form = $("#contact-form");
  if (form) {
    const subj = new URLSearchParams(location.search).get("subject");
    if (subj) { const s = form.elements.subject; if (![...s.options].some((o) => o.value === subj)) s.add(new Option(subj, subj)); s.value = subj; }
    const rules = {
      name: (v) => v.trim().length >= 2 || "Please enter your full name.",
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Please enter a valid email address.",
      phone: (v) => !v.trim() || /^\+?[\d\s()-]{7,20}$/.test(v.trim()) || "Please enter a valid phone number.",
      subject: (v) => !!v || "Please choose a subject.",
      message: (v) => v.trim().length >= 10 || "Please enter a message of at least 10 characters.",
      consent: (v, el) => el.checked || "Please confirm you have read the privacy notice.",
    };
    const check = (el) => {
      const rule = rules[el.name]; if (!rule) return true;
      const res = rule(el.value, el);
      const field = el.closest(".field");
      field.classList.toggle("has-error", res !== true);
      el.setAttribute("aria-invalid", res !== true ? "true" : "false");
      const e = field.querySelector(".err"); if (e) e.textContent = res === true ? "" : res;
      return res === true;
    };
    Object.keys(rules).forEach((k) => { const el = form.elements[k]; el.addEventListener("blur", () => check(el)); el.addEventListener("input", () => el.getAttribute("aria-invalid") === "true" && check(el)); });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = $(".form-status", form);
      const fields = Object.keys(rules).map((k) => form.elements[k]);
      const bad = fields.filter((el) => !check(el));
      if (bad.length) { bad[0].focus(); status.innerHTML = ""; return; }
      if (form.elements.website.value) return; // honeypot
      const btn = form.querySelector('button[type="submit"]');
      const payload = Object.fromEntries(new FormData(form)); delete payload.website;
      if (!C.formEndpoint) {
        status.innerHTML = `<div class="notice notice--info"><i data-lucide="info"></i><span>Our secure online form is being connected. In the meantime, please email us at <a href="mailto:${C.email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(payload.message)}">${C.email}</a>. Please do not include your PIN, password or full card details in any message.</span></div>`;
        icons(); return;
      }
      btn.disabled = true; btn.textContent = "Sending…";
      try {
        const r = await fetch(C.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        if (!r.ok) throw new Error(r.status);
        form.reset();
        status.innerHTML = `<div class="notice notice--info"><i data-lucide="circle-check"></i><span>Thank you — your message has been sent. Our team will get back to you through your preferred contact details.</span></div>`;
      } catch (_) {
        status.innerHTML = `<div class="notice"><i data-lucide="triangle-alert"></i><span>We couldn't send your message right now. Please try again or email <a href="mailto:${C.email}">${C.email}</a>.</span></div>`;
      } finally { btn.disabled = false; btn.innerHTML = 'Send Message <i data-lucide="send"></i>'; icons(); }
    });
  }

  /* ------------------------------------------------------------------------
     LEGAL TOC scroll-spy
     ------------------------------------------------------------------------ */
  const tocLinks = $$(".toc a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    const map = new Map(tocLinks.map((a) => [a.getAttribute("href").slice(1), a]));
    const spy = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { tocLinks.forEach((a) => a.classList.remove("is-active")); map.get(en.target.id)?.classList.add("is-active"); }
    }), { rootMargin: "-20% 0px -70% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  // Unverified statistics
  $$("[data-unverified-stats]").forEach((el) => { if (!C.showUnverifiedStats) el.remove(); });

  // FAQ: only one open per group
  $$(".faq[data-single]").forEach((g) => $$("details", g).forEach((d) => d.addEventListener("toggle", () => {
    if (d.open) $$("details", g).forEach((o) => o !== d && (o.open = false));
  })));
})();
