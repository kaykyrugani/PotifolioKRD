import { benefits } from '../../data/siteContent';
import styles from './Benefits.module.css';

export default function Benefits() {
  return (
    <section id="sobre" className={styles.section}>
      <div className={styles.header}>
        <span>Benefícios</span>
        <h2>Uma base digital criada para gerar confiança e conversão</h2>
        <p>
          Mais do que estar online, seu site precisa comunicar valor, carregar rápido e guiar o visitante até a próxima ação.
        </p>
      </div>

      <div className={styles.benefitsGrid}>
        {benefits.map((benefit, index) => (
          <article className={styles.benefitCard} key={benefit.title}>
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
