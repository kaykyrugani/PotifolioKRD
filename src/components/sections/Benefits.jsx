import { benefits } from '../../data/siteContent';
import styles from './Benefits.module.css';

const createRevealItemKey = (groupKey, index) => `${groupKey}-${index}`;

export default function Benefits({ reveal }) {
  const sectionKey = 'benefits';

  return (
    <section
      id="sobre"
      className={reveal?.getRevealSectionClassName(styles.section, sectionKey) ?? styles.section}
      ref={(node) => reveal?.setRevealSectionRef(sectionKey, node)}
    >
      <div className={styles.header}>
        <span className={reveal?.styles.revealEyebrow}>Benefícios</span>
        <h2 className={reveal?.styles.revealTitle}>Uma base digital criada para gerar confiança e conversão</h2>
        <p className={reveal?.styles.revealDescription}>
          Mais do que estar online, seu site precisa comunicar valor, carregar rápido e guiar o visitante até a próxima ação.
        </p>
      </div>

      <div className={styles.benefitsGrid}>
        {benefits.map((benefit, index) => (
          <article
            className={reveal?.getRevealItemClassName(styles.benefitCard, createRevealItemKey('benefits', index)) ?? styles.benefitCard}
            key={benefit.title}
            ref={(node) => reveal?.setRevealItemRef(createRevealItemKey('benefits', index), node)}
          >
            <div className={styles.cardTop}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <i aria-hidden="true" />
            </div>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
            <div className={styles.cardDetail} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
