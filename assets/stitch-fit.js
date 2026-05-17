(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Splash screen ----
  const splash = document.querySelector('.sf-splash');
  if (splash) {
    const KEY = 'sf-splash-shown';
    let alreadyShown = false;
    try { alreadyShown = sessionStorage.getItem(KEY); } catch (e) { /* private mode */ }

    if (alreadyShown || reduce) {
      splash.remove();
      document.documentElement.classList.remove('sf-splash-active');
    } else {
      document.documentElement.classList.add('sf-splash-active');
      setTimeout(() => splash.classList.add('is-visible'), 80);
      setTimeout(() => splash.classList.add('is-leaving'), 2400);
      setTimeout(() => {
        splash.remove();
        document.documentElement.classList.remove('sf-splash-active');
        try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* private mode */ }
      }, 3200);
    }
  }

  // ---- Scroll reveal ----
  const revealTargets = document.querySelectorAll('[data-sf-reveal]');
  if (revealTargets.length) {
    if (!reduce && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
      );
      revealTargets.forEach((el) => io.observe(el));
    } else {
      revealTargets.forEach((el) => el.classList.add('is-revealed'));
    }
  }

  // ---- Header solid-on-scroll ----
  const onScroll = () => {
    if (window.scrollY > 40) {
      document.documentElement.classList.add('sf-scrolled');
    } else {
      document.documentElement.classList.remove('sf-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
