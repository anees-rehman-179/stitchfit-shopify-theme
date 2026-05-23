(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- SPLASH ----
  (function initSplash() {
    const splash = document.querySelector('.sf-splash');
    if (!splash) return;

    const KEY    = 'sf-splash-v1';
    let seen     = false;
    try { seen = !!sessionStorage.getItem(KEY); } catch (e) { /* private mode */ }

    // Already seen this session — remove immediately, let IntersectionObserver handle reveals
    if (seen) {
      splash.remove();
      document.documentElement.classList.remove('sf-splash-active');
      return;
    }

    // Lock scroll
    document.documentElement.classList.add('sf-splash-active');

    if (reduce) {
      // Reduced motion: show briefly, fade, remove
      splash.classList.add('is-animating');
      setTimeout(() => {
        splash.classList.add('is-leaving');
        setTimeout(() => {
          splash.remove();
          document.documentElement.classList.remove('sf-splash-active');
          try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* ignore */ }
        }, 400);
      }, 600);
      return;
    }

    // ---- Full cinematic sequence ----
    // Step 1: kick off animation chain (80ms allows first paint to settle)
    setTimeout(() => splash.classList.add('is-animating'), 80);

    // Step 2: curtain swipes up at 3800ms
    setTimeout(() => splash.classList.add('is-leaving'), 3800);

    // Step 3: remove after curtain exit completes (3800 + 900ms transition)
    setTimeout(() => {
      splash.remove();
      document.documentElement.classList.remove('sf-splash-active');
      try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* ignore */ }

      // Show footer tagline immediately when splash exits
      const footerTagline = document.querySelector('.sf-footer__tagline');
      if (footerTagline) {
        footerTagline.classList.add('is-visible');
      }

      // Trigger first wave of page reveal animations as curtain exits
      // On return visits these fire via IntersectionObserver instead
      document.querySelectorAll('[data-sf-reveal], [data-sf-reveal-left], [data-sf-reveal-right]')
        .forEach(function (el, i) {
          setTimeout(function () { el.classList.add('is-revealed'); }, i * 60);
        });
    }, 4700);
  })();

  // ---- SCROLL REVEAL ----
  (function initReveal() {
    const selector = '[data-sf-reveal], [data-sf-reveal-left], [data-sf-reveal-right]';
    const targets = document.querySelectorAll(selector);
    if (!targets.length) return;

    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = Number(el.dataset.sfDelay || 0);
        setTimeout(() => el.classList.add('is-revealed'), delay);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    targets.forEach((el) => io.observe(el));
  })();

  // ---- HERO TEXT REVEAL ----
  (function initHeroReveal() {
    const headlines = document.querySelectorAll('.sf-hero__headline');
    if (!headlines.length) return;

    headlines.forEach((headline) => {
      if (headline.classList.contains('sf-hero__headline--split')) return;
      const text = headline.textContent || '';
      headline.textContent = '';
      headline.classList.add('sf-hero__headline--split');

      [...text].forEach((char, index) => {
        if (char === ' ') {
          headline.appendChild(document.createTextNode(' '));
          return;
        }
        const span = document.createElement('span');
        span.className = 'sf-hero__letter';
        span.style.setProperty('--d', `${index * 90}ms`);
        span.textContent = char;
        headline.appendChild(span);
      });
    });

    const triggerReveal = () => {
      if (document.documentElement.classList.contains('sf-splash-active')) return;
      document.documentElement.classList.add('sf-page-reveal');
      setTimeout(() => {
        document.documentElement.classList.remove('sf-page-reveal');
        document.querySelectorAll('.sf-hero__letter').forEach(el => {
          el.classList.add('is-revealed');
        });
      }, 2000);
    };

    window.addEventListener('pageshow', triggerReveal);
  })();

  // ---- STICKY HEADER STATE ----
  (function initStickyHeader() {
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

  // sf-nav handles its own scroll state and nav; no separate enhancement needed.

  // ---- CATEGORY CAROUSEL: drag + dots ----
  (function initCarousel() {
    const wrapper = document.querySelector('.sf-categories__track-wrapper');
    if (!wrapper) return;

    const cards = wrapper.querySelectorAll('.sf-category-card');
    const dots = document.querySelectorAll('.sf-categories__dot');

    // Drag-to-scroll (desktop)
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    wrapper.addEventListener('mousedown', (e) => {
      isDown = true;
      wrapper.classList.add('is-grabbing');
      startX = e.pageX - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
    });
    wrapper.addEventListener('mouseleave', () => {
      isDown = false;
      wrapper.classList.remove('is-grabbing');
    });
    wrapper.addEventListener('mouseup', () => {
      isDown = false;
      wrapper.classList.remove('is-grabbing');
    });
    wrapper.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      wrapper.scrollLeft = scrollLeft - (x - startX) * 1.2;
    });

    // Sync active dot to in-view card
    if (dots.length && cards.length) {
      const dotIo = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = [...cards].indexOf(entry.target);
          if (i < 0) return;
          dots.forEach((d) => d.classList.remove('is-active'));
          if (dots[i]) dots[i].classList.add('is-active');
        });
      }, { root: wrapper, threshold: 0.5 });
      cards.forEach((c) => dotIo.observe(c));
    }
  })();

  // ---- SF-NAV: Mobile drawer + Shop dropdown toggle ----
  (function initSfNav() {
    const nav = document.getElementById('sf-nav');
    if (!nav) return;

    // Apply scroll state immediately
    const syncNavScroll = () => {
      if (window.scrollY > 40) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', syncNavScroll, { passive: true });
    syncNavScroll();

    // Mobile hamburger drawer
    const hamburger = document.getElementById('sf-nav-hamburger');
    const drawer = document.getElementById('sf-nav-drawer');
    const backdrop = document.getElementById('sf-nav-backdrop');

    if (hamburger && drawer) {
      const openDrawer = () => {
        drawer.classList.add('is-open');
        hamburger.setAttribute('aria-expanded', 'true');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      };
      const closeDrawer = () => {
        drawer.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      };

      hamburger.addEventListener('click', () => {
        const isOpen = drawer.classList.contains('is-open');
        if (isOpen) closeDrawer(); else openDrawer();
      });

      if (backdrop) backdrop.addEventListener('click', closeDrawer);

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
      });
    }

    // Desktop dropdowns via button aria-expanded
    const dropdowns = [
      { toggle: '#sf-shop-menu .sf-nav__link--toggle', menuId: 'sf-shop-dropdown', itemId: 'sf-shop-menu' },
      { toggle: '#sf-explore-menu .sf-nav__link--explore', menuId: 'sf-explore-dropdown', itemId: 'sf-explore-menu' }
    ];

    dropdowns.forEach(({ toggle, menuId, itemId }) => {
      const btn = document.querySelector(toggle);
      const menu = document.getElementById(menuId);
      const item = document.getElementById(itemId);
      if (!btn || !menu || !item) return;

      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
      });

      document.addEventListener('click', (e) => {
        if (!item.contains(e.target)) {
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Cart button delegates to Horizon's cart-icon web component
    const sfCartBtn = nav.querySelector('.sf-nav__cart-btn');
    if (sfCartBtn) {
      sfCartBtn.addEventListener('click', () => {
        const horizonCart = document.querySelector('cart-icon, [data-testid="cart-icon"]');
        if (horizonCart) {
          horizonCart.click();
        } else {
          window.location.href = '/cart';
        }
      });
    }
  })();
})();
