import { useState } from 'react';
import { projectPreviews } from '../data/siteContent';
import PageLayout from '../components/layout/PageLayout';
import SectionFold from '../components/SectionFold/SectionFold';
import FeaturedCases from '../components/sections/FeaturedCases';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import celularHeroImage from '../assets/images/celularIMG.webp';
import monitorHeroImage from '../assets/images/monitorIMG.webp';
import projetosHeroImage from '../assets/images/projetosIMG.webp';
import tabletHeroImage from '../assets/images/tabletIMG.webp';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { whatsappUrl } from '../utils/contact';
import styles from './Page.module.css';

const filters = [
  { label: 'Todos', value: 'all' },
  { label: 'Landing Pages', value: 'landing' },
  { label: 'Institucional', value: 'institucional' },
  { label: 'Projetos personalizados', value: 'personalizado' },
  { label: 'Sites', value: 'sites' },
];

const processSteps = ['Briefing', 'Estratégia', 'Figma', 'Desenvolvimento', 'SEO', 'Deploy'];

const resultSignals = [
  'Performance otimizada',
  'Estrutura preparada para SEO',
  'Código escalável',
  'Experiência responsiva',
  'Carregamento rápido',
];

const toneClasses = {
  cyan: styles.projectsPreviewCyan,
  violet: styles.projectsPreviewViolet,
  blue: styles.projectsPreviewBlue,
  teal: styles.projectsPreviewTeal,
};

const revealSectionKeys = {
  showcase: 'showcase',
  process: 'process',
  results: 'results',
  finalCta: 'finalCta',
};

const revealSectionKeyList = Object.values(revealSectionKeys);

const createRevealItemKey = (groupKey, value) => `${groupKey}-${value}`;

const revealItemKeyList = [
  'filters',
  ...projectPreviews.map((project) => createRevealItemKey('project', project.title)),
  ...processSteps.map((step) => createRevealItemKey('process', step)),
  ...resultSignals.map((signal) => createRevealItemKey('result', signal)),
  'final-box',
];

