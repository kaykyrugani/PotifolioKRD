import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './ReactCompositionStory.module.css';
import { TechnologyPlaybackButton, TechnologyProgress, TechnologyStorySteps } from './TechnologyStoryPrimitives';
import sectionStyles from './TechnologyRoles.module.css';

const moments = [
  { title: 'Componentização', description: 'Cada peça da interface nasce como um componente com uma única responsabilidade.', hint: 'Troque a cor do botão base' },
  { title: 'Reutilização', description: 'O mesmo componente atende telas diferentes, sem copiar código.', hint: 'Veja o botão em todo o sistema' },
  { title: 'Estados', description: 'Cada componente cuida do próprio estado; o app só orquestra o que é compartilhado.', hint: 'Clique em Adicionar no app' },
  { title: 'Performance', description: 'Só o que mudou renderiza de novo; o resto permanece intocado.', hint: 'Só dois blocos renderizam' },
  { title: 'Manutenção', description: 'Ajuste em um lugar, atualização em todo o sistema.', hint: 'Troque a cor e veja tudo mudar' },
];
const components = [['Button', 12], ['Input', 10], ['Card', 8], ['Modal', 6], ['Dropdown', 4], ['Tabs', 2]];
const colors = [
  { value: '#19c3ff', label: 'ciano', tone: 'cyan' }, { value: '#4d7bff', label: 'azul', tone: 'blue' },
  { value: '#a06bff', label: 'roxo', tone: 'violet' }, { value: '#2dd4a0', label: 'verde', tone: 'green' },
];

