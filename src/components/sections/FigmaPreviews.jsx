import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  flowPreviewNodes,
  interfacePreviewCopy,
  miniPageComponentInstances,
  miniPageCopy,
  responsivePreviewCopy,
} from './figmaPreviewData';
import styles from './FigmaPreviews.module.css';
import { TechnologyPlaybackButton } from './TechnologyStoryPrimitives';

const slotIntroDelay = 780;
const miniPageLogicalWidth = 1280;

export function PreviewShell({ label, ariaLabel, controls, caption, canvasRef, hasInteracted, onCanvasInteract, className, children }) {
  return (
    <section className={`${styles.previewShell} ${className ?? ''}`} role="group" aria-label={ariaLabel}>
      <header className={styles.previewHeader}>
        <span className={styles.previewLabel}>{label}</span>
        <div className={styles.previewControls}>{controls}</div>
      </header>
      <div className={styles.previewCanvas} ref={canvasRef} onPointerDown={onCanvasInteract}>
        {children}
      </div>
      <footer className={styles.previewCaption} aria-live={hasInteracted ? 'polite' : 'off'}>
        {caption}
      </footer>
    </section>
  );
}

function usePreviewAutoplay({ isPresent, shouldReduceMotion, onIntro, onReducedMotion }) {
  const canvasRef = useRef(null);
  const timerIds = useRef(new Set());
  const hasStartedRef = useRef(false);
  const isVisible = useInView(canvasRef, { amount: 0.4 });
  const [hasInteracted, setHasInteracted] = useState(false);

  const clearTimers = useCallback(() => {
    timerIds.current.forEach((timerId) => window.clearTimeout(timerId));
    timerIds.current.clear();
  }, []);

  const schedule = useCallback((callback, delay) => {
    const timerId = window.setTimeout(() => {
      timerIds.current.delete(timerId);
      callback();
    }, delay);
    timerIds.current.add(timerId);
    return timerId;
  }, []);

  const cancelIntro = useCallback(() => {
    setHasInteracted(true);
    clearTimers();
  }, [clearTimers]);

  useEffect(() => {
    if (!isPresent) {
      clearTimers();
      return undefined;
    }

    if (shouldReduceMotion) {
      clearTimers();
      onReducedMotion();
      return undefined;
    }

    if (!isVisible || hasInteracted || hasStartedRef.current) return undefined;

    const activeTimers = timerIds.current;
    const introTimer = schedule(() => {
      hasStartedRef.current = true;
      onIntro(schedule);
    }, slotIntroDelay);
    return () => {
      window.clearTimeout(introTimer);
      activeTimers.delete(introTimer);
    };
  }, [clearTimers, hasInteracted, isPresent, isVisible, onIntro, onReducedMotion, schedule, shouldReduceMotion]);

  useEffect(() => {
    const activeTimers = timerIds.current;
    return () => {
      activeTimers.forEach((timerId) => window.clearTimeout(timerId));
      activeTimers.clear();
    };
  }, []);

  return { canvasRef, hasInteracted, cancelIntro, schedule };
}

function PreviewIcon({ name }) {
  const common = { viewBox: '0 0 24 24', width: 18, height: 18, 'aria-hidden': true, focusable: false };
  const paths = {
    arrival: <><path d="M4 18V6l8-3 8 3v12" /><path d="M8 18v-5h8v5M9 8h.01M15 8h.01" /></>,
    proposal: <><path d="M4 5h16v14H4z" /><path d="M8 9h8M8 13h5" /></>,
    plans: <><path d="M5 4h14v16H5z" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
    contact: <><path d="M4 5h16v12H9l-5 3z" /><path d="M8 10h8M8 13h5" /></>,
    refresh: <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M6.2 9a6.5 6.5 0 0 1 11-2L20 12M4 12l2.8 5a6.5 6.5 0 0 0 11-2" /></>,
    desktop: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    tablet: <><rect x="6" y="2.5" width="12" height="19" rx="2" /><path d="M11 18.5h2" /></>,
    mobile: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18.5h2" /></>,
  };

  return <svg {...common} className={styles.previewIcon}>{paths[name]}</svg>;
}

