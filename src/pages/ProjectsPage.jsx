import { projectPreviews } from '../data/siteContent';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import styles from './Page.module.css';

export default function ProjectsPage() {
  return (
    <PageLayout>
      <section className={styles.page}>
        <Container>
          <SectionTitle
            eyebrow="Projetos"
            title="Preview de estruturas para futuros cases"
            description="Esta página está pronta para receber projetos reais, imagens, links e métricas quando essas informações forem fornecidas."
          />

          <div className={`${styles.grid} ${styles.three}`}>
            {projectPreviews.map((project) => (
              <Card className={styles.card} key={project.title}>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </Card>
            ))}
          </div>

          <div className={styles.actions}>
            <Button to="/contato">Conversar sobre projeto</Button>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
