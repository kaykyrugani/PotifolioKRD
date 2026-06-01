import { differentials } from '../../data/siteContent';
import SectionHeader from './SectionHeader';
import styles from './Differentials.module.css';

const createRevealItemKey = (groupKey, index) => `${groupKey}-${index}`;

export default function Differentials({ reveal }) {
  const sectionKey = 'differentials';

  return (
    <section
      className={reveal?.getRevealSectionClassName(styles.section, sectionKey) ?? styles.section}
      ref={(node) => reveal?.setRevealSectionRef(sectionKey, node)}
    >
      <SectionHeader
        eyebrow="Diferenciais"
        title="Construção enxuta, visual forte e manutenção simples"
        description="A primeira versão já nasce com padrões de projeto que facilitam evolução visual e técnica."
        revealStyles={reveal?.styles}
      />
      <div className={styles.list}>
        {differentials.map((item, index) => (
          <article
            key={item}
            className={reveal?.getRevealItemClassName(styles.item, createRevealItemKey('differentials', index)) ?? styles.item}
            ref={(node) => reveal?.setRevealItemRef(createRevealItemKey('differentials', index), node)}
          >
            <span />
            <p>{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