export default function ReactCompositionStory() {
  const diagramRef = useRef(null);
  const storyRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [moment, setMoment] = useState(0);
  const [accent, setAccent] = useState(colors[0].value);
  const [selectedTone, setSelectedTone] = useState('');
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [locked, setLocked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [hasChosenMoment, setHasChosenMoment] = useState(false);
  const activeMoment = reduceMotion && !hasChosenMoment ? 4 : moment;

  useEffect(() => {
    const node = diagramRef.current;
    if (!node || reduceMotion || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !visible || locked || paused || moment >= 4) return undefined;
    const timer = window.setTimeout(() => setMoment((current) => Math.min(current + 1, 4)), 5000);
    return () => window.clearTimeout(timer);
  }, [visible, locked, paused, moment, reduceMotion]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(max-width: 639px)').matches) return;
    const list = storyRef.current?.querySelector('ol');
    const step = list?.querySelector('[data-story-step="' + activeMoment + '"]');
    if (list && step) list.scrollTo({ left: step.offsetLeft - list.offsetLeft, behavior: reduceMotion ? 'instant' : 'smooth' });
  }, [activeMoment, reduceMotion]);

  const stopForInteraction = () => { setLocked(true); setPaused(true); };
  const selectMoment = (next) => {
    stopForInteraction();
    setHasChosenMoment(true);
    setMoment(next);
    setAnnouncement(moments[next].title);
  };
  const repeat = () => { setHasChosenMoment(true); setMoment(0); setAnnouncement(''); setLocked(false); setPaused(false); };
  const pause = () => { setLocked(true); setPaused(true); };
  const showRepeat = paused || activeMoment === 4 || reduceMotion;
  const currentMoment = moments[activeMoment];
  const panelClassName = [sectionStyles.techRoleVisual, sectionStyles.techFigmaVisual, styles.panel].join(' ');
  const headingClassName = [sectionStyles.techFigmaHeading, styles.headerTitle].join(' ');

  return (
    <section className={styles.story} ref={storyRef} aria-label="Como React organiza os componentes">
      <div className={styles.intro}>
        <TechnologyProgress className={[sectionStyles.techFigmaProgress, styles.progress].join(' ')} index={activeMoment} label="Progresso da história React" total={5}>
          <span><b>0{activeMoment + 1}</b> / 05</span>
        </TechnologyProgress>
        <header className={styles.header}>
          <div className={[sectionStyles.techFigmaHeaderMain, styles.headerMain].join(' ')}>
            <span>React</span><h2 className={headingClassName}>React para construir interfaces escaláveis.</h2>
          </div>
          <div className={[sectionStyles.techFigmaHeaderAside, styles.headerAside].join(' ')}>
            <p>Componentes reutilizáveis, estrutura organizada e desenvolvimento preparado para manutenção e evolução.</p>
          </div>
        </header>
      </div>

      <div className={panelClassName}>
        <div className={styles.diagramWrap} ref={diagramRef}>
          <div className={styles.diagram} data-maintenance={activeMoment === 4} style={{ '--ac': accent }} onPointerEnter={stopForInteraction} onFocusCapture={stopForInteraction}>
            <article className={styles.card + ' ' + styles.base + ((activeMoment === 0 || activeMoment === 4) ? ' ' + styles.highlight : '')}>
              <span className={styles.cardLabel}>COMPONENTE BASE</span>
              <button type="button" className={styles.sampleButton} onClick={stopForInteraction}>Button</button>
              <div className={styles.props}><span>variant <b>primary</b></span><span>size <b>md</b></span></div>
              <div className={styles.colorRow}><span>cor</span>{colors.map((color) => <button key={color.value} type="button" aria-label={'Cor ' + color.label} aria-pressed={accent === color.value} onClick={() => { stopForInteraction(); setAccent(color.value); setSelectedTone(color.tone); }} style={{ '--swatch': color.value }} />)}</div>
              <code className={styles.codeSnippet} aria-hidden="true">&lt;Button variant="primary" size="md"{selectedTone ? ' tone="' + selectedTone + '"' : ''} /&gt;</code>
            </article>

            <div className={styles.connector + ' ' + styles.connectorOne + (activeMoment >= 1 ? ' ' + styles.connected : '')} aria-hidden="true"><i /></div>

            <article className={styles.card + ' ' + styles.system + ((activeMoment === 1 || activeMoment === 4) ? ' ' + styles.highlight : '')}>
              <span className={styles.cardLabel}>SISTEMA DE COMPONENTES</span>
              <div className={styles.tileGrid}>{components.map(([name, uses], index) => (
                <div className={styles.tile + (activeMoment >= 1 ? ' ' + styles.tileLit : '')} key={name} style={{ '--tile-delay': (index * 100) + 'ms' }}>
                  <b>{name}</b><span className={styles.mini + (name === 'Button' ? ' ' + styles.miniButton : '')} aria-hidden="true">{name === 'Button' ? <b>Button</b> : <i />}</span><small>&times;{uses}</small>
                </div>
              ))}</div>
            </article>

            <div className={styles.connector + ' ' + styles.connectorTwo + (activeMoment >= 2 ? ' ' + styles.connected : '')} aria-hidden="true"><i /></div>

            <article className={styles.card + ' ' + styles.app + (activeMoment >= 2 ? ' ' + styles.highlight : '')}>
              <span className={styles.cardLabel}>APLICAÇÃO</span>
              <div className={styles.appTop}><i /><b aria-label={count + ' itens adicionados'}>{count}</b></div>
              <button type="button" className={styles.addButton} onClick={() => { stopForInteraction(); setCount((value) => value + 1); }}>Adicionar</button>
              <div className={styles.appRows}>
                {[0, 1, 2, 3].map((row) => <i key={row} className={(count > row ? styles.rowLit : '') + (activeMoment === 3 && row < 2 && !reduceMotion ? ' ' + styles.pulse : '')}><b /> <span /><span /></i>)}
              </div>
              {activeMoment === 3 && <small className={styles.renderCount}>2 de 14 renderizados</small>}
            </article>
          </div>
        </div>
        <div className={styles.controls}>
          <span key={currentMoment.hint} className={styles.hint}>{currentMoment.hint}</span>
          <TechnologyPlaybackButton
            ariaLabel={showRepeat ? 'Repetir animação React' : 'Pausar animação React'}
            className={styles.playbackButton}
            icon={showRepeat ? '\u21bb' : '\u2161'}
            label={showRepeat ? 'Repetir' : 'Pausar'}
            onClick={showRepeat ? repeat : pause}
            title={showRepeat ? 'Repetir' : 'Pausar'}
          />
        </div>
        <TechnologyStorySteps
          activeIndex={activeMoment}
          classNames={{ list: styles.steps, item: '', active: styles.active, button: '', number: '', title: '', description: '', label: 'Momentos da história React' }}
          items={moments.map((item, index) => ({ ...item, key: index, label: item.title }))}
          onSelect={selectMoment}
        />
      </div>
      <span className={styles.live} aria-live="polite" aria-atomic="true">{announcement}</span>
    </section>
  );
}
