import { motion, useReducedMotion } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import tecnologiaHeroImage from '../assets/images/tecnologiaIMG.png';
import { whatsappPath } from '../utils/contact';
import styles from './Page.module.css';

const revealViewport = { once: true, amount: 0.28 };

const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: index * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const tagReveal = {
  hidden: { opacity: 0, y: 10 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.46,
      delay: 0.18 + index * 0.045,
      ease: 'easeOut',
    },
  }),
};

const lineReveal = {
  hidden: { opacity: 0.08, pathLength: 0 },
  visible: (index = 0) => ({
    opacity: 1,
    pathLength: 1,
    transition: {
      opacity: { duration: 0.3, delay: 0.1 + index * 0.12 },
      pathLength: { duration: 1, delay: 0.1 + index * 0.12, ease: [0.22, 1, 0.36, 1] },
    },
  }),
};

const ecosystemNodeReveal = {
  hidden: { opacity: 0.48, scale: 1, y: 0 },
  visible: (index = 0) => ({
    opacity: 1,
    scale: [1, 1.03, 1],
    y: [-2, 2, -2],
    transition: {
      opacity: { duration: 0.36, delay: 1.05 + index * 0.08 },
      scale: { duration: 0.9, delay: 1.05 + index * 0.08, ease: 'easeInOut' },
      y: {
        duration: 6 + index * 0.28,
        delay: 1.5 + index * 0.12,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      },
    },
  }),
};

const flowStepReveal = {
  hidden: { opacity: 0.42, y: 12 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.16 + index * 0.12,
      ease: 'easeOut',
    },
  }),
};

