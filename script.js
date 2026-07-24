// =========================================================
// SHREE B.P. FOODS — script.js
// =========================================================
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader ---------- */
  const loader = document.getElementById('grainLoader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hidden'), 350);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => loader && loader.classList.add('hidden'), 1800);

  /* ---------- Sticky header on scroll ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    // back to top visibility
    if (window.scrollY > 500) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Dark / Light mode toggle ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  const applyTheme = (theme) => {
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  };

  // Respect saved preference, else system preference
  let savedTheme = null;
  try { savedTheme = window.localStorage.getItem('bpfoods-theme'); } catch (e) { /* storage unavailable */ }

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  themeToggle.addEventListener('click', () => {
    const isDark = root.classList.toggle('dark');
    try { window.localStorage.setItem('bpfoods-theme', isDark ? 'dark' : 'light'); } catch (e) { /* ignore */ }
  });

  /* ---------- Mobile nav ---------- */
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');

  hamburger.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');

      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  /* ---------- Active nav link on scroll (scrollspy) ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach(sec => spyObserver.observe(sec));

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll(
    '.why-card, .product-card, .about-visual, .about-copy, .masonry-item, .quality-copy, .quality-visual, .contact-info, .contact-map'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Lightbox for gallery ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxInner = document.getElementById('lightboxInner');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.masonry-item').forEach(item => {
    item.addEventListener('click', () => {
      const media = item.querySelector('img, .img-placeholder');
      const clone = media.cloneNode(true);
      lightboxInner.innerHTML = '';
      lightboxInner.appendChild(clone);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

});