function ProjectPreviewFrame({ project }) {
  return (
    <div className={`${styles.projectsPreviewFrame} ${toneClasses[project.tone] || ''}`} aria-hidden="true">
      <div className={styles.projectsPreviewBrowser}>
        <span />
        <span />
        <span />
      </div>

      <div className={styles.projectsPreviewHero}>
        <span>{project.preview.eyebrow}</span>
        <strong>{project.preview.title}</strong>
        <div className={styles.projectsPreviewLines}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.projectsPreviewActions}>
          <span />
          <span />
        </div>
      </div>

      <div className={styles.projectsPreviewPanels}>
        {project.preview.details.map((detail) => (
          <span key={detail}>{detail}</span>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const {
    setRevealSectionRef,
    getRevealSectionClassName,
    setRevealItemRef,
    getRevealItemClassName,
  } = useRevealOnScroll({
    sectionKeys: revealSectionKeyList,
    itemKeys: revealItemKeyList,
    styles,
    debugLabel: 'Projects',
  });

  const filteredProjects = projectPreviews.filter((project) => (
    activeFilter === 'all' || project.filters.includes(activeFilter)
  ));

  return (
    <PageLayout>
      <section className={styles.projectsPage}>
        <div className={styles.projectsBackground} aria-hidden="true" />

        <SectionFold
          className={`${styles.projectsHero} ${styles.projectsFoldHero}`}
          variant="bottom"
          aria-labelledby="projects-page-title"
        >
          <Container size="wide">
            <div className={styles.projectsHeroGrid}>
              <div className={styles.projectsHeroCopy}>
                <p className={`${styles.projectsEyebrow} ${styles.projectsHeroEyebrow}`}>PROJETOS</p>
                <h1 id="projects-page-title">
                  <span className={styles.projectsHeroTitleLine}>Projetos desenvolvidos </span>
                  <span className={styles.projectsHeroTitleLine}>com foco em resultado, </span>
                  <span className={styles.projectsHeroTitleLine}>experiência e execução técnica.</span>
                </h1>
                <p className={styles.projectsHeroDescription}>
                  Cada projeto possui necessidades diferentes. A construção combina estratégia, design, performance e desenvolvimento para criar experiências digitais com propósito.
                </p>
                <div className={styles.projectsHeroActions}>
                  <Button className={styles.projectsHeroPrimaryAction} href="#projetos-lista">Ver projetos</Button>
                  <Button className={styles.projectsHeroSecondaryAction} href={whatsappUrl} target="_blank" rel="noreferrer" variant="secondary">Iniciar projeto</Button>
                </div>
              </div>

              <div className={`${styles.heroImageVisual} ${styles.projectsHeroSignal}`} aria-hidden="true">
                <span className={styles.projectsHeroGlow} />
                <span className={styles.projectsHeroShadow} />
                <svg className={styles.projectsHeroConnections} viewBox="0 0 620 430" aria-hidden="true">
                  <path d="M150 104C244 48 392 44 500 118" />
                  <path d="M90 318C204 386 388 390 536 300" />
                  <path d="M190 170C282 230 392 236 486 178" />
                </svg>
                <span className={`${styles.projectsHeroDot} ${styles.projectsHeroDotOne}`} />
                <span className={`${styles.projectsHeroDot} ${styles.projectsHeroDotTwo}`} />
                <span className={`${styles.projectsHeroDot} ${styles.projectsHeroDotThree}`} />

                <div className={`${styles.projectsHeroDevice} ${styles.projectsHeroMonitor}`}>
                  <img src={monitorHeroImage} alt="" loading="eager" />
                </div>

                <div className={`${styles.projectsHeroDevice} ${styles.projectsHeroTablet}`}>
                  <img src={tabletHeroImage} alt="" loading="eager" />
                </div>

                <div className={`${styles.projectsHeroDevice} ${styles.projectsHeroPhone}`}>
                  <img src={celularHeroImage} alt="" loading="eager" />
                </div>

                <div className={styles.projectsHeroPerson}>
                  <img src={projetosHeroImage} alt="" loading="eager" />
                </div>
              </div>
            </div>
          </Container>
        </SectionFold>

        <SectionFold
          className={getRevealSectionClassName(`${styles.projectsShowcase} ${styles.projectsFoldShowcase}`, revealSectionKeys.showcase)}
          variant="top"
          id="projetos-lista"
          ref={(node) => setRevealSectionRef(revealSectionKeys.showcase, node)}
          aria-labelledby="projects-showcase-title"
        >
          <Container size="wide">
            <div className={styles.projectsSectionIntro}>
              <p className={`${styles.projectsEyebrow} ${styles.revealEyebrow}`}>SHOWCASE PRINCIPAL</p>
              <h2 className={styles.revealTitle} id="projects-showcase-title">Como a entrega ganha forma antes de virar resultado.</h2>
              <span className={styles.revealDescription}>
                Os blocos abaixo mostram estruturas de projeto preparadas para receber cases, imagens e links reais quando esses materiais forem fornecidos.
              </span>
            </div>

            <div
              className={getRevealItemClassName(styles.projectsFilters, 'filters')}
              ref={(node) => setRevealItemRef('filters', node)}
              aria-label="Filtros de projetos"
            >
              {filters.map((filter) => (
                <button
                  className={`${styles.projectsFilterButton} ${activeFilter === filter.value ? styles.projectsFilterButtonActive : ''}`}
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className={styles.projectsCases}>
              {filteredProjects.map((project, index) => (
                <article
                  className={getRevealItemClassName(`${styles.projectsCase} ${index % 2 === 1 ? styles.projectsCaseReverse : ''}`, createRevealItemKey('project', project.title))}
                  key={project.title}
                  ref={(node) => setRevealItemRef(createRevealItemKey('project', project.title), node)}
                  aria-labelledby={`project-${index}-title`}
                >
                  <div className={styles.projectsCaseMedia}>
                    <ProjectPreviewFrame project={project} />
                  </div>

                  <div className={styles.projectsCaseContent}>
                    <span className={styles.projectsCaseNumber}>{String(index + 1).padStart(2, '0')}</span>
                    <p className={styles.projectsCaseCategory}>{project.category}</p>
                    <h3 id={`project-${index}-title`}>{project.title}</h3>
                    <p>{project.description}</p>
                    <p>{project.objective}</p>
                    <p>{project.solution}</p>

                    <ul className={styles.projectsIndicators}>
                      {project.indicators.map((indicator) => (
                        <li key={indicator}>{indicator}</li>
                      ))}
                    </ul>

                    <div className={styles.projectsCaseActions}>
                      <button className={styles.projectsDemoButton} type="button" disabled title="Demo sem link real cadastrado">
                        Ver demo
                      </button>
                      <a className={styles.projectsDetailButton} href="#processo-aplicado">
                        Ver detalhes
                      </a>
                    </div>

                    <div className={styles.projectsTechBar} aria-label="Base técnica do projeto">
                      {project.stack.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </SectionFold>

        <FeaturedCases className={styles.projectsFoldCases} foldVariant="bottom" />

        <div className={styles.projectsProcessChapter}>
          <SectionFold
            className={getRevealSectionClassName(`${styles.projectsProcessSection} ${styles.projectsFoldProcess}`, revealSectionKeys.process)}
            variant="top"
            id="processo-aplicado"
            ref={(node) => setRevealSectionRef(revealSectionKeys.process, node)}
            aria-labelledby="projects-process-title"
          >
            <Container size="wide">
              <div className={styles.projectsSectionIntro}>
                <p className={`${styles.projectsEyebrow} ${styles.revealEyebrow}`}>PROCESSO APLICADO</p>
                <h2 className={styles.revealTitle} id="projects-process-title">O que foi aplicado nesses projetos</h2>
              </div>

              <ol className={styles.projectsProcessFlow}>
                {processSteps.map((step, index) => (
                  <li
                    className={getRevealItemClassName(styles.projectsProcessStep, createRevealItemKey('process', step))}
                    key={step}
                    ref={(node) => setRevealItemRef(createRevealItemKey('process', step), node)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{step}</strong>
                  </li>
                ))}
              </ol>
            </Container>
          </SectionFold>

          <section
            className={getRevealSectionClassName(styles.projectsResultsSection, revealSectionKeys.results)}
            ref={(node) => setRevealSectionRef(revealSectionKeys.results, node)}
            aria-labelledby="projects-results-title"
          >
            <Container size="wide">
              <div className={styles.projectsResultsComposition}>
                <div className={styles.projectsResultsCopy}>
                  <p className={`${styles.projectsEyebrow} ${styles.revealEyebrow}`}>RESULTADOS</p>
                  <h2 className={styles.revealTitle} id="projects-results-title">Indicadores reais de uma entrega bem construída.</h2>
                </div>

                <div className={styles.projectsResultsTrack}>
                  {resultSignals.map((signal) => (
                    <span
                      className={getRevealItemClassName('', createRevealItemKey('result', signal))}
                      key={signal}
                      ref={(node) => setRevealItemRef(createRevealItemKey('result', signal), node)}
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </div>
            </Container>
          </section>

          <section
            className={getRevealSectionClassName(styles.projectsFinalCta, revealSectionKeys.finalCta)}
            ref={(node) => setRevealSectionRef(revealSectionKeys.finalCta, node)}
            aria-labelledby="projects-final-title"
          >
            <Container>
              <div
                className={getRevealItemClassName(styles.projectsFinalBox, 'final-box')}
                ref={(node) => setRevealItemRef('final-box', node)}
              >
                <p className={`${styles.projectsEyebrow} ${styles.revealEyebrow}`}>PRÓXIMO PROJETO</p>
                <h2 className={styles.revealTitle} id="projects-final-title">Seu projeto pode ser o próximo.</h2>
                <p className={styles.revealDescription}>Me conte sua ideia e vamos transformar ela em uma experiência digital estratégica.</p>
                <div className={styles.projectsFinalActions}>
                  <Button href={whatsappUrl} target="_blank" rel="noreferrer">Chamar no WhatsApp</Button>
                  <Button to="/servicos" variant="secondary">Ver serviços</Button>
                </div>
              </div>
            </Container>
          </section>
        </div>
      </section>
    </PageLayout>
  );
}
