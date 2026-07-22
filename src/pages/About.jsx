import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import aboutPhoto from '../assets/images/KaykyRuagani.webp';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { whatsappUrl } from '../utils/contact';
import styles from './Page.module.css';

const positioningCards = [
  {
    title: 'Visão',
    description: 'Cada projeto começa entendendo a marca, o público e o objetivo comercial. O site precisa ser bonito, mas também claro, rápido e preparado para gerar ação.',
  },
  {
    title: 'Execução',
    description: 'A entrega combina interface, copy, desenvolvimento, SEO técnico, responsividade, deploy e validação para garantir uma experiência consistente do início ao fim.',
  },
];

const methodSteps = [
  {
    number: '01',
    title: 'Diagnóstico e direção',
    description: 'Entendimento do negócio, público, objetivos, referências, concorrentes e proposta de valor.',
    items: ['Briefing', 'Análise de mercado', 'Objetivo da página', 'Prioridade de conversão'],
  },
  {
    number: '02',
    title: 'Estratégia, copy e arquitetura',
    description: 'Definição da estrutura da página, hierarquia de mensagens, CTAs, seções e narrativa comercial.',
    items: ['Headline', 'Oferta', 'Objeções', 'Jornada do usuário', 'SEO semântico'],
  },
  {
    number: '03',
    title: 'Prototipação no Figma',
    description: 'Criação da interface com foco em estética, leitura, responsividade e experiência.',
    items: ['Wireframe', 'UI design', 'Componentes', 'Desktop e mobile', 'Identidade visual'],
  },
  {
    number: '04',
    title: 'Desenvolvimento front-end',
    description: 'Construção da interface com código limpo, responsivo e preparado para manutenção.',
    items: ['React ou Next.js quando aplicável', 'HTML semântico', 'CSS modular', 'Componentes reutilizáveis', 'Acessibilidade base'],
  },
  {
    number: '05',
    title: 'SEO técnico e performance',
    description: 'Ajustes para carregamento rápido, boa estrutura de conteúdo e melhor leitura por mecanismos de busca.',
    items: ['Meta tags', 'Heading structure', 'Alt text', 'Performance', 'Core Web Vitals', 'Schema quando fizer sentido'],
  },
  {
    number: '06',
    title: 'Deploy, validação e suporte',
    description: 'Publicação do projeto, testes finais, revisão responsiva e acompanhamento pós-entrega.',
    items: ['Deploy', 'Domínio e hospedagem', 'Testes mobile', 'Ajustes finais', 'Manutenção'],
  },
];

const buildSteps = [
  {
    number: '01',
    title: 'Estratégia',
    description: 'Entendimento do negócio, objetivos e estrutura da solução.',
    items: ['Pesquisa', 'Arquitetura', 'Planejamento'],
  },
  {
    number: '02',
    title: 'Design',
    description: 'Criação da experiência visual, identidade e fluxo de navegação.',
    items: ['Figma', 'UX', 'UI'],
  },
  {
    number: '03',
    title: 'Desenvolvimento',
    description: 'Transformação do projeto em uma aplicação rápida e escalável.',
    items: ['React', 'JavaScript', 'Vite'],
  },
  {
    number: '04',
    title: 'Publicação',
    description: 'Configuração, deploy e validação final.',
    items: ['Vercel', 'SEO', 'Performance'],
  },
  {
    number: '05',
    title: 'Evolução',
    description: 'Melhorias contínuas, ajustes e crescimento da solução.',
    items: ['Otimização', 'Suporte', 'Escalabilidade'],
  },
];

const principles = [
  {
    title: 'Clareza antes de complexidade',
    description: 'A interface precisa orientar o usuário, não impressionar sem propósito.',
  },
  {
    title: 'Estética com função',
    description: 'Visual premium deve reforçar confiança, leitura e percepção profissional.',
  },
  {
    title: 'Performance como experiência',
    description: 'Um site rápido transmite cuidado, reduz fricção e melhora conversão.',
  },
  {
    title: 'Código preparado para evoluir',
    description: 'Componentes reutilizáveis e estrutura organizada facilitam manutenção.',
  },
];

const trustItems = [
  'Comunicação clara durante o projeto.',
  'Processo organizado por etapas.',
  'Design alinhado com objetivo comercial.',
  'Site responsivo e preparado para SEO.',
  'Deploy e suporte técnico.',
  'Atenção aos detalhes visuais e técnicos.',
];

const trustSignals = ['SEO técnico', 'Deploy orientado', 'Responsividade', 'Performance'];

const revealSectionKeys = {
  positioning: 'positioning',
  method: 'method',
  stack: 'stack',
  principles: 'principles',
  trust: 'trust',
  finalCta: 'finalCta',
};

const revealSectionKeyList = Object.values(revealSectionKeys);

const createRevealItemKey = (groupKey, index) => `${groupKey}-${index}`;

