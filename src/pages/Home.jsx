import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import Benefits from '../components/sections/Benefits';
import CTA from '../components/sections/CTA';
import Differentials from '../components/sections/Differentials';
import Hero from '../components/sections/Hero';
import Projects from '../components/sections/Projects';
import Services from '../components/sections/Services';
import TechStack from '../components/sections/TechStack';
import '../styles/tech-atmosphere.css';
import styles from './Home.module.css';

export default function Home() {
  const horizontalRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: horizontalRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.35]);
  const rightOpacity = useTransform(scrollYProgress, [0.2, 1], [0.2, 1]);
  const atmosphereOpacity = useTransform(scrollYProgress, [0.08, 0.72], [0, 1]);

  return (
    <PageLayout>
      <Hero />
      <Services />
      <Benefits />
      <section className={styles.horizontalTransition} ref={horizontalRef}>
        <motion.div
          className="techAtmosphereBridge"
          style={{ opacity: atmosphereOpacity }}
          aria-hidden="true"
        >
          <svg className="techAtmosphereBridge__orbit" viewBox="0 0 420 420">
            <circle cx="210" cy="210" r="152" />
            <circle cx="210" cy="210" r="94" />
            <path d="M66 232c48-72 104-108 168-108 46 0 86 18 120 54" />
            <path d="M354 188c-50 70-106 105-168 105-46 0-86-18-120-54" />
            <line x1="116" y1="128" x2="300" y2="292" />
            <line x1="316" y1="142" x2="102" y2="278" />
            <circle cx="116" cy="128" r="6" />
            <circle cx="316" cy="142" r="6" />
            <circle cx="300" cy="292" r="6" />
            <circle cx="102" cy="278" r="6" />
          </svg>
        </motion.div>
        <div className={styles.horizontalSticky}>
          <motion.div className={styles.horizontalTrack} style={{ x }}>
            <motion.div className={styles.horizontalPanel} style={{ opacity: leftOpacity }}>
              <div className={styles.transitionIntro}>
                <span>Tecnologias</span>
                <h2>Estrutura moderna para performance, escalabilidade e experiência premium</h2>
                <p>
                  Desenvolvimento com tecnologias modernas, foco em velocidade, SEO técnico,
                  manutenção simples e experiência fluida.
                </p>
              </div>
            </motion.div>
            <motion.div className={styles.horizontalPanel} style={{ opacity: rightOpacity }}>
              <TechStack />
            </motion.div>
          </motion.div>
        </div>
      </section>
      <div className="techAtmosphere">
        <div className="techAtmosphere__mesh" aria-hidden="true" />
        <svg className="techAtmosphere__constellation techAtmosphere__constellation--one" viewBox="0 0 520 420" aria-hidden="true">
          <circle cx="88" cy="126" r="5" />
          <circle cx="206" cy="76" r="4" />
          <circle cx="338" cy="156" r="6" />
          <circle cx="438" cy="86" r="4" />
          <circle cx="392" cy="290" r="5" />
          <circle cx="160" cy="314" r="4" />
          <path d="M88 126 206 76 338 156 438 86" />
          <path d="M338 156 392 290 160 314 88 126" />
          <path d="M206 76 392 290" />
        </svg>
        <svg className="techAtmosphere__constellation techAtmosphere__constellation--two" viewBox="0 0 520 420" aria-hidden="true">
          <circle cx="124" cy="98" r="110" />
          <circle cx="124" cy="98" r="68" />
          <circle cx="382" cy="258" r="126" />
          <path d="M54 274c90-84 177-126 262-126 62 0 112 20 150 60" />
          <path d="M84 332c74-36 148-54 222-54 58 0 104 12 138 36" />
        </svg>
        <Differentials />
        <Projects />
        <CTA />
      </div>
    </PageLayout>
  );
}
