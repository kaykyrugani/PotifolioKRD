import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { whatsappLabel, whatsappPath } from '../utils/contact';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import contatoHeroImage from '../assets/images/contatoIMG.png';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import styles from './Page.module.css';

const heroSignals = [
  { label: 'Mensagem recebida', className: 'contactHeroSignalMessage' },
  { label: 'Planejamento', className: 'contactHeroSignalPlan' },
  { label: 'Desenvolvimento', className: 'contactHeroSignalDev' },
  { label: 'Publicação', className: 'contactHeroSignalLaunch' },
];

const processSteps = [
  {
    title: 'Contato Inicial',
    description: 'Você apresenta a necessidade, objetivo ou ideia do projeto.',
  },
  {
    title: 'Diagnóstico',
    description: 'Análise do cenário, público e melhor solução para o projeto.',
  },
  {
    title: 'Desenvolvimento',
    description: 'Construção da experiência com foco em performance, usabilidade e conversão.',
  },
  {
    title: 'Publicação',
    description: 'Validação final, publicação e acompanhamento inicial.',
  },
];

const projectTypes = [
  {
    title: 'Sites Institucionais',
    description: 'Presença digital profissional para apresentar sua empresa com clareza e autoridade.',
  },
  {
    title: 'Landing Pages',
    description: 'Páginas focadas em geração de leads, campanhas e conversão.',
  },
  {
    title: 'Portfólios',
    description: 'Experiências visuais para apresentar trabalhos, serviços e trajetória profissional.',
  },
  {
    title: 'Sites para Empresas',
    description: 'Estruturas completas para negócios que precisam comunicar valor e gerar confiança.',
  },
  {
    title: 'Sites para Prestadores de Serviço',
    description: 'Páginas estratégicas para transformar visitantes em contatos qualificados.',
  },
  {
    title: 'Interfaces Web',
    description: 'Telas e experiências digitais com foco em usabilidade, performance e consistência visual.',
  },
];

const faqItems = [
  {
    question: 'Quanto tempo leva um projeto?',
    answer: 'O prazo depende do escopo, quantidade de páginas e nível de complexidade. Após o diagnóstico inicial, é definido um cronograma claro para cada etapa.',
  },
  {
    question: 'Como funciona o orçamento?',
    answer: 'O orçamento é definido com base nas necessidades do projeto, objetivos, funcionalidades e nível de personalização desejado.',
  },
  {
    question: 'O site será responsivo?',
    answer: 'Sim. O projeto é desenvolvido para funcionar bem em diferentes tamanhos de tela, incluindo desktop, tablet e celular.',
  },
  {
    question: 'O projeto terá SEO?',
    answer: 'Sim. A estrutura considera boas práticas de SEO técnico, organização semântica, performance e clareza de conteúdo.',
  },
  {
    question: 'Posso solicitar manutenção?',
    answer: 'Sim. Após a entrega, é possível combinar ajustes, melhorias ou acompanhamento conforme a necessidade do projeto.',
  },
  {
    question: 'O site será rápido?',
    answer: 'Sim. Performance é considerada desde a estrutura do projeto, com atenção a carregamento, responsividade e experiência do usuário.',
  },
];

const revealSectionKeys = {
  process: 'process',
  types: 'types',
  faq: 'faq',
  finalCta: 'finalCta',
};

const revealSectionKeyList = Object.values(revealSectionKeys);
const revealItemKeys = {
  finalActions: 'final-actions',
};
const revealItemKeyList = Object.values(revealItemKeys);

function getProjectTypeIndex(progress, total) {
  if (total <= 1) {
    return 0;
  }

  return Math.min(total - 1, Math.max(0, Math.floor(progress * total)));
}

