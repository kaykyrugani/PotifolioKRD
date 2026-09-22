import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionFold from '../SectionFold/SectionFold';
import { featuredCases, featuredCaseTags } from '../../data/featuredCases';
import styles from './FeaturedCases.module.css';

function CasePreview({ project, index, isPaused }) {
  const previewRef = useRef(null);
  const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const preview = previewRef.current;

    if (!preview || prefersReducedMotion) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.28 },
    );

    observer.observe(preview);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const preview = previewRef.current;
    const image = imageRef.current;

    if (!preview || !image) {
      return undefined;
    }

    const measure = () => {
      setScrollDistance(Math.max(0, image.offsetHeight - preview.clientHeight));
    };

    measure();
    image.addEventListener('load', measure);

    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(measure);

    resizeObserver?.observe(preview);
    resizeObserver?.observe(image);
    window.addEventListener('resize', measure);

    return () => {
      image.removeEventListener('load', measure);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const shouldAnimate = isVisible && !prefersReducedMotion && scrollDistance > 0;
  const shotClassName = [
    styles.previewShot,
    shouldAnimate ? styles.previewShotActive : '',
    isPaused ? styles.previewShotPaused : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.preview}>
      <div className={styles.previewChrome} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className={styles.previewImageWindow} ref={previewRef}>
        <div
          className={shotClassName}
          style={{
            '--scroll-distance': `${scrollDistance}px`,
            '--scroll-delay': `${index * -0.7}s`,
          }}
        >
          <img
            ref={imageRef}
            className={styles.previewImage}
            src={project.image}
            alt={project.imageAlt}
            width={project.imageWidth}
            height={project.imageHeight}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

function CaseCard({ project, index }) {
  const [isPaused, setIsPaused] = useState(false);

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsPaused(false);
    }
  };

  return (
    <div
      className={styles.caseCard}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={handleBlur}
    >
      <Link
        className={styles.caseMainLink}
        to={`/projetos/${project.slug}`}
        aria-label={`Ver case: ${project.name}`}
      >
        <CasePreview project={project} index={index} isPaused={isPaused} />

        <div className={styles.cardContent}>
          <span className={styles.caseNumber}>{project.id}</span>
          <h3>{project.name}</h3>
          <ul className={styles.caseStack} aria-label={`Tecnologias e práticas de ${project.name}`}>
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <span className={styles.cardAction} aria-hidden="true">Ver case <b>↗</b></span>
        </div>
      </Link>

      {project.link && (
        <div className={styles.cardFooter}>
          <a
            className={styles.externalLink}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visitar site de ${project.name} em uma nova aba`}
          >
            Visitar site <span aria-hidden="true">→</span>
          </a>
        </div>
      )}
    </div>
  );
}

function MobileCaseFacts({ project }) {
  return (
    <details className={styles.mobileFacts}>
      <summary>Detalhes do case</summary>
      <dl>
        <div>
          <dt>Objetivo</dt>
          <dd>{project.objective}</dd>
        </div>
        <div>
          <dt>Desafio</dt>
          <dd>{project.challenge}</dd>
        </div>
        <div>
          <dt>Solução</dt>
          <dd>{project.solution}</dd>
        </div>
        <div>
          <dt>Resultado</dt>
          <dd>{project.result}</dd>
        </div>
      </dl>
    </details>
  );
}

export default function FeaturedCases({ className = '', foldVariant }) {
  const [activeTag, setActiveTag] = useState('Todos');
  const prefersReducedMotion = useReducedMotion();
  const SectionComponent = foldVariant ? SectionFold : 'section';
  const filteredCases = useMemo(() => (
    activeTag === 'Todos'
      ? featuredCases
      : featuredCases.filter((project) => project.stack.includes(activeTag))
  ), [activeTag]);

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
            Explore os projetos em uma vitrine responsiva, filtre pelas tecnologias aplicadas
            e acesse cada case para conhecer sua estrutura.
          </p>
        </div>

        <div className={styles.filters} role="group" aria-label="Filtrar cases por tecnologia">
          {['Todos', ...featuredCaseTags].map((tag) => (
            <button
              className={`${styles.filterButton} ${activeTag === tag ? styles.filterButtonActive : ''}`}
              key={tag}
              type="button"
              aria-pressed={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <p className={styles.filterStatus} aria-live="polite">
          {filteredCases.length} {filteredCases.length === 1 ? 'case exibido' : 'cases exibidos'}
        </p>

        <motion.div className={styles.caseGrid} layout={!prefersReducedMotion}>
          <AnimatePresence mode="popLayout">
            {filteredCases.map((project, index) => (
              <motion.article
                key={project.slug}
                layout={!prefersReducedMotion}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: 'easeOut' }}
              >
                <CaseCard project={project} index={index} />
                <MobileCaseFacts project={project} />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionComponent>
  );
}
