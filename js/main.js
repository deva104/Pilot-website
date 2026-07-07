(function () {
  'use strict';

  /* ── Mobile menu ── */
  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  function closeMenu() {
    mobileNav.classList.add('hidden');
    mobileNav.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuIconOpen.classList.remove('hidden');
    menuIconClose.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  function openMenu() {
    mobileNav.classList.remove('hidden');
    mobileNav.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuIconOpen.classList.add('hidden');
    menuIconClose.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      }
    });
  }

  /* ── Scroll animations ── */
  const animated = document.querySelectorAll('[data-animate], [data-animate-stagger]');

  if (animated.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    animated.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animated.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ── Contact form: pre-select interest from CTA links ── */
  const interestSelect = document.getElementById('interest');
  const ctaLinks = document.querySelectorAll('[data-interest]');

  ctaLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      const value = link.getAttribute('data-interest');
      if (interestSelect && value) {
        interestSelect.value = value;
      }
    });
  });
})();
