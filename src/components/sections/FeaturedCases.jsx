import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import SectionFold from '../SectionFold/SectionFold';
import aicCaseImage from '../../assets/imagesCases/aicIMG.webp';
import pomboCaseImage from '../../assets/imagesCases/pomboIMG.webp';
import topCaseImage from '../../assets/imagesCases/topIMG.webp';
import ucanCaseImage from '../../assets/imagesCases/ucanIMG.webp';
import styles from './FeaturedCases.module.css';

const cases = [
  {
    id: '01',
    shortName: 'Clínica',
    name: 'Landing Page para Clínica Estética',
    objective: 'Gerar novos agendamentos através do tráfego pago.',
    challenge: 'Transmitir confiança e facilitar o contato.',
    solution: 'Landing page focada em conversão com estrutura orientada para captação de leads.',
    stack: ['React', 'SEO', 'Performance', 'UX'],
    result: 'Experiência otimizada para dispositivos móveis e preparada para campanhas.',
    image: aicCaseImage,
    imageAlt: 'Landing page desenvolvida para AIC',
    imageWidth: 1920,
    imageHeight: 5959,
  },
  {
    id: '02',
    shortName: 'Empresa',
    name: 'Site Institucional para Empresa',
    objective: 'Apresentar serviços com clareza e fortalecer a presença digital.',
    challenge: 'Organizar informações comerciais sem deixar a experiência pesada.',
    solution: 'Estrutura institucional objetiva, com hierarquia visual clara e foco em credibilidade.',
    stack: ['React', 'Vite', 'CSS Modules', 'SEO'],
    result: 'Site rápido, responsivo e preparado para gerar confiança no primeiro contato.',
    image: pomboCaseImage,
    imageAlt: 'Site institucional desenvolvido para Pombo Chester',
    imageWidth: 1906,
    imageHeight: 7336,
  },
  {
    id: '03',
    shortName: 'Portfólio',
    name: 'Portfólio Profissional',
    objective: 'Apresentar trajetória, serviços e projetos com linguagem visual premium.',
    challenge: 'Criar uma experiência memorável sem comprometer performance e clareza.',
    solution: 'Interface imersiva com narrativa visual, motion design e arquitetura front-end organizada.',
    stack: ['React', 'Framer Motion', 'CSS Modules', 'Vite'],
    result: 'Experiência digital consistente, responsiva e orientada à autoridade profissional.',
    image: topCaseImage,
    imageAlt: 'Site desenvolvido para Top Locações',
    imageWidth: 1920,
    imageHeight: 8860,
  },
  {
    id: '04',
    shortName: 'Serviço',
    name: 'Site para Prestador de Serviço',
    objective: 'Transformar visitantes em contatos qualificados.',
    challenge: 'Explicar valor, reduzir objeções e facilitar o início da conversa.',
    solution: 'Página estruturada com proposta clara, prova visual, CTA estratégico e boa experiência mobile.',
    stack: ['React', 'UX', 'SEO', 'Conversão'],
    result: 'Fluxo mais claro para apresentação do serviço e geração de oportunidades.',
    image: ucanCaseImage,
    imageAlt: 'Landing page desenvolvida para U Can',
    imageWidth: 1920,
    imageHeight: 14013,
  },
];

const caseVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
    filter: 'blur(14px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.56,
      ease: [0.16, 1, 0.3, 1],
      when: 'beforeChildren',
      staggerChildren: 0.07,
    },
  },
  exit: {
    opacity: 0,
    y: -18,
    scale: 0.985,
    filter: 'blur(12px)',
    transition: {
      duration: 0.28,
      ease: [0.4, 0, 1, 1],
    },
  },
};

function CasePreview({ activeCase }) {
  return (
    <motion.div className={styles.preview} variants={caseVariants}>
      <div className={styles.previewChrome} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className={styles.previewImageWindow}>
        <motion.div
          className={styles.previewShot}
          key={activeCase.id}
          initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            className={styles.previewImage}
            src={activeCase.image}
            alt={activeCase.imageAlt}
            width={activeCase.imageWidth}
            height={activeCase.imageHeight}
            loading="lazy"
          />
        </motion.div>
        <span className={styles.previewHint} aria-hidden="true">Passe o mouse para explorar</span>
      </div>
    </motion.div>
  );
}

function CaseDetail({ activeCase }) {
  return (
    <motion.div className={styles.caseInfo} variants={caseVariants}>
      <span className={styles.caseNumber}>{activeCase.id}</span>
      <h3>{activeCase.name}</h3>

      <dl className={styles.caseFacts}>
        <div>
          <dt>Objetivo</dt>
          <dd>{activeCase.objective}</dd>
        </div>
        <div>
          <dt>Desafio</dt>
          <dd>{activeCase.challenge}</dd>
        </div>
        <div>
          <dt>Solução</dt>
          <dd>{activeCase.solution}</dd>
        </div>
        <div>
          <dt>Resultado</dt>
          <dd>{activeCase.result}</dd>
        </div>
      </dl>

      <ul className={styles.caseStack} aria-label="Tecnologias e práticas aplicadas">
        {activeCase.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function FeaturedCases({ className = '', foldVariant }) {
  const [activeCaseId, setActiveCaseId] = useState(cases[0].id);
  const activeCase = cases.find((item) => item.id === activeCaseId) || cases[0];
  const SectionComponent = foldVariant ? SectionFold : 'section';

  return (
    <SectionComponent
      className={`${styles.featuredCases} ${className}`}
      variant={foldVariant}
      aria-labelledby="featured-cases-title"
    >
      <div className={styles.inner}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>CASES EM DESTAQUE</p>
          <h2 id="featured-cases-title">Projetos construídos para objetivos reais.</h2>
          <p>
            Cada projeto apresentado abaixo foi planejado para resolver um problema específico através de estratégia,
            design e desenvolvimento.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div className={styles.caseGrid} key={activeCase.id} variants={caseVariants} initial="hidden" animate="visible" exit="exit">
            <CasePreview activeCase={activeCase} />
            <CaseDetail activeCase={activeCase} />
          </motion.div>
        </AnimatePresence>

        <div className={styles.caseNav} aria-label="Selecionar case em destaque">
          {cases.map((item) => (
            <button
              className={`${styles.caseNavButton} ${item.id === activeCase.id ? styles.caseNavButtonActive : ''}`}
              key={item.id}
              type="button"
              aria-pressed={item.id === activeCase.id}
              onClick={() => setActiveCaseId(item.id)}
            >
              <span>{item.id}</span>
              {item.shortName}
            </button>
          ))}
        </div>
      </div>
    </SectionComponent>
  );
}
