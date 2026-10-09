export function TechnologyProgress({ label, index, total, className, trackClassName, fillClassName, children }) {
  return (
    <div
      aria-label={label}
      aria-valuemax={total}
      aria-valuemin="1"
      aria-valuenow={index + 1}
      className={className}
      role="progressbar"
    >
      {children}
      <i className={trackClassName}><i className={fillClassName} style={{ width: ((index + 1) / total * 100) + '%' }} /></i>
    </div>
  );
}

export function TechnologyPlaybackButton({ className, onClick, onFocus, ariaLabel, title, label, icon }) {
  return (
    <button className={className} type="button" onClick={onClick} onFocus={onFocus} aria-label={ariaLabel} title={title}>
      <span aria-hidden="true">{icon}</span>{label}
    </button>
  );
}

export function TechnologyStorySteps({ items, activeIndex, onSelect, classNames }) {
  return (
    <ol className={classNames.list} aria-label={classNames.label || 'Etapas do processo'}>
      {items.map((item, index) => {
        const status = index === activeIndex ? 'active' : index < activeIndex ? 'complete' : 'next';
        return (
          <li className={[classNames.item, classNames[status]].filter(Boolean).join(' ')} data-stage-status={status} key={item.key || item.label}>
            <button
              aria-current={status === 'active' ? 'step' : undefined}
              className={classNames.button}
              onClick={() => onSelect(item.key ?? index)}
              onKeyDown={(event) => {
                let nextIndex;
                if (event.key === 'ArrowRight') nextIndex = Math.min(index + 1, items.length - 1);
                if (event.key === 'ArrowLeft') nextIndex = Math.max(index - 1, 0);
                if (nextIndex !== undefined) {
                  event.preventDefault();
                  onSelect(items[nextIndex].key ?? nextIndex);
                  event.currentTarget.parentElement?.parentElement?.querySelector('[data-story-step="' + nextIndex + '"]')?.focus();
                }
              }}
              data-story-step={index}
              type="button"
            >
              <span className={classNames.number} aria-hidden="true">0{index + 1}</span>
              <span className={classNames.title}>{item.label}</span>
            </button>
            <p className={classNames.description}>{item.description}</p>
          </li>
        );
      })}
    </ol>
  );
}
