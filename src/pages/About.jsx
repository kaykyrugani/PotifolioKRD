import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import aboutPhoto from '../assets/images/KaykyRuagani.png';
import { whatsappPath } from '../utils/contact';
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

const stackGroups = [
  {
    title: 'Design e estratégia',
    items: ['Figma', 'Arquitetura de informação', 'Referências visuais', 'Copy orientada à conversão'],
  },
  {
    title: 'Desenvolvimento',
    items: ['React', 'Next.js', 'JavaScript', 'HTML semântico', 'CSS Modules'],
  },
  {
    title: 'Performance e publicação',
    items: ['Vercel', 'Hospedagem', 'SEO técnico', 'Otimização responsiva'],
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

const heroChips = ['UI', 'SEO', 'Performance', 'Front-end'];
const trustSignals = ['SEO técnico', 'Deploy orientado', 'Responsividade', 'Performance'];

export default function About() {
  return (
    <PageLayout>
      <section className={styles.aboutPage}>
        <Container size="wide">
          <div className={styles.aboutHero}>
            <div className={styles.aboutHeroCopy}>
              <p className={styles.aboutEyebrow}>SOBRE O DESENVOLVEDOR</p>
              <h1>Desenvolvimento web com estratégia, estética premium e execução técnica.</h1>
              <p>
                Sou Kayky Rugani, desenvolvedor focado em criar sites, landing pages e experiências digitais que unem design, performance, SEO técnico e clareza comercial. Meu trabalho combina prototipação, desenvolvimento front-end, otimização e suporte para transformar ideias em presença digital profissional.
              </p>
              <div className={styles.aboutHeroActions}>
                <Button to="/servicos">Ver serviços</Button>
                <Button to={whatsappPath} variant="secondary">Iniciar conversa</Button>
              </div>
            </div>

            <div className={styles.aboutPortraitCard}>
              <div className={styles.aboutPortraitSystem} aria-hidden="true">
                <span className={`${styles.aboutSystemLine} ${styles.aboutSystemLineOne}`} />
                <span className={`${styles.aboutSystemLine} ${styles.aboutSystemLineTwo}`} />
                <span className={`${styles.aboutSystemNode} ${styles.aboutSystemNodeOne}`} />
                <span className={`${styles.aboutSystemNode} ${styles.aboutSystemNodeTwo}`} />
                <span className={`${styles.aboutSystemTag} ${styles.aboutSystemTagOne}`}>semantic</span>
                <span className={`${styles.aboutSystemTag} ${styles.aboutSystemTagTwo}`}>deploy</span>
              </div>
              <span className={styles.aboutPortraitLabel}>FRONT-END DEV</span>
              <div className={styles.aboutPortraitOrbit} aria-hidden="true" />
              <div className={styles.aboutPortraitMedia}>
                <img
                  src={aboutPhoto}
                  alt="Retrato de Kayky Rugani, desenvolvedor front-end."
                  loading="eager"
                />
              </div>
              <div className={styles.aboutHeroChips} aria-label="Especialidades técnicas">
                {heroChips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            </div>
          </div>

          <section className={styles.aboutSection} aria-labelledby="about-positioning-title">
            <div className={styles.aboutPositioningEditorial}>
              <div className={styles.aboutPositioningCopy}>
                <p className={styles.aboutSectionKicker}>POSICIONAMENTO</p>
                <h2 id="about-positioning-title">Mais do que código: construção de presença digital.</h2>
                <p>
                  O trabalho começa antes da interface: entender contexto, organizar mensagens e transformar uma ideia em uma experiência digital clara. O código entra como execução de uma estratégia visual, comercial e técnica.
                </p>
              </div>
              <div className={styles.aboutPositioningPanels}>
                {positioningCards.map((card, index) => (
                  <article className={styles.aboutPositioningPanel} key={card.title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.aboutSection} aria-labelledby="about-method-title">
            <div className={styles.aboutSectionHeader}>
              <p className={styles.aboutSectionKicker}>MÉTODO DE TRABALHO</p>
              <h2 id="about-method-title">Um processo pensado para transformar briefing em resultado.</h2>
            </div>
            <div className={styles.aboutMethodTimeline}>
              {methodSteps.map((step) => (
                <article className={styles.aboutMethodStep} key={step.number}>
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
              ))}
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
            <section className={styles.aboutSection} aria-labelledby="about-stack-title">
            <div className={styles.aboutSectionHeader}>
              <p className={styles.aboutSectionKicker}>STACK E FERRAMENTAS</p>
              <h2 id="about-stack-title">Ferramentas que sustentam o processo.</h2>
            </div>
            <div className={styles.aboutToolEcosystem}>
              <div className={styles.aboutEcosystemCore} aria-hidden="true">
                <span>processo</span>
                <strong>Design + código + publicação</strong>
              </div>
              {stackGroups.map((group, index) => (
                <article
                  className={`${styles.aboutEcosystemCluster} ${styles[`aboutEcosystemCluster${index + 1}`]}`}
                  key={group.title}
                >
                  <h3>{group.title}</h3>
                  <div className={styles.aboutStackChips}>
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              ))}
              <span className={`${styles.aboutEcosystemLine} ${styles.aboutEcosystemLineOne}`} aria-hidden="true" />
              <span className={`${styles.aboutEcosystemLine} ${styles.aboutEcosystemLineTwo}`} aria-hidden="true" />
              <span className={`${styles.aboutEcosystemLine} ${styles.aboutEcosystemLineThree}`} aria-hidden="true" />
            </div>
          </section>

          <section className={styles.aboutSection} aria-labelledby="about-principles-title">
            <div className={styles.aboutSectionHeader}>
              <p className={styles.aboutSectionKicker}>PRINCÍPIOS</p>
              <h2 id="about-principles-title">Princípios que guiam cada entrega.</h2>
            </div>
            <ol className={styles.aboutPrinciplesList}>
              {principles.map((principle, index) => (
                <li className={styles.aboutPrincipleItem} key={principle.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.aboutSection} aria-labelledby="about-trust-title">
            <div className={styles.aboutTrustCard}>
              <div className={styles.aboutTrustCopy}>
                <p className={styles.aboutSectionKicker}>CONFIANÇA</p>
                <h2 id="about-trust-title">O que você pode esperar ao trabalhar comigo.</h2>
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

          <section className={styles.aboutFinalCta} aria-labelledby="about-final-cta-title">
            <div className={styles.aboutFinalDecor} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className={styles.aboutFinalContent}>
              <p className={styles.aboutSectionKicker}>PRÓXIMO PASSO</p>
              <h2 id="about-final-cta-title">Vamos construir uma presença digital com mais clareza e impacto?</h2>
              <p>
                Me conte sobre seu projeto e eu te ajudo a entender o melhor caminho para tirar sua ideia do papel com estratégia, design e desenvolvimento.
              </p>
              <div className={styles.aboutFinalActions}>
                <Button to={whatsappPath}>Chamar no WhatsApp</Button>
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
