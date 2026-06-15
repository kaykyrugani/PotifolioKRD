import { projectPreviews } from '../../data/siteContent';
import landingPagePreview from '../../assets/images/landingPage.webp';
import institutionalPreview from '../../assets/images/institucional.webp';
import servicesPagePreview from '../../assets/images/PageServicos.webp';
import customProjectPreview from '../../assets/images/projPersonalisado.webp';
import krdLogoDecoration from '../../assets/logos/logoKRD2semFndo.webp';
import { whatsappUrl } from '../../utils/contact';
import Button from '../ui/Button';
import SectionHeader from './SectionHeader';
import styles from './Projects.module.css';

const createRevealItemKey = (groupKey, index) => `${groupKey}-${index}`;

const projectPreviewImages = [
  landingPagePreview,
  institutionalPreview,
  servicesPagePreview,
  customProjectPreview,
];

export default function Projects({ reveal }) {
  const sectionKey = 'projects';

  return (
    <section
      id="projetos"
      className={reveal?.getRevealSectionClassName(styles.section, sectionKey) ?? styles.section}
      ref={(node) => reveal?.setRevealSectionRef(sectionKey, node)}
    >
      <SectionHeader
        eyebrow="Projetos Preview"
        title="Estruturas que mostram como o portfólio pode evoluir"
        description="Cards conceituais, sem links ou cases reais enquanto os dados finais não forem fornecidos."
        revealStyles={reveal?.styles}
      />
      <div className={styles.grid}>
        {projectPreviews.map((project, index) => (
          <article
            className={reveal?.getRevealItemClassName(styles.card, createRevealItemKey('projects', index)) ?? styles.card}
            key={project.title}
            ref={(node) => reveal?.setRevealItemRef(createRevealItemKey('projects', index), node)}
          >
            <div className={styles.preview}>
              <img src={projectPreviewImages[index]} alt={`Preview visual - ${project.title}`} />
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <Button href={whatsappUrl} target="_blank" rel="noreferrer" variant="ghost">Discutir projeto</Button>
          </article>
        ))}
        <div className={styles.logoDecoration} aria-hidden="true">
          <img src={krdLogoDecoration} alt="" />
        </div>
      </div>
    </section>
  );
}
