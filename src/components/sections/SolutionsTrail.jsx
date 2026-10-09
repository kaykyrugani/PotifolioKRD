import { useEffect, useId, useRef, useState } from 'react';
import Container from '../ui/Container';
import styles from './SolutionsTrail.module.css';

const solutions = [
  {
    phase: 'Presença',
    problem: 'Quero que minha empresa pareça profissional.',
    service: 'Sites institucionais',
    description: 'Estrutura para apresentar empresa, serviços e contato com clareza e autoridade.',
    deliverables: 'multipágina / SEO técnico / HTML semântico / responsivo',
    result: 'Presença + autoridade',
  },
  {
    phase: 'Conversão',
    problem: 'Quero transformar campanha em contato.',
    service: 'Landing pages',
    description: 'Páginas para campanhas e captação, com narrativa objetiva e CTA bem posicionado.',
    deliverables: 'copy / CTA estratégico / carregamento rápido / métricas',
    result: 'Oferta + ação',
  },
  {
    phase: 'Publicação',
    problem: 'Preciso colocar isso no ar, do jeito certo.',
    service: 'Hospedagem e publicação',
    description: 'Domínio, SSL, deploy e ambiente configurados conforme a necessidade da entrega.',
    deliverables: 'Hostinger / domínio / SSL / deploy',
    result: 'Publicação + estabilidade',
  },
  {
    phase: 'Evolução',
    problem: 'Meu site precisa continuar melhorando.',
    service: 'Manutenção e evolução',
    description: 'Acompanhamento para manter o site atualizado e evoluir depois da primeira versão.',
    deliverables: 'suporte / melhorias / ajustes / atualização',
    result: 'Suporte + melhoria',
  },
];

const desktopQuery = '(min-width: 768px)';

export default function SolutionsTrail() {
  const [openIndex, setOpenIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const rowRefs = useRef([]);
  const id = useId();

  useEffect(() => {
    const media = window.matchMedia(desktopQuery);
    const updateViewport = () => setIsDesktop(media.matches);
    updateViewport();
    media.addEventListener('change', updateViewport);
    if (!('IntersectionObserver' in window)) {
      return () => media.removeEventListener('change', updateViewport);
    }

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (!visible.length) return;
      const viewportCenter = window.innerHeight / 2;
      const nearest = visible.reduce((best, entry) => {
        const distance = Math.abs(entry.boundingClientRect.top + entry.boundingClientRect.height / 2 - viewportCenter);
        return distance < best.distance ? { index: Number(entry.target.dataset.index), distance } : best;
      }, { index: 0, distance: Infinity });
      setCurrentIndex(nearest.index);
    }, { rootMargin: '-35% 0px -35% 0px', threshold: 0 });

    const observeRows = () => {
      observer.disconnect();
      if (media.matches) rowRefs.current.forEach((row) => row && observer.observe(row));
    };
    observeRows();
    media.addEventListener('change', observeRows);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', updateViewport);
      media.removeEventListener('change', observeRows);
    };
  }, []);

  const activeIndex = isDesktop ? currentIndex : openIndex;

  return (
    <Container size="wide">
      <header className={styles.intro}>
        <p className={styles.eyebrow}>Soluções principais</p>
        <h2 id="services-solutions-title">Escolha pelo problema que precisa resolver.</h2>
        <p className={styles.subtitle}>Cada solução responde a um momento do projeto. Siga a trilha ou vá direto ao seu caso.</p>
      </header>

      <div className={styles.trail} style={{ '--trail-progress': activeIndex / (solutions.length - 1) }}>
        {solutions.map((solution, index) => {
          const expanded = openIndex === index;
          const panelId = `${id}-panel-${index}`;
          const headingId = `${id}-heading-${index}`;
          return (
            <article
              className={`${styles.item} ${activeIndex === index ? styles.current : ''} ${activeIndex > index ? styles.complete : ''} ${expanded ? styles.expanded : ''}`}
              key={solution.phase}
              ref={(node) => { rowRefs.current[index] = node; }}
              data-index={index}
            >
              <span className={styles.node} aria-hidden="true" />
              <h3 className={styles.problem} id={headingId}>
                <button
                  className={styles.toggle}
                  type="button"
                  aria-expanded={isDesktop || expanded}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(index)}
                >
                  <span className={styles.label}>{String(index + 1).padStart(2, '0')} · {solution.phase}</span>
                  <span className={styles.problemText}>{solution.problem}</span>
                  <span className={styles.chevron} aria-hidden="true" />
                </button>
              </h3>
              <div className={styles.panelWrap}>
                <div className={styles.panel} id={panelId} role="region" aria-labelledby={headingId} inert={!isDesktop && !expanded}>
                  <div className={styles.panelContent}>
                    <strong className={styles.service}>{solution.service}</strong>
                    <p className={styles.description}>{solution.description}</p>
                    <p className={styles.deliverables}>{solution.deliverables}</p>
                    <p className={styles.result}><span aria-hidden="true">→ </span>{solution.result}</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Container>
  );
}