const desktopFlowPaths = ['M 195 100 H 305', 'M 445 100 H 555', 'M 695 100 H 805'];
const compactFlowPaths = ['M 350 50 H 650', 'M 750 50 V 75 H 250 V 150', 'M 350 150 H 650'];
const desktopFlowPoints = [125, 375, 625, 875].map((x) => ({ x, y: 100 }));
const compactFlowPoints = [
  { x: 250, y: 50 }, { x: 750, y: 50 }, { x: 250, y: 150 }, { x: 750, y: 150 },
];

function FlowConnectors({ activeIndex, compact, journey, shouldReduceMotion }) {
  const paths = compact ? compactFlowPaths : desktopFlowPaths;
  const points = compact ? compactFlowPoints : desktopFlowPoints;
  const from = points[journey?.from ?? activeIndex];
  const to = points[journey?.to ?? activeIndex];
  let circleFrames = { cx: to.x, cy: to.y };

  if (journey && compact && journey.from === 1 && journey.to === 2) {
    circleFrames = { cx: [750, 750, 250, 250], cy: [50, 75, 75, 150] };
  } else if (journey && compact && journey.from === 2 && journey.to === 1) {
    circleFrames = { cx: [250, 250, 750, 750], cy: [150, 75, 75, 50] };
  } else if (journey && !compact && journey.to === journey.from + 1) {
    const lineStart = 195 + journey.from * 250;
    circleFrames = { cx: [lineStart, lineStart + 110], cy: [100, 100] };
  } else if (journey && !compact && journey.to === journey.from - 1) {
    const lineStart = 195 + journey.to * 250;
    circleFrames = { cx: [lineStart + 110, lineStart], cy: [100, 100] };
  } else if (journey && compact && journey.to === journey.from + 1) {
    const lineStart = journey.from === 0 ? 350 : 350;
    const lineY = journey.from < 2 ? 50 : 150;
    circleFrames = { cx: [lineStart, lineStart + 300], cy: [lineY, lineY] };
  } else if (journey && compact && journey.to === journey.from - 1) {
    const lineStart = journey.to === 0 ? 350 : 350;
    const lineY = journey.to < 2 ? 50 : 150;
    circleFrames = { cx: [lineStart + 300, lineStart], cy: [lineY, lineY] };
  } else if (journey) {
    circleFrames = { cx: [from.x, to.x], cy: [from.y, to.y] };
  }
  const initialCircle = {
    cx: Array.isArray(circleFrames.cx) ? circleFrames.cx[0] : circleFrames.cx,
    cy: Array.isArray(circleFrames.cy) ? circleFrames.cy[0] : circleFrames.cy,
  };

  return (
    <svg className={compact ? styles.flowConnectorCompact : styles.flowConnectorDesktop} viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
      {paths.map((path, index) => (
        <g key={path}>
          <path className={styles.flowConnectorBase} d={path} />
          <path
            className={styles.flowConnectorFill}
            d={path}
            pathLength="1"
            style={{ strokeDashoffset: index < activeIndex ? 0 : 1 }}
          />
        </g>
      ))}
      {journey && journey.from !== journey.to && (
        <motion.circle
          animate={circleFrames}
          className={styles.flowJourneyDot}
          initial={initialCircle}
          r="9"
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: 'linear' }}
        />
      )}
    </svg>
  );
}

