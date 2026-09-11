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
    .about-photo-frame{position:relative;overflow:hidden;background:var(--surface,transparent);border-radius:2px}
    .about-photo-frame::after{content:"";position:absolute;inset:0;border:1px solid rgba(255,255,255,.12);pointer-events:none}
    .about-photo-frame img{display:block;width:100%;aspect-ratio:4/5;object-fit:cover;object-position:center}
    .about-caption{display:flex;align-items:center;gap:12px;margin:18px 0 0;color:var(--heading);font:500 13px/1.4 Inter,Arial,sans-serif;letter-spacing:.035em}
    .about-caption span{color:var(--gold);font-family:"Source Serif 4",Georgia,serif;font-size:19px}
    .about-copy{max-width:640px}
    .about-copy h2{margin-top:14px;margin-bottom:24px}
    .about-copy p{margin:0 0 15px;color:var(--muted);line-height:1.78}
    .about-copy p strong{color:var(--heading);font-weight:600}
    .about-link{margin-top:9px}
    .about-heading + .principles{margin-top:clamp(56px,7vw,88px)}
    html[data-theme="dark"] .about-photo-frame{background:#10251f}
    @media(max-width:900px){.about-heading{grid-template-columns:1fr!important;gap:38px!important}.about-visual{max-width:620px;margin-inline:auto;width:100%}.about-photo-frame img{aspect-ratio:5/4;object-position:center 35%}.about-copy{max-width:720px;margin-inline:auto;text-align:center}.about-caption{justify-content:center}.about-link{display:inline-flex}}
    @media(max-width:760px){.about-heading{gap:28px!important}.about-photo-frame img{aspect-ratio:4/5;object-position:center}.about-copy p{text-align:center!important;text-align-last:center!important}.about-caption{font-size:12px;gap:9px;flex-wrap:wrap}.about-heading + .principles{margin-top:48px}}
  `;
  document.head.appendChild(style);
}