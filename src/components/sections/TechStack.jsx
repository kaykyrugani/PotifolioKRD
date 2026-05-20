import { technologies } from '../../data/siteContent';
import SectionHeader from './SectionHeader';
import styles from './TechStack.module.css';

export default function TechStack() {
  return (
    <section id="tecnologias" className={styles.section}>
      <SectionHeader
        eyebrow="Stack"
        title="Tecnologias para construir experiências rápidas"
        description="Base moderna para interfaces profissionais, organizadas e preparadas para evolução."
      />
      <div className={styles.grid}>
        {technologies.map((tech) => (
          <article className={styles.item} key={tech}>
            <span>{tech.slice(0, 2)}</span>
            <h3>{tech}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
