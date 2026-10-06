import { useCallback, useEffect, useRef, useState } from 'react';
import { whatsappUrl } from '../../utils/contact';
import heroImage from '../../assets/images/ImgHero.webp';
import heroImage768 from '../../assets/images/ImgHero-768.webp';
import heroImage1280 from '../../assets/images/ImgHero-1280.webp';
import Button from '../ui/Button';
import HeroParticles from './HeroParticles.jsx';
import styles from './Hero.module.css';

const clientWord = 'clientes';
const scrambleCharacters = 'abcdefghijklmnopqrstuvwxyz';

function createScrambleWord(resolvedCharacters) {
  return Array.from(clientWord, (character, index) => (
    index < resolvedCharacters
      ? character
      : scrambleCharacters[Math.floor(Math.random() * scrambleCharacters.length)]
  )).join('');
}

export default function Hero() {
  const [visualWord, setVisualWord] = useState(clientWord);
  const heroRef = useRef(null);
  const figureImageRef = useRef(null);
  const animationRef = useRef(null);
  const runningRef = useRef(false);
  const visualRef = useRef(null);

  const clearAnimation = useCallback(() => {
    if (animationRef.current) {
      clearInterval(animationRef.current);
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    runningRef.current = false;
  }, []);

  const startScramble = useCallback(() => {
    if (runningRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    clearAnimation();
    runningRef.current = true;
    const startedAt = performance.now();
    const duration = 720;

    animationRef.current = window.setInterval(() => {
      const progress = Math.min((performance.now() - startedAt) / duration, 1);
      const resolvedCharacters = Math.floor(progress * clientWord.length);
      setVisualWord(createScrambleWord(resolvedCharacters));

      if (progress >= 1) {
        clearAnimation();
        setVisualWord(clientWord);
      }
    }, 45);
  }, [clearAnimation]);

  useEffect(() => {
    const measureWord = () => {
      const element = visualRef.current;
      if (!element) return;
      const computed = window.getComputedStyle(element);
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return;
      context.font = computed.font;
      element.style.minWidth = `${context.measureText(clientWord).width}px`;
    };

    measureWord();
    window.addEventListener('resize', measureWord);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const touchDevice = window.matchMedia('(hover: none)');
    let loadTimeout;
    const onLoad = () => {
      if (touchDevice.matches && !reducedMotion.matches) {
        loadTimeout = window.setTimeout(startScramble, 600);
      }
    };

    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });

    return () => {
      window.removeEventListener('resize', measureWord);
      window.removeEventListener('load', onLoad);
      window.clearTimeout(loadTimeout);
      clearAnimation();
    };
  }, [clearAnimation, startScramble]);

  return (
    <section id="home" className={styles.hero} aria-labelledby="home-title" ref={heroRef}>
      <div className={styles.heroFx} aria-hidden="true">
        <HeroParticles heroRef={heroRef} imageRef={figureImageRef} />
      </div>
      <figure className={styles.heroFigure}>
        <img
          ref={figureImageRef}
          src={heroImage}
          srcSet={`${heroImage768} 768w, ${heroImage1280} 1280w, ${heroImage} 1672w`}
          sizes="(max-width: 767px) 175vw, (max-width: 1023px) 130vw, min(82vw, 150svh)"
          alt="Ilustração de Kayky Rugani, desenvolvedor web, em estilo de personagem, trabalhando em frente a um computador"
          width="1672"
          height="941"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </figure>
      <div className={styles.heroFade} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Kayky Rugani · Desenvolvedor web</p>
          <h1 className={styles.heroTitle} id="home-title">
            Criação de sites que transformam visitantes em{' '}
            <span className={styles.scramble} data-text={clientWord}>
              <span className={styles.srOnly}>{clientWord}</span>
              <span
                className={styles.scrambleVisual}
                aria-hidden="true"
                ref={visualRef}
                onMouseEnter={startScramble}
                onTouchStart={startScramble}
              >
                {visualWord}
              </span>
            </span>
          </h1>
          <p className={styles.subtitle}>
            Sites e landing pages profissionais, rápidos e otimizados para SEO, com design pensado para converter visitas em contatos.
          </p>
          <div className={styles.actions}>
            <Button className={styles.primaryAction} href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chamar no WhatsApp (abre em nova aba)">Chamar no WhatsApp</Button>
            <Button className={styles.secondaryAction} to="/projetos" variant="secondary">Ver projetos</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
