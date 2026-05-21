import { useEffect, useRef } from 'react';
import styles from './ServicesWaveBackground.module.css';

const WAVE_COUNT = 7;
const MAX_DPR = 2;

function createWaveData() {
  return Array.from({ length: WAVE_COUNT }).map((_, index) => ({
    value: Math.random() * 0.45 + 0.1,
    targetValue: Math.random() * 0.45 + 0.1,
    speed: Math.random() * 0.018 + 0.006,
    phase: index * 0.72,
  }));
}

function drawWaves(ctx, width, height, waveData, time) {
  const amplitudeBase = Math.min(height * 0.055, width * 0.045);
  const waveBands = [0.48, 0.62];

  ctx.clearRect(0, 0, width, height);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  waveBands.forEach((band, bandIndex) => {
    const centerY = height * band;

    waveData.forEach((wave, index) => {
      const depth = index - (WAVE_COUNT - 1) / 2;
      const amplitude = amplitudeBase * (0.5 + wave.value * 0.78);
      const frequency = 1.45 + index * 0.16 + bandIndex * 0.08;
      const y = centerY + depth * Math.min(height * 0.028, 34);

      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, 'rgba(0, 194, 255, 0)');
      gradient.addColorStop(0.18, 'rgba(0, 194, 255, 0.3)');
      gradient.addColorStop(0.48, 'rgba(186, 230, 253, 0.12)');
      gradient.addColorStop(0.68, 'rgba(59, 130, 246, 0.26)');
      gradient.addColorStop(0.88, 'rgba(124, 58, 237, 0.32)');
      gradient.addColorStop(1, 'rgba(124, 58, 237, 0)');

      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = Math.max(1, 1.2 + index * 0.16);
      ctx.shadowBlur = 10;
      ctx.shadowColor = index % 2 === 0 ? 'rgba(0, 194, 255, 0.22)' : 'rgba(124, 58, 237, 0.2)';

      for (let x = 0; x <= width; x += 14) {
        const progress = x / width;
        const sine = Math.sin(progress * Math.PI * 2 * frequency + time + wave.phase + bandIndex);
        const drift = Math.sin(progress * Math.PI * 3.2 - time * 0.65 + index) * amplitude * 0.28;
        const pointY = y + sine * amplitude + drift;

        if (x === 0) {
          ctx.moveTo(x, pointY);
        } else {
          ctx.lineTo(x, pointY);
        }
      }

      ctx.stroke();
    });
  });

  ctx.shadowBlur = 0;
}

export default function ServicesWaveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const waveData = createWaveData();
    let animationFrameId;
    let time = 0;
    let canvasWidth = 1;
    let canvasHeight = 1;

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      canvasWidth = Math.max(1, rect.width);
      canvasHeight = Math.max(1, rect.height);
      canvas.width = Math.floor(canvasWidth * dpr);
      canvas.height = Math.floor(canvasHeight * dpr);
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      drawWaves(ctx, canvasWidth, canvasHeight, waveData, time);
    };

    const animate = () => {
      time += 0.012;

      waveData.forEach((wave) => {
        if (Math.abs(wave.value - wave.targetValue) < 0.01) {
          wave.targetValue = Math.random() * 0.45 + 0.1;
        }

        wave.value += (wave.targetValue - wave.value) * wave.speed;
      });

      drawWaves(ctx, canvasWidth, canvasHeight, waveData, time);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    resizeCanvas();

    if (!reducedMotionQuery.matches) {
      animationFrameId = window.requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className={styles.waveBackground} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.waveCanvas} />
    </div>
  );
}