const revealItemKeyList = [
  ...positioningCards.map((_, index) => createRevealItemKey('positioning', index)),
  ...methodSteps.map((_, index) => createRevealItemKey('method', index)),
  'build-track',
  ...buildSteps.map((_, index) => createRevealItemKey('build', index)),
  'build-cta',
  ...principles.map((_, index) => createRevealItemKey('principles', index)),
  'trust-card',
];

export default function About() {
  const {
    setRevealSectionRef,
    getRevealSectionClassName,
    setRevealItemRef,
    getRevealItemClassName,
  } = useRevealOnScroll({
    sectionKeys: revealSectionKeyList,
    itemKeys: revealItemKeyList,
    styles,
    debugLabel: 'About',
  });

  return (
    <PageLayout>
      <section className={styles.aboutPage}>
        <Container size="wide">
          <div className={styles.aboutHero}>
            <div className={styles.aboutHeroCopy}>
              <p className={`${styles.aboutEyebrow} ${styles.aboutHeroEyebrow}`}>SOBRE O DESENVOLVEDOR</p>
              <h1>
                <span className={styles.aboutHeroTitleLine}>Conheça quem está</span>
                <span className={styles.aboutHeroTitleLine}>por trás dos projetos.</span>
              </h1>
              <p className={styles.aboutHeroDescription}>
                Sou Kayky Rugani, desenvolvedor web em Franca focado em criar sites, landing pages e experiências digitais que unem design, performance, SEO técnico e clareza comercial. Meu trabalho combina prototipação, desenvolvimento front-end, otimização e suporte para transformar ideias em presença digital profissional.
              </p>
              <div className={`${styles.aboutHeroActions} ${styles.aboutHeroActionsReveal}`}>
                <Button to="/servicos">Ver serviços</Button>
                <Button href={whatsappUrl} target="_blank" rel="noreferrer" variant="secondary">Iniciar conversa</Button>
              </div>
            </div>

            <div className={styles.aboutPortraitCard}>
              <span className={styles.aboutPortraitLabel}>FRONT-END DEV</span>
              <div className={styles.aboutPortraitMedia}>
                <img
                  src={aboutPhoto}
                  alt="Retrato de Kayky Rugani, desenvolvedor front-end."
                  width="1122"
                  height="1402"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>

          <section
            className={getRevealSectionClassName(styles.aboutSection, revealSectionKeys.positioning)}
            ref={(node) => setRevealSectionRef(revealSectionKeys.positioning, node)}
            aria-labelledby="about-positioning-title"
          >
            <div className={styles.aboutPositioningEditorial}>
              <div className={styles.aboutPositioningCopy}>
                <p className={`${styles.aboutSectionKicker} ${styles.revealEyebrow}`}>POSICIONAMENTO</p>
                <h2 className={styles.revealTitle} id="about-positioning-title">Mais do que código: construção de presença digital.</h2>
                <p className={styles.revealDescription}>
                  O trabalho começa antes da interface: entender contexto, organizar mensagens e transformar uma ideia em uma experiência digital clara. O código entra como execução de uma estratégia visual, comercial e técnica.
                </p>
              </div>
              <div className={styles.aboutPositioningPanels}>
                {positioningCards.map((card, index) => (
                  <article
                    className={getRevealItemClassName(styles.aboutPositioningPanel, createRevealItemKey('positioning', index))}
                    key={card.title}
                    ref={(node) => setRevealItemRef(createRevealItemKey('positioning', index), node)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            className={getRevealSectionClassName(styles.aboutSection, revealSectionKeys.method)}
            ref={(node) => setRevealSectionRef(revealSectionKeys.method, node)}
            aria-labelledby="about-method-title"
          >
            <div className={styles.aboutSectionHeader}>
              <p className={`${styles.aboutSectionKicker} ${styles.revealEyebrow}`}>MÉTODO DE TRABALHO</p>
              <h2 className={styles.revealTitle} id="about-method-title">Um processo pensado para transformar briefing em resultado.</h2>
            </div>
            <div className={styles.aboutMethodTimeline}>
              {methodSteps.map((step, index) => {
                const methodItemKey = createRevealItemKey('method', index);
                const methodSideClassName = index % 2 === 0
                  ? styles.aboutMethodStepRight
                  : styles.aboutMethodStepLeft;

                return (
                  <article
                    className={getRevealItemClassName(
                      `${styles.aboutMethodStep} ${styles.aboutMethodStepReveal} ${methodSideClassName}`,
                      methodItemKey,
                    )}
                    key={step.number}
                    ref={(node) => setRevealItemRef(methodItemKey, node)}
                  >
                    <span className={styles.aboutMethodNumber}>{step.number}</span>
                    <div className={styles.aboutMethodContent}>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                      <ul>
                        {step.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </Container>

        <div className={styles.aboutSystemTransition} aria-hidden="true">
          <span className={styles.aboutTransitionLine} />
          <span className={styles.aboutTransitionCore}>
            <span />
          </span>
          <span className={styles.aboutTransitionOrbit} />
          <span className={styles.aboutTransitionDot} />
        </div>

        <div className={styles.aboutLowerAtmosphere}>
          <Container size="wide">
            <section
              className={getRevealSectionClassName(styles.aboutSection, revealSectionKeys.stack)}
              ref={(node) => setRevealSectionRef(revealSectionKeys.stack, node)}
              aria-labelledby="about-stack-title"
            >
              <div className={styles.aboutSectionHeader}>
                <p className={`${styles.aboutSectionKicker} ${styles.revealEyebrow}`}>COMO EU CONSTRUO CADA PROJETO</p>
                <h2 className={styles.revealTitle} id="about-stack-title">Transformando ideias em experiências digitais</h2>
                <p className={styles.revealDescription}>
                  Uma jornada clara conecta estratégia, design, desenvolvimento, publicação e evolução para transformar uma ideia em presença digital profissional.
                </p>
              </div>
              <div className={styles.aboutBuildJourney}>
                <div
                  className={getRevealItemClassName(styles.aboutBuildTrack, 'build-track')}
                  ref={(node) => setRevealItemRef('build-track', node)}
                  aria-hidden="true"
                >
                  <span className={styles.aboutBuildCore}>PROJETO</span>
                </div>
                <div className={styles.aboutBuildSteps}>
                  {buildSteps.map((step, index) => (
                    <article
                      className={getRevealItemClassName(styles.aboutBuildStep, createRevealItemKey('build', index))}
                      key={step.title}
                      ref={(node) => setRevealItemRef(createRevealItemKey('build', index), node)}
                      style={{ '--build-step-delay': `${index * 90}ms` }}
                    >
                      <span className={styles.aboutBuildNumber}>{step.number}</span>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                      <div className={styles.aboutBuildBadges}>
                        {step.items.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
                <div
                  className={getRevealItemClassName(styles.aboutBuildCta, 'build-cta')}
                  ref={(node) => setRevealItemRef('build-cta', node)}
                >
                  <p>Quer construir um projeto seguindo esse processo?</p>
                  <Button href={whatsappUrl} target="_blank" rel="noreferrer">Iniciar conversa</Button>
                </div>
              </div>
            </section>

          <section
            className={getRevealSectionClassName(styles.aboutSection, revealSectionKeys.principles)}
            ref={(node) => setRevealSectionRef(revealSectionKeys.principles, node)}
            aria-labelledby="about-principles-title"
          >
            <div className={styles.aboutSectionHeader}>
              <p className={`${styles.aboutSectionKicker} ${styles.revealEyebrow}`}>PRINCÍPIOS</p>
              <h2 className={styles.revealTitle} id="about-principles-title">Princípios que guiam cada entrega.</h2>
            </div>
            <ol className={styles.aboutPrinciplesList}>
              {principles.map((principle, index) => (
                <li
                  className={getRevealItemClassName(styles.aboutPrincipleItem, createRevealItemKey('principles', index))}
                  key={principle.title}
                  ref={(node) => setRevealItemRef(createRevealItemKey('principles', index), node)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section
            className={getRevealSectionClassName(styles.aboutSection, revealSectionKeys.trust)}
            ref={(node) => setRevealSectionRef(revealSectionKeys.trust, node)}
            aria-labelledby="about-trust-title"
          >
            <div
              className={getRevealItemClassName(styles.aboutTrustCard, 'trust-card')}
              ref={(node) => setRevealItemRef('trust-card', node)}
            >
              <div className={styles.aboutTrustCopy}>
                <p className={`${styles.aboutSectionKicker} ${styles.revealEyebrow}`}>CONFIANÇA</p>
                <h2 className={styles.revealTitle} id="about-trust-title">O que você pode esperar ao trabalhar comigo.</h2>
                <div className={styles.aboutTrustSignals} aria-label="Indicadores técnicos de entrega">
                  {trustSignals.map((signal) => (
                    <span key={signal}>{signal}</span>
                  ))}
                </div>
              </div>
              <ul className={styles.aboutTrustList}>
                {trustItems.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section
            className={getRevealSectionClassName(styles.aboutFinalCta, revealSectionKeys.finalCta)}
            ref={(node) => setRevealSectionRef(revealSectionKeys.finalCta, node)}
            aria-labelledby="about-final-cta-title"
          >
            <div className={styles.aboutFinalDecor} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className={styles.aboutFinalContent}>
              <p className={`${styles.aboutSectionKicker} ${styles.revealEyebrow}`}>PRÓXIMO PASSO</p>
              <h2 className={styles.revealTitle} id="about-final-cta-title">Vamos construir uma presença digital com mais clareza e impacto?</h2>
              <p className={styles.revealDescription}>
                Me conte sobre seu projeto e eu te ajudo a entender o melhor caminho para tirar sua ideia do papel com estratégia, design e desenvolvimento.
              </p>
              <div className={styles.aboutFinalActions}>
                <Button href={whatsappUrl} target="_blank" rel="noreferrer">Chamar no WhatsApp</Button>
                <Button to="/servicos" variant="secondary">Ver serviços</Button>
              </div>
            </div>
          </section>
          </Container>
        </div>
      </section>
    </PageLayout>
  );
}
