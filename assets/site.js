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

  // Work carousel: controls show only when there's more than one slide
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var track = carousel.querySelector('[data-carousel-track]');
    var slides = track.children;
    var controls = carousel.querySelector('[data-carousel-controls]');
    var prev = carousel.querySelector('[data-carousel-prev]');
    var next = carousel.querySelector('[data-carousel-next]');
    var count = carousel.querySelector('[data-carousel-count]');

    if (slides.length < 2) {
      controls.hidden = true;
      return;
    }
    carousel.classList.add('is-multi');

    var step = function () {
      return slides[0].offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0);
    };
    var current = function () {
      // At the far end the last slide can't scroll fully to the start, so treat "scrolled to the end" as last
      if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 2) return slides.length - 1;
      return Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / step())));
    };
    var update = function () {
      var i = current();
      count.textContent = (i + 1) + ' / ' + slides.length;
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
    };
    var go = function (dir) {
      var i = Math.max(0, Math.min(slides.length - 1, current() + dir));
      track.scrollTo({ left: i * step(), behavior: 'smooth' });
      window.setTimeout(update, 500); // fallback in case no scroll event arrives
    };

    prev.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });
    track.addEventListener('scroll', update, { passive: true });
    update();
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
