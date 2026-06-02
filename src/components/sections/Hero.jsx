import { useEffect, useRef, useState } from 'react';
import { whatsappPath } from '../../utils/contact';
import heroImage from '../../assets/images/ImgHero.png';
import Button from '../ui/Button';
import styles from './Hero.module.css';

const quickBenefits = [
  {
    title: 'Sites rápidos',
    description: 'alta performance',
  },
  {
    title: 'Design moderno',
    description: 'visual responsivo',
  },
  {
    title: 'SEO técnico',
    description: 'estrutura otimizada',
  },
  {
    title: 'Foco em resultados',
    description: 'conversão e clareza',
  },
];

const clientWord = 'clientes';

const clientWordScrambleFrames = [
  'clx9t4es',
  'cl13ntes',
  'cxi8ntes',
  'cli7nt5s',
  'clx9t4es',
];

export default function Hero() {
  const [highlightWord, setHighlightWord] = useState(clientWord);
  const scrambleTimers = useRef([]);

  useEffect(() => () => {
    scrambleTimers.current.forEach((timer) => clearTimeout(timer));
  }, []);

  const handleHighlightMouseEnter = () => {
    scrambleTimers.current.forEach((timer) => clearTimeout(timer));
    scrambleTimers.current = [];

    clientWordScrambleFrames.forEach((frame, index) => {
      scrambleTimers.current.push(
        setTimeout(() => {
          setHighlightWord(frame);
        }, index * 70),
      );
    });

    scrambleTimers.current.push(
      setTimeout(() => {
        setHighlightWord(clientWord);
      }, 470),
    );
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>DARK TECH PREMIUM PARA PRESENÇA DIGITAL</p>
          <h1 className={styles.heroTitle}>
            Crio sites que transformam visitantes em{' '}
            <span
              className={styles.heroTitleHighlight}
              data-text={highlightWord}
              onMouseEnter={handleHighlightMouseEnter}
            >
              {highlightWord}
            </span>
          </h1>
        </div>

        <div className={styles.heroTextBlock}>
          <p className={styles.subtitle}>
            Desenvolvimento de sites institucionais e landing pages rápidas, modernas e otimizadas para SEO, performance e conversão.
          </p>
          <div className={styles.actions}>
            <Button to={whatsappPath}>Chamar no WhatsApp</Button>
            <Button to="/projetos" variant="secondary">Ver projetos</Button>
          </div>
        </div>

        <div className={styles.heroImageArea} aria-hidden="true">
          <div className={styles.monitorFragments}>
            <div className={`${styles.monitorFragment} ${styles.codeFragment}`}>
              <span className={styles.fragmentTopbar}>
                <i />
                <i />
                <i />
              </span>
              <code>
                <span>&lt;section&gt;</span>
                <span>interface.launch()</span>
                <span>return result</span>
              </code>
            </div>

            <div className={`${styles.monitorFragment} ${styles.layoutFragment}`}>
              <span />
              <strong />
              <i />
              <i />
            </div>

            <div className={`${styles.monitorFragment} ${styles.cursorFragment}`} />

            <div className={`${styles.monitorFragment} ${styles.nodesFragment}`}>
              <span />
              <span />
              <span />
            </div>
          </div>
          <img src={heroImage} alt="" loading="eager" />
        </div>

        <ul className={styles.quickBenefits} aria-label="Benefícios rápidos">
          {quickBenefits.map((benefit) => (
            <li key={benefit.title}>
              <span className={styles.benefitIcon} aria-hidden="true" />
              <strong>{benefit.title}</strong>
              <small>{benefit.description}</small>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
