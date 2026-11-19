/**
 * A Little World of Letters — Interactive Features & Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Mobile Drawer Navigation
  // -------------------------------------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-btn-book');

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    if (navToggle) {
      navToggle.classList.add('active');
      navToggle.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden'; // prevent background scrolling
  }

  function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    if (navToggle) {
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // -------------------------------------------------------------------------
  // 2. Sticky Navbar Glass Effect on Scroll
  // -------------------------------------------------------------------------
  const mainNav = document.getElementById('mainNav');
  if (mainNav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // -------------------------------------------------------------------------
  // 3. Bullet Ride CTA Interactive Toast
  // -------------------------------------------------------------------------
  const bulletRideBtn = document.getElementById('bulletRideBtn');
  const bulletToast = document.getElementById('bulletToast');
  const toastClose = document.getElementById('toastClose');
  let toastTimer = null;

  if (bulletRideBtn && bulletToast) {
    bulletRideBtn.addEventListener('click', () => {
      bulletToast.classList.add('show');
      bulletToast.setAttribute('aria-hidden', 'false');

      // Play subtle pulse animation on button
      bulletRideBtn.classList.add('btn-pressed');
      setTimeout(() => bulletRideBtn.classList.remove('btn-pressed'), 300);

      // Auto hide after 4.5 seconds
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        bulletToast.classList.remove('show');
        bulletToast.setAttribute('aria-hidden', 'true');
      }, 4500);
    });
  }

  if (toastClose && bulletToast) {
    toastClose.addEventListener('click', () => {
      bulletToast.classList.remove('show');
      bulletToast.setAttribute('aria-hidden', 'true');
      if (toastTimer) clearTimeout(toastTimer);
    });
  }

  // -------------------------------------------------------------------------
  // 4. Subtle Reveal Animations on Scroll (IntersectionObserver)
  // -------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(
    '.story-section, .bullet-section, .features-mosaic, .photo-pair-grid, .gallery-three-grid, .split-grid'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      el.classList.add('scroll-reveal');
      observer.observe(el);
    });
  }
});
