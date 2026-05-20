import { differentials } from '../../data/siteContent';
import SectionHeader from './SectionHeader';
import styles from './Differentials.module.css';

export default function Differentials() {
  return (
    <section className={styles.section}>
      <SectionHeader
        eyebrow="Diferenciais"
        title="Construção enxuta, visual forte e manutenção simples"
        description="A primeira versão já nasce com padrões de projeto que facilitam evolução visual e técnica."
      />
      <div className={styles.list}>
        {differentials.map((item) => (
          <article key={item} className={styles.item}>
            <span />
            <p>{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
