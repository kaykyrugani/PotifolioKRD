export const PARTICLES_CONFIG = {
  // Density and responsive limits.
  areaPerParticle: 22000, min: 28, max: 70,
  mobileBreakpoint: 1024, mobileMax: 28, mobileSpeed: 0.5, idleTimeout: 1500,
  // Point appearance, drift and canvas resolution.
  radius: [1, 2.4], dotColor: [207, 233, 255], dotAlpha: [0.25, 0.55],
  speed: [6, 15], edgeMargin: 40, maxDpr: 1.5, maxDelta: 0.05,
  // Sparse cyan links and soft cursor response.
  linkDistance: 130, linkColor: [0, 194, 255], linkMaxAlpha: 0.14, linkWidth: 0.8,
  pointerRadius: 150, pointerColor: [0, 194, 255], pointerMaxAlpha: 0.35, pointerEase: 0.12,
  pointerFade: 0.3, pointerDotRadius: 2.2, pointerDotAlpha: 0.28, pointerDotThreshold: 0.02,
  // Resize, frame budget and adaptive fallback.
  resizeDebounce: 150, sampleWindow: 2000, frameBudget: 20, qualityScale: 0.7, qualityMinimum: 20,
  weakCores: 2, weakMemory: 2, intersectionThreshold: 0.1, triangles: false,
};

const randomBetween = ([min, max]) => min + Math.random() * (max - min);
const isMobile = () => window.matchMedia(`(max-width: ${PARTICLES_CONFIG.mobileBreakpoint - 1}px), (hover: none)`).matches;

function createParticle(width, height, scale) {
  const angle = Math.random() * Math.PI * 2;
  const speed = randomBetween(PARTICLES_CONFIG.speed) * scale;
  return { x: Math.random() * width, y: Math.random() * height, speedScale: scale,
    vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
    radius: randomBetween(PARTICLES_CONFIG.radius), alpha: randomBetween(PARTICLES_CONFIG.dotAlpha) };
}

