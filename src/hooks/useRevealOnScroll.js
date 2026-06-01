import { useCallback, useEffect, useRef, useState } from 'react';

const intentKeys = new Set(['ArrowDown', 'PageDown', 'End']);

export function useRevealOnScroll({
  sectionKeys = [],
  itemKeys = [],
  styles,
  debugLabel,
}) {
  const sectionRefs = useRef({});
  const revealItemRefs = useRef({});
  const visibleSectionsRef = useRef(new Set());
  const visibleRevealItemsRef = useRef(new Set());
  const hasUserIntentRef = useRef(false);
  const pendingFrameRef = useRef(0);
  const [visibleSections, setVisibleSections] = useState(() => new Set());
  const [visibleRevealItems, setVisibleRevealItems] = useState(() => new Set());
  const shouldDebug = Boolean(debugLabel) && import.meta.env.DEV;

  const debugLog = useCallback((message, ...args) => {
    if (!shouldDebug) {
      return;
    }

    console.log(`[${debugLabel} reveal${message}]`, ...args);
  }, [debugLabel, shouldDebug]);

  const debugBlocked = useCallback((type, key, source) => {
    if (!shouldDebug) {
      return;
    }

    console.warn(`[${debugLabel} reveal ${type} blocked]`, key, source);
    console.trace();
  }, [debugLabel, shouldDebug]);

  const setRevealSectionRef = useCallback((sectionKey, node) => {
    if (node) {
      sectionRefs.current[sectionKey] = node;
      return;
    }

    delete sectionRefs.current[sectionKey];
  }, []);

  const setRevealItemRef = useCallback((itemKey, node) => {
    if (node) {
      revealItemRefs.current[itemKey] = node;
      return;
    }

    delete revealItemRefs.current[itemKey];
  }, []);

  const markSectionVisible = useCallback((sectionKey, source) => {
    if (visibleSectionsRef.current.has(sectionKey)) {
      return;
    }

    if (source !== 'reducedMotion' && !hasUserIntentRef.current) {
      debugBlocked('section', sectionKey, source);
      return;
    }

    debugLog(' section', sectionKey);

    const nextVisibleSections = new Set(visibleSectionsRef.current);
    nextVisibleSections.add(sectionKey);
    visibleSectionsRef.current = nextVisibleSections;
    setVisibleSections(nextVisibleSections);
  }, [debugBlocked, debugLog]);

  const markRevealItemVisible = useCallback((itemKey, source) => {
    if (visibleRevealItemsRef.current.has(itemKey)) {
      return;
    }

    if (source !== 'user' || !hasUserIntentRef.current) {
      debugBlocked('item', itemKey, source);
      return;
    }

    debugLog(' item', itemKey);

    const nextVisibleRevealItems = new Set(visibleRevealItemsRef.current);
    nextVisibleRevealItems.add(itemKey);
    visibleRevealItemsRef.current = nextVisibleRevealItems;
    setVisibleRevealItems(nextVisibleRevealItems);
  }, [debugBlocked, debugLog]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      debugLog('', 'reduced motion active');
      return undefined;
    }

    let handleScroll;
    let handleResize;
    let handleUserIntent;
    let handleKeyDownIntent;

    const removeListeners = () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleUserIntent);
      window.removeEventListener('touchmove', handleUserIntent);
      window.removeEventListener('keydown', handleKeyDownIntent);

      if (pendingFrameRef.current) {
        window.cancelAnimationFrame(pendingFrameRef.current);
        pendingFrameRef.current = 0;
      }
    };

    const checkSectionsVisibility = () => {
      if (!hasUserIntentRef.current) {
        return;
      }

      const activationLine = window.innerHeight * 0.68;
      const itemActivationLine = window.innerHeight * 0.78;

      sectionKeys.forEach((sectionKey) => {
        if (visibleSectionsRef.current.has(sectionKey)) {
          return;
        }

        const node = sectionRefs.current[sectionKey];

        if (!node) {
          return;
        }

        const rect = node.getBoundingClientRect();

        if (rect.top <= activationLine && rect.bottom >= 0) {
          markSectionVisible(sectionKey, 'user');
        }
      });

      itemKeys.forEach((itemKey) => {
        if (visibleRevealItemsRef.current.has(itemKey)) {
          return;
        }

        const node = revealItemRefs.current[itemKey];

        if (!node) {
          return;
        }

        const rect = node.getBoundingClientRect();

        if (rect.top <= itemActivationLine && rect.bottom >= 0) {
          markRevealItemVisible(itemKey, 'user');
        }
      });

      if (
        visibleSectionsRef.current.size >= sectionKeys.length
        && visibleRevealItemsRef.current.size >= itemKeys.length
      ) {
        removeListeners();
      }
    };

    const scheduleVisibilityCheck = () => {
      if (pendingFrameRef.current) {
        return;
      }

      pendingFrameRef.current = window.requestAnimationFrame(() => {
        pendingFrameRef.current = 0;
        checkSectionsVisibility();
      });
    };

    const markUserIntent = () => {
      if (hasUserIntentRef.current) {
        return;
      }

      hasUserIntentRef.current = true;
      debugLog(' intent');
      scheduleVisibilityCheck();
    };

    handleUserIntent = () => {
      markUserIntent();
    };

    handleKeyDownIntent = (event) => {
      if (!intentKeys.has(event.key) && event.key !== ' ' && event.code !== 'Space') {
        return;
      }

      markUserIntent();
    };

    handleScroll = () => {
      if (!hasUserIntentRef.current) {
        return;
      }

      scheduleVisibilityCheck();
    };

    handleResize = () => {
      if (!hasUserIntentRef.current) {
        return;
      }

      scheduleVisibilityCheck();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('wheel', handleUserIntent, { passive: true });
    window.addEventListener('touchmove', handleUserIntent, { passive: true });
    window.addEventListener('keydown', handleKeyDownIntent);

    return removeListeners;
  }, [debugLog, itemKeys, markRevealItemVisible, markSectionVisible, sectionKeys]);

  const getRevealSectionClassName = useCallback((baseClassName, sectionKey) => (
    [
      baseClassName,
      styles.revealSection,
      visibleSections.has(sectionKey) ? styles.revealSectionVisible : '',
    ].filter(Boolean).join(' ')
  ), [styles, visibleSections]);

  const getRevealItemClassName = useCallback((baseClassName, itemKey) => (
    [
      baseClassName,
      styles.revealItem,
      visibleRevealItems.has(itemKey) ? styles.revealItemVisible : '',
    ].filter(Boolean).join(' ')
  ), [styles, visibleRevealItems]);

  return {
    setRevealSectionRef,
    getRevealSectionClassName,
    setRevealItemRef,
    getRevealItemClassName,
  };
}