function FlowPreview({ shouldReduceMotion, isPresent }) {
  const [activeIndex, setActiveIndex] = useState(shouldReduceMotion ? flowPreviewNodes.length - 1 : 0);
  const [journey, setJourney] = useState(null);
  const [introComplete, setIntroComplete] = useState(shouldReduceMotion);
  const activeIndexRef = useRef(activeIndex);
  const [compact, setCompact] = useState(false);

  const changeNode = useCallback((nextIndex) => {
    const previousIndex = activeIndexRef.current;
    if (nextIndex !== previousIndex) {
      setJourney({ from: previousIndex, to: nextIndex });
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }
  }, []);

  const runIntro = useCallback((schedule) => {
    setIntroComplete(false);
    let nextIndex = 1;
    const advance = () => {
      changeNode(nextIndex);
      if (nextIndex === flowPreviewNodes.length - 1) {
        setIntroComplete(true);
        return;
      }
      nextIndex += 1;
      schedule(advance, 650);
    };
    schedule(advance, 650);
  }, [changeNode]);

  const finishImmediately = useCallback(() => {
    activeIndexRef.current = flowPreviewNodes.length - 1;
    setActiveIndex(flowPreviewNodes.length - 1);
    setIntroComplete(true);
  }, []);
  const { canvasRef, cancelIntro, hasInteracted, schedule } = usePreviewAutoplay({ isPresent, onIntro: runIntro, onReducedMotion: finishImmediately, shouldReduceMotion });

  useEffect(() => {
    if (!canvasRef.current || !window.ResizeObserver) return undefined;
    const observer = new ResizeObserver(([entry]) => setCompact(entry.contentRect.width < 420));
    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, [canvasRef]);

  useEffect(() => {
    if (!isPresent) cancelIntro();
  }, [cancelIntro, isPresent]);

  const selectNode = (index) => {
    cancelIntro();
    setIntroComplete(false);
    changeNode(index);
  };

  const repeat = () => {
    cancelIntro();
    if (shouldReduceMotion) return;
    activeIndexRef.current = 0;
    setJourney(null);
    setActiveIndex(0);
    setIntroComplete(false);
    let nextIndex = 1;
    const advance = () => {
      changeNode(nextIndex);
      if (nextIndex === flowPreviewNodes.length - 1) {
        setIntroComplete(true);
        return;
      }
      nextIndex += 1;
      schedule(advance, 650);
    };
    schedule(advance, 650);
  };

  const activeNode = flowPreviewNodes[activeIndex];
  const controls = (
    <TechnologyPlaybackButton
      ariaLabel="Repetir animação do fluxo"
      className={styles.previewIconButton}
      icon={<PreviewIcon name="refresh" />}
      label="Repetir"
      onClick={repeat}
      onFocus={cancelIntro}
      title="Repetir"
    />
  );

  return (
    <PreviewShell
      ariaLabel="Mapa de fluxo interativo"
      canvasRef={canvasRef}
      caption={activeNode.caption}
      className={styles.flowPreviewShell}
      controls={controls}
      hasInteracted={hasInteracted}
      label="Mapa de fluxo"
      onCanvasInteract={cancelIntro}
    >
      <FlowConnectors activeIndex={activeIndex} compact={compact} journey={journey} shouldReduceMotion={shouldReduceMotion} />
      <div className={styles.flowNodes}>
        {flowPreviewNodes.map((node, index) => {
          const status = index === activeIndex ? 'current' : index < activeIndex ? 'complete' : 'idle';
          return (
            <div className={styles.flowNodeGroup} key={node.key}>
              <button
                aria-pressed={index === activeIndex}
                className={`${styles.flowNode} ${styles[`flowNode-${status}`]} ${index === 3 && introComplete ? styles.flowNodePulse : ''}`}
                onClick={() => selectNode(index)}
                onFocus={() => { cancelIntro(); changeNode(index); }}
                onMouseEnter={() => { cancelIntro(); changeNode(index); }}
                type="button"
              >
                <PreviewIcon name={node.icon} /><span>{node.label}</span>
              </button>
              <p className={`${styles.flowNodeCaption} ${index === activeIndex ? styles.flowNodeCaptionActive : ''}`}>{node.caption}</p>
            </div>
          );
        })}
      </div>
    </PreviewShell>
  );
}

function ComponentTarget({ type, label, index, highlightedType, onHighlight, onClear, onInteract, className, children }) {
  const firstOfType = miniPageComponentInstances.findIndex((instance) => instance.type === type) === index;

  return (
    <button
      aria-label={`${label} · componente ${type}`}
      className={`${styles.componentTarget} ${className ?? ''}`}
      data-component-type={type}
      data-highlighted={highlightedType === type ? 'true' : undefined}
      onBlur={onClear}
      onClick={() => { onInteract(); onHighlight(type); }}
      onFocus={() => { onInteract(); onHighlight(type); }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClear();
      }}
      onMouseEnter={() => { onInteract(); onHighlight(type); }}
      onMouseLeave={(event) => {
        if (document.activeElement !== event.currentTarget) onClear();
      }}
      tabIndex={firstOfType ? 0 : -1}
      type="button"
    >
      {children}
    </button>
  );
}

