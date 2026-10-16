/* AMG Advisory: shared site behaviour (mobile menu, language preference, header state). */
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Each page opens at the top. Some hosts (including embedded previews) carry the
  // previous page's scroll position across navigations; back/forward keeps the browser's own behaviour.
  function isBackForward() {
    try {
      var nav = performance.getEntriesByType('navigation')[0];
      return nav ? nav.type === 'back_forward' : (performance.navigation && performance.navigation.type === 2);
    } catch (e) { return false; }
  }
  function toTop() {
    if (location.hash || isBackForward()) return;
    window.scrollTo(0, 0);
    try { document.documentElement.scrollIntoView({ block: 'start' }); } catch (e) {}
  }
  window.addEventListener('pageshow', function (e) { if (!e.persisted) toTop(); });
  document.addEventListener('DOMContentLoaded', toTop);

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.menu-btn');
    var nav = document.getElementById('site-nav');
    var header = document.querySelector('.site-header');

    function setMenu(open, focusBtn) {
      if (!btn || !nav) return;
      btn.setAttribute('aria-expanded', String(open));
      btn.querySelector('.menu-label').textContent = open ? btn.getAttribute('data-close') : btn.getAttribute('data-open');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      if (open) {
        var first = nav.querySelector('a');
        if (first) first.focus();
      } else if (focusBtn) {
        btn.focus();
      }
    }

    if (btn && nav) {
      btn.addEventListener('click', function () {
        setMenu(btn.getAttribute('aria-expanded') !== 'true', false);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') setMenu(false, true);
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth > 960 && btn.getAttribute('aria-expanded') === 'true') setMenu(false, false);
      });
    }

    document.querySelectorAll('[data-set-lang]').forEach(function (a) {
      a.addEventListener('click', function () {
        try { localStorage.setItem('amg-lang', a.getAttribute('data-set-lang')); } catch (err) {}
      });
    });

    if (header) {
      var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  });
})();
