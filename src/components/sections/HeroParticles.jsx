import { useEffect, useRef } from 'react';
import { mountHeroParticles, PARTICLES_CONFIG } from './heroParticles';
import styles from './HeroParticles.module.css';

export default function HeroParticles({ heroRef, imageRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    const image = imageRef.current;
    if (!canvas || !hero || !image) return undefined;

    let idleId = 0;
    let timeoutId = 0;
    let cleanup = () => {};
    const initialize = () => { cleanup = mountHeroParticles(canvas, hero); };
    const schedule = () => {
      if (window.requestIdleCallback) idleId = window.requestIdleCallback(initialize, { timeout: PARTICLES_CONFIG.idleTimeout });
      else timeoutId = window.setTimeout(initialize, PARTICLES_CONFIG.idleTimeout);
    };
    const onLoad = () => schedule();

    if (image.complete && image.naturalWidth > 0) schedule();
    else image.addEventListener('load', onLoad, { once: true });

    return () => {
      image.removeEventListener('load', onLoad);
      if (idleId) window.cancelIdleCallback?.(idleId);
      window.clearTimeout(timeoutId);
      cleanup();
    };
  }, [heroRef, imageRef]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
