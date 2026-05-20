import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import styles from './Page.module.css';

export default function About() {
  return (
    <PageLayout>
      <section className={styles.page}>
        <Container>
          <SectionTitle
            eyebrow="Sobre"
            title="Desenvolvimento com foco em percepção premium e clareza comercial"
            description="A proposta do Kayky Rugani Dev é criar interfaces modernas, rápidas e bem estruturadas para apresentar serviços digitais com mais autoridade."
            align="left"
          />

          <div className={styles.grid}>
            <Card className={styles.card}>
              <h2>Posicionamento</h2>
              <p>
                O site foi pensado para fugir do portfólio genérico e funcionar como uma vitrine comercial, com linguagem visual inspirada em produtos SaaS modernos.
              </p>
            </Card>
            <Card className={styles.card} tone="glow">
              <h2>Princípios</h2>
              <ul>
                <li>Interface limpa e responsiva.</li>
                <li>Componentes reutilizáveis.</li>
                <li>Estrutura preparada para expansão.</li>
                <li>Conteúdo direto, sem exageros visuais.</li>
              </ul>
            </Card>
          </div>

          <div className={styles.actions}>
            <Button to="/servicos">Ver serviços</Button>
            <Button to="/contato" variant="secondary">Iniciar conversa</Button>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
