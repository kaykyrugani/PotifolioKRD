import { motion } from 'framer-motion';
import Button from '../ui/Button';
import styles from './TechStack.module.css';

const techCore = [
  {
    name: 'React',
    category: 'Frontend',
    role: 'Interfaces componentizadas',
    level: 'primary',
    group: 'frontend',
  },
  {
    name: 'Performance',
    category: 'Otimização',
    role: 'Carregamento rápido',
    level: 'primary',
    group: 'optimization',
  },
  {
    name: 'SEO',
    category: 'Otimização',
    role: 'Base técnica para busca',
    level: 'primary',
    group: 'optimization',
  },
  {
    name: 'Node.js',
    category: 'Backend',
    role: 'Evolução e integrações',
    level: 'secondary',
    group: 'backend',
  },
  {
    name: 'JavaScript',
    category: 'Frontend',
    role: 'Interação e lógica',
    level: 'secondary',
    group: 'frontend',
  },
  {
    name: 'Vite',
    category: 'Frontend',
    role: 'Build moderno',
    level: 'secondary',
    group: 'frontend',
  },
  {
    name: 'CSS',
    category: 'Frontend',
    role: 'Layout responsivo',
    level: 'tertiary',
    group: 'frontend',
  },
  {
    name: 'APIs',
    category: 'Backend',
    role: 'Conexões sob demanda',
    level: 'tertiary',
    group: 'backend',
  },
];

const stackSignals = [
  '8+ tecnologias',
  'Performance First',
  'SEO Ready',
];

const levelDelay = {
  primary: 0.46,
  secondary: 0.62,
  tertiary: 0.78,
};

export default function TechStack({ reveal }) {
  const sectionKey = 'techStack';

  return (
    <section
      id="tecnologias"
      className={reveal?.getRevealSectionClassName(styles.section, sectionKey) ?? styles.section}
      ref={(node) => reveal?.setRevealSectionRef(sectionKey, node)}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={reveal?.styles.revealEyebrow}>Stack</span>
          <h2 className={reveal?.styles.revealTitle}>Tecnologias que sustentam sites rápidos, modernos e escaláveis</h2>
          <p className={reveal?.styles.revealDescription}>
            Uma base técnica pensada para criar interfaces profissionais, otimizadas para SEO,
            performance e evolução contínua.
          </p>
          <div className={styles.headerActions}>
            <Button to="/tecnologias" variant="secondary">Explorar stack completa</Button>
          </div>
          <ul className={styles.stackSignals} aria-label="Sinais técnicos">
            {stackSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </header>

        <div className={styles.corePanel} aria-label="Core tecnológico dos projetos">
          <motion.div
            className={styles.coreCenter}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.58, delay: 0.28, ease: 'easeOut' }}
            aria-hidden="true"
          >
            <span>Core</span>
            <strong>Tech</strong>
          </motion.div>

          <div className={styles.coreGrid}>
            {techCore.map((tech) => (
              <motion.article
                className={`${styles.techCard} ${styles[tech.level]} ${styles[tech.group]}`}
                key={tech.name}
                initial={{ opacity: 0, y: 22, scale: 0.96, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.48, delay: levelDelay[tech.level], ease: 'easeOut' }}
              >
                <span>{tech.category}</span>
                <h3>{tech.name}</h3>
                <p>{tech.role}</p>
              </motion.article>
            ))}
          </div>

          <div className={styles.groupLegend} aria-label="Grupos de tecnologia">
            <span>Frontend</span>
            <span>Backend</span>
            <span>Otimização</span>
          </div>
        </div>
      </div>
    </section>
  );
}
