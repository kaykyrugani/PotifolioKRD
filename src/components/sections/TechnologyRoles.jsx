import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Container from '../ui/Container';
import { barReveal, cardReveal, flowStepReveal, revealViewport, tagReveal, verticalReveal } from './technologyMotion';
import sectionStyles from './TechnologyRoles.module.css';

const identityRevealSectionClassName = (className) => className;
const noop = () => {};

const figmaStoryboardItems = [
  {
    key: 'flow',
    label: 'Fluxo',
    description: 'Define a organização das informações para conduzir o usuário até a ação mais importante da página.',
  },
  {
    key: 'interface',
    label: 'Interface',
    description: 'Define hierarquia visual, componentes e padrões para criar uma navegação clara.',
  },
  {
    key: 'responsive',
    label: 'Responsivo',
    description: 'Garante uma experiência consistente em desktop, tablet e dispositivos móveis.',
  },
];

const figmaResultItems = [
  'Wireframes',
  'UI Design',
  'Componentes',
  'Protótipos',
  'Desktop',
  'Mobile',
];

const reactCompositionComponents = [
  { key: 'button', label: 'Button', className: 'Button' },
  { key: 'input', label: 'Input', className: 'Input' },
  { key: 'card', label: 'Card', className: 'Card' },
  { key: 'modal', label: 'Modal', className: 'Modal' },
  { key: 'dropdown', label: 'Dropdown', className: 'Dropdown' },
];

const reactCompositionPanelReveal = {
  hidden: { opacity: 0, y: 26, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1],
      when: 'beforeChildren',
    },
  },
};

