import { motion, useReducedMotion } from 'framer-motion';
import Button from '../ui/Button';
import styles from './TechStack.module.css';

const techCore = [
  {
    name: 'React',
    category: 'Frontend',
    role: 'Interfaces componentizadas',
    level: 'primary',
    group: 'frontend',
    area: 'reactCard',
  },
  {
    name: 'Performance',
    category: 'Otimização',
    role: 'Carregamento rápido',
    level: 'primary',
    group: 'optimization',
    area: 'performanceCard',
  },
  {
    name: 'SEO',
    category: 'Otimização',
    role: 'Base técnica para busca',
    level: 'primary',
    group: 'optimization',
    area: 'seoCard',
  },
  {
    name: 'Node.js',
    category: 'Backend',
    role: 'Evolução e integrações',
    level: 'secondary',
    group: 'backend',
    area: 'nodeCard',
  },
  {
    name: 'JavaScript',
    category: 'Frontend',
    role: 'Interação e lógica',
    level: 'secondary',
    group: 'frontend',
    area: 'javascriptCard',
  },
  {
    name: 'Vite',
    category: 'Frontend',
    role: 'Build moderno',
    level: 'secondary',
    group: 'frontend',
    area: 'viteCard',
  },
  {
    name: 'CSS',
    category: 'Frontend',
    role: 'Layout responsivo',
    level: 'tertiary',
    group: 'frontend',
    area: 'cssCard',
  },
  {
    name: 'APIs',
    category: 'Backend',
    role: 'Conexões sob demanda',
    level: 'tertiary',
    group: 'backend',
    area: 'apisCard',
  },
];

const stackSignals = [
  '8+ tecnologias',
  'Performance First',
  'SEO Ready',
];

const techGroups = [
  { key: 'frontend', label: 'Frontend', index: '01' },
  { key: 'backend', label: 'Backend', index: '02' },
  { key: 'optimization', label: 'Otimização', index: '03' },
];

const levelDelay = {
  primary: 0.46,
  secondary: 0.62,
  tertiary: 0.78,
};

export default function TechStack({ reveal }) {
  const sectionKey = 'techStack';
  const prefersReducedMotion = useReducedMotion();

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
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.58, delay: 0.28, ease: 'easeOut' }}
          >
            <span>Core</span>
            <strong>Tech</strong>
          </motion.div>

          <div className={styles.coreGrid}>
            {techGroups.map((group) => (
              <div
                className={`${styles.techGroup} ${styles[`${group.key}Group`]}`}
                key={group.key}
                role="group"
                aria-label={group.label}
              >
                <header className={styles.groupTitle}>
                  <span>{group.index}</span>
                  <strong>{group.label}</strong>
                </header>

                <div className={styles.techGroupGrid}>
                  {techCore.filter((tech) => tech.group === group.key).map((tech) => (
                    <motion.article
                      className={`${styles.techCard} ${styles[tech.level]} ${styles[tech.group]} ${styles[tech.area]}`}
                      key={tech.name}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 22, scale: 0.96, filter: 'blur(10px)' }}
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
              </div>
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
