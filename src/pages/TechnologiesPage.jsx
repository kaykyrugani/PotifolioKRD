import { technologies } from '../data/siteContent';
import PageLayout from '../components/layout/PageLayout';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import styles from './Page.module.css';

export default function TechnologiesPage() {
  return (
    <PageLayout>
      <section className={styles.page}>
        <Container>
          <SectionTitle
            eyebrow="Tecnologias"
            title="Stack moderna, leve e preparada para evolução"
            description="A base técnica prioriza velocidade, componentização, responsividade e manutenção simples."
            align="left"
          />

          <Card className={styles.card} tone="glow">
            <div className={styles.badges}>
              {technologies.map((technology) => (
                <Badge key={technology}>{technology}</Badge>
              ))}
            </div>
          </Card>

          <div className={styles.actions}>
            <Button to="/projetos">Ver projetos</Button>
            <Button to="/servicos" variant="secondary">Ver serviços</Button>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
