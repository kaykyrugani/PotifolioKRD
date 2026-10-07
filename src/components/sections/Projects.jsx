import { useEffect, useRef, useState } from 'react';
import { homeProjects } from '../../data/homeProjects';
import Button from '../ui/Button';
import styles from './Projects.module.css';

const createRevealItemKey = (groupKey, index) => `${groupKey}-${index}`;
const mobileQuery = '(max-width: 859px)';
const hoverQuery = '(hover: hover) and (pointer: fine)';

function ProjectImage({ project }) {
  if (!project.image) {
    return (
      <div className={styles.imagePlaceholder} aria-hidden="true">
        <span>{project.name}</span>
      </div>
    );
  }

  const { src, srcSet, width, height } = project.image;

  return (
    <img
      className={styles.projectImage}
      src={src}
      srcSet={srcSet || undefined}
      sizes="(max-width: 859px) calc(100vw - 2rem), (max-width: 1180px) 55vw, 650px"
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={project.alt}
    />
  );
}

function ProjectDetails({ project, imageLayers, transitionStarted = true }) {
  return (
    <>
      <div className={styles.browserFrame}>
        <div className={styles.browserBar} aria-hidden="true">
          <span /><span /><span />
        </div>
        <div className={styles.imageStage}>
          {imageLayers.map(({ item, current }) => (
            <div
              key={item.slug}
              className={`${styles.imageLayer} ${current
                ? (transitionStarted ? styles.imageLayerCurrent : styles.imageLayerEntering)
                : (transitionStarted ? styles.imageLayerOutgoingFade : styles.imageLayerOutgoing)}`}
              aria-hidden={!current}
              inert={!current}
            >
              <ProjectImage project={item} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.projectDetails}>
        <div className={styles.projectHeading}>
          <h3>{project.name}</h3>
          <span>{project.category}</span>
        </div>
        <p className={styles.summary}>{project.summary}</p>
        <Button
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          className={styles.siteLink}
          aria-label={`Ver site ${project.name}, abre em nova aba`}
        >
          Ver site
        </Button>
      </div>
    </>
  );
}

export default function Projects({ reveal }) {
  const sectionKey = 'projects';
  const projects = homeProjects.filter((project) => project.visible);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(mobileQuery).matches);
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug);
  const [expandedSlug, setExpandedSlug] = useState(projects[0]?.slug);
  const [outgoingProject, setOutgoingProject] = useState(null);
  const [transitionStarted, setTransitionStarted] = useState(true);
  const swapTimer = useRef(0);
  const swapFrame = useRef(0);
  const activeProject = projects.find((project) => project.slug === activeSlug) ?? projects[0];

  useEffect(() => {
    const media = window.matchMedia(mobileQuery);
    const update = () => setIsMobile(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => () => {
    window.clearTimeout(swapTimer.current);
    window.cancelAnimationFrame(swapFrame.current);
  }, []);

  const selectProject = (project) => {
    if (project.slug === activeSlug) return;
    setOutgoingProject(activeProject);
    setTransitionStarted(false);
    setActiveSlug(project.slug);
    window.clearTimeout(swapTimer.current);
    window.cancelAnimationFrame(swapFrame.current);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOutgoingProject(null);
      setTransitionStarted(true);
      return;
    }
    swapFrame.current = window.requestAnimationFrame(() => setTransitionStarted(true));
    swapTimer.current = window.setTimeout(() => setOutgoingProject(null), 260);
  };

  const imageLayers = [
    ...(outgoingProject && outgoingProject.slug !== activeProject.slug
      ? [{ item: outgoingProject, current: false }]
      : []),
    ...(activeProject ? [{ item: activeProject, current: true }] : []),
  ];

  const renderProjectRows = (mobile) => (
    <ul className={styles.projectList}>
      {projects.map((project, index) => {
        const selected = mobile ? expandedSlug === project.slug : activeSlug === project.slug;
        const panelId = mobile ? `home-project-panel-${project.slug}` : 'home-project-preview';
        const itemKey = createRevealItemKey('projects', index);

        return (
          <li
            key={project.slug}
            className={reveal?.getRevealItemClassName(styles.projectRow, itemKey) ?? styles.projectRow}
            ref={(node) => reveal?.setRevealItemRef(itemKey, node)}
          >
            <button
              type="button"
              className={`${styles.projectButton} ${selected ? styles.projectButtonActive : ''}`}
              aria-expanded={selected}
              aria-controls={panelId}
              onPointerEnter={() => {
                if (!mobile && window.matchMedia(hoverQuery).matches) selectProject(project);
              }}
              onFocus={() => {
                if (!mobile) selectProject(project);
              }}
              onClick={() => {
                if (mobile) {
                  setExpandedSlug((current) => current === project.slug ? null : project.slug);
                  setActiveSlug(project.slug);
                } else {
                  selectProject(project);
                }
              }}
            >
              <span className={styles.projectNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.projectName}>{project.name}</span>
              <span className={styles.projectCategory}>{project.category}</span>
            </button>
            {mobile && (
              <div
                className={`${styles.accordionPanel} ${selected ? styles.accordionPanelOpen : ''}`}
                id={panelId}
                aria-hidden={!selected}
                inert={!selected}
                aria-live="polite"
              >
                <div className={styles.accordionInner}>
                  {selected && <ProjectDetails project={project} imageLayers={[{ item: project, current: true }]} />}
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <section
      id="projetos"
      className={reveal?.getRevealSectionClassName(styles.section, sectionKey) ?? styles.section}
      ref={(node) => reveal?.setRevealSectionRef(sectionKey, node)}
      aria-labelledby="projects-title"
    >
      <header className={styles.header}>
        <span className={`${styles.eyebrow} ${reveal?.styles.revealEyebrow ?? ''}`}>Projetos selecionados</span>
        <h2 id="projects-title" className={reveal?.styles.revealTitle}>Sites pensados para gerar contato</h2>
        <p className={reveal?.styles.revealDescription}>
          Uma seleção de sites reais, de consultoria jurídica a cafés especiais e eventos culturais.
        </p>
      </header>

      {isMobile ? (
        <div className={styles.mobileProjects}>{renderProjectRows(true)}</div>
      ) : (
        <div className={styles.desktopProjects}>
          <div className={styles.projectNavigation}>
            {renderProjectRows(false)}
            <Button to="/projetos" variant="ghost" className={styles.allProjectsLink}>Ver todos os projetos</Button>
          </div>
          <div className={styles.preview} id="home-project-preview" aria-live="polite" aria-atomic="true">
            {activeProject && (
              <ProjectDetails
                project={activeProject}
                imageLayers={imageLayers}
                transitionStarted={transitionStarted}
              />
            )}
          </div>
          <div className={styles.mobileAllProjects}>
            <Button to="/projetos" variant="ghost" className={styles.allProjectsLink}>Ver todos os projetos</Button>
          </div>
        </div>
      )}
      {isMobile && (
        <div className={styles.mobileAllProjects}>
          <Button to="/projetos" variant="ghost" className={styles.allProjectsLink}>Ver todos os projetos</Button>
        </div>
      )}
    </section>
  );
}
