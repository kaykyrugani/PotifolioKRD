import { useRef } from 'react';
import { whatsappUrl } from '../../utils/contact';
import heroImage from '../../assets/images/ImgHero.webp';
import heroImage768 from '../../assets/images/ImgHero-768.webp';
import heroImage1280 from '../../assets/images/ImgHero-1280.webp';
import Button from '../ui/Button';
import HeroParticles from './HeroParticles.jsx';
import styles from './Hero.module.css';

export default function Hero() {
  const heroRef = useRef(null);
  const figureImageRef = useRef(null);

  return (
    <section id="home" className={styles.hero} aria-labelledby="home-title" ref={heroRef}>
      <div className={styles.heroFx} aria-hidden="true">
        <HeroParticles heroRef={heroRef} imageRef={figureImageRef} />
      </div>
      <div className={styles.heroGlow} aria-hidden="true" />
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
          <p className={styles.eyebrow}>Desenvolvedor web</p>
          <h1 className={styles.heroTitle} id="home-title">
            <span className={styles.titleLine}><span>Criação de sites</span></span>{' '}
            <span className={styles.titleLine}><span>que transformam</span></span>{' '}
            <span className={styles.titleLine}>
              <span>visitantes em <span className={styles.clientsWord}>clientes</span></span>
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