const reactCompositionBaseReveal = {
  hidden: { opacity: 0, x: -20, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { delay: 0.22, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const reactCompositionNodeReveal = {
  hidden: { opacity: 0, y: 18, scale: 0.94 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.9 + index * 0.11,
      duration: 0.46,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const reactCompositionAppReveal = {
  hidden: { opacity: 0, x: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { delay: 1.76, duration: 0.56, ease: [0.22, 1, 0.36, 1] },
  },
};

const reactCompositionConnectionReveal = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: (delay = 0.62) => ({
    opacity: 1,
    pathLength: 1,
    transition: { delay, duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  }),
};

function useDesktopTimeline() {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 900px)');
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener('change', updateMatches);

    return () => {
      mediaQuery.removeEventListener('change', updateMatches);
    };
  }, []);

  return matches;
}

const technologyRoles = [
  {
    kind: 'figma',
    label: 'Figma',
    title: 'Figma para estruturar experiência antes do código.',
    description: 'O projeto começa organizando informação, hierarquia visual, componentes e responsividade antes da primeira linha de desenvolvimento.',
    items: ['Wireframes', 'UI Design', 'Componentes', 'Protótipos', 'Versão desktop/mobile'],
    visualTitle: 'Experiência planejada',
    visualItems: ['Fluxo', 'Interface', 'Responsivo'],
  },
  {
    kind: 'react',
    label: 'React',
    title: 'React para construir interfaces escaláveis.',
    description: 'Componentes reutilizáveis, estrutura organizada e desenvolvimento preparado para manutenção e evolução.',
    items: ['Componentização', 'Estados', 'Reutilização', 'Performance', 'Manutenção'],
    visualTitle: 'Interface componentizada',
    visualItems: ['Componentes', 'CSS Modules', 'Estados'],
  },
  {
    kind: 'seo-ai',
    label: 'SEO e IA',
    title: 'SEO e IA para criar páginas mais estratégicas.',
    description: 'SEO técnico, estrutura semântica e apoio de IA para melhorar copy, organização de conteúdo, intenção de busca e clareza da página.',
    items: ['Headings', 'Meta tags', 'SEO semântico', 'Copy orientada', 'Estrutura de conteúdo'],
    visualTitle: 'Conteúdo com intenção',
    visualItems: ['HTML semântico', 'Copy', 'Busca'],
  },
  {
    kind: 'performance',
    label: 'Performance',
    title: 'Performance para transformar velocidade em experiência.',
    description: 'Otimização de imagens, vídeos, carregamento e boas práticas para reduzir fricção e melhorar percepção profissional.',
    items: ['Imagens otimizadas', 'Vídeos leves', 'Lazy loading', 'Core Web Vitals', 'Carregamento rápido'],
    visualTitle: 'Entrega leve',
    visualItems: ['Assets', 'Carga', 'Resposta'],
  },
  {
    kind: 'hosting',
    label: 'Publicação',
    title: 'Publicação segura com estrutura pronta para crescer.',
    description: 'Configuração de hospedagem, domínio, SSL e deploy para colocar o projeto no ar com estabilidade.',
    items: ['Hostinger', 'Domínio', 'SSL', 'Deploy', 'Configuração inicial'],
    visualTitle: 'Projeto no ar',
    visualItems: ['Hospedagem', 'SSL', 'Deploy'],
  },
];

function getFigmaPhase(progress) {
  if (progress >= 0.98) {
    return 'complete';
  }

  if (progress >= 0.75) {
    return 'responsive';
  }

  if (progress >= 0.7) {
    return 'interfaceToResponsive';
  }

  if (progress >= 0.4) {
    return 'interface';
  }

  if (progress >= 0.34) {
    return 'flowToInterface';
  }

  if (progress >= 0.15) {
    return 'flow';
  }

  return 'intro';
}

function isFigmaToolActive(item, phase) {
  const activeToolsByPhase = {
    flow: new Set(['Wireframes', 'Protótipos']),
    interface: new Set(['Componentes', 'Protótipos']),
    responsive: new Set(['Versão desktop/mobile', 'UI Design']),
  };

  return activeToolsByPhase[phase]?.has(item) ?? false;
}

function FigmaRoleVisual({ role, visualClassName, progress, phase, shouldReduceMotion }) {
  const cardOpacity = useTransform(progress, [0, 0.15], [0.72, 1]);
  const cardY = useTransform(progress, [0, 0.15], [18, 0]);
  const cardGlow = useTransform(progress, [0, 0.4, 1], [0.16, 0.32, 0.42]);
  const visualPhase = shouldReduceMotion ? 'complete' : phase;
  const activeItem = {
    flow: 'flow',
    interface: 'interface',
    responsive: 'responsive',
  }[visualPhase];
  const isComplete = visualPhase === 'complete';
  const shouldHideResultGrid = !isComplete && visualPhase !== 'intro';
  const figmaClassName = [
    visualClassName,
    sectionStyles.techFigmaVisual,
    activeItem || isComplete ? sectionStyles.techRoleVisualActive : '',
    sectionStyles[`techFigmaPhase-${visualPhase}`],
  ].filter(Boolean).join(' ');

  return (
    <motion.div
      className={figmaClassName}
      style={shouldReduceMotion ? undefined : {
        opacity: cardOpacity,
        y: cardY,
        '--figma-card-glow': cardGlow,
      }}
      aria-hidden="true"
    >
      <span>{role.label}</span>
      <strong>{role.visualTitle}</strong>

      <ol className={sectionStyles.techFigmaStoryboard}>
        {figmaStoryboardItems.map((item) => {
          const itemIsActive = activeItem === item.key;
          const itemIsComplete = isComplete;
          const itemClassName = [
            sectionStyles.techFigmaItem,
            itemIsActive ? sectionStyles.techFigmaItemActive : '',
            itemIsComplete ? sectionStyles.techFigmaItemComplete : '',
          ].filter(Boolean).join(' ');

          return (
            <li className={itemClassName} key={item.key}>
              <div className={sectionStyles.techFigmaItemHeader}>
                <i aria-hidden="true" />
                <span>{item.label}</span>
                {itemIsComplete && <em aria-hidden="true">✓</em>}
              </div>
              <p>{item.description}</p>
            </li>
          );
        })}
      </ol>

      <div
        className={[
          sectionStyles.techFigmaResultGrid,
          shouldHideResultGrid ? sectionStyles.techFigmaResultGridHidden : '',
          isComplete ? sectionStyles.techFigmaResultGridComplete : '',
        ].filter(Boolean).join(' ')}
      >
        {figmaResultItems.map((item) => (
          <span key={item}>{isComplete ? `✓ ${item}` : item}</span>
        ))}
      </div>
    </motion.div>
  );
}

function FigmaRoleStory({ role, index }) {
  const shouldReduceMotion = useReducedMotion();
  const storyRef = useRef(null);
  const [phase, setPhase] = useState('intro');
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ['start start', 'end end'],
  });
  const visualClassName = [
    sectionStyles.techRoleVisual,
    sectionStyles[`techRoleVisual-${role.kind}`],
    sectionStyles.techRoleVisualFramed,
  ].filter(Boolean).join(' ');

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextPhase = getFigmaPhase(latest);
    setPhase((currentPhase) => (currentPhase === nextPhase ? currentPhase : nextPhase));
  });

  return (
    <section className={sectionStyles.techRoleStory} ref={storyRef}>
      <motion.article
        className={`${sectionStyles.techRoleBlock} ${sectionStyles.techRoleSticky}`}
        custom={index}
        initial="hidden"
        key={role.title}
        variants={cardReveal}
        viewport={revealViewport}
        whileInView="visible"
      >
        <div className={sectionStyles.techRoleCopy}>
          <span>{role.label}</span>
          <h3>{role.title}</h3>
          <p>{role.description}</p>
          <ul>
            {role.items.map((item, itemIndex) => {
              const shouldActivateTool = !shouldReduceMotion && isFigmaToolActive(item, phase);

              return (
                <motion.li
                  className={shouldActivateTool ? sectionStyles.techFigmaToolActive : undefined}
                  custom={itemIndex}
                  key={item}
                  variants={tagReveal}
                >
                  {item}
                </motion.li>
              );
            })}
          </ul>
        </div>
        <FigmaRoleVisual
          phase={phase}
          progress={scrollYProgress}
          role={role}
          shouldReduceMotion={shouldReduceMotion}
          visualClassName={visualClassName}
        />
      </motion.article>
    </section>
  );
}

