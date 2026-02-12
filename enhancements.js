/* ============================================
   enhancements.js
   Lightweight UX enhancements
   ============================================ */

(function () {
  'use strict';

  /* --- 1. Scroll-to-top button --- */
  function initScrollToTop() {
    var btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 12 10 7 5 12"/></svg>';
    document.body.appendChild(btn);

    var visible = false;

    function toggle() {
      var show = window.scrollY > 400;
      if (show !== visible) {
        visible = show;
        btn.classList.toggle('visible', show);
      }
    }

    window.addEventListener('scroll', toggle, { passive: true });
    toggle();

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- 2. Active sidebar highlighting on scroll --- */
  function initSidebarHighlight() {
    var sidebar = document.querySelector('.sidebar-nav');
    if (!sidebar) return;

    var links = sidebar.querySelectorAll('a[href^="#"]');
    if (!links.length) return;

    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section) {
        sections.push({ el: section, link: link });
      }
    });

    if (!sections.length) return;

    var current = null;

    function highlight() {
      var scrollPos = window.scrollY + 120;
      var active = null;

      for (var i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el.offsetTop <= scrollPos) {
          active = sections[i].link;
          break;
        }
      }

      if (active !== current) {
        if (current) current.classList.remove('sidebar-active');
        if (active) active.classList.add('sidebar-active');
        current = active;
      }
    }

    window.addEventListener('scroll', highlight, { passive: true });
    highlight();
  }

  /* --- 3. Close mobile nav on link click --- */
  function initNavAutoClose() {
    var nav = document.querySelector('.main-nav');
    if (!nav) return;

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && nav.classList.contains('open')) {
        nav.classList.remove('open');
      }
    });
  }

  /* --- 4. Close mobile nav on outside tap --- */
  function initNavOutsideClose() {
    var nav = document.querySelector('.main-nav');
    var toggle = document.querySelector('.nav-toggle');
    if (!nav || !toggle) return;

    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') &&
          !nav.contains(e.target) &&
          !toggle.contains(e.target)) {
        nav.classList.remove('open');
      }
    });
  }

  /* --- 5. Image lightbox --- */
  function initLightbox() {
    var images = document.querySelectorAll('.lightbox-img');
    if (!images.length) return;

    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Image lightbox — click to close');
    var lbImg = document.createElement('img');
    lbImg.alt = '';
    overlay.appendChild(lbImg);
    document.body.appendChild(overlay);

    function open(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt;
      overlay.style.display = 'flex';
      requestAnimationFrame(function () {
        overlay.classList.add('visible');
      });
    }

    function close() {
      overlay.classList.remove('visible');
      overlay.addEventListener('transitionend', function handler() {
        overlay.removeEventListener('transitionend', handler);
        overlay.style.display = 'none';
      });
    }

    images.forEach(function (img) {
      img.addEventListener('click', function () {
        open(img.src, img.alt);
      });
    });

    overlay.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('visible')) {
        close();
      }
    });

    overlay.style.display = 'none';
  }

  /* --- Initialise on DOM ready --- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initScrollToTop();
    initSidebarHighlight();
    initNavAutoClose();
    initNavOutsideClose();
    initLightbox();
  }
})();
