import { services } from '../data/siteContent';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import styles from './Page.module.css';

export default function ServicesPage() {
  return (
    <PageLayout>
      <section className={styles.page}>
        <Container>
          <SectionTitle
            eyebrow="Serviços"
            title="Soluções digitais para presença, conversão e evolução"
            description="Conteúdo inicial dos serviços. Os detalhes comerciais podem ser refinados quando os dados finais forem definidos."
          />

          <div className={styles.grid}>
            {services.map((service) => (
              <Card className={styles.card} key={service.title}>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className={styles.actions}>
            <Button to="/contato">Solicitar conversa</Button>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