const barReveal = {
  hidden: { scaleX: 0 },
  visible: (index = 0) => ({
    scaleX: 1,
    transition: {
      duration: 0.8,
      delay: 0.18 + index * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const verticalReveal = {
  hidden: { scaleY: 0 },
  visible: (index = 0) => ({
    scaleY: 1,
    transition: {
      duration: 0.9,
      delay: 0.16 + index * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const ecosystemNodes = [
  'Figma',
  'React',
  'SEO',
  'IA',
  'Performance',
  'Hostinger',
  'Deploy',
  'Responsividade',
];

const technologyRoles = [
  {
    kind: 'figma',
    label: '01',
    title: 'Figma para estruturar experiência antes do código.',
    description: 'O projeto começa organizando informação, hierarquia visual, componentes e responsividade antes da primeira linha de desenvolvimento.',
    items: ['Wireframes', 'UI Design', 'Componentes', 'Protótipos', 'Versão desktop/mobile'],
    visualTitle: 'Experiência planejada',
    visualItems: ['Fluxo', 'Interface', 'Responsivo'],
  },
  {
    kind: 'react',
    label: '02',
    title: 'React para construir interfaces escaláveis.',
    description: 'Componentes reutilizáveis, estrutura organizada e desenvolvimento preparado para manutenção e evolução.',
    items: ['Componentização', 'Estados', 'Reutilização', 'Performance', 'Manutenção'],
    visualTitle: 'Interface componentizada',
    visualItems: ['Componentes', 'CSS Modules', 'Estados'],
  },
  {
    kind: 'seo-ai',
    label: '03',
    title: 'SEO e IA para criar páginas mais estratégicas.',
    description: 'SEO técnico, estrutura semântica e apoio de IA para melhorar copy, organização de conteúdo, intenção de busca e clareza da página.',
    items: ['Headings', 'Meta tags', 'SEO semântico', 'Copy orientada', 'Estrutura de conteúdo'],
    visualTitle: 'Conteúdo com intenção',
    visualItems: ['HTML semântico', 'Copy', 'Busca'],
  },
  {
    kind: 'performance',
    label: '04',
    title: 'Performance para transformar velocidade em experiência.',
    description: 'Otimização de imagens, vídeos, carregamento e boas práticas para reduzir fricção e melhorar percepção profissional.',
    items: ['Imagens otimizadas', 'Vídeos leves', 'Lazy loading', 'Core Web Vitals', 'Carregamento rápido'],
    visualTitle: 'Entrega leve',
    visualItems: ['Assets', 'Carga', 'Resposta'],
  },
  {
    kind: 'hosting',
    label: '05',
    title: 'Publicação segura com estrutura pronta para crescer.',
    description: 'Configuração de hospedagem, domínio, SSL e deploy para colocar o projeto no ar com estabilidade.',
    items: ['Hostinger', 'Domínio', 'SSL', 'Deploy', 'Configuração inicial'],
    visualTitle: 'Projeto no ar',
    visualItems: ['Hospedagem', 'SSL', 'Deploy'],
  },
];

const actionModules = [
  {
    title: 'Performance',
    description: 'Carregamento, assets e estrutura técnica trabalham para deixar a navegação mais direta.',
    type: 'performance',
  },
  {
    title: 'Vídeo otimizado',
    description: 'Área preparada para receber microdemonstrações curtas, leves e sem áudio quando houver arquivo.',
    type: 'video',
  },
  {
    title: 'Scroll interativo',
    description: 'Estrutura pronta para animações progressivas, mantendo a primeira versão estável e leve.',
    type: 'scroll',
  },
  {
    title: 'IA aplicada',
    description: 'Apoio estratégico para transformar briefing em estrutura, copy e SEO com mais clareza.',
    type: 'ai',
  },
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

function SectionIntro({ eyebrow, title, description, id }) {
  return (
    <div className={styles.techSectionIntro}>
      <p className={styles.techEyebrow}>{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description && <span>{description}</span>}
    </div>
  );
}

function EcosystemMap() {
  const shouldReduceMotion = useReducedMotion();
  const ecosystemPaths = [
    'M490 300L180 124',
    'M490 300L490 76',
    'M490 300L800 126',
    'M490 300L850 302',
    'M490 300L790 470',
    'M490 300L490 524',
    'M490 300L186 474',
    'M490 300L130 302',
  ];

  return (
    <motion.div
      className={styles.techEcosystemMap}
      aria-label="Ecossistema técnico conectado ao projeto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.42 }}
    >
      <svg className={styles.techEcosystemLines} viewBox="0 0 980 600" aria-hidden="true">
        {ecosystemPaths.map((path, index) => (
          <motion.path
            custom={index}
            d={path}
            key={path}
            variants={shouldReduceMotion ? undefined : lineReveal}
          />
        ))}
      </svg>

      <motion.div
        className={styles.techEcosystemCore}
        variants={{
          hidden: { opacity: 0.78 },
          visible: { opacity: 1, transition: { duration: 0.45 } },
        }}
      >
        <span>centro</span>
        <strong>Projeto</strong>
      </motion.div>

      {ecosystemNodes.map((node, index) => (
        <span className={`${styles.techEcosystemNode} ${styles[`techEcosystemNode${index + 1}`]}`} key={node}>
          <motion.span
            className={styles.techEcosystemNodeInner}
            custom={index}
            variants={shouldReduceMotion ? undefined : ecosystemNodeReveal}
          >
            {node}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

function RoleVisual({ role, index }) {
  const shouldFrame = index % 2 === 0;
  const visualClassName = [
    styles.techRoleVisual,
    styles[`techRoleVisual-${role.kind}`],
    shouldFrame ? styles.techRoleVisualFramed : '',
  ].filter(Boolean).join(' ');

  if (role.kind === 'react') {
    return (
      <motion.div
        className={visualClassName}
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        <span>{role.label}</span>
        <strong>Arquitetura visual</strong>
        <ol className={styles.techArchitectureFlow}>
          {['Interface', 'Componentes', 'Estados', 'Reutilização', 'Escalabilidade'].map((item, itemIndex) => (
            <motion.li custom={itemIndex} key={item} variants={flowStepReveal}>
              {item}
            </motion.li>
          ))}
        </ol>
      </motion.div>
    );
  }

  if (role.kind === 'seo-ai') {
    return (
      <motion.div
        className={visualClassName}
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        <span>{role.label}</span>
        <strong>Fluxo estratégico</strong>
        <ol className={styles.techStrategyFlow}>
          {['Briefing', 'Estrutura', 'Copy', 'SEO', 'Conteúdo final'].map((item, itemIndex) => (
            <motion.li custom={itemIndex} key={item} variants={flowStepReveal}>
              {item}
            </motion.li>
          ))}
        </ol>
      </motion.div>
    );
  }

  if (role.kind === 'performance') {
    return (
      <motion.div
        className={visualClassName}
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        <span>{role.label}</span>
        <strong>Percepção de velocidade</strong>
        <div className={styles.techRoleBars}>
          {['Assets', 'Imagens', 'Vídeos', 'Carregamento'].map((item, itemIndex) => (
            <div className={styles.techRoleBar} key={item}>
              <span>{item}</span>
              <em>
                <motion.i custom={itemIndex} variants={barReveal} />
              </em>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (role.kind === 'hosting') {
    return (
      <motion.div
        className={visualClassName}
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        <span>{role.label}</span>
        <strong>Publicação conectada</strong>
        <ol className={styles.techPublishFlow}>
          {['Domínio', 'Hostinger', 'SSL', 'Deploy', 'Site online'].map((item, itemIndex) => (
            <motion.li custom={itemIndex} key={item} variants={flowStepReveal}>
              <span>{item}</span>
              {itemIndex < 4 && <motion.i custom={itemIndex} variants={verticalReveal} />}
            </motion.li>
          ))}
        </ol>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={visualClassName}
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      <span>{role.label}</span>
      <strong>{role.visualTitle}</strong>
      <div className={styles.techRoleVisualFlow}>
        {role.visualItems.map((item, itemIndex) => (
          <motion.em custom={itemIndex} key={item} variants={flowStepReveal}>
            {item}
          </motion.em>
        ))}
      </div>
      <div className={styles.techRoleVisualGrid}>
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    </motion.div>
  );
}

function ActionVisual({ type }) {
  if (type === 'performance') {
    return (
      <motion.div
        className={styles.techPerformanceVisual}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        {['Carregamento', 'Assets', 'Experiência'].map((item, index) => (
          <div className={styles.techPerformanceRow} key={item}>
            <span>{item}</span>
            <em>
              <motion.i custom={index} variants={barReveal} />
            </em>
          </div>
        ))}
      </motion.div>
    );
  }

  if (type === 'video') {
    return (
      <div className={styles.techVideoFrame}>
        <video className={styles.techVideoElement} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        <div className={styles.techVideoFallback}>
          <span>video</span>
          <strong>microdemo preparada</strong>
        </div>
      </div>
    );
  }

  if (type === 'scroll') {
    return (
      <motion.div
        className={styles.techScrollDemo}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        <div className={styles.techScrollPath}>
          <motion.i custom={0} variants={verticalReveal} />
          <motion.span custom={1} variants={barReveal} />
          <motion.span custom={2} variants={barReveal} />
          <motion.span custom={3} variants={barReveal} />
        </div>
        <strong>scroll progressivo</strong>
      </motion.div>
    );
  }

  return (
    <motion.ol className={styles.techAiFlow} initial="hidden" whileInView="visible" viewport={revealViewport}>
      {['Briefing', 'Estrutura', 'Copy', 'SEO'].map((step, index) => (
        <motion.li custom={index} key={step} variants={flowStepReveal}>
          {step}
        </motion.li>
      ))}
    </motion.ol>
  );
}

export default function TechnologiesPage() {
  const shouldReduceMotion = useReducedMotion();

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
                <p className={styles.techEyebrow}>TECNOLOGIAS</p>
                <h1 id="technologies-page-title">
                  Tecnologia aplicada para criar experiências rápidas, inteligentes e memoráveis.
                </h1>
                <p>
                  Ferramentas, otimização e infraestrutura trabalhando juntas para transformar design em produto digital com performance, clareza e presença profissional.
                </p>
                <div className={styles.techHeroActions}>
                  <Button href="#tecnologias-ecossistema">Explorar tecnologias</Button>
                  <Button to={whatsappPath} variant="secondary">Iniciar projeto</Button>
                </div>
              </div>

              <div className={`${styles.heroImageVisual} ${styles.techHeroImageVisual}`} aria-hidden="true">
                <img src={tecnologiaHeroImage} alt="" loading="eager" />
              </div>
            </div>
          </Container>
        </section>

        <section className={styles.techSection} id="tecnologias-ecossistema" aria-labelledby="tech-ecosystem-title">
          <Container size="wide">
            <SectionIntro
              eyebrow="ECOSSISTEMA TECNOLÓGICO"
              title="Não são ferramentas soltas. É um ecossistema de entrega."
              description="Cada camada tem uma função: planejar, construir, otimizar, publicar e manter a experiência funcionando com clareza."
              id="tech-ecosystem-title"
            />
            <EcosystemMap />
          </Container>
        </section>

        <section className={styles.techSection} aria-labelledby="tech-roles-title">
          <Container size="wide">
            <SectionIntro
              eyebrow="COMO CADA TECNOLOGIA ATUA"
              title="Cada escolha técnica precisa aparecer na experiência do usuário."
              description="A tecnologia entra como sistema de suporte para transformar planejamento, interface e publicação em uma entrega mais confiável."
              id="tech-roles-title"
            />

            <div className={styles.techRolesFlow}>
              {technologyRoles.map((role, index) => (
                <motion.article
                  className={`${styles.techRoleBlock} ${index % 2 === 1 ? styles.techRoleBlockReverse : ''}`}
                  custom={index}
                  initial="hidden"
                  key={role.title}
                  variants={cardReveal}
                  viewport={revealViewport}
                  whileInView="visible"
                >
                  <div className={styles.techRoleCopy}>
                    <span>{role.label}</span>
                    <h3>{role.title}</h3>
                    <p>{role.description}</p>
                    <ul>
                      {role.items.map((item, itemIndex) => (
                        <motion.li custom={itemIndex} key={item} variants={tagReveal}>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <RoleVisual role={role} index={index} />
                </motion.article>
              ))}
            </div>
          </Container>
        </section>

        <section className={styles.techActionSection} aria-labelledby="tech-action-title">
          <Container size="wide">
            <SectionIntro
              eyebrow="TECNOLOGIA EM AÇÃO"
              title="Não é sobre ferramentas. É sobre percepção."
              description="A camada técnica aparece quando o visitante sente velocidade, clareza, fluidez e confiança sem precisar entender o que está por trás."
              id="tech-action-title"
            />

            <div className={styles.techActionGrid}>
              {actionModules.map((module, index) => (
                <motion.article
                  className={`${styles.techActionModule} ${styles[`techActionModule-${module.type}`]}`}
                  custom={index}
                  initial="hidden"
                  key={module.title}
                  variants={cardReveal}
                  viewport={revealViewport}
                  whileInView="visible"
                >
                  <div>
                    <h3>{module.title}</h3>
                    <p>{module.description}</p>
                  </div>
                  <ActionVisual type={module.type} />
                </motion.article>
              ))}
            </div>
          </Container>
        </section>

        <section className={styles.techInfrastructureSection} aria-labelledby="tech-infra-title">
          <Container size="wide">
            <SectionIntro
              eyebrow="INFRAESTRUTURA E PUBLICAÇÃO"
              title="A experiência também depende de como o projeto vai para o ar."
              description="Hospedagem, SSL, domínio e deploy fazem parte do cuidado técnico para que a interface publicada continue confiável."
              id="tech-infra-title"
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
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </motion.li>
              ))}
            </ol>
          </Container>
        </section>

        <section className={styles.techResultsSection} aria-labelledby="tech-results-title">
          <Container size="wide">
            <div className={styles.techResultsComposition}>
              <div className={styles.techResultsCopy}>
                <p className={styles.techEyebrow}>RESULTADO PARA O CLIENTE</p>
                <h2 id="tech-results-title">O resultado não é tecnologia. É experiência.</h2>
                <p>
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

        <section className={styles.techFinalCta} aria-labelledby="tech-final-title">
          <Container>
            <motion.div
              className={styles.techFinalBox}
              initial={{ opacity: 0.92, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.48 }}
              whileInView={{ opacity: 1, scale: shouldReduceMotion ? 1 : 1.02 }}
            >
              <p className={styles.techEyebrow}>PRÓXIMO PASSO</p>
              <h2 id="tech-final-title">Vamos transformar tecnologia em presença digital?</h2>
              <p>
                Cada ferramenta deve servir a um objetivo: criar uma experiência mais clara, rápida e confiável para o seu público.
              </p>
              <div className={styles.techFinalActions}>
                <Button to={whatsappPath}>Chamar no WhatsApp</Button>
                <Button to="/servicos" variant="secondary">Ver serviços</Button>
              </div>
            </motion.div>
          </Container>
        </section>
      </section>
    </PageLayout>
  );
}
