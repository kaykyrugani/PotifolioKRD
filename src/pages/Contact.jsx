import { whatsappLabel } from '../utils/contact';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import styles from './Page.module.css';

export default function Contact() {
  return (
    <PageLayout>
      <section className={styles.page}>
        <Container size="narrow">
          <SectionTitle
            eyebrow="Contato"
            title="Canal comercial preparado para conversão via WhatsApp"
            description="O número oficial ainda não foi informado. A estrutura está pronta para receber o link real de contato sem alterar a arquitetura."
          />

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
