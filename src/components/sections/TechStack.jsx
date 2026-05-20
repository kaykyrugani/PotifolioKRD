import { motion } from 'framer-motion';
import styles from './TechStack.module.css';

const techStack = [
  {
    name: 'React',
    icon: 'Re',
    description: 'Interfaces modernas, componentizadas e escaláveis para experiências rápidas e organizadas.',
    use: 'interfaces componentizadas',
    featured: true,
  },
  {
    name: 'JavaScript',
    icon: 'JS',
    description: 'Interatividade, lógica de interface e recursos dinâmicos com foco em performance.',
    use: 'comportamento dinâmico',
  },
  {
    name: 'HTML',
    icon: 'H5',
    description: 'Estrutura semântica para SEO, acessibilidade e melhor leitura pelos mecanismos de busca.',
    use: 'base semântica',
  },
  {
    name: 'CSS',
    icon: 'CSS',
    description: 'Layouts responsivos, animações suaves e identidade visual premium sem dependências pesadas.',
    use: 'interface responsiva',
  },
  {
    name: 'Vite',
    icon: 'Vi',
    description: 'Ambiente moderno para desenvolvimento rápido, builds otimizados e experiência fluida.',
    use: 'fluxo de desenvolvimento',
  },
  {
    name: 'Node.js',
    icon: 'Nd',
    description: 'Base para integrações, APIs e soluções web que podem evoluir conforme o projeto.',
    use: 'evolução técnica',
    featured: true,
  },
  {
    name: 'APIs',
    icon: 'API',
    description: 'Conexão com formulários, automações, WhatsApp, serviços externos e recursos personalizados.',
    use: 'integrações sob demanda',
  },
  {
    name: 'SEO',
    icon: 'SEO',
    description: 'Estrutura técnica para melhorar indexação, leitura semântica e presença digital.',
    use: 'presença orgânica',
  },
  {
    name: 'Performance',
    icon: 'Px',
    description: 'Otimizações para carregamento rápido, melhor experiência e maior taxa de conversão.',
    use: 'velocidade e conversão',
    featured: true,
  },
];

export default function TechStack() {
  return (
    <section id="tecnologias" className={styles.section}>
      <svg className={styles.orbit} viewBox="0 0 300 300" aria-hidden="true">
        <circle cx="150" cy="150" r="116" />
        <circle cx="150" cy="150" r="78" />
        <path d="M49 150c36-46 75-69 117-69 35 0 63 14 85 41" />
        <path d="M251 150c-36 46-75 69-117 69-35 0-63-14-85-41" />
        <line x1="96" y1="92" x2="205" y2="207" />
        <line x1="218" y1="108" x2="83" y2="196" />
        <circle cx="96" cy="92" r="5" />
        <circle cx="218" cy="108" r="5" />
        <circle cx="205" cy="207" r="5" />
        <circle cx="83" cy="196" r="5" />
      </svg>

      <div className={styles.inner}>
        <header className={styles.header}>
          <span>Stack</span>
          <h2>Tecnologias que sustentam sites rápidos, modernos e escaláveis</h2>
          <p>
            Uma base técnica pensada para criar interfaces profissionais, otimizadas para SEO,
            performance e evolução contínua.
          </p>
        </header>

        <div className={styles.grid}>
          {techStack.map((tech, index) => (
            <motion.article
              className={`${styles.card} ${tech.featured ? styles.featured : ''}`}
              key={tech.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
            >
              <span className={styles.icon}>{tech.icon}</span>
              <div>
                <h3>{tech.name}</h3>
                <p>{tech.description}</p>
              </div>
              <small>Uso: {tech.use}</small>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