function MiniPage({ variant, width, highlightedType, onHighlight, onClear, onInteract }) {
  const targetIndex = (type, key) => miniPageComponentInstances.findIndex((instance) => instance.type === type && instance.key === key);
  const targetProps = { highlightedType, onHighlight, onClear, onInteract };

  return (
    <div className={styles.miniPageContainer} style={{ width: `${width}px` }}>
      <div className={`${styles.miniPage} ${styles[`miniPage-${variant}`]}`}>
        <header className={styles.miniHeader}>
          <ComponentTarget {...targetProps} className={styles.miniLogo} index={targetIndex('logo', 'brand')} label="Logo" type="logo">
            <i /><i /><i />
          </ComponentTarget>
          <nav className={styles.miniNav} aria-hidden="true">
            {miniPageCopy.navigationItems.map((item) => <i key={item} />)}
          </nav>
          <div className={styles.miniMenuIcon} aria-hidden="true"><i /><i /><i /></div>
          <ComponentTarget {...targetProps} className={styles.miniHeaderButton} index={targetIndex('button', 'header-action')} label="Ação do cabeçalho" type="button">
            <i aria-hidden="true">↗</i>
          </ComponentTarget>
        </header>
        <main className={styles.miniMain}>
          <section className={styles.miniHero}>
            <div className={styles.miniHeroCopy}>
              <i className={styles.miniHeroLineLong} /><i className={styles.miniHeroLineMedium} /><i className={styles.miniHeroLineShort} />
              <ComponentTarget {...targetProps} className={styles.miniHeroButton} index={targetIndex('button', 'hero-action')} label="Ação principal" type="button">
                <i aria-hidden="true">↗</i>
              </ComponentTarget>
            </div>
            <ComponentTarget {...targetProps} className={styles.miniHeroImage} index={targetIndex('image', 'hero-image')} label="Imagem principal" type="image">
              <span aria-hidden="true" />
            </ComponentTarget>
          </section>
          <section className={styles.miniCards}>
            {miniPageCopy.cards.map((card, cardIndex) => (
              <ComponentTarget {...targetProps} className={styles.miniCard} index={targetIndex('card', card.key)} key={card.key} label={`Card ${cardIndex + 1}`} type="card">
                <i /><span /><span />
              </ComponentTarget>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

export function ScaledStage({ logicalWidth = miniPageLogicalWidth, logicalMinHeight = 340, className, onClick, children }) {
  const viewportRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !window.ResizeObserver) return undefined;
    const measure = () => setSize({ width: viewport.clientWidth, height: viewport.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  const scale = Math.min(size.width / logicalWidth, size.height / logicalMinHeight);
  const logicalHeight = scale > 0 ? size.height / scale : 0;

  return (
    <div className={`${styles.scaledViewport} ${className ?? ''}`} ref={viewportRef} onClick={onClick}>
      {scale > 0 && logicalHeight > 0 && (
        <div className={styles.scaledStage} style={{ width: logicalWidth, height: logicalHeight, transform: `translateX(-50%) scale(${scale})` }}>
          {children}
        </div>
      )}
    </div>
  );
}

function MiniPageCanvas({ width, variant, highlightedType, onHighlight, onClear, onInteract }) {
  return <MiniPage width={width} variant={variant} highlightedType={highlightedType} onHighlight={onHighlight} onClear={onClear} onInteract={onInteract} />;
}

function InterfacePreview({ shouldReduceMotion, isPresent }) {
  const [variant, setVariant] = useState(shouldReduceMotion ? 'ui' : 'wireframe');
  const [highlightedType, setHighlightedType] = useState(null);
  const counts = miniPageComponentInstances.reduce((result, instance) => ({ ...result, [instance.type]: (result[instance.type] ?? 0) + 1 }), {});
  const intro = useCallback((schedule) => schedule(() => setVariant('ui'), 900), []);
  const finishImmediately = useCallback(() => setVariant('ui'), []);
  const { canvasRef, cancelIntro, hasInteracted } = usePreviewAutoplay({ isPresent, onIntro: intro, onReducedMotion: finishImmediately, shouldReduceMotion });

  useEffect(() => {
    if (!isPresent) cancelIntro();
  }, [cancelIntro, isPresent]);

  const selectVariant = (nextVariant) => {
    cancelIntro();
    setVariant(nextVariant);
    setHighlightedType(null);
  };
  const clearHighlight = () => setHighlightedType(null);
  const caption = highlightedType
    ? interfacePreviewCopy.componentCaption(interfacePreviewCopy.components.find((component) => component.key === highlightedType)?.label, counts[highlightedType])
    : variant === 'wireframe' ? interfacePreviewCopy.wireframeCaption : interfacePreviewCopy.uiCaption;

  const controls = (
    <div className={styles.segmentedControls} role="group" aria-label="Visualização da interface">
      {['wireframe', 'ui'].map((mode) => (
        <button
          aria-pressed={variant === mode}
          className={variant === mode ? styles.controlSelected : ''}
          key={mode}
          onClick={() => selectVariant(mode)}
          onFocus={cancelIntro}
          type="button"
        >
          {mode === 'wireframe' ? 'Wireframe' : 'UI'}
        </button>
      ))}
    </div>
  );

  return (
    <PreviewShell
      ariaLabel="Wireframe e interface"
      canvasRef={canvasRef}
      caption={caption}
      controls={controls}
      hasInteracted={hasInteracted}
      label={interfacePreviewCopy.label}
      onCanvasInteract={cancelIntro}
    >
      <ScaledStage
        logicalWidth={miniPageLogicalWidth}
        onClick={(event) => {
          if (!event.target.closest('[data-component-type]')) clearHighlight();
        }}
      >
        <MiniPageCanvas
          width={miniPageLogicalWidth}
          variant={variant}
          highlightedType={highlightedType}
          onHighlight={setHighlightedType}
          onClear={clearHighlight}
          onInteract={cancelIntro}
        />
      </ScaledStage>
    </PreviewShell>
  );
}

function ResponsivePreview({ shouldReduceMotion, isPresent }) {
  const [preset, setPreset] = useState(responsivePreviewCopy.presets[0]);
  const intro = useCallback((schedule) => {
    schedule(() => setPreset(responsivePreviewCopy.presets[1]), 1400);
    schedule(() => setPreset(responsivePreviewCopy.presets[2]), 2800);
  }, []);
  const finishImmediately = useCallback(() => setPreset(responsivePreviewCopy.presets[0]), []);
  const { canvasRef, cancelIntro, hasInteracted } = usePreviewAutoplay({ isPresent, onIntro: intro, onReducedMotion: finishImmediately, shouldReduceMotion });

  useEffect(() => {
    if (!isPresent) cancelIntro();
  }, [cancelIntro, isPresent]);

  const selectPreset = (nextPreset) => {
    cancelIntro();
    setPreset(nextPreset);
  };
  const controls = (
    <div className={styles.deviceControls} role="group" aria-label="Tamanho do layout">
      {responsivePreviewCopy.presets.map((option) => (
        <button
          aria-label={option.label}
          aria-pressed={preset.key === option.key}
          className={preset.key === option.key ? styles.controlSelected : ''}
          key={option.key}
          onClick={() => selectPreset(option)}
          onFocus={cancelIntro}
          type="button"
        >
          <PreviewIcon name={option.icon} /><span>{option.label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <PreviewShell
      ariaLabel="Layout em três tamanhos de tela"
      canvasRef={canvasRef}
      caption={responsivePreviewCopy.caption(preset)}
      controls={controls}
      hasInteracted={hasInteracted}
      label={responsivePreviewCopy.label}
      onCanvasInteract={cancelIntro}
    >
      <ScaledStage className={styles.responsiveScaledStage} logicalMinHeight={400} logicalWidth={miniPageLogicalWidth}>
        <div className={styles.responsiveDeviceFrame} style={{ width: `${preset.width}px` }}>
          <MiniPage width={preset.width} variant="ui" highlightedType={null} onHighlight={() => {}} onClear={() => {}} onInteract={cancelIntro} />
        </div>
      </ScaledStage>
    </PreviewShell>
  );
}

export default function FigmaPreviewContent({ stage, shouldReduceMotion, isPresent }) {
  if (stage === 'flow') return <FlowPreview shouldReduceMotion={shouldReduceMotion} isPresent={isPresent} />;
  if (stage === 'interface') return <InterfacePreview shouldReduceMotion={shouldReduceMotion} isPresent={isPresent} />;
  return <ResponsivePreview shouldReduceMotion={shouldReduceMotion} isPresent={isPresent} />;
}
