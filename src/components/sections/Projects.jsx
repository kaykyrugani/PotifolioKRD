import { projectPreviews } from '../../data/siteContent';
import Button from '../ui/Button';
import SectionHeader from './SectionHeader';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section id="projetos" className={styles.section}>
      <SectionHeader
        eyebrow="Projetos Preview"
        title="Estruturas que mostram como o portfólio pode evoluir"
        description="Cards conceituais, sem links ou cases reais enquanto os dados finais não forem fornecidos."
      />
      <div className={styles.grid}>
        {projectPreviews.map((project) => (
          <article className={styles.card} key={project.title}>
            <div className={styles.preview} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <Button to="/contato" variant="ghost">Discutir projeto</Button>
          </article>
        ))}
      </div>
    </section>
  );
}
