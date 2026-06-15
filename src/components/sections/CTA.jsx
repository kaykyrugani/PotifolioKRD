import { whatsappLabel, whatsappUrl } from '../../utils/contact';
import Button from '../ui/Button';
import styles from './CTA.module.css';

export default function CTA({ reveal }) {
  const sectionKey = 'cta';
  const itemKey = 'cta-box';

  return (
    <section
      id="contato"
      className={reveal?.getRevealSectionClassName(styles.section, sectionKey) ?? styles.section}
      ref={(node) => reveal?.setRevealSectionRef(sectionKey, node)}
    >
      <div
        className={reveal?.getRevealItemClassName(styles.box, itemKey) ?? styles.box}
        ref={(node) => reveal?.setRevealItemRef(itemKey, node)}
      >
        <div>
          <span className={`${styles.eyebrow} ${reveal?.styles.revealEyebrow ?? ''}`}>Contato</span>
          <h2 className={reveal?.styles.revealTitle}>Pronto para transformar sua presença digital?</h2>
          <p className={reveal?.styles.revealDescription}>
            Fale diretamente comigo para apresentar seu projeto, alinhar necessidades e definir o melhor caminho para sua presença digital.
          </p>
        </div>
        <div className={styles.actions}>
          <Button href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp: {whatsappLabel}</Button>
          <Button to="/servicos" variant="secondary">Ver serviços</Button>
        </div>
      </div>
    </section>
  );
}
