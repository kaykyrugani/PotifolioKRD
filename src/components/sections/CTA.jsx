import { whatsappLabel, whatsappPath } from '../../utils/contact';
import Button from '../ui/Button';
import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section id="contato" className={styles.section}>
      <div className={styles.box}>
        <div>
          <span className={styles.eyebrow}>Contato</span>
          <h2>Pronto para transformar sua presença digital?</h2>
          <p>
            A próxima etapa é configurar o canal oficial de WhatsApp e ajustar os dados reais de contato, projetos e oferta comercial.
          </p>
        </div>
        <div className={styles.actions}>
          <Button to={whatsappPath}>WhatsApp: {whatsappLabel}</Button>
          <Button to="/servicos" variant="secondary">Ver serviços</Button>
        </div>
      </div>
    </section>
  );
}
