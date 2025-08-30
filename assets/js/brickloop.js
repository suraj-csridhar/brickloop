// Mobile nav toggle
(function () {
  const btn = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('show');
    btn.setAttribute('aria-expanded', String(isOpen));
  });
})();

// Close mobile menu when a link is clicked
(function () {
  const menu = document.getElementById('nav-menu');
  const btn  = document.querySelector('.nav-toggle');
  if (!menu) return;

  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    // collapse only if we're on mobile layout
    if (menu.classList.contains('show')) {
      menu.classList.remove('show');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Scroll spy: highlight current section in nav
(function () {
  const map = new Map([
    ['home',     document.querySelector('[data-spy="home"]')],
    ['buy',      document.querySelector('[data-spy="buy"]')],
    ['invest',   document.querySelector('[data-spy="invest"]')],
    ['why',      document.querySelector('[data-spy="why"]')],
    ['services', document.querySelector('[data-spy="services"]')],
    ['contact',  document.querySelector('[data-spy="contact"]')],
  ]);

  // If you didn’t add data-spy on some links, that’s fine—this will just skip them.
  const sections = ['home','buy','invest','why','services','contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    for (const [,link] of map) link && link.classList.remove('active');
    const link = map.get(id);
    link && link.classList.add('active');
  };

  const io = new IntersectionObserver((entries) => {
    // find the section most in view
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActive(visible.target.id);
  }, {
    rootMargin: '-45% 0px -45% 0px', // middle of the viewport
    threshold: [0.0, 0.25, 0.5, 0.75, 1.0],
  });

  sections.forEach(s => io.observe(s));
})();

// Quick Enquiry: WhatsApp-first, email fallback
(function () {
  const form = document.getElementById('enquiryForm');
  const emailBtn = document.getElementById('emailFallback');
  if (!form || !emailBtn) return;

  const toPhone = '916362880197'; // WhatsApp target (country code + number)
  const toEmail = 'hoysalasbengaluru@gmail.com';

  const getData = () => {
    const fd = new FormData(form);
    const name   = (fd.get('name')  || '').trim();
    const phone  = (fd.get('phone') || '').trim();
    const area   = (fd.get('area')  || '').trim();
    const budget = (fd.get('budget')|| '').trim();
    const need   = (fd.get('need')  || '').trim();
    return { name, phone, area, budget, need };
  };

  // WhatsApp submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { name, phone, area, budget, need } = getData();

    // basic validity using HTML5 API + pattern
    if (!form.reportValidity()) return;

    const text =
      `Hi Brickloop Advisors,%0A%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Phone: ${encodeURIComponent(phone)}%0A` +
      (area   ? `Area: ${encodeURIComponent(area)}%0A` : '') +
      (budget ? `Budget: ${encodeURIComponent(budget)}%0A` : '') +
      (need   ? `Need: ${encodeURIComponent(need)}%0A` : '') +
      `%0APlease share curated options.`;

    const wa = `https://wa.me/${toPhone}?text=${text}`;
    window.open(wa, '_blank', 'noopener');
  });

  // Email fallback
  emailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const { name, phone, area, budget, need } = getData();

    const subject = `Enquiry - Brickloop Advisors`;
    const body =
`Hi Team,

Name: ${name}
Phone: ${phone}
Area: ${area}
Budget: ${budget}
Need: ${need}

Please share curated options.`;

    const mailto = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
})();

// ===== Send enquiry to Google Sheets (Apps Script) =====
(function () {
  const form = document.getElementById('enquiryForm');
  const status = document.getElementById('enquiryStatus');
  if (!form || !status) return;

  // Your Web App URL (must end with /exec)
  const ENDPOINT_URL = 'https://script.google.com/macros/s/XXXXXXXXXXXX/exec';
  // Must match SECRET_KEY in your Apps Script
  const SECRET_KEY = 'brickloop-lite';

  let busy = false;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (busy) return;

    // HTML5 validation first
    if (!form.reportValidity()) return;

    // Honeypot: if bots fill this hidden field, ignore
    if (form.company && form.company.value.trim()) {
      status.textContent = 'Thanks!';
      return;
    }

    busy = true;
    const btn = form.querySelector('button[type="submit"]');
    const oldBtnText = btn ? btn.textContent : '';
    if (btn) btn.textContent = 'Sending…';
    status.textContent = 'Sending…';

    // Build URL-encoded body (avoids CORS preflight)
    const fd = new FormData(form);
    fd.append('key', SECRET_KEY);

    try {
      const res = await fetch(ENDPOINT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: new URLSearchParams(fd).toString()
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        status.textContent = 'Sent! We’ll get back shortly.';
        form.reset();
      } else {
        status.textContent = 'Could not send. Please try again.';
      }
    } catch {
      status.textContent = 'Network error. Please try again.';
    } finally {
      if (btn) btn.textContent = oldBtnText || 'Submit';
      busy = false;
    }
  });
})();

// FAQ accordion: keep only one open
(function () {
  const root = document.querySelector('#faq .faq-list');
  if (!root) return;
  root.addEventListener('toggle', (e) => {
    const opened = e.target;
    if (!(opened instanceof HTMLDetailsElement) || !opened.open) return;
    root.querySelectorAll('details[open]').forEach(d => {
      if (d !== opened) d.open = false;
    });
  }, true);
})();

// Smooth scroll for in-page anchors and ensure no preventDefault gets in the way
(function(){
  var headerH = parseInt(getComputedStyle(document.documentElement)
                    .getPropertyValue('--nav-h')) || 56;
  function smoothTo(id){
    var el = document.querySelector(id);
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.pageYOffset - (headerH + 12);
    window.scrollTo({ top, behavior: 'smooth' });
  }

  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (href.length === 1) return; // href="#"
    if (document.querySelector(href)) {
      e.preventDefault();
      smoothTo(href);
    }
  }, { passive: false });
})();

