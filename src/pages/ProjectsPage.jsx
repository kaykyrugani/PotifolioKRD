import { useState } from 'react';
import { projectPreviews } from '../data/siteContent';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import projetosHeroImage from '../assets/images/projetosIMG.png';
import { whatsappPath } from '../utils/contact';
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

  const filteredProjects = projectPreviews.filter((project) => (
    activeFilter === 'all' || project.filters.includes(activeFilter)
  ));

  return (
    <PageLayout>
      <section className={styles.projectsPage}>
        <div className={styles.projectsBackground} aria-hidden="true" />

        <section className={styles.projectsHero} aria-labelledby="projects-page-title">
          <Container size="wide">
            <div className={styles.projectsHeroGrid}>
              <div className={styles.projectsHeroCopy}>
                <p className={styles.projectsEyebrow}>PROJETOS</p>
                <h1 id="projects-page-title">
                  Projetos desenvolvidos com foco em resultado, experiência e execução técnica.
                </h1>
                <p>
                  Cada projeto possui necessidades diferentes. A construção combina estratégia, design, performance e desenvolvimento para criar experiências digitais com propósito.
                </p>
                <div className={styles.projectsHeroActions}>
                  <Button href="#projetos-lista">Ver projetos</Button>
                  <Button to={whatsappPath} variant="secondary">Iniciar projeto</Button>
                </div>
              </div>

              <div className={`${styles.heroImageVisual} ${styles.projectsHeroSignal}`} aria-hidden="true">
                <img src={projetosHeroImage} alt="" loading="eager" />
              </div>
            </div>
          </Container>
        </section>

        <section className={styles.projectsShowcase} id="projetos-lista" aria-labelledby="projects-showcase-title">
          <Container size="wide">
            <div className={styles.projectsSectionIntro}>
              <p className={styles.projectsEyebrow}>SHOWCASE PRINCIPAL</p>
              <h2 id="projects-showcase-title">Como a entrega ganha forma antes de virar resultado.</h2>
              <span>
                Os blocos abaixo mostram estruturas de projeto preparadas para receber cases, imagens e links reais quando esses materiais forem fornecidos.
              </span>
            </div>

            <div className={styles.projectsFilters} aria-label="Filtros de projetos">
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
                  className={`${styles.projectsCase} ${index % 2 === 1 ? styles.projectsCaseReverse : ''}`}
                  key={project.title}
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
        </section>

        <section className={styles.projectsProcessSection} id="processo-aplicado" aria-labelledby="projects-process-title">
          <Container size="wide">
            <div className={styles.projectsSectionIntro}>
              <p className={styles.projectsEyebrow}>PROCESSO APLICADO</p>
              <h2 id="projects-process-title">O que foi aplicado nesses projetos</h2>
            </div>

            <ol className={styles.projectsProcessFlow}>
              {processSteps.map((step, index) => (
                <li className={styles.projectsProcessStep} key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className={styles.projectsResultsSection} aria-labelledby="projects-results-title">
          <Container size="wide">
            <div className={styles.projectsResultsComposition}>
              <div className={styles.projectsResultsCopy}>
                <p className={styles.projectsEyebrow}>RESULTADOS</p>
                <h2 id="projects-results-title">Indicadores reais de uma entrega bem construída.</h2>
              </div>

              <div className={styles.projectsResultsTrack}>
                {resultSignals.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className={styles.projectsFinalCta} aria-labelledby="projects-final-title">
          <Container>
            <div className={styles.projectsFinalBox}>
              <p className={styles.projectsEyebrow}>PRÓXIMO PROJETO</p>
              <h2 id="projects-final-title">Seu projeto pode ser o próximo.</h2>
              <p>Me conte sua ideia e vamos transformar ela em uma experiência digital estratégica.</p>
              <div className={styles.projectsFinalActions}>
                <Button to={whatsappPath}>Chamar no WhatsApp</Button>
                <Button to="/servicos" variant="secondary">Ver serviços</Button>
              </div>
            </div>
          </Container>
        </section>
      </section>
    </PageLayout>
  );
}
