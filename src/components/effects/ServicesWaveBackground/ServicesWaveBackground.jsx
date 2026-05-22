import { useEffect, useRef } from 'react';
import styles from './ServicesWaveBackground.module.css';

const DESKTOP_WAVE_COUNT = 12;
const MOBILE_WAVE_COUNT = 6;
const MAX_DPR = 2;

function createWaveData(isMobile = false) {
  const waveCount = isMobile ? MOBILE_WAVE_COUNT : DESKTOP_WAVE_COUNT;

  return Array.from({ length: waveCount }).map((_, index) => ({
    value: Math.random() * 0.5 + 0.18,
    targetValue: Math.random() * 0.65 + 0.18,
    speed: Math.random() * 0.014 + 0.007,
    phase: Math.random() * Math.PI * 2,
    thickness: 0.9 + index * 0.16,
  }));
}

function drawWaves(ctx, width, height, waveData, time) {
  const centerY = height * 0.5;
  const waveGap = Math.min(height * 0.028, 22);

  ctx.clearRect(0, 0, width, height);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  waveData.forEach((wave, index) => {
    const depth = index - (waveData.length - 1) / 2;
    const baseline = centerY + depth * waveGap;
    const amplitude = height * (0.09 + wave.value * 0.075);
    const speedOffset = time * (1 + index * 0.03);
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    const isPrimary = index % 3 === 0;

    gradient.addColorStop(0, isPrimary ? 'rgba(0, 194, 255, 0.05)' : 'rgba(0, 194, 255, 0.02)');
    gradient.addColorStop(0.22, isPrimary ? 'rgba(0, 194, 255, 0.58)' : 'rgba(0, 194, 255, 0.34)');
    gradient.addColorStop(0.5, isPrimary ? 'rgba(59, 130, 246, 0.62)' : 'rgba(59, 130, 246, 0.38)');
    gradient.addColorStop(0.76, isPrimary ? 'rgba(124, 58, 237, 0.58)' : 'rgba(139, 92, 246, 0.34)');
    gradient.addColorStop(1, isPrimary ? 'rgba(139, 92, 246, 0.08)' : 'rgba(139, 92, 246, 0.03)');

    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = isPrimary ? wave.thickness + 0.8 : wave.thickness;
    ctx.shadowBlur = isPrimary ? 16 : 10;
    ctx.shadowColor = index % 2 === 0 ? 'rgba(0, 194, 255, 0.42)' : 'rgba(124, 58, 237, 0.45)';

    for (let x = 0; x <= width; x += 12) {
      const progress = x / width;
      const px = progress * Math.PI * 2;
      const waveY =
        Math.sin(px * 4.5 + speedOffset + wave.phase) *
        Math.cos(px * 1.2 - time * 0.45) *
        amplitude;
      const drift = Math.sin(px * 1.7 - time * 0.58 + index) * amplitude * 0.16;
      const pointY = baseline + waveY + drift;

      if (x === 0) {
        ctx.moveTo(x, pointY);
      } else {
        ctx.lineTo(x, pointY);
      }
    }

    ctx.stroke();

    if (isPrimary) {
      const dotX = width * ((time * 0.035 + index * 0.13) % 1);
      const progress = dotX / width;
      const px = progress * Math.PI * 2;
      const dotY =
        baseline +
        Math.sin(px * 4.5 + speedOffset + wave.phase) *
        Math.cos(px * 1.2 - time * 0.45) *
        amplitude +
        Math.sin(px * 1.7 - time * 0.58 + index) * amplitude * 0.16;

      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.shadowBlur = 14;
      ctx.shadowColor = 'rgba(0, 194, 255, 0.65)';
      ctx.arc(dotX, dotY, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
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
    const mobileQuery = window.matchMedia('(max-width: 900px)');
    let waveData = createWaveData(mobileQuery.matches);
    let animationFrameId;
    let time = 0;
    let canvasWidth = 1;
    let canvasHeight = 1;

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const expectedWaveCount = mobileQuery.matches ? MOBILE_WAVE_COUNT : DESKTOP_WAVE_COUNT;

      if (waveData.length !== expectedWaveCount) {
        waveData = createWaveData(mobileQuery.matches);
      }

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
      time += 0.024;

      waveData.forEach((wave) => {
        if (Math.abs(wave.value - wave.targetValue) < 0.01) {
          wave.targetValue = Math.random() * 0.65 + 0.18;
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
