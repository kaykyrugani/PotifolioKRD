import { Navigate, useParams } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import { getFeaturedCaseBySlug } from '../data/featuredCases';
import styles from './ProjectCasePage.module.css';

export default function ProjectCasePage() {
  const { slug } = useParams();
  const project = getFeaturedCaseBySlug(slug);

  if (!project) {
    return <Navigate to="/projetos" replace />;
  }

  return (
    <PageLayout>
      <article className={styles.casePage}>
        <div className={styles.caseContainer}>
          <header className={styles.caseHeader}>
            <span className={styles.eyebrow}>Case {project.id}</span>
            <h1>{project.name}</h1>
            <p>{project.objective}</p>

            <ul className={styles.caseStack} aria-label="Tecnologias e práticas aplicadas">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </header>

          <div className={styles.casePreview}>
            <div className={styles.previewChrome} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className={styles.previewWindow}>
              <img
                src={project.image}
                alt={project.imageAlt}
                width={project.imageWidth}
                height={project.imageHeight}
                decoding="async"
              />
            </div>
          </div>

          <dl className={styles.caseFacts}>
            <div>
              <dt>Objetivo</dt>
              <dd>{project.objective}</dd>
            </div>
            <div>
              <dt>Desafio</dt>
              <dd>{project.challenge}</dd>
            </div>
            <div>
              <dt>Solução</dt>
              <dd>{project.solution}</dd>
            </div>
            <div>
              <dt>Resultado</dt>
              <dd>{project.result}</dd>
            </div>
          </dl>

          <div className={styles.caseActions}>
            <Button to="/projetos" variant="secondary">Voltar para projetos</Button>
            {project.link && (
              <Button
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
              >
                Visitar site →
              </Button>
            )}
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
