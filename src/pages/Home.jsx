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
import { benefits, differentials, projectPreviews } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import '../styles/tech-atmosphere.css';
import styles from './Home.module.css';
import revealStyles from './Page.module.css';

const revealSectionKeys = {
  services: 'services',
  benefits: 'benefits',
  transitionIntro: 'transitionIntro',
  techStack: 'techStack',
  differentials: 'differentials',
  projects: 'projects',
  cta: 'cta',
};

const revealSectionKeyList = Object.values(revealSectionKeys);

const createRevealItemKey = (groupKey, index) => `${groupKey}-${index}`;

const revealItemKeyList = [
  ...benefits.map((_, index) => createRevealItemKey('benefits', index)),
  ...differentials.map((_, index) => createRevealItemKey('differentials', index)),
  ...projectPreviews.map((_, index) => createRevealItemKey('projects', index)),
  'cta-box',
];

export default function Home() {
  const horizontalRef = useRef(null);
  const {
    setRevealSectionRef,
    getRevealSectionClassName,
    setRevealItemRef,
    getRevealItemClassName,
  } = useRevealOnScroll({
    sectionKeys: revealSectionKeyList,
    itemKeys: revealItemKeyList,
    styles: revealStyles,
    debugLabel: 'Home',
  });
  const reveal = {
    setRevealSectionRef,
    getRevealSectionClassName,
    setRevealItemRef,
    getRevealItemClassName,
    styles: revealStyles,
  };
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
      <Services reveal={reveal} />
      <Benefits reveal={reveal} />
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
              <div
                className={getRevealSectionClassName(styles.transitionIntro, revealSectionKeys.transitionIntro)}
                ref={(node) => setRevealSectionRef(revealSectionKeys.transitionIntro, node)}
              >
                <span className={revealStyles.revealEyebrow}>Tecnologias</span>
                <h2 className={revealStyles.revealTitle}>Estrutura moderna para performance, escalabilidade e experiência premium</h2>
                <p className={revealStyles.revealDescription}>
                  Desenvolvimento com tecnologias modernas, foco em velocidade, SEO técnico,
                  manutenção simples e experiência fluida.
                </p>
              </div>
            </motion.div>
            <motion.div className={styles.horizontalPanel} style={{ opacity: rightOpacity }}>
              <TechStack reveal={reveal} />
            </motion.div>
          </motion.div>
        </div>
      </section>
      <div className="techAtmosphere">
        <Differentials reveal={reveal} />
        <Projects reveal={reveal} />
        <CTA reveal={reveal} />
      </div>
    </PageLayout>
  );
}
