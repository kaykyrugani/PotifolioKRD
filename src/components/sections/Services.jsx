import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { services } from '../../data/siteContent';
import Button from '../ui/Button';
import styles from './Services.module.css';

function formatServiceIndex(index) {
  return String(index + 1).padStart(2, '0');
}

function getActiveServiceIndex(progress, total) {
  if (total <= 1) {
    return 0;
  }

  if (total === 4) {
    if (progress < 0.34) return 0;
    if (progress < 0.64) return 1;
    if (progress < 0.94) return 2;
    return 3;
  }

  return Math.min(total - 1, Math.max(0, Math.floor(progress * total)));
}

function getServiceCtaLabel(service) {
  if (service.ctaLabel) {
    return service.ctaLabel;
  }

  const normalizedTitle = service.title.toLowerCase();

  if (normalizedTitle.includes('landing')) return 'Criar minha landing page';
  if (normalizedTitle.includes('hosped')) return 'Ver opções de hospedagem';
  if (normalizedTitle.includes('manuten')) return 'Solicitar manutenção';
  if (normalizedTitle.includes('site')) return 'Conversar sobre site institucional';

  return 'Conversar sobre este serviço';
}

function ServicesOrbitBackground({ progress, activeIndex, total }) {
  const orbitRotate = useTransform(progress, [0, 1], [-8, 24]);
  const orbitScale = useTransform(progress, [0, 0.5, 1], [0.985, 1.02, 1]);
  const progressPath = useTransform(progress, [0, 1], [0.12, 0.92]);
  const connectorPath = useTransform(progress, [0, 1], [0.18, 1]);
  const ambientOpacity = useTransform(progress, [0, 0.45, 1], [0.58, 0.72, 0.62]);
  const currentStep = total > 0 ? activeIndex + 1 : 1;

  return (
    <div
      className={`${styles.orbitBackground} ${styles[`orbitBackgroundStep${currentStep}`] ?? ''}`}
      aria-hidden="true"
    >
      <motion.span className={`${styles.ambientGlow} ${styles.ambientGlowLeft}`} style={{ opacity: ambientOpacity }} />
      <span className={`${styles.ambientGlow} ${styles.ambientGlowRight}`} />
      <span className={`${styles.ambientGlow} ${styles.ambientAurora}`} />

      <motion.div
        className={styles.orbitSystem}
        style={{
          rotate: orbitRotate,
          scale: orbitScale,
        }}
      >
        <svg className={styles.orbitSvg} viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="servicesOrbitGradient" x1="28" y1="38" x2="224" y2="222" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00C2FF" />
              <stop offset="0.54" stopColor="#3B82F6" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
            <radialGradient id="servicesOrbitCore" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(130 130) rotate(90) scale(60)">
              <stop stopColor="#00C2FF" stopOpacity="0.28" />
              <stop offset="1" stopColor="#00C2FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle className={styles.orbitCore} cx="130" cy="130" r="60" fill="url(#servicesOrbitCore)" />
          <circle className={styles.orbitRingMuted} cx="130" cy="130" r="102" />
          <circle className={styles.orbitRingMuted} cx="130" cy="130" r="66" />
          <circle className={styles.orbitRingSoft} cx="130" cy="130" r="34" />

          <path className={styles.orbitArc} d="M32 136c18-58 55-94 110-108 33-8 62-3 88 15" />
          <path className={styles.orbitArcMuted} d="M226 124c-22 62-62 98-119 108-32 6-60-2-82-22" />
          <motion.path
            className={styles.orbitProgressArc}
            d="M47 96a92 92 0 0 1 166 18"
            style={{ pathLength: progressPath }}
          />

          <line className={styles.orbitTechLine} x1="70" y1="74" x2="190" y2="190" />
          <line className={styles.orbitTechLine} x1="202" y1="88" x2="68" y2="178" />
          <circle className={styles.orbitNode} cx="70" cy="74" r="4" />
          <circle className={styles.orbitNode} cx="202" cy="88" r="4" />
          <circle className={styles.orbitNodeDim} cx="190" cy="190" r="3.5" />
          <circle className={styles.orbitNodeDim} cx="68" cy="178" r="3.5" />
          <circle className={styles.orbitDot} cx="213" cy="118" r="5" />
        </svg>
      </motion.div>

      <svg className={styles.energyLine} viewBox="0 0 900 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="servicesEnergyGradient" x1="90" y1="102" x2="812" y2="160" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00C2FF" stopOpacity="0" />
            <stop offset="0.18" stopColor="#00C2FF" stopOpacity="0.34" />
            <stop offset="0.64" stopColor="#3B82F6" stopOpacity="0.2" />
            <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          className={styles.energyLinePath}
          d="M92 126C244 76 330 88 456 132C586 178 666 172 812 112"
          style={{ pathLength: connectorPath }}
        />
        <circle className={styles.energyPulse} cx="456" cy="132" r="4" />
      </svg>
    </div>
  );
}

function AnimatedServiceCard({ activeIndex, children, index, total, scrollYProgress }) {
  const segment = 1 / total;
  const start = index * segment;
  const end = start + segment;
  const fixedRanges = [
    {
      inputRange: [0, 0.2, 0.26],
      opacityRange: [1, 1, 0],
      yRange: [0, 0, -48],
      scaleRange: [0.985, 1, 0.985],
    },
    {
      inputRange: [0.27, 0.34, 0.49, 0.56],
      opacityRange: [0, 1, 1, 0],
      yRange: [56, 0, 0, -48],
      scaleRange: [0.985, 1, 1, 0.985],
    },
    {
      inputRange: [0.57, 0.64, 0.79, 0.86],
      opacityRange: [0, 1, 1, 0],
      yRange: [56, 0, 0, -48],
      scaleRange: [0.985, 1, 1, 0.985],
    },
    {
      inputRange: [0.87, 0.94, 1],
      opacityRange: [0, 1, 1],
      yRange: [56, 0, 0],
      scaleRange: [0.985, 1, 1],
    },
  ];
  let inputRange;
  let opacityRange;
  let yRange;
  let scaleRange;
  const isActive = activeIndex === index;
  const zIndexValue = isActive ? 10 : index + 1;

  if (total === fixedRanges.length) {
    ({ inputRange, opacityRange, yRange, scaleRange } = fixedRanges[index]);
  } else if (index === 0) {
    inputRange = [0, end * 0.82, end, Math.min(1, end + segment * 0.2)];
    opacityRange = [1, 1, 0.15, 0];
    yRange = [0, 0, -32, -56];
    scaleRange = [1, 1, 0.99, 0.985];
  } else if (index === total - 1) {
    inputRange = [
      start + segment * 0.02,
      start + segment * 0.24,
      1,
    ];
    opacityRange = [0, 1, 1];
    yRange = [64, 0, 0];
    scaleRange = [0.985, 1, 1];
  } else {
    inputRange = [
      start + segment * 0.02,
      start + segment * 0.24,
      end - segment * 0.22,
      end + segment * 0.06,
    ];
    opacityRange = [0, 1, 1, 0];
    yRange = [64, 0, 0, -56];
    scaleRange = [0.985, 1, 1, 0.985];
  }

  const opacity = useTransform(scrollYProgress, inputRange, opacityRange);
  const yRaw = useTransform(scrollYProgress, inputRange, yRange);
  const scaleRaw = useTransform(scrollYProgress, inputRange, scaleRange);
  const y = useSpring(yRaw, { stiffness: 96, damping: 30, mass: 0.72 });
  const scale = useSpring(scaleRaw, { stiffness: 120, damping: 32, mass: 0.72 });
  const visibility = useTransform(opacity, (value) => value > 0.01 ? 'visible' : 'hidden');

  return (
    <motion.div
      className={styles.animatedCard}
      style={{
        opacity,
        y,
        scale,
        visibility,
        zIndex: zIndexValue,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const activeService = services[activeIndex] ?? services[0];
  const serviceProgress = services.length > 0 ? ((activeIndex + 1) / services.length) * 100 : 0;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextIndex = getActiveServiceIndex(latest, services.length);
    setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
  });

  return (
    <section id="servicos" className={styles.servicesScrollArea} ref={sectionRef}>
      <div className={styles.servicesSticky}>
        <ServicesOrbitBackground
          activeIndex={activeIndex}
          progress={scrollYProgress}
          total={services.length}
        />
        <div className={styles.servicesContainer}>
          <div className={styles.servicesContent}>
            <div className={styles.servicesIntro}>
              <div className={styles.servicesHeader}>
                <span className={styles.eyebrow}>Serviços</span>
                <h2>Soluções digitais para presença, performance e conversão.</h2>
              </div>

              <div className={styles.servicesCopy}>
                <p>
                  Desenvolvimento de sites, landing pages, hospedagem e manutenção com foco em clareza,
                  velocidade e resultado comercial. Cada solução é pensada para fortalecer sua presença digital
                  e transformar visitantes em oportunidades reais.
                </p>
              </div>

              <div className={styles.serviceProgressPanel} aria-live="polite">
                <div className={styles.serviceProgressMeta}>
                  <span>{formatServiceIndex(activeIndex)} / {formatServiceIndex(services.length - 1)}</span>
                  <strong>{activeService.title}</strong>
                </div>
                <div className={styles.serviceProgressTrack} aria-hidden="true">
                  <span style={{ width: `${serviceProgress}%` }} />
                </div>
              </div>
            </div>

            <div className={styles.servicesCardsStage}>
              {services.map((service, index) => (
                <AnimatedServiceCard
                  activeIndex={activeIndex}
                  index={index}
                  key={service.title}
                  scrollYProgress={scrollYProgress}
                  total={services.length}
                >
                  <article className={styles.card}>
                    <span className={styles.cardBadge}>ACTIVE · {formatServiceIndex(index)}</span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ul>
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <Button to="/contato" variant="secondary">{getServiceCtaLabel(service)}</Button>
                  </article>
                </AnimatedServiceCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
