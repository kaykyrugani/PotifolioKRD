import { projectPreviews } from '../../data/siteContent';
import landingPagePreview from '../../assets/images/landingPage.webp';
import institutionalPreview from '../../assets/images/institucional.webp';
import servicesPagePreview from '../../assets/images/PageServicos.webp';
import customProjectPreview from '../../assets/images/projPersonalisado.webp';
import Button from '../ui/Button';
import styles from './Projects.module.css';

const createRevealItemKey = (groupKey, index) => `${groupKey}-${index}`;

const projectPreviewImages = [
  { src: landingPagePreview, width: 1600, height: 906 },
  { src: institutionalPreview, width: 1899, height: 1080 },
  { src: servicesPagePreview, width: 1600, height: 896 },
  { src: customProjectPreview, width: 1600, height: 900 },
];

export default function Projects({ reveal }) {
  const sectionKey = 'projects';

  return (
    <section
      id="projetos"
      className={reveal?.getRevealSectionClassName(styles.section, sectionKey) ?? styles.section}
      ref={(node) => reveal?.setRevealSectionRef(sectionKey, node)}
      aria-labelledby="projects-title"
    >
      <header className={styles.header}>
        <span className={`${styles.eyebrow} ${reveal?.styles.revealEyebrow ?? ''}`}>Projetos selecionados</span>
        <h2 id="projects-title" className={reveal?.styles.revealTitle}>
          Sites e experiências digitais construídos com clareza, performance e propósito.
        </h2>
        <p className={reveal?.styles.revealDescription}>
          Uma seleção de projetos que reúne arquitetura de interface, responsividade e base técnica
          preparada para diferentes objetivos digitais.
        </p>
      </header>

      <div className={styles.grid}>
        {projectPreviews.map((project, index) => (
          <article
            className={reveal?.getRevealItemClassName(styles.card, createRevealItemKey('projects', index)) ?? styles.card}
            key={project.title}
            ref={(node) => reveal?.setRevealItemRef(createRevealItemKey('projects', index), node)}
            aria-labelledby={`home-project-${index}-title`}
          >
            <div className={styles.preview}>
              <img
                src={projectPreviewImages[index].src}
                alt={`Prévia visual do projeto ${project.title}`}
                width={projectPreviewImages[index].width}
                height={projectPreviewImages[index].height}
                loading="lazy"
                decoding="async"
              />
              <span className={styles.projectNumber} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <div className={styles.cardContent}>
              <span className={styles.category}>{project.category}</span>
              <h3 id={`home-project-${index}-title`}>{project.title}</h3>
              <p>{project.description}</p>

              <ul className={styles.tags} aria-label={`Tecnologias e características de ${project.title}`}>
                {project.stack.slice(0, 3).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.sectionAction}>
        <p>Veja a seleção completa e conheça os detalhes de cada proposta.</p>
        <Button to="/projetos" variant="secondary">Ver todos os projetos</Button>
      </div>
    </section>
  );
}
