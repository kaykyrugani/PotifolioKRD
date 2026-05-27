import { motion } from 'framer-motion';
import styles from './TechNetworkDecoration.module.css';

const heroNodes = ['Figma', 'React', 'SEO', 'IA', 'Performance', 'Hospedagem'];

export default function TechNetworkDecoration({ style }) {
  return (
    <motion.div className={styles.techHeroNetwork} style={style} aria-hidden="true">
      <svg className={styles.techHeroNetworkLines} viewBox="0 0 520 460">
        <path d="M260 230L106 116" />
        <path d="M260 230L270 64" />
        <path d="M260 230L424 124" />
        <path d="M260 230L430 342" />
        <path d="M260 230L248 398" />
        <path d="M260 230L90 330" />
        <path d="M106 116C178 92 342 86 424 124" />
        <path d="M90 330C180 386 326 394 430 342" />
      </svg>

      <div className={styles.techHeroCore}>
        <span>Sistema</span>
        <strong>Entrega digital</strong>
      </div>

      {heroNodes.map((node, index) => (
        <span className={`${styles.techHeroNode} ${styles[`techHeroNode${index + 1}`]}`} key={node}>
          {node}
        </span>
      ))}
    </motion.div>
  );
}
