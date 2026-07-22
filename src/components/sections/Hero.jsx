import { useEffect, useRef, useState } from 'react';
import { whatsappUrl } from '../../utils/contact';
import heroImage from '../../assets/images/ImgHero.webp';
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

const clientScrambleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

const createClientScrambleWord = () => (
  Array.from({ length: clientWord.length }, () => (
    clientScrambleCharacters[Math.floor(Math.random() * clientScrambleCharacters.length)]
  )).join('')
);

export default function Hero() {
  const [highlightWord, setHighlightWord] = useState(clientWord);
  const scrambleInterval = useRef(null);

  useEffect(() => () => {
    if (scrambleInterval.current) {
      clearInterval(scrambleInterval.current);
    }
  }, []);

  const startHighlightScramble = () => {
    if (scrambleInterval.current) return;

    setHighlightWord(createClientScrambleWord());
    scrambleInterval.current = setInterval(() => {
      setHighlightWord(createClientScrambleWord());
    }, 80);
  };

  const stopHighlightScramble = () => {
    if (scrambleInterval.current) {
      clearInterval(scrambleInterval.current);
      scrambleInterval.current = null;
    }

    setHighlightWord(clientWord);
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>DESENVOLVIMENTO WEB EM FRANCA</p>
          <h1 className={styles.heroTitle}>
            Criação de sites e landing pages em Franca para transformar visitantes em{' '}
            <span
              className={styles.heroTitleHighlight}
              data-text={highlightWord}
              onMouseEnter={startHighlightScramble}
              onMouseLeave={stopHighlightScramble}
            >
              {highlightWord}
            </span>
          </h1>
        </div>

        <div className={styles.heroTextBlock}>
          <p className={styles.subtitle}>
            Sites profissionais para empresas em Franca e região, com interfaces rápidas, modernas e otimizadas para SEO, performance e conversão.
          </p>
          <div className={styles.actions}>
            <Button href={whatsappUrl} target="_blank" rel="noreferrer">Chamar no WhatsApp</Button>
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
          <img
            src={heroImage}
            alt=""
            width="1672"
            height="941"
            loading="eager"
            fetchPriority="high"
          />
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