function ReactRoleVisual({ role, index }) {
  const shouldFrame = index % 2 === 0;
  const visualClassName = [
    sectionStyles.techRoleVisual,
    sectionStyles[`techRoleVisual-${role.kind}`],
    shouldFrame ? sectionStyles.techRoleVisualFramed : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <motion.div
        className={`${visualClassName} ${sectionStyles.techReactMobileVisual}`}
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        <span>{role.label}</span>
        <strong>Arquitetura visual</strong>
        <ol className={sectionStyles.techArchitectureFlow}>
          {['Interface', 'Componentes', 'Estados', 'Reutilização', 'Escalabilidade'].map((item, itemIndex) => (
            <motion.li custom={itemIndex} key={item} variants={flowStepReveal}>
              {item}
            </motion.li>
          ))}
        </ol>
      </motion.div>

      <motion.div
        className={sectionStyles.reactCompositionPanel}
        aria-hidden="true"
        initial="hidden"
        variants={reactCompositionPanelReveal}
        viewport={{ once: true, amount: 0.34 }}
        whileInView="visible"
      >
        <svg className={sectionStyles.reactConnectionLayer} viewBox="0 0 1000 360" preserveAspectRatio="none">
          <motion.path
            className={sectionStyles.reactConnectionPath}
            custom={0.62}
            d="M230 164 C292 150 326 148 372 154"
            variants={reactCompositionConnectionReveal}
          />
          <motion.path
            className={sectionStyles.reactConnectionPath}
            custom={0.72}
            d="M230 198 C292 216 326 218 372 206"
            variants={reactCompositionConnectionReveal}
          />
          <motion.path
            className={sectionStyles.reactConnectionPath}
            custom={1.46}
            d="M636 154 C696 146 734 150 770 166"
            variants={reactCompositionConnectionReveal}
          />
          <motion.path
            className={sectionStyles.reactConnectionPath}
            custom={1.56}
            d="M636 210 C696 224 734 216 770 194"
            variants={reactCompositionConnectionReveal}
          />
        </svg>

        <motion.div className={sectionStyles.reactBaseNode} variants={reactCompositionBaseReveal}>
          <span className={sectionStyles.reactNodeLabel}>Componente Base</span>
          <span className={sectionStyles.reactBaseButton}>Button</span>
        </motion.div>

        <div className={sectionStyles.reactComponentCluster}>
          <span className={sectionStyles.reactNodeLabel}>Sistema de Componentes</span>
          <div className={sectionStyles.reactComponentOrbit}>
            {reactCompositionComponents.map((component, componentIndex) => (
              <motion.span
                className={`${sectionStyles.reactComponentNode} ${sectionStyles[`reactComponentNode${component.className}`]}`}
                custom={componentIndex}
                key={component.key}
                variants={reactCompositionNodeReveal}
              >
                {component.label}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.div className={sectionStyles.reactAppNode} variants={reactCompositionAppReveal}>
          <span className={sectionStyles.reactNodeLabel}>Aplicação</span>
          <div className={sectionStyles.reactMiniInterface}>
            <span />
            <div>
              <i />
              <i />
              <i />
            </div>
            <section>
              <em />
              <em />
              <em />
            </section>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

function ReactSeoTransitionStory({ reactRole, reactIndex, seoRole, seoIndex }) {
  const shouldReduceMotion = useReducedMotion();
  const isDesktopTimeline = useDesktopTimeline();
  const storyRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ['start start', 'end end'],
  });
  const shouldAnimateTransition = isDesktopTimeline && !shouldReduceMotion;
  const reactX = useTransform(scrollYProgress, [0, 0.62, 0.72, 1], ['0%', '0%', '-110%', '-110%'], { clamp: true });
  const reactOpacity = useTransform(scrollYProgress, [0, 0.62, 0.72, 1], [1, 1, 0, 0], { clamp: true });
  const seoX = useTransform(scrollYProgress, [0, 0.74, 0.84, 1], ['110%', '110%', '0%', '0%'], { clamp: true });
  const seoOpacity = useTransform(scrollYProgress, [0, 0.74, 0.84, 1], [0, 0, 1, 1], { clamp: true });
  const reactPanelStyle = shouldAnimateTransition ? { x: reactX, opacity: reactOpacity } : undefined;
  const seoPanelStyle = shouldAnimateTransition ? { x: seoX, opacity: seoOpacity } : undefined;

  return (
    <section
      className={[
        sectionStyles.techRoleReactSeoStory,
        shouldAnimateTransition ? sectionStyles.techRoleReactSeoStoryAnimated : '',
      ].filter(Boolean).join(' ')}
      ref={storyRef}
    >
      <div className={sectionStyles.techReactSeoSticky}>
      <div className={sectionStyles.techReactSeoStaticLayer} aria-hidden="true" />
      <motion.article
        className={`${sectionStyles.techRoleBlock} ${sectionStyles.techRoleBlockReact} ${sectionStyles.techReactSeoPanel} ${sectionStyles.techReactSeoPanelReact}`}
        custom={reactIndex}
        initial="hidden"
        key={reactRole.title}
        style={reactPanelStyle}
        variants={cardReveal}
        viewport={revealViewport}
        whileInView="visible"
      >
        <div className={sectionStyles.techRoleCopy}>
          <span>{reactRole.label}</span>
          <h3>{reactRole.title}</h3>
          <p>{reactRole.description}</p>
          <ul>
            {reactRole.items.map((item, itemIndex) => (
              <motion.li custom={itemIndex} key={item} variants={tagReveal}>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
        <ReactRoleVisual index={reactIndex} role={reactRole} />
      </motion.article>

      <motion.article
        className={`${sectionStyles.techRoleBlock} ${sectionStyles.techReactSeoPanel} ${sectionStyles.techReactSeoPanelSeo}`}
        custom={seoIndex}
        initial="hidden"
        key={seoRole.title}
        style={seoPanelStyle}
        variants={cardReveal}
        viewport={revealViewport}
        whileInView="visible"
      >
        <div className={sectionStyles.techRoleCopy}>
          <span>{seoRole.label}</span>
          <h3>{seoRole.title}</h3>
          <p>{seoRole.description}</p>
          <ul>
            {seoRole.items.map((item, itemIndex) => (
              <motion.li custom={itemIndex} key={item} variants={tagReveal}>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
        <RoleVisual role={seoRole} index={seoIndex} />
      </motion.article>
      </div>
    </section>
  );
}

function RoleVisual({ role, index }) {
  const shouldFrame = index % 2 === 0;
  const visualClassName = [
    sectionStyles.techRoleVisual,
    sectionStyles[`techRoleVisual-${role.kind}`],
    shouldFrame ? sectionStyles.techRoleVisualFramed : '',
  ].filter(Boolean).join(' ');

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
        <ol className={sectionStyles.techStrategyFlow}>
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
        <div className={sectionStyles.techRoleBars}>
          {['Assets', 'Imagens', 'Vídeos', 'Carregamento'].map((item, itemIndex) => (
            <div className={sectionStyles.techRoleBar} key={item}>
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
        <ol className={sectionStyles.techPublishFlow}>
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
      <div className={sectionStyles.techRoleVisualFlow}>
        {role.visualItems.map((item, itemIndex) => (
          <motion.em custom={itemIndex} key={item} variants={flowStepReveal}>
            {item}
          </motion.em>
        ))}
      </div>
      <div className={sectionStyles.techRoleVisualGrid}>
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


export default function TechnologyRoles({
  id = 'tech-roles',
  titleId = 'tech-roles-title',
  sectionKey = 'roles',
  className = '',
  getRevealSectionClassName = identityRevealSectionClassName,
  setRevealSectionRef = noop,
  revealStyles = {},
}) {
  return (
<section
          className={getRevealSectionClassName([sectionStyles.techSection, className].filter(Boolean).join(' '), sectionKey)}
          id={id}
          ref={(node) => setRevealSectionRef(sectionKey, node)}
          aria-labelledby={titleId}
        >
          <Container size="wide">
            <div className={revealStyles.techSectionIntro || undefined}>
              <p className={[revealStyles.techEyebrow, revealStyles.revealEyebrow].filter(Boolean).join(' ') || undefined}>COMO CADA TECNOLOGIA ATUA</p>
              <h2 className={revealStyles.revealTitle || undefined} id={titleId}>Cada escolha técnica precisa aparecer na experiência do usuário.</h2>
              <span className={revealStyles.revealDescription || undefined}>A tecnologia entra como sistema de suporte para transformar planejamento, interface e publicação em uma entrega mais confiável.</span>
            </div>

            <div className={sectionStyles.techRolesFlow}>
              {technologyRoles.map((role, index) => {
                if (role.kind === 'figma') {
                  return <FigmaRoleStory index={index} key={role.title} role={role} />;
                }

                if (role.kind === 'react') {
                  const seoRole = technologyRoles[index + 1];

                  if (seoRole?.kind === 'seo-ai') {
                    return (
                      <ReactSeoTransitionStory
                        key={`${role.title}-${seoRole.title}`}
                        reactIndex={index}
                        reactRole={role}
                        seoIndex={index + 1}
                        seoRole={seoRole}
                      />
                    );
                  }
                }

                if (role.kind === 'seo-ai' && technologyRoles[index - 1]?.kind === 'react') {
                  return null;
                }

                return (
                  <motion.article
                    className={[
                      sectionStyles.techRoleBlock,
                      index % 2 === 1 ? sectionStyles.techRoleBlockReverse : '',
                    ].filter(Boolean).join(' ')}
                    custom={index}
                    initial="hidden"
                    key={role.title}
                    variants={cardReveal}
                    viewport={revealViewport}
                    whileInView="visible"
                  >
                    <div className={sectionStyles.techRoleCopy}>
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
                );
              })}
            </div>
          </Container>
        </section>
  );
}
