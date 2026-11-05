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
  hours: "Mon – Fri: 9:00 AM – 5:00 PM",
  internetBankingUrl: "",            // verified secure Internet Banking platform
  accountOpeningUrl: "",             // official onboarding flow
  formEndpoint: "",                  // approved secure endpoint for the contact form (POST, JSON)
  mapQuery: "Kubwa Extension District, Kubwa, FCT Abuja, Nigeria", // used for the map and "Get Directions"
  appStoreUrl: "https://apps.apple.com/app/eminence-mobile-banking/id6767839310",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.eminence_mobile",
  bizAppStoreUrl: "https://apps.apple.com/app/eminence-business/id6777817889",
  bizPlayStoreUrl: "https://play.google.com/store/apps/details?id=com.eminence.biz",
  socials: { facebook: "", linkedin: "", x: "", instagram: "", youtube: "" },
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

  /* ------------------------------------------------------------------------
     PRELOADER: show at least one full logo build (~1.5s), at most 5s
     ------------------------------------------------------------------------ */
  (function preloader() {
    const el = document.getElementById("preloader");
    if (!el) return;
    const root = document.documentElement;
    const started = (window.performance && performance.now()) || 0;
    const minShow = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 300 : 1500;
    let done = false;
    root.classList.add("is-loading");
    const finish = () => {
      if (done) return;
      done = true;
      el.classList.add("is-done");
      root.classList.remove("is-loading");
      setTimeout(() => el.remove(), 700);
    };
    const onLoad = () => setTimeout(finish, Math.max(0, minShow - (performance.now() - started)));
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    setTimeout(finish, 5000);
    // Returning with the browser back button should never show the loader again
    window.addEventListener("pageshow", (e) => { if (e.persisted) finish(); });
  })();

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
      ["list-checks", "How to Open an Account", "personal.html#how-to-open"],
    ]},
    { id: "business", label: "Business", href: "business.html", children: [
      ["briefcase-business", "Business Current Account", "business.html#solutions"],
      ["database", "Business Savings Account", "business.html#solutions"],
      ["chart-column-increasing", "Business Financing", "business.html#solutions"],
      ["calculator", "Merchant & POS Services", "business.html#solutions"],
      ["monitor-smartphone", "Digital Tools for Business", "business.html#digital"],
      ["list-checks", "How to Open a Business Account", "business.html#how-to-open"],
    ]},
    { id: "about", label: "About Us", href: "about.html", children: [
      ["target", "Purpose, Vision & Mission", "about.html#pvm-title"],
      ["handshake", "Our Values", "about.html#values-title"],
      ["moon-star", "Sharia-Compliant Banking", "about.html#sharia"],
      ["package", "Islamic Finance Products", "about.html#sharia-products"],
    ]},
    { id: "services", label: "Our Services", href: "services.html" },
    { id: "contact", label: "Contact Us", href: "contact.html" },
  ];

  const page = document.body.dataset.page || "";

  function headerHTML() {
    const items = NAV.map((n) => {
      const active = n.id === page ? " is-active" : "";
      const current = n.id === page ? ' aria-current="page"' : "";
      if (!n.children) return `<li><a class="nav-link${active}" href="${n.href}"${current}>${n.label}</a></li>`;
      const sub = [[`arrow-right`, n.id === "about" ? "About Eminence" : `${n.label} Banking overview`, n.href]].concat(n.children)
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
        <li><a href="services.html">Our Services</a></li><li><a href="about.html#sharia">Sharia-Compliant Banking</a></li>
        <li><a href="contact.html">Contact Us</a></li></ul></div>
      <div class="footer-col"><h3>Our Services</h3><ul>
        <li><a href="services.html#digital">Digital Banking</a></li>
        <li><a href="services.html#bnpl">Buy Now, Pay Later <small>(if approved)</small></a></li>
        <li><a href="services.html#ethical">Ethical Banking</a></li>
        <li><a href="services.html#business">Business Banking</a></li><li><a href="services.html#cards">Debit &amp; Virtual Card Services</a></li></ul></div>
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
    ["How to Open a Personal Account", "5 steps and the documents you need", "personal.html#how-to-open"],
    ["How to Open a Business Account", "CAC documents, TIN, BVN and the 5 steps", "business.html#how-to-open"],
    ["Business Banking", "Partners in your business growth", "business.html"],
    ["Business Current Account", "Everyday business transactions", "business.html#solutions"],
    ["Business Savings Account", "Organise funds and plan ahead", "business.html#solutions"],
    ["Business Financing", "Working capital, assets and expansion", "business.html#solutions"],
    ["Merchant & POS Services", "Accept customer payments", "business.html#solutions"],
    ["Bulk Payments & Payroll", "Digital tools for a smarter business", "business.html#digital"],
    ["Ethical Banking", "Responsible finance, clearer choices", "services.html#ethical"],
    ["Debit & Virtual Cards", "Convenient payments, greater flexibility", "services.html#cards"],
    ["Buy Now, Pay Later", "Proposed service — subject to approval", "services.html#bnpl"],
    ["Sharia-Compliant Banking", "Faith-aligned banking for a better tomorrow", "about.html#sharia"],
    ["Islamic Savings & Current Accounts", "Sharia-compliant account options", "about.html#sharia-products"],
    ["Murabaha Asset Financing", "Islamic asset financing", "about.html#sharia-products"],
    ["Islamic Business Financing", "For eligible entrepreneurs and businesses", "about.html#sharia-products"],
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
    if (e.key === "Escape") { closeSearch(); closeMenu(); }
    if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); }
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
