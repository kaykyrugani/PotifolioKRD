import { useCallback, useEffect, useRef, useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import servicosHeroImage from '../assets/images/servicosIMG.png';
import { whatsappPath } from '../utils/contact';
import styles from './Page.module.css';

const mainSolutions = [
  {
    title: 'Sites Institucionais',
    objective: 'Fortalecer marca',
    description: 'Estrutura para apresentar empresa, serviços, diferenciais e canais de contato com clareza, autoridade e leitura profissional.',
    includes: ['estrutura multipágina', 'arquitetura', 'SEO técnico', 'HTML semântico', 'responsividade'],
    signal: 'Presença + autoridade',
  },
  {
    title: 'Landing Pages',
    objective: 'Conversão',
    description: 'Páginas criadas para campanhas, lançamentos, tráfego pago e captação, com narrativa objetiva e chamadas de ação bem posicionadas.',
    includes: ['copy', 'CTA estratégico', 'carregamento rápido', 'SEO', 'estrutura de métricas'],
    signal: 'Oferta + ação',
  },
  {
    title: 'Hospedagem e publicação',
    objective: 'Colocar projeto no ar',
    description: 'Configuração técnica para publicar o projeto com domínio, SSL, deploy e preparação de ambiente conforme a necessidade da entrega.',
    includes: ['Hostinger', 'domínio', 'SSL', 'deploy', 'configuração'],
    signal: 'Publicação + estabilidade',
  },
  {
    title: 'Manutenção e evolução',
    objective: 'Crescimento contínuo',
    description: 'Acompanhamento para manter o site atualizado, corrigir pontos técnicos e evoluir a experiência depois da primeira versão.',
    includes: ['suporte', 'melhorias', 'ajustes', 'atualização'],
    signal: 'Suporte + melhoria',
  },
];

const ecosystemNodes = ['Figma', 'React', 'SEO', 'Performance', 'Deploy', 'Hospedagem', 'Responsividade'];

const includedGroups = [
  {
    title: 'Estrutura',
    description: 'Organização da página, hierarquia de conteúdo, seções comerciais e fluxo de navegação.',
    items: ['arquitetura de informação', 'HTML semântico', 'mensagem objetiva'],
  },
  {
    title: 'SEO',
    description: 'Base técnica para leitura, indexação e clareza semântica do conteúdo.',
    items: ['heading structure', 'metadados base', 'conteúdo rastreável'],
  },
  {
    title: 'Performance',
    description: 'Construção leve, responsiva e preparada para carregamento rápido.',
    items: ['CSS otimizado', 'assets controlados', 'boas práticas front-end'],
  },
  {
    title: 'Publicação',
    description: 'Preparação final para tirar o projeto do ambiente local e publicar com segurança.',
    items: ['deploy', 'domínio', 'SSL quando disponível'],
  },
];

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

const differentials = [
  {
    title: 'Design com objetivo comercial',
    description: 'Cada seção precisa explicar, reduzir fricção e levar o usuário para uma próxima ação.',
  },
  {
    title: 'SEO técnico',
    description: 'Estrutura semântica, hierarquia de títulos e conteúdo preparado para ser compreendido por buscadores.',
  },
  {
    title: 'Performance',
    description: 'Interface pensada para carregar rápido e manter boa experiência em mobile e desktop.',
  },
  {
    title: 'Código preparado para crescimento',
    description: 'Organização visual e técnica para permitir ajustes, manutenção e evolução.',
  },
  {
    title: 'Suporte',
    description: 'Acompanhamento para ajustes, publicação, dúvidas técnicas e melhorias planejadas.',
  },
  {
    title: 'Responsividade',
    description: 'Layout adaptado para celular, tablet e desktop com prioridade para legibilidade.',
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
  included: 'included',
  plans: 'plans',
  differentials: 'differentials',
  faq: 'faq',
  finalCta: 'finalCta',
};

const revealSectionKeyList = Object.values(revealSectionKeys);

function useRevealOnScroll(sectionKeys) {
  const sectionRefs = useRef({});
  const visibleSectionsRef = useRef(new Set());
  const hasUserIntentRef = useRef(false);
  const pendingFrameRef = useRef(0);
  const [visibleSections, setVisibleSections] = useState(() => new Set());

  const setRevealSectionRef = useCallback((sectionKey, node) => {
    if (node) {
      sectionRefs.current[sectionKey] = node;
      return;
    }

    delete sectionRefs.current[sectionKey];
  }, []);

  const markSectionVisible = useCallback((sectionKey, source) => {
    if (visibleSectionsRef.current.has(sectionKey)) {
      return;
    }

    if (source !== 'reducedMotion' && !hasUserIntentRef.current) {
      if (import.meta.env.DEV) {
        console.warn('[Services reveal blocked]', sectionKey, source);
        console.trace();
      }

      return;
    }

    if (import.meta.env.DEV) {
      console.log('[Services reveal]', sectionKey, source);
    }

    const nextVisibleSections = new Set(visibleSectionsRef.current);
    nextVisibleSections.add(sectionKey);
    visibleSectionsRef.current = nextVisibleSections;
    setVisibleSections(nextVisibleSections);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (import.meta.env.DEV) {
        console.log('[Services reveal] reduced motion active');
      }

      return undefined;
    }

    const checkSectionsVisibility = () => {
      const activationLine = window.innerHeight * 0.68;

      sectionKeys.forEach((sectionKey) => {
        if (visibleSectionsRef.current.has(sectionKey)) {
          return;
        }

        if (!hasUserIntentRef.current) {
          return;
        }

        const node = sectionRefs.current[sectionKey];

        if (!node) {
          return;
        }

        const rect = node.getBoundingClientRect();

        if (rect.top <= activationLine && rect.bottom >= 0) {
          markSectionVisible(sectionKey, 'user');
        }
      });

      if (visibleSectionsRef.current.size >= sectionKeys.length) {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('wheel', handleUserIntent);
        window.removeEventListener('touchmove', handleUserIntent);
        window.removeEventListener('keydown', handleKeyDownIntent);

        if (pendingFrameRef.current) {
          window.cancelAnimationFrame(pendingFrameRef.current);
          pendingFrameRef.current = 0;
        }
      }
    };

    const scheduleVisibilityCheck = () => {
      if (pendingFrameRef.current) {
        return;
      }

      pendingFrameRef.current = window.requestAnimationFrame(() => {
        pendingFrameRef.current = 0;
        checkSectionsVisibility();
      });
    };

    const markUserIntent = () => {
      if (hasUserIntentRef.current) {
        return;
      }

      hasUserIntentRef.current = true;

      if (import.meta.env.DEV) {
        console.log('[Services reveal intent]');
      }

      scheduleVisibilityCheck();
    };

    const handleUserIntent = () => {
      markUserIntent();
    };

    const handleKeyDownIntent = (event) => {
      const intentKeys = new Set(['ArrowDown', 'PageDown', 'End']);

      if (!intentKeys.has(event.key) && event.key !== ' ' && event.code !== 'Space') {
        return;
      }

      markUserIntent();
    };

    const handleScroll = () => {
      if (!hasUserIntentRef.current) {
        return;
      }

      scheduleVisibilityCheck();
    };

    const handleResize = () => {
      if (!hasUserIntentRef.current) {
        return;
      }

      scheduleVisibilityCheck();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('wheel', handleUserIntent, { passive: true });
    window.addEventListener('touchmove', handleUserIntent, { passive: true });
    window.addEventListener('keydown', handleKeyDownIntent);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleUserIntent);
      window.removeEventListener('touchmove', handleUserIntent);
      window.removeEventListener('keydown', handleKeyDownIntent);

      if (pendingFrameRef.current) {
        window.cancelAnimationFrame(pendingFrameRef.current);
        pendingFrameRef.current = 0;
      }
    };
  }, [markSectionVisible, sectionKeys]);

  return {
    setRevealSectionRef,
    visibleSections,
  };
}

