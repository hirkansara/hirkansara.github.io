(() => {
  'use strict';

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    const updateBackToTop = () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    };
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop();
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  }

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'باز کردن منو');
    nav.classList.remove('open');
  };
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'باز کردن منو' : 'بستن منو');
    nav.classList.toggle('open', !isOpen);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (toggle.getAttribute('aria-expanded') === 'true' &&
        !nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 761px)').matches) closeMenu();
  });
})();