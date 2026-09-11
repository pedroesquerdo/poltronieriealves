const officeSection = document.querySelector('#escritorio');

if (officeSection) {
  const heading = officeSection.querySelector('.section-heading');

  if (heading) {
    heading.classList.add('about-heading');
    heading.innerHTML = `
      <div class="about-visual">
        <div class="about-photo-frame">
          <img src="assets/maykel-e-poliana.png" alt="Maykel Alves e Poliana Poltronieri, advogados da Poltronieri & Alves" loading="lazy" decoding="async" />
        </div>
        <p class="about-caption"><strong>Maykel Alves</strong><span>&amp;</span><strong>Poliana Poltronieri</strong></p>
      </div>
      <div class="about-copy">
        <span class="section-label">Quem somos</span>
        <h2>Advocacia próxima, estratégica e comprometida com cada cliente.</h2>
        <p>A Poltronieri & Alves é conduzida por <strong>Maykel Alves</strong> e <strong>Poliana Poltronieri</strong>, unindo atuação técnica, atendimento próximo e visão estratégica para oferecer soluções jurídicas adequadas à realidade de cada cliente.</p>
        <p>Mais do que conduzir demandas, buscamos compreender cada situação de forma individual, orientar decisões com clareza e construir relações pautadas pela confiança, transparência e responsabilidade.</p>
        <a class="button button-link about-link" href="#atuacao">Conheça nossas áreas de atuação →</a>
      </div>`;
  }

  const style = document.createElement('style');
  style.textContent = `
    .about-heading{display:grid!important;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr)!important;gap:clamp(48px,7vw,104px)!important;align-items:center!important}
    .about-visual{min-width:0}
    .about-photo-frame{--about-parallax:0px;position:relative;overflow:hidden;background:var(--surface,transparent);border-radius:2px;box-shadow:0 18px 45px rgba(15,38,31,.12),0 4px 14px rgba(15,38,31,.08);transition:box-shadow .35s ease,transform .35s ease;transform:translateY(var(--about-parallax))}
    .about-photo-frame::after{content:"";position:absolute;inset:0;border:1px solid rgba(255,255,255,.14);pointer-events:none}
    .about-photo-frame img{display:block;width:100%;aspect-ratio:4/5;object-fit:cover;object-position:center;transform:scale(1.001);transition:transform .55s cubic-bezier(.2,.7,.2,1)}
    .about-photo-frame:hover{box-shadow:0 24px 58px rgba(15,38,31,.15),0 8px 20px rgba(15,38,31,.09)}
    .about-photo-frame:hover img{transform:scale(1.015)}
    .about-caption{display:flex;align-items:center;gap:12px;margin:18px 0 0;color:var(--heading);font:500 13px/1.4 Inter,Arial,sans-serif;letter-spacing:.035em}
    .about-caption span{color:var(--gold);font-family:"Source Serif 4",Georgia,serif;font-size:19px}
    .about-copy{max-width:640px}
    .about-copy h2{margin-top:14px;margin-bottom:24px}
    .about-copy p{margin:0 0 15px;color:var(--muted);line-height:1.78}
    .about-copy p strong{color:var(--heading);font-weight:600}
    .about-link{margin-top:9px}
    .about-heading + .principles{margin-top:clamp(56px,7vw,88px)}
    html[data-theme="dark"] .about-photo-frame{background:#10251f;box-shadow:0 18px 45px rgba(0,0,0,.28),0 4px 14px rgba(0,0,0,.2)}
    @media(max-width:900px){.about-heading{grid-template-columns:1fr!important;gap:38px!important}.about-visual{max-width:620px;margin-inline:auto;width:100%}.about-photo-frame{transform:none!important}.about-photo-frame img{aspect-ratio:5/4;object-position:center 35%}.about-copy{max-width:720px;margin-inline:auto;text-align:center}.about-caption{justify-content:center}.about-link{display:inline-flex}}
    @media(max-width:760px){.about-heading{gap:28px!important}.about-photo-frame{box-shadow:0 14px 34px rgba(15,38,31,.1)}.about-photo-frame img{aspect-ratio:4/5;object-position:center;transform:none!important}.about-photo-frame:hover img{transform:none!important}.about-copy p{text-align:center!important;text-align-last:center!important}.about-caption{font-size:12px;gap:9px;flex-wrap:wrap}.about-heading + .principles{margin-top:48px}}
    @media(prefers-reduced-motion:reduce){.about-photo-frame{transform:none!important;transition:none!important}.about-photo-frame img{transform:none!important;transition:none!important}}
  `;
  document.head.appendChild(style);

  const photoFrame = officeSection.querySelector('.about-photo-frame');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktopMotion = window.matchMedia('(min-width: 901px)');

  if (photoFrame && !reduceMotion) {
    let ticking = false;

    const updateParallax = () => {
      if (!desktopMotion.matches) {
        photoFrame.style.setProperty('--about-parallax', '0px');
        ticking = false;
        return;
      }

      const rect = photoFrame.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = (elementCenter - viewportCenter) / Math.max(window.innerHeight, 1);
      const offset = Math.max(-12, Math.min(12, distance * -14));
      photoFrame.style.setProperty('--about-parallax', `${offset.toFixed(2)}px`);
      ticking = false;
    };

    const requestParallax = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateParallax);
    };

    window.addEventListener('scroll', requestParallax, { passive: true });
    window.addEventListener('resize', requestParallax, { passive: true });
    desktopMotion.addEventListener?.('change', requestParallax);
    updateParallax();
  }
}