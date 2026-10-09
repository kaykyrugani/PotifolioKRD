import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useIsPresent, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Container from '../ui/Container';
import FigmaPreviewContent from './FigmaPreviews';
import ReactCompositionStory from './ReactCompositionStory';
import { TechnologyProgress, TechnologyStorySteps } from './TechnologyStoryPrimitives';
import { figmaStoryboardItems } from './figmaPreviewData';
import { barReveal, cardReveal, flowStepReveal, revealViewport, tagReveal, verticalReveal } from './technologyMotion';
import sectionStyles from './TechnologyRoles.module.css';

const identityRevealSectionClassName = (className) => className;
const noop = () => {};

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

function useFigmaScrollMode() {
  const [matches, setMatches] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
  ));

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener('change', updateMatches);

    return () => mediaQuery.removeEventListener('change', updateMatches);
  }, []);

  return matches;
}

function useFigmaDesktopLayout() {
  const [matches, setMatches] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  ));

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const updateMatches = () => setMatches(mediaQuery.matches);
    updateMatches();
    mediaQuery.addEventListener('change', updateMatches);
    return () => mediaQuery.removeEventListener('change', updateMatches);
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

const FigmaPreviewLayer = forwardRef(function FigmaPreviewLayer({ stage, direction, shouldReduceMotion }, ref) {
  const isPresent = useIsPresent();
  const variants = shouldReduceMotion
    ? {
      enter: { opacity: 0 },
      center: { opacity: 1, transition: { duration: 0.08 } },
      exit: { opacity: 0, transition: { duration: 0.08 } },
    }
    : {
      enter: (travelDirection) => ({ opacity: 0, y: travelDirection * 12, scale: 0.98 }),
      center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] } },
      exit: (travelDirection) => ({ opacity: 0, y: travelDirection * -12, scale: 0.98, transition: { duration: 0.2, ease: 'easeIn' } }),
    };

  return (
    <motion.div
      animate="center"
      aria-hidden={!isPresent}
      className={sectionStyles.techFigmaPreviewLayer}
      custom={direction}
      exit="exit"
      inert={!isPresent}
      initial="enter"
      ref={ref}
      variants={variants}
    >
      <FigmaPreviewContent isPresent={isPresent} shouldReduceMotion={shouldReduceMotion} stage={stage} />
    </motion.div>
  );
});

function FigmaPreviewSlot({ stage, direction, shouldReduceMotion }) {
  return (
    <div className={sectionStyles.techFigmaPreviewFrame}>
      <AnimatePresence custom={direction} initial={false} mode="popLayout">
        <FigmaPreviewLayer key={stage} direction={direction} shouldReduceMotion={shouldReduceMotion} stage={stage} />
      </AnimatePresence>
    </div>
  );
}

