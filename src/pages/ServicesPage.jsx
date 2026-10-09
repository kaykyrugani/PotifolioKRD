import { useEffect, useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import SolutionsTrail from '../components/sections/SolutionsTrail';
import TechnologyApplied from '../components/sections/TechnologyApplied';
import TechnologyRoles from '../components/sections/TechnologyRoles';
import TechnologyPerception from '../components/sections/TechnologyPerception';
import servicosHeroImage from '../assets/images/servicosIMG.webp';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { whatsappUrl } from '../utils/contact';
import styles from './Page.module.css';

const ecosystemNodes = ['Figma', 'React', 'SEO', 'Performance', 'Deploy', 'Hospedagem', 'Responsividade'];

const plans = [
  {
    title: 'Landing Page',
    priceLabel: 'A partir de:',
    price: 'R$399',
    description: 'Ideal para campanhas e captação.',
    items: ['Página personalizada', 'Responsivo', 'SEO base', 'CTA estratégico', 'Performance', 'Integrações básicas'],
    cta: 'Quero este projeto',
  },
  {
    title: 'Site Institucional',
    priceLabel: 'A partir de:',
    price: 'R$999',
    description: 'Ideal para empresas.',
    items: ['múltiplas páginas', 'SEO técnico', 'responsivo', 'performance', 'estrutura escalável'],
    cta: 'Quero este projeto',
    featured: true,
  },
  {
    title: 'Projeto Personalizado',
    priceLabel: '',
    price: 'Sob consulta',
    description: 'Demandas específicas.',
    items: ['APIs', 'sistemas', 'integrações', 'dashboards', 'soluções específicas'],
    cta: 'Falar com especialista',
  },
];

const faqs = [
  {
    question: 'Quanto tempo leva?',
    answer: 'O prazo depende do escopo, quantidade de páginas, conteúdo disponível, integrações e nível de personalização. A estimativa é definida depois do briefing.',
  },
  {
    question: 'Posso editar depois?',
    answer: 'Sim, a estrutura pode ser planejada para facilitar ajustes futuros. Quando houver necessidade de autonomia total, isso entra na definição técnica do projeto.',
  },
  {
    question: 'Hospedagem está inclusa?',
    answer: 'Hospedagem e publicação podem fazer parte do escopo. A configuração é alinhada conforme domínio, ambiente e necessidade do projeto.',
  },
  {
    question: 'Possui SEO?',
    answer: 'Sim. A entrega considera SEO técnico, HTML semântico, hierarquia de conteúdo, metadados base e performance desde a construção.',
  },
  {
    question: 'Posso solicitar alterações?',
    answer: 'Sim. Ajustes podem ser combinados por etapa para manter clareza, controle de escopo e consistência visual.',
  },
  {
    question: 'Existe suporte?',
    answer: 'Sim. O suporte pode envolver manutenção, melhorias, atualização de conteúdo, correções e acompanhamento técnico.',
  },
];

const revealSectionKeys = {
  solutions: 'solutions',
  ecosystem: 'ecosystem',
  techApplied: 'techApplied',
  techRoles: 'techRoles',
  techPerception: 'techPerception',
  plans: 'plans',
  faq: 'faq',
  finalCta: 'finalCta',
};

const revealSectionKeyList = Object.values(revealSectionKeys);

const createRevealItemKey = (groupKey, index) => `${groupKey}-${index}`;

const revealItemKeyList = [
  'ecosystem-core',
  ...ecosystemNodes.map((_, index) => createRevealItemKey('ecosystem-node', index)),
  ...plans.map((_, index) => createRevealItemKey('plans', index)),
  ...faqs.map((_, index) => createRevealItemKey('faq', index)),
];

function SectionIntro({ id, eyebrow, title, description, animateEyebrow = true }) {
  return (
    <div className={styles.servicesPageSectionIntro}>
      <p className={animateEyebrow ? styles.revealEyebrow : undefined}>{eyebrow}</p>
      <h2 className={styles.revealTitle} id={id}>{title}</h2>
      {description && <span className={styles.revealDescription}>{description}</span>}
    </div>
  );
}

export default function ServicesPage() {
  const [showHeroContent, setShowHeroContent] = useState(false);
  const {
    setRevealSectionRef,
    getRevealSectionClassName,
    setRevealItemRef,
    getRevealItemClassName,
  } = useRevealOnScroll({
    sectionKeys: revealSectionKeyList,
    itemKeys: revealItemKeyList,
    styles,
    debugLabel: 'Services',
  });

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('Hero ready:', false);
    }

    const timeout = setTimeout(() => {
      setShowHeroContent(true);

      if (import.meta.env.DEV) {
        console.log('Hero ready:', true);
      }
    }, 150);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <PageLayout>
      <section className={`${styles.servicesPage} ${showHeroContent ? styles.servicesPageReady : ''}`}>
        <div className={styles.servicesPageTopAtmosphere} aria-hidden="true" />

        <section className={`${styles.servicesPageHero} ${showHeroContent ? styles.heroReady : ''}`} aria-labelledby="services-page-title">
          <Container size="wide">
            <div className={styles.servicesHeroGrid}>
              {showHeroContent ? (
                <>
                  <div className={styles.servicesHeroCopy}>
                    <p className={`${styles.servicesPageEyebrow} ${styles.heroEyebrow}`}>SERVIÇOS</p>
                    <h1 className={styles.servicesHeroTitle} id="services-page-title">
                      <span className={styles.heroTitleLine}>Soluções</span>
                      <span className={styles.heroTitleLine}>digitais para</span>
                      <span className={styles.heroTitleLine}>presença,</span>
                      <span className={styles.heroTitleLine}>conversão e</span>
                      <span className={styles.heroTitleLine}>evolução</span>
                    </h1>
                    <p className={styles.heroDescription}>
                      Desenvolvimento de sites, landing pages, hospedagem e suporte técnico para empresas em Franca e região, com foco em experiência, performance e crescimento.
                    </p>
                    <div className={`${styles.servicesHeroActions} ${styles.heroActions}`}>
                      <Button className={styles.servicesHeroPrimaryCta} href="#solucoes">Ver soluções</Button>
                      <Button className={styles.servicesHeroSecondaryCta} href={whatsappUrl} target="_blank" rel="noreferrer" variant="secondary">Iniciar projeto</Button>
                    </div>
                  </div>

                  <div className={`${styles.heroImageVisual} ${styles.servicesHeroVisual}`} aria-hidden="true">
                    <div className={styles.servicesHeroScene}>
                      <span className={styles.servicesHeroSceneGlow} />
                      <span className={styles.servicesHeroSceneGrid} />

                      <img
                        className={styles.servicesHeroPerson}
                        src={servicosHeroImage}
                        alt=""
                        width="1024"
                        height="1536"
                        loading="eager"
                      />

                      <div className={`${styles.servicesInterfaceFragment} ${styles.servicesHeroFragment} ${styles.servicesFragmentLanding}`}>
                        <span className={styles.servicesFragmentLabel}>Landing Page estratégica</span>
                        <div className={styles.servicesMiniWireframe}>
                          <span />
                          <strong />
                          <i />
                          <i />
                          <em />
                        </div>
                      </div>

                      <div className={`${styles.servicesInterfaceFragment} ${styles.servicesHeroFragment} ${styles.servicesFragmentSeo}`}>
                        <span className={styles.servicesFragmentLabel}>SEO técnico</span>
                        <ul>
                          <li>H1</li>
                          <li>Meta</li>
                          <li>Schema</li>
                          <li>Semântico</li>
                        </ul>
                      </div>

                      <div className={`${styles.servicesInterfaceFragment} ${styles.servicesHeroFragment} ${styles.servicesFragmentPerformance}`}>
                        <span className={styles.servicesFragmentLabel}>Core Web Vitals</span>
                        <div className={styles.servicesPerformanceLine}>
                          <span />
                        </div>
                        <strong>otimizado</strong>
                      </div>

                      <div className={`${styles.servicesInterfaceFragment} ${styles.servicesHeroFragment} ${styles.servicesFragmentStack}`}>
                        <span>React</span>
                        <span>Figma</span>
                        <span>Hostinger</span>
                        <span>Analytics</span>
                      </div>

                      <div className={`${styles.servicesInterfaceFragment} ${styles.servicesHeroFragment} ${styles.servicesFragmentFlow}`}>
                        <span>Briefing</span>
                        <span>UI</span>
                        <span>Código</span>
                        <span>Deploy</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.servicesHeroCopyReserve} aria-hidden="true" />
                  <div className={styles.servicesHeroSceneReserve} aria-hidden="true" />
                </>
              )}
            </div>
          </Container>
        </section>

        <section
          className={getRevealSectionClassName(styles.servicesPageSection, revealSectionKeys.solutions)}
          id="solucoes"
          ref={(node) => setRevealSectionRef(revealSectionKeys.solutions, node)}
          aria-labelledby="services-solutions-title"
        >
          <SolutionsTrail />
        </section>

        <section
          className={getRevealSectionClassName(styles.servicesPageSection, revealSectionKeys.ecosystem)}
          ref={(node) => setRevealSectionRef(revealSectionKeys.ecosystem, node)}
          aria-labelledby="services-ecosystem-title"
        >
          <Container size="wide">
            <SectionIntro
              id="services-ecosystem-title"
              eyebrow="ECOSSISTEMA DE ENTREGA"
              title="O que sustenta cada projeto"
              description="A entrega não é apenas uma tela pronta. Ela nasce da conexão entre design, tecnologia, performance e publicação."
            />

            <div className={styles.servicesEcosystem} aria-label="Ecossistema técnico do projeto">
              <svg className={styles.servicesEcosystemLines} viewBox="0 0 940 520" aria-hidden="true">
                <path d="M470 260L180 118" />
                <path d="M470 260L470 72" />
                <path d="M470 260L764 122" />
                <path d="M470 260L790 386" />
                <path d="M470 260L470 448" />
                <path d="M470 260L162 384" />
                <path d="M470 260L714 262" />
              </svg>
              <div
                className={getRevealItemClassName(styles.servicesEcosystemCore, 'ecosystem-core')}
                ref={(node) => setRevealItemRef('ecosystem-core', node)}
              >
                <span>centro</span>
                <strong>PROJETO</strong>
              </div>
              {ecosystemNodes.map((node, index) => (
                <span
                  className={getRevealItemClassName(`${styles.servicesEcosystemNode} ${styles[`servicesEcosystemNode${index + 1}`]}`, createRevealItemKey('ecosystem-node', index))}
                  key={node}
                  ref={(element) => setRevealItemRef(createRevealItemKey('ecosystem-node', index), element)}
                >
                  {node}
                </span>
              ))}
            </div>
          </Container>
        </section>

        <TechnologyApplied
          id="tecnologia-aplicada"
          titleId="services-tech-applied-title"
          sectionKey={revealSectionKeys.techApplied}
          getRevealSectionClassName={getRevealSectionClassName}
          setRevealSectionRef={setRevealSectionRef}
          revealStyles={styles}
          headerAlign="start"
        />

        <TechnologyRoles
          id="como-cada-tecnologia-atua"
          titleId="services-tech-roles-title"
          sectionKey={revealSectionKeys.techRoles}
          getRevealSectionClassName={getRevealSectionClassName}
          setRevealSectionRef={setRevealSectionRef}
          revealStyles={styles}
        />

        <TechnologyPerception
          id="tecnologia-em-acao"
          titleId="services-tech-perception-title"
          sectionKey={revealSectionKeys.techPerception}
          getRevealSectionClassName={getRevealSectionClassName}
          setRevealSectionRef={setRevealSectionRef}
          revealStyles={styles}
        />

        <section
          className={getRevealSectionClassName(styles.servicesPageSection, revealSectionKeys.plans)}
          ref={(node) => setRevealSectionRef(revealSectionKeys.plans, node)}
          aria-labelledby="services-plans-title"
        >
          <Container size="wide">
            <SectionIntro
              id="services-plans-title"
              eyebrow="PLANOS / INVESTIMENTO"
              title="Pontos de partida para escolher a melhor solução."
              description="Os valores abaixo ajudam a orientar o primeiro passo. O escopo final é definido conforme necessidade, conteúdo e complexidade."
              animateEyebrow={false}
            />

            <div className={`${styles.servicesPlans} ${styles.revealCardGrid}`}>
              {plans.map((plan, index) => (
                <article
                  className={getRevealItemClassName(`${styles.servicesPlan} ${plan.featured ? styles.servicesPlanFeatured : ''} ${styles.revealCard}`, createRevealItemKey('plans', index))}
                  key={plan.title}
                  ref={(node) => setRevealItemRef(createRevealItemKey('plans', index), node)}
                >
                  {plan.featured && <span className={styles.servicesPlanBadge}>Mais procurado</span>}
                  <h3>{plan.title}</h3>
                  <p>{plan.description}</p>
                  <div className={styles.servicesPlanPrice}>
                    {plan.priceLabel && <span>{plan.priceLabel}</span>}
                    <strong>{plan.price}</strong>
                  </div>
                  <ul>
                    {plan.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Button href={whatsappUrl} target="_blank" rel="noreferrer" variant={plan.featured ? 'primary' : 'secondary'}>
                    {plan.cta}
                  </Button>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section
          className={getRevealSectionClassName(styles.servicesPageSection, revealSectionKeys.faq)}
          ref={(node) => setRevealSectionRef(revealSectionKeys.faq, node)}
          aria-labelledby="services-faq-title"
        >
          <Container>
            <SectionIntro
              id="services-faq-title"
              eyebrow="FAQ"
              title="Dúvidas comuns antes de começar"
              description="Respostas diretas para entender escopo, publicação, SEO, suporte e alterações."
            />

            <div className={`${styles.servicesFaq} ${styles.revealCardGrid}`}>
              {faqs.map((item, index) => (
                <details
                  className={getRevealItemClassName(`${styles.servicesFaqItem} ${styles.revealCard}`, createRevealItemKey('faq', index))}
                  key={item.question}
                  ref={(node) => setRevealItemRef(createRevealItemKey('faq', index), node)}
                >
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <section
          className={getRevealSectionClassName(styles.servicesFinalCta, revealSectionKeys.finalCta)}
          ref={(node) => setRevealSectionRef(revealSectionKeys.finalCta, node)}
          aria-labelledby="services-final-title"
        >
          <Container>
            <div className={styles.servicesFinalCtaBox}>
              <div className={styles.servicesFinalCtaDecor} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className={styles.servicesFinalCtaContent}>
                <p className={`${styles.servicesPageEyebrow} ${styles.revealEyebrow}`}>PRÓXIMO PASSO</p>
                <h2 className={styles.revealTitle} id="services-final-title">Vamos transformar sua ideia em presença digital</h2>
                <p className={styles.revealDescription}>Me conte seu projeto e vamos encontrar a melhor solução.</p>
                <div className={styles.servicesFinalActions}>
                  <Button href={whatsappUrl} target="_blank" rel="noreferrer">Chamar no WhatsApp</Button>
                  <Button to="/projetos" variant="secondary">Ver portfólio</Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </section>
    </PageLayout>
  );
}
