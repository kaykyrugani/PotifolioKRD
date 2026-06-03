import { useCallback, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import tecnologiaHeroImage from '../assets/images/tecnologiaIMG.png';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
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

const stackKitChips = [
  { id: 'figma', label: 'Figma', activeFrom: 0.12, activeTo: 0.28 },
  { id: 'react', label: 'React', activeFrom: 0.3, activeTo: 0.52 },
  { id: 'typescript', label: 'TypeScript', activeFrom: 0.3, activeTo: 0.52 },
  { id: 'css', label: 'CSS', activeFrom: 0.3, activeTo: 0.52 },
  { id: 'seo', label: 'SEO', activeFrom: 0.7, activeTo: 0.86 },
  { id: 'api', label: 'API', activeFrom: 0.52, activeTo: 0.68 },
  { id: 'vercel', label: 'Vercel', activeFrom: 0.88, activeTo: 1 },
];

const pipelineStages = [
  {
    id: 'strategy',
    step: '01',
    title: 'Estratégia',
    items: ['Objetivo claro', 'Arquitetura da solução', 'Direção visual'],
    activeFrom: 0,
    activePeak: 0.08,
    activeTo: 0.18,
  },
  {
    id: 'design',
    step: '02',
    title: 'Design',
    items: ['Clareza visual', 'Hierarquia', 'Interface premium'],
    activeFrom: 0.14,
    activePeak: 0.23,
    activeTo: 0.34,
  },
  {
    id: 'development',
    step: '03',
    title: 'Desenvolvimento',
    items: ['Responsividade', 'Componentização', 'Interatividade'],
    activeFrom: 0.32,
    activePeak: 0.42,
    activeTo: 0.54,
  },
  {
    id: 'integrations',
    step: '04',
    title: 'Integrações',
    items: ['APIs conectadas', 'Fluxos inteligentes', 'Dados em movimento'],
    activeFrom: 0.52,
    activePeak: 0.61,
    activeTo: 0.72,
  },
  {
    id: 'optimization',
    step: '05',
    title: 'Otimização',
    items: ['SEO técnico', 'Performance', 'Indexação'],
    activeFrom: 0.7,
    activePeak: 0.79,
    activeTo: 0.9,
  },
  {
    id: 'publish',
    step: '06',
    title: 'Publicação',
    items: ['Deploy', 'Escalabilidade', 'Disponibilidade'],
    activeFrom: 0.88,
    activePeak: 0.96,
    activeTo: 1,
  },
];

const experienceBenefits = [
  'Performance',
  'SEO Técnico',
  'Conversão',
  'Responsividade',
  'Escalabilidade',
  'Experiência Digital',
];

const movingStackChips = [
  { id: 'figma', label: 'Figma', start: 0.12, end: 0.28, y: -112 },
  { id: 'react', label: 'React', start: 0.32, end: 0.5, y: -32 },
  { id: 'typescript', label: 'TypeScript', start: 0.34, end: 0.52, y: 18 },
  { id: 'css', label: 'CSS', start: 0.36, end: 0.54, y: 68 },
  { id: 'api', label: 'API', start: 0.56, end: 0.7, y: -4 },
  { id: 'seo', label: 'SEO', start: 0.74, end: 0.86, y: -72 },
  { id: 'vercel', label: 'Vercel', start: 0.88, end: 1, y: 92 },
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

function StackKitChip({ chip, progress, shouldReduceMotion }) {
  const chipCenter = (chip.activeFrom + chip.activeTo) / 2;
  const opacity = useTransform(
    progress,
    [chip.activeFrom, chipCenter, chip.activeTo],
    shouldReduceMotion ? [1, 1, 1] : [0.5, 1, 0.5],
  );
  const scale = useTransform(
    progress,
    [chip.activeFrom, chipCenter, chip.activeTo],
    shouldReduceMotion ? [1, 1, 1] : [0.96, 1.03, 0.98],
  );
  const borderGlow = useTransform(
    progress,
    [chip.activeFrom, chipCenter, chip.activeTo],
    shouldReduceMotion ? [1, 1, 1] : [0.22, 1, 0.35],
  );
  const chipClassName = [
    styles.techStackChip,
    shouldReduceMotion ? styles.techStackChipActive : '',
  ].filter(Boolean).join(' ');

  return (
    <motion.li
      className={chipClassName}
      style={shouldReduceMotion ? undefined : {
        opacity,
        scale,
        '--chip-glow': borderGlow,
      }}
    >
      {chip.label}
    </motion.li>
  );
}

function PipelineStage({ stage, progress, shouldReduceMotion }) {
  const opacity = useTransform(
    progress,
    [stage.activeFrom, stage.activePeak, stage.activeTo],
    shouldReduceMotion ? [1, 1, 1] : [0.28, 1, 0.28],
  );
  const scale = useTransform(
    progress,
    [stage.activeFrom, stage.activePeak, stage.activeTo],
    shouldReduceMotion ? [1, 1, 1] : [0.98, 1.04, 0.98],
  );
  const borderGlow = useTransform(
    progress,
    [stage.activeFrom, stage.activePeak, stage.activeTo],
    shouldReduceMotion ? [1, 1, 1] : [0.18, 1, 0.18],
  );
  const stageClassName = [
    styles.techPipelineStep,
    shouldReduceMotion ? styles.techPipelineStepActive : '',
  ].filter(Boolean).join(' ');

  return (
    <motion.li
      className={stageClassName}
      style={shouldReduceMotion ? undefined : {
        opacity,
        scale,
        '--step-glow': borderGlow,
      }}
    >
      <span className={styles.techPipelineStepIndex}>{stage.step}</span>
      <div className={styles.techPipelineStepBody}>
        <strong>{stage.title}</strong>
      </div>
    </motion.li>
  );
}

function MovingStackChip({ chip, progress, shouldReduceMotion }) {
  const travelStart = chip.start;
  const travelMiddle = Math.min(chip.start + (chip.end - chip.start) * 0.5, 0.96);
  const travelEnd = chip.end;
  const opacity = useTransform(
    progress,
    [travelStart, travelMiddle, travelEnd],
    shouldReduceMotion ? [0, 0, 0] : [0, 1, 0],
  );
  const x = useTransform(
    progress,
    [travelStart, travelEnd],
    shouldReduceMotion ? [0, 0] : [0, 420],
  );
  const y = useTransform(
    progress,
    [travelStart, travelMiddle, travelEnd],
    shouldReduceMotion ? [0, 0, 0] : [chip.y * 0.35, chip.y, chip.y * 0.15],
  );
  const scale = useTransform(
    progress,
    [travelStart, travelMiddle, travelEnd],
    shouldReduceMotion ? [1, 1, 1] : [0.86, 1.08, 0.9],
  );

  return (
    <motion.span
      className={`${styles.techMovingChip} ${styles[`techMovingChip-${chip.id}`]}`}
      style={shouldReduceMotion ? undefined : { opacity, x, y, scale }}
      aria-hidden="true"
    >
      {chip.label}
    </motion.span>
  );
}

function ResultBenefit({ benefit, index, progress, shouldReduceMotion }) {
  const activeAt = [0.18, 0.28, 0.44, 0.58, 0.78, 0.94][index] ?? 1;
  const opacity = useTransform(progress, [Math.max(activeAt - 0.08, 0), activeAt], [0.34, 1]);
  const scale = useTransform(progress, [Math.max(activeAt - 0.08, 0), activeAt], [0.98, 1]);
  const glow = useTransform(progress, [Math.max(activeAt - 0.08, 0), activeAt], [0, 1]);

  return (
    <motion.li
      style={shouldReduceMotion ? undefined : { opacity, scale, '--result-glow': glow }}
    >
      {benefit}
    </motion.li>
  );
}

function ResultPanel({ progress, shouldReduceMotion }) {
  const finalOpacity = useTransform(progress, [0.82, 1], [0.32, 1]);
  const finalScale = useTransform(progress, [0.82, 1], [0.98, 1.02]);

  return (
    <motion.section
      className={styles.techResultPanel}
      style={shouldReduceMotion ? undefined : { opacity: finalOpacity, scale: finalScale }}
      aria-label="Resultado"
    >
      <p className={styles.techStackKitLabel}>RESULTADO</p>
      <ul className={styles.techResultBenefitList}>
        {experienceBenefits.map((benefit, index) => (
          <ResultBenefit
            benefit={benefit}
            index={index}
            key={benefit}
            progress={progress}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </ul>
      <strong>Experiência Digital Completa</strong>
    </motion.section>
  );
}

function ResultConstruction({ progress, shouldReduceMotion }) {
  return (
    <section className={styles.techBuildResult} aria-label="Resultado em construção">
      <p className={styles.techPipelineLabel}>RESULTADO EM CONSTRUÇÃO</p>
      <div className={styles.techBuildResultStack}>
        {pipelineStages.map((stage) => (
          <PipelineStageDetails
            key={stage.id}
            progress={progress}
            shouldReduceMotion={shouldReduceMotion}
            stage={stage}
          />
        ))}
      </div>
    </section>
  );
}

function PipelineStageDetails({ stage, progress, shouldReduceMotion }) {
  const opacity = useTransform(
    progress,
    [stage.activeFrom, stage.activePeak, stage.activeTo],
    shouldReduceMotion ? [1, 1, 1] : [0, 1, 0],
  );
  const y = useTransform(
    progress,
    [stage.activeFrom, stage.activePeak, stage.activeTo],
    shouldReduceMotion ? [0, 0, 0] : [14, 0, -10],
  );

  return (
    <motion.div
      className={styles.techBuildResultStep}
      style={shouldReduceMotion ? undefined : { opacity, y }}
    >
      <strong>{stage.title}</strong>
      <ul>
        {stage.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
}

function AppliedTechnologyStory({ className, setSectionRef }) {
  const shouldReduceMotion = useReducedMotion();
  const scrollTrackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ['start start', 'end end'],
  });

  const flowProgress = useTransform(scrollYProgress, [0.08, 0.88], [0, 1]);
  const ambientGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.62, 0.95]);
  const pipelineDim = useTransform(scrollYProgress, [0.82, 0.96], [1, 0.72]);

  const handleSectionRef = useCallback((node) => {
    setSectionRef(node);
  }, [setSectionRef]);

  const handleScrollTrackRef = useCallback((node) => {
    scrollTrackRef.current = node;
  }, []);

  return (
    <section
      className={className}
      id="tecnologias-ecossistema"
      ref={handleSectionRef}
      aria-labelledby="tech-applied-title"
    >
      <Container size="wide">
        <header className={styles.techAppliedHeader}>
          <p className={`${styles.techEyebrow} ${styles.revealEyebrow}`}>TECNOLOGIA APLICADA</p>
          <h2 className={styles.revealTitle} id="tech-applied-title">
            Da estratégia à publicação.
            <span>Cada tecnologia possui uma função.</span>
          </h2>
          <p className={styles.revealDescription}>
            Design, desenvolvimento, otimização e publicação trabalhando juntos para transformar ideias em experiências digitais rápidas, escaláveis e memoráveis.
          </p>
        </header>
      </Container>

      <div
        className={styles.techAppliedScrollTrack}
        ref={handleScrollTrackRef}
      >
        <div className={styles.techAppliedSticky}>
          <Container size="wide">
            <div className={styles.techAppliedStage}>
              <motion.div
                className={styles.techAppliedAmbient}
                style={shouldReduceMotion ? undefined : { opacity: ambientGlow }}
                aria-hidden="true"
              />
              <motion.div
                className={styles.techAppliedFlowLine}
                style={shouldReduceMotion ? undefined : { scaleX: flowProgress }}
                aria-hidden="true"
              />
              <div className={styles.techMovingLayer} aria-hidden="true">
                {movingStackChips.map((chip) => (
                  <MovingStackChip
                    chip={chip}
                    key={chip.id}
                    progress={scrollYProgress}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                ))}
              </div>

              <aside className={styles.techStackColumn} aria-label="Ferramentas e resultado">
                <section className={styles.techStackKit}>
                  <p className={styles.techStackKitLabel}>STACK KIT</p>
                  <ul className={styles.techStackChipList}>
                    {stackKitChips.map((chip) => (
                      <StackKitChip
                        chip={chip}
                        key={chip.id}
                        progress={scrollYProgress}
                        shouldReduceMotion={shouldReduceMotion}
                      />
                    ))}
                  </ul>
                </section>

                <ResultPanel
                  progress={scrollYProgress}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </aside>

              <motion.div
                className={styles.techProcessColumn}
                style={shouldReduceMotion ? undefined : { opacity: pipelineDim }}
              >
                <section className={styles.techPipelineWrap} aria-label="Processo">
                  <p className={styles.techPipelineLabel}>PROCESSO</p>
                  <ol className={styles.techPipelineList}>
                    {pipelineStages.map((stage) => (
                      <PipelineStage
                        key={stage.id}
                        progress={scrollYProgress}
                        shouldReduceMotion={shouldReduceMotion}
                        stage={stage}
                      />
                    ))}
                  </ol>
                </section>

                <ResultConstruction
                  progress={scrollYProgress}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </motion.div>
            </div>
          </Container>
        </div>
      </div>

      <Container size="wide">
        <div className={styles.techAppliedMobile}>
          <section className={styles.techStackKitMobile} aria-label="Stack Kit">
            <p className={styles.techStackKitLabel}>STACK KIT</p>
            <ul className={styles.techStackChipList}>
              {stackKitChips.map((chip) => (
                <li className={styles.techStackChip} key={chip.id}>{chip.label}</li>
              ))}
            </ul>
          </section>

          {pipelineStages.map((stage) => (
            <motion.section
              className={styles.techPipelineMobileStep}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
              key={stage.id}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.35 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <span>{stage.step}</span>
              <h3>{stage.title}</h3>
              <p>{stage.items.join(' / ')}</p>
            </motion.section>
          ))}

          <motion.article
            className={`${styles.techResultPanel} ${styles.techResultPanelActive}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.35 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          >
            <p className={styles.techStackKitLabel}>RESULTADO</p>
            <ul className={styles.techResultBenefitList}>
              {experienceBenefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <strong>Experiência Digital Completa</strong>
          </motion.article>
        </div>
      </Container>
    </section>
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
                    <Button to={whatsappPath} variant="secondary">Iniciar projeto</Button>
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
                  loading="eager"
                />
              </div>
            </div>
          </Container>
        </section>

        <AppliedTechnologyStory
          className={getRevealSectionClassName(styles.techAppliedSection, revealSectionKeys.ecosystem)}
          setSectionRef={(node) => setRevealSectionRef(revealSectionKeys.ecosystem, node)}
        />

        <section
          className={getRevealSectionClassName(styles.techSection, revealSectionKeys.roles)}
          ref={(node) => setRevealSectionRef(revealSectionKeys.roles, node)}
          aria-labelledby="tech-roles-title"
        >
          <Container size="wide">
            <SectionIntro
              eyebrow="COMO CADA TECNOLOGIA ATUA"
              title="Cada escolha técnica precisa aparecer na experiência do usuário."
              description="A tecnologia entra como sistema de suporte para transformar planejamento, interface e publicação em uma entrega mais confiável."
              id="tech-roles-title"
              reveal
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

        <section
          className={getRevealSectionClassName(styles.techActionSection, revealSectionKeys.action)}
          ref={(node) => setRevealSectionRef(revealSectionKeys.action, node)}
          aria-labelledby="tech-action-title"
        >
          <Container size="wide">
            <SectionIntro
              eyebrow="TECNOLOGIA EM AÇÃO"
              title="Não é sobre ferramentas. É sobre percepção."
              description="A camada técnica aparece quando o visitante sente velocidade, clareza, fluidez e confiança sem precisar entender o que está por trás."
              id="tech-action-title"
              reveal
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
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
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
