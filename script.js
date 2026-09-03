const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateThemeUI() {
  const isLight = root.dataset.theme === 'light';
  themeToggle?.setAttribute('aria-label', isLight ? 'Alternar para tema escuro' : 'Alternar para tema claro');
  themeToggle?.setAttribute('title', isLight ? 'Usar tema escuro' : 'Usar tema claro');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = nextTheme;
    try { localStorage.setItem('theme', nextTheme); } catch (_) {}
    updateThemeUI();
  });
  updateThemeUI();
}

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

function closeMenu() {
  if (!toggle || !nav) return;
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener('click', event => {
    if (!nav.classList.contains('open')) return;
    if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
}

const reveals = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  reveals.forEach(el => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
}

const track = document.querySelector('.reviews-track');
const slides = Array.from(document.querySelectorAll('.review-slide'));
const prev = document.querySelector('.carousel-prev');
const next = document.querySelector('.carousel-next');
const dotsContainer = document.querySelector('.carousel-dots');
const carousel = document.querySelector('.reviews-carousel');
const autoplayToggle = document.querySelector('.carousel-toggle');

if (track && slides.length && dotsContainer) {
  let current = 0;
  let autoplayId = null;
  let autoplayEnabled = !reducedMotion;
  const autoplayDelay = 5000;

  const dots = slides.map((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Ir para avaliação ${index + 1}`);
    dot.addEventListener('click', () => {
      current = index;
      updateCarousel();
      restartAutoplay();
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  function updateCarousel() {
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === current);
      dot.setAttribute('aria-current', index === current ? 'true' : 'false');
    });
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    updateCarousel();
  }

  function updateAutoplayButton() {
    if (!autoplayToggle) return;
    autoplayToggle.textContent = autoplayEnabled ? 'Pausar' : 'Reproduzir';
    autoplayToggle.setAttribute('aria-pressed', String(!autoplayEnabled));
    autoplayToggle.setAttribute('aria-label', autoplayEnabled ? 'Pausar rotação automática das avaliações' : 'Reproduzir rotação automática das avaliações');
  }

  function startAutoplay() {
    stopAutoplay();
    if (!autoplayEnabled || document.hidden) return;
    autoplayId = window.setInterval(nextSlide, autoplayDelay);
  }

  function stopAutoplay() {
    if (autoplayId !== null) {
      window.clearInterval(autoplayId);
      autoplayId = null;
    }
  }

  function restartAutoplay() {
    if (autoplayEnabled) startAutoplay();
  }

  prev?.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    updateCarousel();
    restartAutoplay();
  });

  next?.addEventListener('click', () => {
    nextSlide();
    restartAutoplay();
  });

  autoplayToggle?.addEventListener('click', () => {
    autoplayEnabled = !autoplayEnabled;
    updateAutoplayButton();
    autoplayEnabled ? startAutoplay() : stopAutoplay();
  });

  let startX = null;
  track.addEventListener('touchstart', event => {
    startX = event.touches[0].clientX;
    stopAutoplay();
  }, { passive: true });

  track.addEventListener('touchend', event => {
    if (startX === null) return;
    const endX = event.changedTouches[0].clientX;
    const delta = endX - startX;
    if (Math.abs(delta) > 45) {
      current = delta < 0
        ? (current + 1) % slides.length
        : (current - 1 + slides.length) % slides.length;
      updateCarousel();
    }
    startX = null;
    restartAutoplay();
  }, { passive: true });

  carousel?.addEventListener('mouseenter', stopAutoplay);
  carousel?.addEventListener('mouseleave', restartAutoplay);
  carousel?.addEventListener('focusin', stopAutoplay);
  carousel?.addEventListener('focusout', restartAutoplay);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else restartAutoplay();
  });

  updateCarousel();
  updateAutoplayButton();
  startAutoplay();
}