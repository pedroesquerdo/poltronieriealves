document.getElementById('year').textContent = new Date().getFullYear();

const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');

function updateThemeUI() {
  const isLight = root.dataset.theme === 'light';
  themeToggle?.setAttribute('aria-label', isLight ? 'Alternar para tema escuro' : 'Alternar para tema claro');
  themeToggle?.setAttribute('title', isLight ? 'Usar tema escuro' : 'Usar tema claro');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
    updateThemeUI();
  });
  updateThemeUI();
}

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const track = document.querySelector('.reviews-track');
const slides = Array.from(document.querySelectorAll('.review-slide'));
const prev = document.querySelector('.carousel-prev');
const next = document.querySelector('.carousel-next');
const dotsContainer = document.querySelector('.carousel-dots');

if (track && slides.length && dotsContainer) {
  let current = 0;

  const dots = slides.map((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Ir para avaliação ${index + 1}`);
    dot.addEventListener('click', () => {
      current = index;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  function updateCarousel() {
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, index) => dot.classList.toggle('active', index === current));
  }

  prev?.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  next?.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    updateCarousel();
  });

  let startX = null;
  track.addEventListener('touchstart', event => {
    startX = event.touches[0].clientX;
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
  }, { passive: true });

  updateCarousel();
}