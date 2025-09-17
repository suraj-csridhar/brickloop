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
    ['value',    document.querySelector('[data-spy="value"]')],
    ['builders', document.querySelector('[data-spy="builders"]')],
    ['services', document.querySelector('[data-spy="services"]')],
    ['contact',  document.querySelector('[data-spy="contact"]')],
  ]);

  // If you didn’t add data-spy on some links, that’s fine—this will just skip them.
  const sections = ['home','value','builders','services','contact']
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

// ===== Lead Form Submit (Apps Script Web App) =====
document.addEventListener('DOMContentLoaded', () => {
  // Your Web App URL (must end with /exec)
  const ENDPOINT_URL = 'https://script.google.com/macros/s/AKfycbx0jY-Fp0zIOwZUT-2Ks9t2GU1vPYQ5sXO7rokJHamCTKM6EO7CGLqcDmZxsEbXasQn/exec';
  // Must match SECRET_KEY in your Apps Script
  const SECRET_KEY = 'brickloop-lite';

  // Bind explicitly to the enquiry form used on this page
  const form = document.querySelector('#enquiryForm');
  // Prefer a dedicated status node if present
  const statusEl = document.querySelector('#enquiryStatus') || document.querySelector('#status');

  // Guard: if no form found, stop early
  if (!form) return console.warn('Enquiry form not found on the page.');

  let busy = false;

  const isEndpointConfigured = () =>
    Boolean(
      ENDPOINT_URL &&
      /https:\/\/script\.google\.com\/macros\/s\//.test(ENDPOINT_URL) &&
      /\/exec$/.test(ENDPOINT_URL)
    );

  // Status helper (renders message or falls back to a lightweight toast)
  function setStatus(msg, type = 'info') {
    if (statusEl) {
      statusEl.textContent = msg || '';
      statusEl.className = `form-status ${type}`;
    } else if (msg) {
      const t = document.createElement('div');
      t.textContent = msg;
      t.className = `toast ${type}`;
      Object.assign(t.style, {
        position: 'fixed',
        right: '16px',
        bottom: '16px',
        padding: '10px 12px',
        borderRadius: '8px',
        background: type === 'ok' ? '#E6F4EA' : type === 'err' ? '#FDECEA' : '#EEF3FF',
        border: `1px solid ${
          type === 'ok' ? '#7BC37B' : type === 'err' ? '#F5C2C7' : '#A7BAF5'
        }`,
        zIndex: 9999,
        fontSize: '14px'
      });
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 4000);
    }
  }

  // Abortable fetch with timeout
  async function withTimeout(fetcher, ms = 12000) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), ms);
    try {
      return await fetcher(ctrl.signal);
    } finally {
      clearTimeout(timer);
    }
  }

  // Convert FormData -> URLSearchParams (lets browser set proper Content-Type)
  function toURLSearchParams(fd) {
    const usp = new URLSearchParams();
    for (const [k, v] of fd.entries()) {
      usp.append(k, (v == null ? '' : String(v)));
    }
    return usp;
  }

  async function sendPost(paramsUSP) {
    // Use no-cors to avoid CORS-induced failures that still record on the server.
    // We treat a resolved fetch as success; only network/timeout errors show as failure.
    return withTimeout((signal) =>
      fetch(ENDPOINT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: paramsUSP,
        signal
      })
    );
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (busy) return;

    // Native HTML5 validation
    if (!form.reportValidity()) return;

    if (!isEndpointConfigured()) {
      setStatus('Submission not configured. Check the Apps Script /exec URL.', 'err');
      return;
    }

    // Honeypot: if bots fill this hidden field, pretend success
    const hp = form.querySelector('[name="company"]');
    if (hp && hp.value.trim()) {
      setStatus('Thanks!', 'ok');
      form.reset();
      return;
    }

    busy = true;
    const submitBtn = form.querySelector('button[type="submit"], [type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;
    }
    setStatus('Sending…');

    try {
      // Build payload
      const fd = new FormData(form);
      // Trim common fields
      fd.set('name', (fd.get('name') || '').toString().trim());
      fd.set('phone', (fd.get('phone') || '').toString().trim());
      if (fd.has('area')) fd.set('area', (fd.get('area') || '').toString().trim());
      if (fd.has('budget')) fd.set('budget', (fd.get('budget') || '').toString().trim());
      if (fd.has('need')) fd.set('need', (fd.get('need') || '').toString().trim());
      // Required secret
      fd.append('key', SECRET_KEY);

      const paramsUSP = toURLSearchParams(fd);

      // Send once via POST (no-cors). If the fetch resolves, consider it sent.
      await sendPost(paramsUSP);

      setStatus('Sent! We’ll get back shortly.', 'ok');
      form.reset();
      // Optional: auto-clear the success message
      setTimeout(() => setStatus('', 'ok'), 3500);
    } catch (err) {
      // Only show as error if the request could not be initiated or timed out
      const msg = String(err?.name || '').includes('Abort')
        ? 'Request timed out. Please try again.'
        : 'Network error. Please check your connection.';
      setStatus(msg, 'err');
    } finally {
      if (submitBtn) {
        submitBtn.textContent = originalBtnText || 'Submit';
        submitBtn.disabled = false;
      }
      busy = false;
    }
  });
});


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

// Featured slider controls (scroll-snap based)
(function(){
  const slider = document.querySelector('[data-slider="featured"]');
  if (!slider) return;
  const scroller = slider.querySelector('.slides');
  const prev = slider.querySelector('.slider-prev');
  const next = slider.querySelector('.slider-next');
  if (!scroller || !prev || !next) return;

  function slideBy(dir){
    const card = scroller.querySelector('.slide');
    if (!card) return;
    const gap = parseInt(getComputedStyle(scroller).columnGap || getComputedStyle(scroller).gap || '32', 10) || 32;
    const amount = card.getBoundingClientRect().width + gap;
    scroller.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }

  prev.addEventListener('click', () => slideBy(-1));
  next.addEventListener('click', () => slideBy(1));

  // Keyboard arrow support when slider is focused
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); slideBy(1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); slideBy(-1); }
  });
})();
