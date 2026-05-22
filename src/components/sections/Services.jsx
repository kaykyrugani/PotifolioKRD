import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { services } from '../../data/siteContent';
import Button from '../ui/Button';
import styles from './Services.module.css';

function AnimatedServiceCard({ children, index, total, scrollYProgress }) {
  const segment = 1 / total;
  const start = index * segment;
  const end = start + segment;
  const fixedRanges = [
    {
      inputRange: [0, 0.2, 0.36],
      opacityRange: [1, 1, 0],
      yRange: [0, 0, -96],
      scaleRange: [1, 1, 0.97],
    },
    {
      inputRange: [0.18, 0.24, 0.4, 0.48, 0.58],
      opacityRange: [0, 0, 1, 1, 0],
      yRange: [220, 140, 0, 0, -96],
      scaleRange: [0.94, 0.96, 1, 1, 0.96],
    },
    {
      inputRange: [0.43, 0.49, 0.65, 0.69, 0.78],
      opacityRange: [0, 0, 1, 1, 0],
      yRange: [220, 140, 0, 0, -96],
      scaleRange: [0.94, 0.96, 1, 1, 0.96],
    },
    {
      inputRange: [0.68, 0.74, 0.9, 1],
      opacityRange: [0, 0, 1, 1],
      yRange: [220, 140, 0, 0],
      scaleRange: [0.94, 0.96, 1, 1],
    },
  ];
  let inputRange;
  let opacityRange;
  let yRange;
  let scaleRange;
  const zIndexValue = index + 2;

  if (total === fixedRanges.length) {
    ({ inputRange, opacityRange, yRange, scaleRange } = fixedRanges[index]);
  } else if (index === 0) {
    inputRange = [0, end * 0.62, end * 0.88];
    opacityRange = [1, 1, 0];
    yRange = [0, 0, -120];
    scaleRange = [1, 1, 0.97];
  } else if (index === total - 1) {
    inputRange = [
      start - segment * 0.45,
      start - segment * 0.12,
      start + segment * 0.06,
      1,
    ];
    opacityRange = [0, 0, 1, 1];
    yRange = [260, 160, 0, 0];
    scaleRange = [0.94, 0.96, 1, 1];
  } else {
    inputRange = [
      start - segment * 0.45,
      start - segment * 0.12,
      start + segment * 0.06,
      end - segment * 0.18,
      end,
    ];
    opacityRange = [0, 0, 1, 1, 0];
    yRange = [260, 160, 0, 0, -120];
    scaleRange = [0.94, 0.96, 1, 1, 0.96];
  }

  const opacity = useTransform(scrollYProgress, inputRange, opacityRange);
  const y = useTransform(scrollYProgress, inputRange, yRange);
  const scale = useTransform(scrollYProgress, inputRange, scaleRange);
  const visibility = useTransform(opacity, (value) => value > 0.03 ? 'visible' : 'hidden');

  return (
    <motion.div
      className={styles.animatedCard}
      style={{
        opacity,
        y,
        scale,
        visibility,
        zIndex: zIndexValue,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="servicos" className={styles.servicesScrollArea} ref={sectionRef}>
      <div className={styles.servicesSticky}>
        <div className={styles.servicesContainer}>
          <div className={styles.servicesContent}>
            <div className={styles.servicesIntro}>
              <div className={styles.servicesHeader}>
                <div className={styles.servicesDecoration} aria-hidden="true">
                  <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="90" cy="90" r="72" stroke="url(#servicesGradient)" strokeOpacity="0.35" />
                    <circle cx="90" cy="90" r="42" stroke="url(#servicesGradient)" strokeOpacity="0.22" />
                    <circle cx="90" cy="90" r="8" fill="#00C2FF" fillOpacity="0.6" />
                    <path d="M90 18C129.765 18 162 50.235 162 90" stroke="url(#servicesGradient)" strokeWidth="2" strokeLinecap="round" />
                    <path d="M18 90C18 50.235 50.235 18 90 18" stroke="url(#servicesGradient)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.32" />
                    <defs>
                      <linearGradient id="servicesGradient" x1="20" y1="20" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00C2FF" />
                        <stop offset="1" stopColor="#7C3AED" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <span className={styles.eyebrow}>Serviços</span>
                <h2>Soluções para transformar presença digital em oportunidade</h2>
              </div>

              <div className={styles.servicesCopy}>
                <p>
                  Desenvolvo sites institucionais, landing pages e soluções web modernas com foco em performance,
                  SEO técnico, responsividade e conversão. Cada projeto é estruturado para fortalecer a presença
                  digital da marca, melhorar a experiência do usuário e transformar visitantes em oportunidades
                  reais de negócio.
                </p>
                <p>
                  A proposta é unir design premium, código limpo e estratégia comercial para criar páginas rápidas,
                  claras e preparadas para gerar resultados.
                </p>
              </div>
            </div>

            <div className={styles.servicesCardsStage}>
              {services.map((service, index) => (
                <AnimatedServiceCard
                  index={index}
                  key={service.title}
                  scrollYProgress={scrollYProgress}
                  total={services.length}
                >
                  <article className={styles.card}>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ul>
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <Button to="/contato" variant="secondary">Conversar sobre isso</Button>
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
