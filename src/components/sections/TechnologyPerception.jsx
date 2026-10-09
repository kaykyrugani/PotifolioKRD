import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { barReveal, cardReveal, flowStepReveal, revealViewport, verticalReveal } from './technologyMotion';
import sectionStyles from './TechnologyPerception.module.css';

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

const identityRevealSectionClassName = (className) => className;
const noop = () => {};

function ActionVisual({ type, videoSrc }) {
  if (type === 'performance') {
    return (
      <motion.div
        className={sectionStyles.techPerformanceVisual}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        {['Carregamento', 'Assets', 'Experiência'].map((item, index) => (
          <div className={sectionStyles.techPerformanceRow} key={item}>
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
      <div className={sectionStyles.techVideoFrame}>
        {videoSrc && <video className={sectionStyles.techVideoElement} src={videoSrc} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />}
        <div className={sectionStyles.techVideoFallback}>
          <span>video</span>
          <strong>microdemo preparada</strong>
        </div>
      </div>
    );
  }

  if (type === 'scroll') {
    return (
      <motion.div
        className={sectionStyles.techScrollDemo}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        <div className={sectionStyles.techScrollPath}>
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
    <motion.ol className={sectionStyles.techAiFlow} initial="hidden" whileInView="visible" viewport={revealViewport}>
      {['Briefing', 'Estrutura', 'Copy', 'SEO'].map((step, index) => (
        <motion.li custom={index} key={step} variants={flowStepReveal}>
          {step}
        </motion.li>
      ))}
    </motion.ol>
  );
}


export default function TechnologyPerception({
  id = 'tech-perception',
  titleId = 'tech-action-title',
  sectionKey = 'action',
  className = '',
  getRevealSectionClassName = identityRevealSectionClassName,
  setRevealSectionRef = noop,
  revealStyles = {},
  videoSrc,
}) {
  return (
<section
          className={getRevealSectionClassName([sectionStyles.techActionSection, className].filter(Boolean).join(' '), sectionKey)}
          id={id}
          ref={(node) => setRevealSectionRef(sectionKey, node)}
          aria-labelledby={titleId}
        >
          <Container size="wide">
            <div className={revealStyles.techSectionIntro || undefined}>
              <p className={[revealStyles.techEyebrow, revealStyles.revealEyebrow].filter(Boolean).join(' ') || undefined}>TECNOLOGIA EM AÇÃO</p>
              <h2 className={revealStyles.revealTitle || undefined} id={titleId}>Não é sobre ferramentas. É sobre percepção.</h2>
              <span className={revealStyles.revealDescription || undefined}>A camada técnica aparece quando o visitante sente velocidade, clareza, fluidez e confiança sem precisar entender o que está por trás.</span>
            </div>

            <div className={sectionStyles.techActionGrid}>
              {actionModules.map((module, index) => (
                <motion.article
                  className={`${sectionStyles.techActionModule} ${sectionStyles[`techActionModule-${module.type}`]}`}
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
                  <ActionVisual type={module.type} videoSrc={videoSrc} />
                </motion.article>
              ))}
            </div>
          </Container>
        </section>
  );
}
