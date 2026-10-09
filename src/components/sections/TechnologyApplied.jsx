import { useCallback, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Container from '../ui/Container';
import sectionStyles from './TechnologyApplied.module.css';

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

const identityRevealSectionClassName = (className) => className;
const noop = () => {};

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
    sectionStyles.techStackChip,
    shouldReduceMotion ? sectionStyles.techStackChipActive : '',
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
    sectionStyles.techPipelineStep,
    shouldReduceMotion ? sectionStyles.techPipelineStepActive : '',
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
      <span className={sectionStyles.techPipelineStepIndex}>{stage.step}</span>
      <div className={sectionStyles.techPipelineStepBody}>
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
      className={`${sectionStyles.techMovingChip} ${sectionStyles[`techMovingChip-${chip.id}`]}`}
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
      className={sectionStyles.techResultPanel}
      style={shouldReduceMotion ? undefined : { opacity: finalOpacity, scale: finalScale }}
      aria-label="Resultado"
    >
      <p className={sectionStyles.techStackKitLabel}>RESULTADO</p>
      <ul className={sectionStyles.techResultBenefitList}>
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
    <section className={sectionStyles.techBuildResult} aria-label="Resultado em construção">
      <p className={sectionStyles.techPipelineLabel}>RESULTADO EM CONSTRUÇÃO</p>
      <div className={sectionStyles.techBuildResultStack}>
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
      className={sectionStyles.techBuildResultStep}
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

export default function TechnologyApplied({
  id = 'tecnologias-ecossistema',
  titleId = 'tech-applied-title',
  sectionKey = 'ecosystem',
  getRevealSectionClassName = identityRevealSectionClassName,
  setRevealSectionRef = noop,
  revealStyles = {},
  className = '',
  headerAlign = 'center',
}) {
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
    setRevealSectionRef(sectionKey, node);
  }, [sectionKey, setRevealSectionRef]);

  const handleScrollTrackRef = useCallback((node) => {
    scrollTrackRef.current = node;
  }, []);

  return (
    <section
      className={getRevealSectionClassName([sectionStyles.techAppliedSection, className].filter(Boolean).join(' '), sectionKey)}
      id={id}
      ref={handleSectionRef}
      aria-labelledby={titleId}
    >
      <Container size="wide">
        <header className={[
          sectionStyles.techAppliedHeader,
          headerAlign === 'start' ? sectionStyles.techAppliedHeaderStart : '',
          revealStyles.techAppliedHeader,
        ].filter(Boolean).join(' ')}>
          <p className={[revealStyles.techEyebrow, revealStyles.revealEyebrow].filter(Boolean).join(' ') || undefined}>TECNOLOGIA APLICADA</p>
          <h2 className={revealStyles.revealTitle || undefined} id={titleId}>
            Da estratégia à publicação.
            <span>Cada tecnologia possui uma função.</span>
          </h2>
          <p className={revealStyles.revealDescription || undefined}>
            Design, desenvolvimento, otimização e publicação trabalhando juntos para transformar ideias em experiências digitais rápidas, escaláveis e memoráveis.
          </p>
        </header>
      </Container>

      <div
        className={sectionStyles.techAppliedScrollTrack}
        ref={handleScrollTrackRef}
      >
        <div className={sectionStyles.techAppliedSticky}>
          <Container size="wide">
            <div className={sectionStyles.techAppliedStage}>
              <motion.div
                className={sectionStyles.techAppliedAmbient}
                style={shouldReduceMotion ? undefined : { opacity: ambientGlow }}
                aria-hidden="true"
              />
              <motion.div
                className={sectionStyles.techAppliedFlowLine}
                style={shouldReduceMotion ? undefined : { scaleX: flowProgress }}
                aria-hidden="true"
              />
              <div className={sectionStyles.techMovingLayer} aria-hidden="true">
                {movingStackChips.map((chip) => (
                  <MovingStackChip
                    chip={chip}
                    key={chip.id}
                    progress={scrollYProgress}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                ))}
              </div>

              <aside className={sectionStyles.techStackColumn} aria-label="Ferramentas e resultado">
                <section className={sectionStyles.techStackKit}>
                  <p className={sectionStyles.techStackKitLabel}>STACK KIT</p>
                  <ul className={sectionStyles.techStackChipList}>
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
                className={sectionStyles.techProcessColumn}
                style={shouldReduceMotion ? undefined : { opacity: pipelineDim }}
              >
                <section className={sectionStyles.techPipelineWrap} aria-label="Processo">
                  <p className={sectionStyles.techPipelineLabel}>PROCESSO</p>
                  <ol className={sectionStyles.techPipelineList}>
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
        <div className={sectionStyles.techAppliedMobile}>
          <section className={sectionStyles.techStackKitMobile} aria-label="Stack Kit">
            <p className={sectionStyles.techStackKitLabel}>STACK KIT</p>
            <ul className={sectionStyles.techStackChipList}>
              {stackKitChips.map((chip) => (
                <li className={sectionStyles.techStackChip} key={chip.id}>{chip.label}</li>
              ))}
            </ul>
          </section>

          {pipelineStages.map((stage) => (
            <motion.section
              className={sectionStyles.techPipelineMobileStep}
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
            className={`${sectionStyles.techResultPanel} ${sectionStyles.techResultPanelActive}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.35 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          >
            <p className={sectionStyles.techStackKitLabel}>RESULTADO</p>
            <ul className={sectionStyles.techResultBenefitList}>
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