export function mountHeroParticles(canvas, hero) {
  const ctx = canvas.getContext('2d');
  const weak = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= PARTICLES_CONFIG.weakCores)
    || (navigator.deviceMemory && navigator.deviceMemory <= PARTICLES_CONFIG.weakMemory);
  if (!ctx || navigator.connection?.saveData || weak) return () => {};

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let pointerOn = !isMobile() && window.matchMedia('(hover: hover)').matches && !reduced;
  const particles = [], pointer = { x: 0, y: 0, tx: 0, ty: 0, alpha: 0, target: 0 };
  let width = 1, height = 1, frameId = 0, resizeTimer = 0, lastFrame = 0;
  let visible = !('IntersectionObserver' in window), quality = 1, slowStage = 0;
  let sampleStart = performance.now(), sampleTotal = 0, sampleFrames = 0, staticMode = reduced;
  const link2 = PARTICLES_CONFIG.linkDistance ** 2, pointer2 = PARTICLES_CONFIG.pointerRadius ** 2;

  const particleCount = () => {
    const base = Math.max(PARTICLES_CONFIG.min, Math.min(PARTICLES_CONFIG.max, Math.round(width * height / PARTICLES_CONFIG.areaPerParticle)));
    const cap = Math.min(base, isMobile() ? PARTICLES_CONFIG.mobileMax : PARTICLES_CONFIG.max);
    return Math.max(quality < 1 ? PARTICLES_CONFIG.qualityMinimum : PARTICLES_CONFIG.min, Math.floor(cap * quality));
  };

  function draw() {
    const links = Array.from({ length: 8 }, () => []);
    const pointerLinks = Array.from({ length: 8 }, () => []);
    const dots = Array.from({ length: 8 }, () => []);
    ctx.clearRect(0, 0, width, height);
    particles.forEach((a, i) => {
      for (let j = i + 1; j < particles.length; j += 1) {
        const b = particles[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < link2) {
          const alpha = (1 - Math.sqrt(d2) / PARTICLES_CONFIG.linkDistance) * PARTICLES_CONFIG.linkMaxAlpha;
          const bin = Math.min(7, Math.floor(alpha / PARTICLES_CONFIG.linkMaxAlpha * 8));
          links[bin].push(a.x, a.y, b.x, b.y);
        }
      }
      if (pointerOn && pointer.alpha > 0) {
        const dx = a.x - pointer.x, dy = a.y - pointer.y, d2 = dx * dx + dy * dy;
        if (d2 < pointer2) {
          const alpha = 1 - Math.sqrt(d2) / PARTICLES_CONFIG.pointerRadius;
          const bin = Math.min(7, Math.floor(alpha * 8));
          pointerLinks[bin].push(a.x, a.y, pointer.x, pointer.y);
        }
      }
      const dotRange = PARTICLES_CONFIG.dotAlpha[1] - PARTICLES_CONFIG.dotAlpha[0];
      dots[Math.min(7, Math.floor((a.alpha - PARTICLES_CONFIG.dotAlpha[0]) / dotRange * 8))].push(a.x, a.y, a.radius);
    });
    ctx.lineWidth = PARTICLES_CONFIG.linkWidth;
    [[links, PARTICLES_CONFIG.linkColor, PARTICLES_CONFIG.linkMaxAlpha],
      [pointerLinks, PARTICLES_CONFIG.pointerColor, PARTICLES_CONFIG.pointerMaxAlpha * pointer.alpha]]
      .forEach(([groups, color, maxAlpha]) => groups.forEach((group, bin) => {
        if (!group.length) return;
        ctx.globalAlpha = ((bin + 0.5) / 8) * maxAlpha;
        ctx.strokeStyle = `rgb(${color})`; ctx.beginPath();
        for (let i = 0; i < group.length; i += 4) {
          ctx.moveTo(group[i], group[i + 1]); ctx.lineTo(group[i + 2], group[i + 3]);
        }
        ctx.stroke();
      }));
    ctx.fillStyle = `rgb(${PARTICLES_CONFIG.dotColor})`;
    dots.forEach((group, bin) => {
      if (!group.length) return;
      ctx.globalAlpha = PARTICLES_CONFIG.dotAlpha[0] + ((bin + 0.5) / 8) * (PARTICLES_CONFIG.dotAlpha[1] - PARTICLES_CONFIG.dotAlpha[0]);
      ctx.beginPath();
      for (let i = 0; i < group.length; i += 3) {
        ctx.moveTo(group[i] + group[i + 2], group[i + 1]);
        ctx.arc(group[i], group[i + 1], group[i + 2], 0, Math.PI * 2);
      }
      ctx.fill();
    });
    if (pointerOn && pointer.alpha > PARTICLES_CONFIG.pointerDotThreshold) {
      ctx.globalAlpha = pointer.alpha * PARTICLES_CONFIG.pointerDotAlpha;
      ctx.fillStyle = `rgb(${PARTICLES_CONFIG.pointerColor})`;
      ctx.beginPath(); ctx.arc(pointer.x, pointer.y, PARTICLES_CONFIG.pointerDotRadius, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function resize() {
    const rect = hero.getBoundingClientRect(), nw = Math.max(1, rect.width), nh = Math.max(1, rect.height);
    const sx = nw / width, sy = nh / height;
    width = nw; height = nh;
    const speedScale = isMobile() ? PARTICLES_CONFIG.mobileSpeed : 1;
    pointerOn = !isMobile() && window.matchMedia('(hover: hover)').matches && !reduced;
    if (!pointerOn) pointer.target = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, PARTICLES_CONFIG.maxDpr);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles.forEach((p) => {
      p.x *= sx; p.y *= sy;
      p.vx *= speedScale / p.speedScale; p.vy *= speedScale / p.speedScale; p.speedScale = speedScale;
    });
    while (particles.length > particleCount()) particles.pop();
    while (particles.length < particleCount()) particles.push(createParticle(width, height, speedScale));
    if (staticMode) draw();
    else if (!frameId && visible && !document.hidden) start();
  }

  function frame(now) {
    if (!visible || document.hidden || staticMode) return;
    const started = performance.now(), dt = Math.min((now - (lastFrame || now)) / 1000, PARTICLES_CONFIG.maxDelta);
    lastFrame = now;
    particles.forEach((p) => {
      p.x += p.vx * dt; p.y += p.vy * dt;
      const margin = PARTICLES_CONFIG.edgeMargin;
      if (p.x < -margin) p.x = width + margin; else if (p.x > width + margin) p.x = -margin;
      if (p.y < -margin) p.y = height + margin; else if (p.y > height + margin) p.y = -margin;
    });
    if (pointerOn) {
      const ease = 1 - Math.exp(-dt / PARTICLES_CONFIG.pointerEase);
      pointer.x += (pointer.tx - pointer.x) * ease; pointer.y += (pointer.ty - pointer.y) * ease;
      pointer.alpha += (pointer.target - pointer.alpha) * Math.min(1, dt / PARTICLES_CONFIG.pointerFade);
    }
    draw(); canvas.style.opacity = '1';
    sampleTotal += performance.now() - started; sampleFrames += 1;
    if (now - sampleStart >= 2000) {
      const slow = sampleTotal / Math.max(1, sampleFrames) > PARTICLES_CONFIG.frameBudget;
      if (slow && slowStage === 0) { slowStage = 1; quality = PARTICLES_CONFIG.qualityScale; resize(); }
      else if (slow) { staticMode = true; frameId = 0; return; }
      else slowStage = 0;
      sampleStart = now; sampleTotal = 0; sampleFrames = 0;
    }
    frameId = window.requestAnimationFrame(frame);
  }

  function start() {
    if (!frameId && !staticMode && visible && !document.hidden) {
      lastFrame = 0; frameId = window.requestAnimationFrame(frame);
    }
  }
  function pause() { window.cancelAnimationFrame(frameId); frameId = 0; }

  const move = (event) => {
    if (!pointerOn || event.pointerType === 'touch') return;
    const rect = hero.getBoundingClientRect();
    pointer.tx = event.clientX - rect.left; pointer.ty = event.clientY - rect.top; pointer.target = 1;
  };
  const leave = () => { pointer.target = 0; };
  const visibility = () => (document.hidden ? pause() : start());
  const intersection = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio >= 0.1;
    if (visible) start(); else pause();
  }, { threshold: PARTICLES_CONFIG.intersectionThreshold }) : null;
  const observer = 'ResizeObserver' in window ? new ResizeObserver(() => {
    window.clearTimeout(resizeTimer); resizeTimer = window.setTimeout(resize, PARTICLES_CONFIG.resizeDebounce);
  }) : null;

  resize();
  if (staticMode) canvas.style.opacity = '1';
  else start();
  intersection?.observe(hero); observer?.observe(hero);
  hero.addEventListener('pointermove', move, { passive: true });
  hero.addEventListener('pointerleave', leave, { passive: true });
  document.addEventListener('visibilitychange', visibility);
  return () => {
    pause(); window.clearTimeout(resizeTimer); intersection?.disconnect(); observer?.disconnect();
    hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', leave);
    document.removeEventListener('visibilitychange', visibility);
  };
}
