/* ------------------------------------------------------------------
   BRAND — change the customer-facing name and tagline here, once.
   Every element marked data-brand-name / data-brand-tagline, plus the
   page <title>, picks these up. (Also update the matching default text
   in the HTML so the name is right before JS runs and for search engines.)
   ------------------------------------------------------------------ */
var BRAND = {
  name: 'Milon Studios',
  tagline: 'Tech Partners for Local Business'
};

(function () {
  var DEFAULT_NAME = 'Milon Studios';

  document.querySelectorAll('[data-brand-name]').forEach(function (el) {
    el.textContent = BRAND.name;
  });
  document.querySelectorAll('[data-brand-tagline]').forEach(function (el) {
    el.textContent = BRAND.tagline;
  });
  if (BRAND.name !== DEFAULT_NAME) {
    document.title = document.title.split(DEFAULT_NAME).join(BRAND.name);
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Mobile sidebar
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (header && toggle && nav) {
    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    header.appendChild(overlay);

    var setOpen = function (open) {
      header.classList.toggle('nav-open', open);
      document.documentElement.classList.toggle('nav-locked', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
      if (open) {
        var first = nav.querySelector('a');
        if (first) first.focus({ preventScroll: true });
      }
    };

    toggle.addEventListener('click', function () {
      setOpen(!header.classList.contains('nav-open'));
    });
    overlay.addEventListener('click', function () { setOpen(false); });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 768px)').addEventListener('change', function (mq) {
      if (mq.matches) setOpen(false);
    });
  }
})();
