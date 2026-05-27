import { whatsappLabel } from '../utils/contact';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import contatoHeroImage from '../assets/images/contatoIMG.png';
import styles from './Page.module.css';

export default function Contact() {
  return (
    <PageLayout>
      <section className={`${styles.page} ${styles.contactPage}`}>
        <Container>
          <section className={styles.contactHero} aria-labelledby="contact-page-title">
            <div className={styles.contactHeroCopy}>
              <p className={styles.contactEyebrow}>Contato</p>
              <h1 id="contact-page-title">Canal comercial preparado para conversão via WhatsApp</h1>
              <p>O número oficial ainda não foi informado. A estrutura está pronta para receber o link real de contato sem alterar a arquitetura.</p>
            </div>

            <div className={`${styles.heroImageVisual} ${styles.contactHeroVisual}`} aria-hidden="true">
              <img src={contatoHeroImage} alt="" loading="eager" />
            </div>
          </section>

          <Card className={styles.card} tone="glow">
            <h2>WhatsApp</h2>
            <p>{whatsappLabel}</p>
            <div className={styles.actions}>
              <Button to="/servicos">Revisar serviços</Button>
              <Button to="/" variant="secondary">Voltar para Home</Button>
            </div>
          </Card>
        </Container>
      </section>
    </PageLayout>
  );
}
