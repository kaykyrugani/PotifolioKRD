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

  return (
    <PageLayout>
      <Hero />
      <Services />
      <Benefits />
      <section className={styles.horizontalTransition} ref={horizontalRef}>
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
      <Differentials />
      <Projects />
      <CTA />
    </PageLayout>
  );
}