export default function Contact() {
  const projectTypesRef = useRef(null);
  const [activeProjectType, setActiveProjectType] = useState(0);
  const [isProjectScrollEnabled, setIsProjectScrollEnabled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const {
    setRevealSectionRef,
    getRevealSectionClassName,
    setRevealItemRef,
    getRevealItemClassName,
  } = useRevealOnScroll({
    sectionKeys: revealSectionKeyList,
    itemKeys: revealItemKeyList,
    styles,
    debugLabel: 'Contact',
  });
  const { scrollYProgress: projectTypesScrollProgress } = useScroll({
    target: projectTypesRef,
    offset: ['start start', 'end end'],
  });
  const activeProject = projectTypes[activeProjectType] ?? projectTypes[0];

  const setProjectTypesRefs = useCallback((node) => {
    projectTypesRef.current = node;
    setRevealSectionRef(revealSectionKeys.types, node);
  }, [setRevealSectionRef]);

  useEffect(() => {
    const previousTitle = document.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionTag?.getAttribute('content') || '';

    document.title = 'Contato | Kayky Rugani - Desenvolvedor Front-End';

    if (descriptionTag) {
      descriptionTag.setAttribute('content', 'Entre em contato para desenvolver sites profissionais, landing pages e experiências digitais com foco em performance, SEO e conversão.');
    }

    return () => {
      document.title = previousTitle;

      if (descriptionTag) {
        descriptionTag.setAttribute('content', previousDescription);
      }
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px)');
    const syncMedia = () => {
      setIsProjectScrollEnabled(media.matches);

      if (!media.matches) {
        setActiveProjectType(0);
      }
    };

    syncMedia();
    media.addEventListener('change', syncMedia);

    return () => media.removeEventListener('change', syncMedia);
  }, []);

  useMotionValueEvent(projectTypesScrollProgress, 'change', (latest) => {
    if (!isProjectScrollEnabled) {
      return;
    }

    const nextIndex = getProjectTypeIndex(latest, projectTypes.length);
    setActiveProjectType((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
  });

  return (
    <PageLayout>
      <section className={styles.contactPage}>
        <Container size="wide">
          <section
            className={`${styles.contactHero} ${styles.revealSection} ${styles.revealSectionVisible}`}
            aria-labelledby="contact-page-title"
          >
            <div className={styles.contactHeroCopy}>
              <p className={`${styles.contactEyebrow} ${styles.revealEyebrow}`}>CONTATO</p>
              <h1 className={styles.revealTitle} id="contact-page-title">Vamos conversar sobre seu projeto.</h1>
              <div className={styles.revealDescription}>
                <p className={styles.contactVisualTitle}>Vamos transformar sua ideia em uma experiência digital de alta performance.</p>
                <p>Projetos desenvolvidos com foco em estratégia, experiência do usuário, performance e resultados reais para empresas e profissionais.</p>
              </div>
              <div className={`${styles.contactHeroActions} ${styles.revealItem} ${styles.revealItemVisible}`}>
                <Button to={whatsappPath}>Iniciar conversa</Button>
                <Button to="/projetos" variant="secondary">Ver projetos</Button>
              </div>
            </div>

            <div className={`${styles.heroImageVisual} ${styles.contactHeroVisual}`} aria-hidden="true">
              <div className={styles.contactHeroStage}>
                <svg className={styles.contactHeroTrail} viewBox="0 0 560 520" aria-hidden="true">
                  <path d="M288 168C364 128 440 154 470 214" />
                  <path d="M300 226C396 232 454 290 472 370" />
                  <path d="M244 254C176 264 118 312 94 380" />
                  <path d="M224 174C156 134 108 152 78 212" />
                </svg>
                <img src={contatoHeroImage} alt="" loading="eager" />
                {heroSignals.map((signal, index) => (
                  <motion.span
                    className={`${styles.contactHeroSignal} ${styles[signal.className]}`}
                    key={signal.label}
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.56, delay: 0.7 + index * 0.18, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {signal.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </section>

          <section
            className={getRevealSectionClassName(styles.contactSection, revealSectionKeys.process)}
            ref={(node) => setRevealSectionRef(revealSectionKeys.process, node)}
            aria-labelledby="contact-process-title"
          >
            <div className={styles.contactSectionHeader}>
              <p className={`${styles.contactEyebrow} ${styles.revealEyebrow}`}>PROCESSO COMERCIAL</p>
              <h2 className={styles.revealTitle} id="contact-process-title">Da primeira conversa até a entrega do projeto.</h2>
            </div>

            <div className={styles.contactProcessPipeline}>
              <motion.span
                className={styles.contactProcessLine}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden="true"
              />
              {processSteps.map((step, index) => (
                <motion.article
                  className={styles.contactProcessStep}
                  key={step.title}
                  initial={{ opacity: 0.42, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.56, delay: 0.15 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section
            className={getRevealSectionClassName(`${styles.contactSection} ${styles.contactProjectScrollSection}`, revealSectionKeys.types)}
            ref={setProjectTypesRefs}
            aria-labelledby="contact-types-title"
          >
            <div className={styles.contactProjectSticky}>
              <div className={styles.contactSectionHeader}>
                <p className={`${styles.contactEyebrow} ${styles.revealEyebrow}`}>TIPOS DE PROJETO</p>
                <h2 className={styles.revealTitle} id="contact-types-title">Soluções digitais que posso desenvolver.</h2>
              </div>

              <div className={styles.contactProjectTypes}>
                <div className={styles.contactProjectTypeList} role="list">
                  {projectTypes.map((type, index) => (
                    <article
                      aria-current={activeProjectType === index ? 'step' : undefined}
                      className={`${styles.contactProjectTypeItem} ${activeProjectType === index ? styles.contactProjectTypeItemActive : ''}`}
                      key={type.title}
                      role="listitem"
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{type.title}</strong>
                      <em>{type.description}</em>
                    </article>
                  ))}
                </div>

                <aside className={styles.contactProjectTypeDetail} aria-live="polite">
                  <AnimatePresence>
                    <motion.div
                      className={styles.contactProjectTypeDetailContent}
                      key={activeProject.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span>{String(activeProjectType + 1).padStart(2, '0')}</span>
                      <h3>{activeProject.title}</h3>
                      <p>{activeProject.description}</p>
                    </motion.div>
                  </AnimatePresence>
                </aside>
              </div>
            </div>
          </section>

          <section
            className={getRevealSectionClassName(styles.contactSection, revealSectionKeys.faq)}
            ref={(node) => setRevealSectionRef(revealSectionKeys.faq, node)}
            aria-labelledby="contact-faq-title"
          >
            <div className={styles.contactSectionHeader}>
              <p className={`${styles.contactEyebrow} ${styles.revealEyebrow}`}>DÚVIDAS FREQUENTES</p>
              <h2 className={styles.revealTitle} id="contact-faq-title">Perguntas comuns antes de iniciar um projeto.</h2>
            </div>

            <div className={styles.contactFaqList}>
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                const buttonId = `contact-faq-button-${index}`;
                const panelId = `contact-faq-panel-${index}`;

                return (
                  <div className={styles.contactFaqItem} key={item.question}>
                    <button
                      id={buttonId}
                      className={styles.contactFaqButton}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span>{item.question}</span>
                      <strong aria-hidden="true">{isOpen ? '−' : '+'}</strong>
                    </button>
                    <div
                      id={panelId}
                      className={`${styles.contactFaqPanel} ${isOpen ? styles.contactFaqPanelOpen : ''}`}
                      role="region"
                      aria-labelledby={buttonId}
                    >
                      <p>{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section
            className={getRevealSectionClassName(styles.contactFinalCta, revealSectionKeys.finalCta)}
            ref={(node) => setRevealSectionRef(revealSectionKeys.finalCta, node)}
            aria-labelledby="contact-final-title"
          >
            <p className={`${styles.contactEyebrow} ${styles.revealEyebrow}`}>PRÓXIMO PASSO</p>
            <h2 className={styles.revealTitle} id="contact-final-title">Seu próximo projeto pode começar hoje.</h2>
            <p className={styles.revealDescription}>Se você procura uma solução digital construída com estratégia, performance e atenção aos detalhes, vamos conversar.</p>
            <span className={styles.contactWhatsappLabel}>WhatsApp: {whatsappLabel}</span>
            <div
              className={getRevealItemClassName(styles.contactFinalActions, revealItemKeys.finalActions)}
              ref={(node) => setRevealItemRef(revealItemKeys.finalActions, node)}
            >
              <Button to={whatsappPath}>Chamar no WhatsApp</Button>
              <Button to="/projetos" variant="secondary">Ver projetos</Button>
            </div>
          </section>
        </Container>
      </section>
    </PageLayout>
  );
}