function FigmaAnimatedCount({ value, direction, shouldReduceMotion, ariaHidden = false }) {
  const variants = shouldReduceMotion
    ? {
      enter: { opacity: 0 },
      center: { opacity: 1, transition: { duration: 0.08 } },
      exit: { opacity: 0, transition: { duration: 0.08 } },
    }
    : {
      enter: (travelDirection) => ({ opacity: 0, y: travelDirection * 10 }),
      center: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
      exit: (travelDirection) => ({ opacity: 0, y: travelDirection * -10, transition: { duration: 0.2, ease: 'easeIn' } }),
    };

  return (
    <span className={sectionStyles.techFigmaProgressNumber} aria-hidden={ariaHidden}>
      <AnimatePresence custom={direction} initial={false} mode="popLayout">
        <motion.span key={value} animate="center" custom={direction} exit="exit" initial="enter" variants={variants}>
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const FigmaMobilePanel = forwardRef(function FigmaMobilePanel({ item, activeTools, tabId, panelId, shouldReduceMotion }, ref) {
  const isPresent = useIsPresent();

  return (
    <motion.div
      animate={{ opacity: 1, transition: { duration: shouldReduceMotion ? 0.08 : 0.2 } }}
      aria-hidden={!isPresent}
      aria-labelledby={`${tabId}-${item.key}`}
      className={sectionStyles.techFigmaMobileContentPanel}
      exit={{ opacity: 0, transition: { duration: shouldReduceMotion ? 0.08 : 0.2 } }}
      id={`${panelId}-${item.key}`}
      initial={{ opacity: 0 }}
      ref={ref}
      role="tabpanel"
      tabIndex={0}
    >
      <p className={sectionStyles.techFigmaMobileDescription}>{item.description}</p>
      <ul className={sectionStyles.techFigmaMobileChips} aria-label="Recursos desta etapa">
        {activeTools.map((tool) => <li key={tool}>{tool}</li>)}
      </ul>
    </motion.div>
  );
});

function FigmaRoleVisual({ role, activeStep, activeTools, direction, shouldReduceMotion, isMobile, isTablet, isDesktop, onSelectStep, tabId, panelId }) {
  const activeItem = figmaStoryboardItems.find((item) => item.key === activeStep) ?? figmaStoryboardItems[0];
  const visualClassName = [
    sectionStyles.techRoleVisual,
    sectionStyles.techFigmaVisual,
    sectionStyles[`techRoleVisual-${role.kind}`],
    sectionStyles.techRoleVisualFramed,
  ].filter(Boolean).join(' ');

  return (
    <div className={visualClassName}>
      {isMobile ? (
        <div className={sectionStyles.techFigmaTabs} role="tablist" aria-label="Etapas do planejamento no Figma">
          {figmaStoryboardItems.map((item, index) => (
            <button
              aria-controls={`${panelId}-${item.key}`}
              aria-selected={activeStep === item.key}
              className={activeStep === item.key ? sectionStyles.techFigmaTabActive : ''}
              id={`${tabId}-${item.key}`}
              key={item.key}
              onClick={() => onSelectStep(item.key)}
              onKeyDown={(event) => {
                let nextIndex;
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % figmaStoryboardItems.length;
                if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + figmaStoryboardItems.length) % figmaStoryboardItems.length;
                if (event.key === 'Home') nextIndex = 0;
                if (event.key === 'End') nextIndex = figmaStoryboardItems.length - 1;
                if (nextIndex !== undefined) {
                  event.preventDefault();
                  const next = figmaStoryboardItems[nextIndex];
                  onSelectStep(next.key);
                  document.getElementById(`${tabId}-${next.key}`)?.focus();
                }
              }}
              role="tab"
              tabIndex={activeStep === item.key ? 0 : -1}
              type="button"
            >
              {activeStep === item.key && !shouldReduceMotion && (
                <motion.span className={sectionStyles.techFigmaTabPill} layoutId="figma-active-tab-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
              )}
              <span className={sectionStyles.techFigmaTabLabel}>{item.label}</span>
            </button>
          ))}
        </div>
      ) : null}

      <FigmaPreviewSlot direction={direction} shouldReduceMotion={shouldReduceMotion} stage={activeStep} />

      {isDesktop ? (
        <TechnologyStorySteps
          activeIndex={figmaStoryboardItems.findIndex((item) => item.key === activeStep)}
          classNames={{ list: sectionStyles.techFigmaDesktopStages, item: '', button: '', number: '', title: '', description: '', label: 'Etapas do processo' }}
          items={figmaStoryboardItems}
          onSelect={onSelectStep}
        />
      ) : isMobile ? (
        <div className={sectionStyles.techFigmaMobileContentSlot}>
          <AnimatePresence custom={direction} initial={false} mode="popLayout">
            <FigmaMobilePanel key={activeStep} activeTools={activeTools} item={activeItem} panelId={panelId} shouldReduceMotion={shouldReduceMotion} tabId={tabId} />
          </AnimatePresence>
        </div>
      ) : (
        <>
          <p className={sectionStyles.techFigmaCurrentStep}>Etapa {figmaStoryboardItems.indexOf(activeItem) + 1} de 3 · {activeItem.label}</p>
          {isTablet ? (
            <div className={sectionStyles.techFigmaTabletMarkers} role="group" aria-label="Selecionar etapa">
              {figmaStoryboardItems.map((item) => (
                <button
                  aria-current={activeStep === item.key ? 'step' : undefined}
                  aria-label={item.label}
                  className={activeStep === item.key ? sectionStyles.techFigmaTabletMarkerActive : ''}
                  key={item.key}
                  onClick={() => onSelectStep(item.key)}
                  type="button"
                >
                  <span aria-hidden="true" />
                </button>
              ))}
            </div>
          ) : (
            <ol className={sectionStyles.techFigmaStoryboard}>
              {figmaStoryboardItems.map((item) => (
                <li className={activeStep === item.key ? sectionStyles.techFigmaItemActive : ''} key={item.key}>
                  <button
                    aria-current={activeStep === item.key ? 'step' : undefined}
                    onClick={() => onSelectStep(item.key)}
                    type="button"
                  >
                    <span aria-hidden="true" />{item.label}
                  </button>
                  <div className={sectionStyles.techFigmaItemContent}>
                    <div>
                      <AnimatePresence custom={direction} initial={false} mode="popLayout">
                        {activeStep === item.key && (
                          <motion.p
                            animate={{ opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.25, delay: shouldReduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] } }}
                            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 6, transition: { duration: shouldReduceMotion ? 0 : 0.1 } }}
                            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
                            key={item.key}
                          >
                            {item.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </>
      )}
    </div>
  );
}

function FigmaRoleStory({ role }) {
  const shouldReduceMotion = useReducedMotion();
  const isScrollMode = useFigmaScrollMode();
  const isDesktopLayout = useFigmaDesktopLayout();
  const storyRef = useRef(null);
  const [phase, setPhase] = useState('intro');
  const [mobileStep, setMobileStep] = useState('flow');
  const [transitionDirection, setTransitionDirection] = useState(1);
  const previousStepRef = useRef('flow');
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ['start start', 'end end'] });
  const phaseStep = ({
    intro: 'flow', flow: 'flow', flowToInterface: 'flow', interface: 'interface',
    interfaceToResponsive: 'interface', responsive: 'responsive', complete: 'responsive',
  })[phase] ?? 'flow';
  const activeStep = isScrollMode ? phaseStep : mobileStep;
  const tabId = useId();
  const panelId = useId();

  const updateDirection = (nextStep) => {
    const currentIndex = figmaStoryboardItems.findIndex((item) => item.key === previousStepRef.current);
    const nextIndex = figmaStoryboardItems.findIndex((item) => item.key === nextStep);
    if (nextIndex !== currentIndex) {
      setTransitionDirection(nextIndex > currentIndex ? 1 : -1);
      previousStepRef.current = nextStep;
    }
  };

  useEffect(() => {
    previousStepRef.current = activeStep;
  }, [activeStep, isScrollMode]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextPhase = getFigmaPhase(latest);
    const nextStep = ({
      intro: 'flow', flow: 'flow', flowToInterface: 'flow', interface: 'interface',
      interfaceToResponsive: 'interface', responsive: 'responsive', complete: 'responsive',
    })[nextPhase] ?? 'flow';
    if (isScrollMode) updateDirection(nextStep);
    setPhase((currentPhase) => (currentPhase === nextPhase ? currentPhase : nextPhase));
  });

  const selectStep = (step) => {
    if (!isScrollMode) {
      updateDirection(step);
      setMobileStep(step);
      return;
    }

    const targetProgress = { flow: 0.25, interface: 0.55, responsive: 0.86 }[step];
    const section = storyRef.current;
    if (!section) return;
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const scrollDistance = Math.max(section.offsetHeight - window.innerHeight, 0);
    window.scrollTo({ top: sectionTop + scrollDistance * targetProgress, behavior: shouldReduceMotion ? 'instant' : 'smooth' });
  };

  return (
    <section className={sectionStyles.techFigmaStory} ref={storyRef}>
      <article className={sectionStyles.techFigmaLayout}>
        <div className={sectionStyles.techRoleCopy}>
          <TechnologyProgress
            className={sectionStyles.techFigmaProgress}
            index={figmaStoryboardItems.findIndex((item) => item.key === activeStep)}
            label="Progresso das etapas do Figma"
            total={3}
          >
            <span><FigmaAnimatedCount ariaHidden direction={transitionDirection} shouldReduceMotion={shouldReduceMotion} value={'0' + (figmaStoryboardItems.findIndex((item) => item.key === activeStep) + 1)} /> <span aria-hidden="true">/ 03</span></span>
          </TechnologyProgress>
          <div className={sectionStyles.techFigmaHeaderMain}>
            <span>{role.label}</span>
            <h3 className={sectionStyles.techFigmaHeading}>{role.title}</h3>
          </div>
          <div className={sectionStyles.techFigmaHeaderAside}>
            <p>{role.description}</p>
            <ul className={sectionStyles.techFigmaToolList}>
              {role.items.filter((item) => isScrollMode || figmaStoryboardItems.find((stage) => stage.key === activeStep)?.activeTools.includes(item)).map((item) => (
                <li className={figmaStoryboardItems.find((stage) => stage.key === activeStep)?.activeTools.includes(item) ? sectionStyles.techFigmaToolActive : ''} key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <FigmaRoleVisual
          activeStep={activeStep}
          activeTools={figmaStoryboardItems.find((stage) => stage.key === activeStep)?.activeTools ?? []}
          direction={transitionDirection}
          isDesktop={isScrollMode && isDesktopLayout}
          isMobile={!isScrollMode}
          isTablet={isScrollMode && !isDesktopLayout}
          onSelectStep={selectStep}
          panelId={panelId}
          role={role}
          shouldReduceMotion={shouldReduceMotion}
          tabId={tabId}
        />
      </article>
      {isScrollMode && (
        <ol className={sectionStyles.techFigmaStageTrack} aria-label="Etapas do planejamento no Figma">
          {figmaStoryboardItems.map((item) => (
            <li
              aria-current={activeStep === item.key ? 'step' : undefined}
              className={activeStep === item.key ? sectionStyles.techFigmaStageActive : ''}
              key={item.key}
            >
              <strong>{item.label}</strong><p>{item.description}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
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
  const reactOpacity = useTransform(scrollYProgress, [0, 0.62, 0.72, 1], [1, 1, 0, 0], { clamp: true });
  const seoOpacity = useTransform(scrollYProgress, [0, 0.74, 0.84, 1], [0, 0, 1, 1], { clamp: true });
  const reactPanelStyle = shouldAnimateTransition ? { opacity: reactOpacity } : undefined;
  const seoPanelStyle = shouldAnimateTransition ? { opacity: seoOpacity } : undefined;

  return (
    <section
      className={[
        sectionStyles.techRoleReactSeoStory,
        shouldAnimateTransition ? sectionStyles.techRoleReactSeoStoryAnimated : '',
      ].filter(Boolean).join(' ')}
      ref={storyRef}
    >
      <div className={sectionStyles.techReactSeoSticky}>
      <motion.article
        className={`${sectionStyles.techRoleBlock} ${sectionStyles.techRoleBlockReact} ${sectionStyles.techReactSeoPanel} ${sectionStyles.techReactSeoPanelReact}`}
        custom={reactIndex}
        key={reactRole.title}
        style={reactPanelStyle}
      >
        <ReactCompositionStory />
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
            <div className={[sectionStyles.techSectionIntro, revealStyles.techSectionIntro].filter(Boolean).join(' ')}>
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
