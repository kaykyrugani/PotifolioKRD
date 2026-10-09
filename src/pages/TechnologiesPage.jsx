import { motion, useReducedMotion } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import tecnologiaHeroImage from '../assets/images/tecnologiaIMG.webp';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import TechnologyApplied from '../components/sections/TechnologyApplied';
import TechnologyRoles from '../components/sections/TechnologyRoles';
import TechnologyPerception from '../components/sections/TechnologyPerception';
import { cardReveal, revealViewport } from '../components/sections/technologyMotion';
import { whatsappUrl } from '../utils/contact';
import styles from './Page.module.css';

const heroTechBadges = [
  { id: 'JavaScript', mark: 'JS', label: 'JavaScript', mobile: true },
  { id: 'React', mark: '⚛', label: 'React', mobile: true },
  { id: 'Vite', mark: 'V', label: 'Vite', mobile: false },
  { id: 'Html', mark: '<>', label: 'HTML', mobile: false },
  { id: 'Api', mark: 'API', label: '', mobile: false },
  { id: 'Css', mark: '#', label: 'CSS', mobile: true },
  { id: 'Seo', mark: 'SEO', label: '', mobile: true },
  { id: 'Vercel', mark: '▲', label: 'Vercel', mobile: true },
];

const infrastructureFlow = [
  { title: 'Usuário', description: 'Acessa a experiência em qualquer dispositivo.' },
  { title: 'Site', description: 'Entrega interface, conteúdo e navegação com clareza.' },
  { title: 'Hospedagem', description: 'Uso hospedagem configurada para entregar estabilidade, SSL, domínio e publicação segura.' },
  { title: 'SSL', description: 'Camada de segurança para navegação mais confiável.' },
  { title: 'Deploy', description: 'Publicação organizada para colocar a versão final no ar.' },
  { title: 'Manutenção', description: 'Base preparada para ajustes, melhorias e evolução.' },
];

const clientResults = [
  'Site mais rápido',
  'Interface mais clara',
  'Melhor leitura pelo Google',
  'Visual mais profissional',
  'Estrutura preparada para evoluir',
  'Mais confiança para o usuário',
];

const revealSectionKeys = {
  ecosystem: 'ecosystem',
  roles: 'roles',
  action: 'action',
  infrastructure: 'infrastructure',
  results: 'results',
  finalCta: 'finalCta',
};

const revealSectionKeyList = Object.values(revealSectionKeys);

function SectionIntro({ eyebrow, title, description, id, reveal = false }) {
  return (
    <div className={styles.techSectionIntro}>
      <p className={`${styles.techEyebrow} ${reveal ? styles.revealEyebrow : ''}`}>{eyebrow}</p>
      <h2 className={reveal ? styles.revealTitle : undefined} id={id}>{title}</h2>
      {description && <span className={reveal ? styles.revealDescription : undefined}>{description}</span>}
    </div>
  );
}

