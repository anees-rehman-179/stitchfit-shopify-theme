(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- WISHLIST STORAGE ----
  (function initWishlist() {
    const WISHLIST_KEY = 'sf-wishlist-v1';
    
    function getWishlist() {
      try {
        const data = localStorage.getItem(WISHLIST_KEY);
        return data ? JSON.parse(data) : {};
      } catch (e) {
        return {};
      }
    }
    
    function saveWishlist(data) {
      try {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(data));
      } catch (e) { /* localStorage may be unavailable */ }
    }
    
    function hydratePage() {
      const wishlist = getWishlist();
      document.querySelectorAll('[data-sf-wishlist="true"]').forEach((btn) => {
        const productId = btn.getAttribute('data-product-id');
        if (productId && wishlist[productId]) {
          btn.classList.add('is-active');
          btn.setAttribute('aria-pressed', 'true');
        }
      });
    }
    
    function handleWishlistClick(btn) {
      const productId = btn.getAttribute('data-product-id');
      if (!productId) return;
      
      const wishlist = getWishlist();
      const isActive = btn.classList.contains('is-active');
      
      if (isActive) {
        delete wishlist[productId];
        btn.classList.remove('is-active');
        btn.setAttribute('aria-pressed', 'false');
      } else {
        wishlist[productId] = true;
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
      }
      
      saveWishlist(wishlist);
    }
    
    // Hydrate on load
    hydratePage();

    // Single delegated click handler so dynamically-inserted cards work too.
    document.addEventListener('click', (e) => {
      const btn = e.target && e.target.closest && e.target.closest('[data-sf-wishlist="true"]');
      if (!btn) return;
      e.preventDefault();
      handleWishlistClick(btn);
    });

    // Re-hydrate when the DOM changes (collection pagination, section re-render, etc.)
    if ('MutationObserver' in window) {
      let queued = false;
      const queueHydrate = () => {
        if (queued) return;
        queued = true;
        window.requestAnimationFrame(() => {
          queued = false;
          hydratePage();
        });
      };

      const mo = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (!m.addedNodes || m.addedNodes.length === 0) continue;
          queueHydrate();
          break;
        }
      });

      mo.observe(document.documentElement, { childList: true, subtree: true });
    }

    // Also support any theme-level custom events if they exist.
    document.addEventListener('product-card-rendered', hydratePage);
  })();

  // Start any videos that were marked to wait for the splash to finish.
  // Safe to call multiple times; .play() is idempotent on a playing video.
  function playDeferredVideos() {
    document.querySelectorAll('video[data-sf-deferred-play]').forEach((v) => {
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => { /* autoplay policy — ignore */ });
    });
  }

  // ---- SPLASH ----
  (function initSplash() {
    const splash = document.querySelector('.sf-splash');
    if (!splash) {
      // No splash element (e.g. removed by inline pre-paint script) — start videos now.
      playDeferredVideos();
      return;
    }

    const KEY    = 'sf-splash-v1';
    let seen     = false;
    try { seen = !!sessionStorage.getItem(KEY); } catch (e) { /* private mode */ }

    // Already seen this session — remove immediately, let IntersectionObserver handle reveals
    if (seen) {
      splash.remove();
      document.documentElement.classList.remove('sf-splash-active');
      playDeferredVideos();
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
          playDeferredVideos();
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

      // Hero videos start as the curtain lifts
      playDeferredVideos();

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

  // ---- COLLECTION GRID STAGGER ----
  (function initGridStagger() {
    const grid = document.querySelector('.product-grid');
    if (!grid) return;

    const items = Array.from(grid.querySelectorAll(':scope > li'));
    if (!items.length) return;

    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    // Batch items that share the same visual row (within 20px of each other)
    // and assign staggered delays within each row.
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = Number(el.dataset.sfDelay || 0);
        setTimeout(() => el.classList.add('is-revealed'), delay);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.04 });

    // Group by approximate row (top offset)
    const rows = {};
    items.forEach((el) => {
      const top = Math.round(el.getBoundingClientRect().top / 20) * 20;
      if (!rows[top]) rows[top] = [];
      rows[top].push(el);
    });

    Object.values(rows).forEach((row) => {
      row.forEach((el, i) => {
        el.setAttribute('data-sf-reveal', '');
        el.style.setProperty('--sf-delay', (i * 80) + 'ms');
        io.observe(el);
      });
    });
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

  // Mobile categories now use CSS vertical marquee (bottom -> top), desktop remains horizontal.

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

  // ---- CARD IMAGE FX: mobile auto-cycle + universal lightbox ----
  (function initCardFx() {
    const MOBILE_QUERY = window.matchMedia('(max-width: 900px)');
    const CYCLE_MS = 3000;

    // ---- Lightbox ----
    let lightbox = null;
    let lightboxImg = null;
    let lightboxCaption = null;
    let lightboxState = { sources: [], index: 0, alt: '' };

    function buildLightbox() {
      if (lightbox) return;
      lightbox = document.createElement('div');
      lightbox.className = 'sf-lightbox';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.setAttribute('aria-label', 'Image viewer');
      lightbox.setAttribute('hidden', '');
      lightbox.innerHTML =
        '<div class="sf-lightbox__backdrop" data-sf-lb-close></div>' +
        '<button class="sf-lightbox__close" type="button" aria-label="Close" data-sf-lb-close>&times;</button>' +
        '<button class="sf-lightbox__nav sf-lightbox__nav--prev" type="button" aria-label="Previous image" data-sf-lb-prev>&#8249;</button>' +
        '<button class="sf-lightbox__nav sf-lightbox__nav--next" type="button" aria-label="Next image" data-sf-lb-next>&#8250;</button>' +
        '<figure class="sf-lightbox__stage"><img class="sf-lightbox__img" alt=""><figcaption class="sf-lightbox__caption"></figcaption></figure>';
      document.body.appendChild(lightbox);

      lightboxImg = lightbox.querySelector('.sf-lightbox__img');
      lightboxCaption = lightbox.querySelector('.sf-lightbox__caption');

      lightbox.addEventListener('click', (e) => {
        if (e.target.closest('[data-sf-lb-close]')) closeLightbox();
        else if (e.target.closest('[data-sf-lb-prev]')) showLightboxIndex(lightboxState.index - 1);
        else if (e.target.closest('[data-sf-lb-next]')) showLightboxIndex(lightboxState.index + 1);
      });

      document.addEventListener('keydown', (e) => {
        if (lightbox.hasAttribute('hidden')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showLightboxIndex(lightboxState.index - 1);
        if (e.key === 'ArrowRight') showLightboxIndex(lightboxState.index + 1);
      });
    }

    function showLightboxIndex(i) {
      const sources = lightboxState.sources;
      if (!sources.length) return;
      const len = sources.length;
      const next = ((i % len) + len) % len;
      lightboxState.index = next;
      lightboxImg.src = sources[next];
      lightboxImg.alt = lightboxState.alt || '';
      lightbox.classList.toggle('sf-lightbox--multi', len > 1);
      if (lightboxCaption) lightboxCaption.textContent = len > 1 ? (next + 1) + ' / ' + len : '';
    }

    function openLightbox(sources, startIndex, alt) {
      buildLightbox();
      lightboxState = { sources: sources.filter(Boolean), index: 0, alt: alt || '' };
      if (!lightboxState.sources.length) return;
      showLightboxIndex(startIndex || 0);
      lightbox.removeAttribute('hidden');
      document.documentElement.classList.add('sf-lightbox-open');
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.setAttribute('hidden', '');
      document.documentElement.classList.remove('sf-lightbox-open');
    }

    // Upgrade <img> src to a higher-res variant when it's a Shopify CDN URL.
    function upgradeShopifyUrl(url, width) {
      if (!url) return url;
      try {
        const u = new URL(url, window.location.origin);
        if (!/cdn\.shopify\.com|shopify\.com/.test(u.hostname) && !u.pathname.includes('/cdn/')) return url;
        u.searchParams.set('width', String(width || 1600));
        return u.toString();
      } catch (e) { return url; }
    }

    function collectSources(container) {
      const imgs = container.querySelectorAll('img');
      const out = [];
      const seen = new Set();
      imgs.forEach((img) => {
        const src = img.currentSrc || img.src;
        if (!src) return;
        const big = upgradeShopifyUrl(src, 1800);
        if (seen.has(big)) return;
        seen.add(big);
        out.push(big);
      });
      return out;
    }

    // Click anywhere on the host image area to open the lightbox.
    // Skips hosts that wrap a navigation link so product/collection card clicks still navigate.
    function attachImageClickToZoom(host) {
      if (!host || host.dataset.sfClickZoom === '1') return;
      if (host.querySelector('a[href]')) return; // don't hijack links
      host.dataset.sfClickZoom = '1';
      const cs = window.getComputedStyle(host);
      if (cs.position === 'static') host.style.position = 'relative';
      host.addEventListener('click', (e) => {
        if (e.target.closest('a, button')) return;
        const sources = collectSources(host);
        if (!sources.length) return;
        const firstImg = host.querySelector('img');
        openLightbox(sources, 0, firstImg ? firstImg.alt : '');
      });
    }

    // ---- Mobile auto-cycle for product card-galleries ----
    const cyclers = new WeakMap();

    function startCycle(gallery, offset) {
      if (cyclers.has(gallery)) return;
      const slideshow = gallery.querySelector('slideshow-component');
      if (!slideshow) return;
      const slides = slideshow.querySelectorAll('slideshow-slide');
      if (slides.length < 2) return;

      let flipped = false;
      const tick = () => {
        if (!document.body.contains(gallery)) { stopCycle(gallery); return; }
        try {
          if (flipped) {
            if (typeof slideshow.previous === 'function') slideshow.previous(undefined, { animate: false });
          } else {
            if (typeof slideshow.next === 'function') slideshow.next(undefined, { animate: false });
          }
          flipped = !flipped;
        } catch (e) { /* slideshow may not be ready */ }
      };
      const startTimer = setTimeout(() => {
        tick();
        const id = setInterval(tick, CYCLE_MS);
        cyclers.set(gallery, { id, type: 'interval' });
      }, offset || 0);
      cyclers.set(gallery, { id: startTimer, type: 'timeout' });
    }

    function stopCycle(gallery) {
      const rec = cyclers.get(gallery);
      if (!rec) return;
      if (rec.type === 'timeout') clearTimeout(rec.id);
      else clearInterval(rec.id);
      cyclers.delete(gallery);
    }

    function stopAllCycles() {
      document.querySelectorAll('.card-gallery').forEach(stopCycle);
    }

    function startAllCycles() {
      const galleries = document.querySelectorAll('.card-gallery');
      galleries.forEach((g, i) => startCycle(g, (i % 5) * 400));
    }

    function applyMobileBehavior() {
      if (MOBILE_QUERY.matches && !reduce) startAllCycles();
      else stopAllCycles();
    }

    // ---- Lookbook two-image crossfade ----
    function initLookbookSwap() {
      document.querySelectorAll('.sf-lookbook__tile[data-sf-swap]').forEach((tile) => {
        const imgs = tile.querySelectorAll('img');
        if (imgs.length < 2) return;
        // Desktop: hover toggles class. Mobile: timer toggles class.
        const toggle = (on) => tile.classList.toggle('is-alt', on);
        tile.addEventListener('mouseenter', () => { if (!MOBILE_QUERY.matches) toggle(true); });
        tile.addEventListener('mouseleave', () => { if (!MOBILE_QUERY.matches) toggle(false); });

        let state = false;
        const tick = () => {
          if (!MOBILE_QUERY.matches || reduce) return;
          state = !state;
          toggle(state);
        };
        setInterval(tick, CYCLE_MS);
      });
    }

    // ---- Scan & wire up ----
    function scan(root) {
      const r = root || document;
      // Lookbook tiles — click the image to open the lightbox
      r.querySelectorAll('.sf-lookbook__tile').forEach((g) => attachImageClickToZoom(g));
      // Editorial / hero images opted-in via data-sf-zoomable
      r.querySelectorAll('[data-sf-zoomable]').forEach((g) => attachImageClickToZoom(g));
      // Product card galleries and collection cards keep their navigation behavior —
      // no zoom wiring here so taps follow the product/collection link as before.
    }

    function boot() {
      scan(document);
      initLookbookSwap();
      applyMobileBehavior();

      // Re-scan when product cards are loaded dynamically (collection filter, quick-add, etc.)
      const mo = new MutationObserver((mutations) => {
        let dirty = false;
        for (const m of mutations) {
          if (m.addedNodes && m.addedNodes.length) { dirty = true; break; }
        }
        if (dirty) {
          scan(document);
          if (MOBILE_QUERY.matches && !reduce) startAllCycles();
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });

      if (MOBILE_QUERY.addEventListener) {
        MOBILE_QUERY.addEventListener('change', applyMobileBehavior);
      } else if (MOBILE_QUERY.addListener) {
        MOBILE_QUERY.addListener(applyMobileBehavior);
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
      boot();
    }
  })();
})();