function SectionIntro({ eyebrow, title, description, animateEyebrow = true }) {
  return (
    <div className={styles.servicesPageSectionIntro}>
      <p className={animateEyebrow ? styles.revealEyebrow : undefined}>{eyebrow}</p>
      <h2 className={styles.revealTitle}>{title}</h2>
      {description && <span className={styles.revealDescription}>{description}</span>}
    </div>
  );
}

export default function ServicesPage() {
  const [showHeroContent, setShowHeroContent] = useState(false);
  const { setRevealSectionRef, visibleSections } = useRevealOnScroll(revealSectionKeyList);

  const getRevealSectionClassName = (baseClassName, sectionKey) => (
    [
      baseClassName,
      styles.revealSection,
      visibleSections.has(sectionKey) ? styles.revealSectionVisible : '',
    ].filter(Boolean).join(' ')
  );

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
                      Desenvolvimento de sites, landing pages, hospedagem e suporte técnico com foco em experiência, performance e crescimento.
                    </p>
                    <div className={`${styles.servicesHeroActions} ${styles.heroActions}`}>
                      <Button className={styles.servicesHeroPrimaryCta} href="#solucoes">Ver soluções</Button>
                      <Button className={styles.servicesHeroSecondaryCta} to={whatsappPath} variant="secondary">Iniciar projeto</Button>
                    </div>
                  </div>

                  <div className={`${styles.heroImageVisual} ${styles.servicesHeroVisual}`} aria-hidden="true">
                    <div className={styles.servicesHeroScene}>
                      <span className={styles.servicesHeroSceneGlow} />
                      <span className={styles.servicesHeroSceneGrid} />

                      <img className={styles.servicesHeroPerson} src={servicosHeroImage} alt="" loading="eager" />

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
          <Container size="wide">
            <SectionIntro
              eyebrow="SOLUÇÕES PRINCIPAIS"
              title="Escolha pelo problema que precisa resolver."
              description="Cada entrega combina estratégia, interface e desenvolvimento, mas cada solução tem uma prioridade diferente."
            />

            <div className={`${styles.servicesSolutionsFlow} ${styles.revealCardGrid}`}>
              {mainSolutions.map((solution, index) => (
                <article className={`${styles.servicesSolutionRow} ${styles.revealCard}`} key={solution.title}>
                  <div className={styles.servicesSolutionCopy}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{solution.title}</h3>
                    <p>{solution.description}</p>
                  </div>

                  <div className={`${styles.servicesSolutionPanel} ${index % 2 === 0 ? styles.servicesSolutionPanelFramed : ''}`}>
                    <p>Objetivo</p>
                    <strong>{solution.objective}</strong>
                    <ul>
                      {solution.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <span>{solution.signal}</span>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section
          className={getRevealSectionClassName(styles.servicesPageSection, revealSectionKeys.ecosystem)}
          ref={(node) => setRevealSectionRef(revealSectionKeys.ecosystem, node)}
          aria-labelledby="services-ecosystem-title"
        >
          <Container size="wide">
            <SectionIntro
              eyebrow="ECOSSISTEMA DE ENTREGA"
              title="O que sustenta cada projeto"
              description="A entrega não é apenas uma tela pronta. Ela nasce da conexão entre design, tecnologia, performance e publicação."
            />

            <div className={`${styles.servicesEcosystem} ${styles.revealCard}`} aria-label="Ecossistema técnico do projeto">
              <svg className={styles.servicesEcosystemLines} viewBox="0 0 940 520" aria-hidden="true">
                <path d="M470 260L180 118" />
                <path d="M470 260L470 72" />
                <path d="M470 260L764 122" />
                <path d="M470 260L790 386" />
                <path d="M470 260L470 448" />
                <path d="M470 260L162 384" />
                <path d="M470 260L714 262" />
              </svg>
              <div className={styles.servicesEcosystemCore}>
                <span>centro</span>
                <strong>PROJETO</strong>
              </div>
              {ecosystemNodes.map((node, index) => (
                <span className={`${styles.servicesEcosystemNode} ${styles[`servicesEcosystemNode${index + 1}`]}`} key={node}>
                  {node}
                </span>
              ))}
            </div>
          </Container>
        </section>

        <section
          className={getRevealSectionClassName(styles.servicesPageSection, revealSectionKeys.included)}
          ref={(node) => setRevealSectionRef(revealSectionKeys.included, node)}
          aria-labelledby="services-included-title"
        >
          <Container size="wide">
            <SectionIntro
              eyebrow="O QUE ESTÁ INCLUSO"
              title="A base técnica para uma entrega completa."
              description="A composição muda conforme o projeto, mas estes pilares guiam a construção da presença digital."
            />

            <div className={`${styles.servicesIncludedEditorial} ${styles.revealCardGrid}`}>
              {includedGroups.map((group, index) => (
                <article className={`${styles.servicesIncludedItem} ${styles[`servicesIncludedItem${index + 1}`]} ${styles.revealCard}`} key={group.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section
          className={getRevealSectionClassName(styles.servicesPageSection, revealSectionKeys.plans)}
          ref={(node) => setRevealSectionRef(revealSectionKeys.plans, node)}
          aria-labelledby="services-plans-title"
        >
          <Container size="wide">
            <SectionIntro
              eyebrow="PLANOS / INVESTIMENTO"
              title="Pontos de partida para escolher a melhor solução."
              description="Os valores abaixo ajudam a orientar o primeiro passo. O escopo final é definido conforme necessidade, conteúdo e complexidade."
              animateEyebrow={false}
            />

            <div className={`${styles.servicesPlans} ${styles.revealCardGrid}`}>
              {plans.map((plan) => (
                <article className={`${styles.servicesPlan} ${plan.featured ? styles.servicesPlanFeatured : ''} ${styles.revealCard}`} key={plan.title}>
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
                  <Button to={whatsappPath} variant={plan.featured ? 'primary' : 'secondary'}>
                    {plan.cta}
                  </Button>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section
          className={getRevealSectionClassName(styles.servicesPageSection, revealSectionKeys.differentials)}
          ref={(node) => setRevealSectionRef(revealSectionKeys.differentials, node)}
          aria-labelledby="services-differentials-title"
        >
          <Container size="wide">
            <SectionIntro
              eyebrow="DIFERENCIAIS"
              title="Mais do que entrega: experiência e estrutura"
              description="A diferença está em unir estética, leitura, código e orientação comercial em uma experiência coerente."
              animateEyebrow={false}
            />

            <div className={`${styles.servicesDifferentials} ${styles.revealCardGrid}`}>
              {differentials.map((item, index) => (
                <article className={`${styles.servicesDifferentialItem} ${styles.revealCard}`} key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
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
              eyebrow="FAQ"
              title="Dúvidas comuns antes de começar"
              description="Respostas diretas para entender escopo, publicação, SEO, suporte e alterações."
            />

            <div className={`${styles.servicesFaq} ${styles.revealCardGrid}`}>
              {faqs.map((item) => (
                <details className={`${styles.servicesFaqItem} ${styles.revealCard}`} key={item.question}>
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
                  <Button to={whatsappPath}>Chamar no WhatsApp</Button>
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