export default function TechnologiesPage() {
  const shouldReduceMotion = useReducedMotion();
  const {
    setRevealSectionRef,
    getRevealSectionClassName,
  } = useRevealOnScroll({
    sectionKeys: revealSectionKeyList,
    itemKeys: [],
    styles,
    debugLabel: 'Technologies',
  });

  return (
    <PageLayout>
      <section className={styles.technologiesPage}>
        <div className={styles.techPageBackground} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <section className={styles.techHero} aria-labelledby="technologies-page-title">
          <Container size="wide">
            <div className={styles.techHeroGrid}>
              <div className={styles.techHeroCopy}>
                <p className={`${styles.techEyebrow} ${styles.techHeroEyebrowReveal}`}>TECNOLOGIAS</p>
                <h1 id="technologies-page-title">
                  <span className={styles.techHeroTitleLine}>Tecnologia</span>
                  <span className={styles.techHeroTitleLine}>aplicada para</span>
                  <span className={styles.techHeroTitleLine}>criar</span>
                  <span className={styles.techHeroTitleLine}>experiências</span>
                  <span className={styles.techHeroTitleLine}>rápidas, inteligentes e</span>
                  <span className={styles.techHeroTitleLine}>memoráveis.</span>
                </h1>
                <p className={styles.techHeroDescriptionReveal}>
                  Ferramentas, otimização e infraestrutura trabalhando juntas para transformar design em produto digital com performance, clareza e presença profissional.
                </p>
                <div className={styles.techHeroActions}>
                  <span className={styles.techHeroPrimaryActionReveal}>
                    <Button href="#tecnologias-ecossistema">Explorar tecnologias</Button>
                  </span>
                  <span className={styles.techHeroSecondaryActionReveal}>
                    <Button href={whatsappUrl} target="_blank" rel="noreferrer" variant="secondary">Iniciar projeto</Button>
                  </span>
                </div>
              </div>

              <div className={styles.techHeroEcosystemVisual} aria-hidden="true">
                <div className={styles.techHeroGlowField} />
                <svg className={styles.techHeroOrbitLines} viewBox="0 0 760 760" focusable="false">
                  <path d="M382 426L374 118" />
                  <path d="M382 426L132 368" />
                  <path d="M382 426L548 214" />
                  <path d="M382 426L130 476" />
                  <path d="M382 426L640 420" />
                  <path d="M382 426L250 642" />
                  <path d="M382 426L548 594" />
                  <path d="M382 426L648 654" />
                </svg>

                <div className={styles.techHeroCoreBadge}>
                  <span>TECH</span>
                </div>

                {heroTechBadges.map((badge) => (
                  <span
                    className={[
                      styles.techHeroOrbitBadge,
                      styles[`techHeroBadge${badge.id}`],
                      badge.mobile ? styles.techHeroBadgeMobileVisible : styles.techHeroBadgeMobileHidden,
                    ].filter(Boolean).join(' ')}
                    key={badge.id}
                  >
                    <strong>{badge.mark}</strong>
                    {badge.label && <span>{badge.label}</span>}
                  </span>
                ))}

                <img
                  className={styles.techHeroPerson}
                  src={tecnologiaHeroImage}
                  alt=""
                  width="1024"
                  height="1536"
                  loading="eager"
                />
              </div>
            </div>
          </Container>
        </section>

        <TechnologyApplied
          id="tecnologias-ecossistema"
          getRevealSectionClassName={getRevealSectionClassName}
          setRevealSectionRef={setRevealSectionRef}
          revealStyles={styles}
        />

        <TechnologyRoles getRevealSectionClassName={getRevealSectionClassName} setRevealSectionRef={setRevealSectionRef} revealStyles={styles} />

        <TechnologyPerception getRevealSectionClassName={getRevealSectionClassName} setRevealSectionRef={setRevealSectionRef} revealStyles={styles} />

        <section
          className={getRevealSectionClassName(styles.techInfrastructureSection, revealSectionKeys.infrastructure)}
          ref={(node) => setRevealSectionRef(revealSectionKeys.infrastructure, node)}
          aria-labelledby="tech-infra-title"
        >
          <Container size="wide">
            <SectionIntro
              eyebrow="INFRAESTRUTURA E PUBLICAÇÃO"
              title="A experiência também depende de como o projeto vai para o ar."
              description="Hospedagem, SSL, domínio e deploy fazem parte do cuidado técnico para que a interface publicada continue confiável."
              id="tech-infra-title"
              reveal
            />

            <ol className={styles.techInfrastructureFlow}>
              {infrastructureFlow.map((item, index) => (
                <motion.li
                  className={styles.techInfrastructureStep}
                  custom={index}
                  initial="hidden"
                  key={item.title}
                  variants={cardReveal}
                  viewport={revealViewport}
                  whileInView="visible"
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div className={styles.techInfrastructureStepContent}>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </Container>
        </section>

        <section
          className={getRevealSectionClassName(styles.techResultsSection, revealSectionKeys.results)}
          ref={(node) => setRevealSectionRef(revealSectionKeys.results, node)}
          aria-labelledby="tech-results-title"
        >
          <Container size="wide">
            <div className={styles.techResultsComposition}>
              <div className={styles.techResultsCopy}>
                <p className={`${styles.techEyebrow} ${styles.revealEyebrow}`}>RESULTADO PARA O CLIENTE</p>
                <h2 className={styles.revealTitle} id="tech-results-title">O resultado não é tecnologia. É experiência.</h2>
                <p className={styles.revealDescription}>
                  A pilha técnica só faz sentido quando melhora a forma como a marca é percebida e como o usuário entende o próximo passo.
                </p>
              </div>

              <ul className={styles.techResultsList}>
                {clientResults.map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <section
          className={getRevealSectionClassName(styles.techFinalCta, revealSectionKeys.finalCta)}
          ref={(node) => setRevealSectionRef(revealSectionKeys.finalCta, node)}
          aria-labelledby="tech-final-title"
        >
          <Container>
            <motion.div
              className={styles.techFinalBox}
              initial={{ opacity: 0.92, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.48 }}
              whileInView={{ opacity: 1, scale: shouldReduceMotion ? 1 : 1.02 }}
            >
              <p className={`${styles.techEyebrow} ${styles.revealEyebrow}`}>PRÓXIMO PASSO</p>
              <h2 className={styles.revealTitle} id="tech-final-title">Vamos transformar tecnologia em presença digital?</h2>
              <p className={styles.revealDescription}>
                Cada ferramenta deve servir a um objetivo: criar uma experiência mais clara, rápida e confiável para o seu público.
              </p>
              <div className={styles.techFinalActions}>
                <Button href={whatsappUrl} target="_blank" rel="noreferrer">Chamar no WhatsApp</Button>
                <Button to="/servicos" variant="secondary">Ver serviços</Button>
              </div>
            </motion.div>
          </Container>
        </section>
      </section>
    </PageLayout>
  );
}
