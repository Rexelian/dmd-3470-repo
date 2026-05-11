

/* made a second file to compare to the first */
(function () {
  'use strict';

  const SCROLL_THRESHOLD = 100;
  const MOBILE_BREAKPOINT = 768;

  //navigation
  function initNav() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav    = document.querySelector('.main-navigation');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('active');
      toggle.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    nav.querySelectorAll('.nav-menu-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
          nav.classList.remove('active');
          toggle.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });
  }

  //scroll effects
  function initScroll() {
    const header     = document.querySelector('.site-header');
    const backToTop  = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      header?.classList.toggle('scrolled', y > SCROLL_THRESHOLD);
      backToTop?.classList.toggle('visible', y > 500);
    }, { passive: true });

    backToTop?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  //smooth anchor scrolling
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      });
    });
  }

  //animate on scroll
  function initScrollAnimations() {
    const items = document.querySelectorAll('.animated');
    if (!items.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target); // fire once
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    items.forEach(el => observer.observe(el));
  }

  // contact form
  function initForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      for (const [field, value] of data.entries()) {
        if (!value.trim()) {
          alert(`Please fill in the ${field} field.`);
          return;
        }
      }
      alert('Form submitted! (demo — nothing was actually sent)');
      form.reset();
    });
  }

  //close menu on resize
  function initResize() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        const nav    = document.querySelector('.main-navigation');
        const toggle = document.querySelector('.mobile-menu-toggle');
        if (nav?.classList.contains('active')) {
          nav.classList.remove('active');
          toggle?.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    }, { passive: true });
  }

  //boot
  function init() {
    initNav();
    initScroll();
    initSmoothScroll();
    initScrollAnimations();
    initForm();
    initResize();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
