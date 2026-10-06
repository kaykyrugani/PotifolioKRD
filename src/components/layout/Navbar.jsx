import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import compactLogo from '../../assets/logos/logoKRD2semFndo.webp';
import lockupLogo from '../../assets/logos/logoKRD1semFundo-trim.webp';
import { navItems } from '../../data/siteContent';
import styles from './Navbar.module.css';

const visibleNavItems = navItems.filter(({ label }) => label !== 'Home' && label !== 'Tecnologias');
const leftItems = visibleNavItems.slice(0, 2);
const rightItems = visibleNavItems.slice(2);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [hasNavLinkFocus, setHasNavLinkFocus] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const scrollStateRef = useRef(false);
  const frameRef = useRef(null);

  useEffect(() => {
    const updateScrollState = () => {
      const y = window.scrollY;
      if (!scrollStateRef.current && y > 48) scrollStateRef.current = true;
      else if (scrollStateRef.current && y < 16) scrollStateRef.current = false;
      setIsScrolled(scrollStateRef.current);
      frameRef.current = null;
    };
    const onScroll = () => {
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const header = headerRef.current;
    const getFocusable = () => [...header.querySelectorAll('a[href], button:not([disabled])')]
      .filter((element) => element.getClientRects().length > 0);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const getLinkClass = ({ isActive }) => [styles.link, isActive ? styles.active : ''].filter(Boolean).join(' ');
  const renderLinks = (items) => items.map((item) => (
    <NavLink key={item.path} to={item.path} className={getLinkClass} onClick={closeMenu}>
      {item.label}
    </NavLink>
  ));

  return (
    <header
      ref={headerRef}
      className={styles.header}
      data-state={isScrolled || hasFocus || isOpen ? 'scrolled' : 'top'}
      onFocusCapture={(event) => {
        setHasFocus(true);
        if (event.target.classList.contains(styles.link)) setHasNavLinkFocus(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setHasFocus(false);
          setHasNavLinkFocus(false);
        } else {
          setHasNavLinkFocus(event.relatedTarget?.classList?.contains(styles.link) ?? false);
        }
      }}
    >
      <nav className={styles.nav} aria-label="Principal" data-open={isOpen} data-link-focus={hasNavLinkFocus}>
        <NavLink className={styles.brand} to="/" onClick={closeMenu} aria-label="KRD Dev, página inicial">
          <img className={styles.lockupLogo} src={lockupLogo} alt="" width="950" height="475" />
          <img className={styles.compactLogo} src={compactLogo} alt="" width="776" height="394" aria-hidden="true" />
        </NavLink>

        <div className={styles.menuGroups} id="primary-menu">
          <div className={`${styles.menuGroup} ${styles.menuLeft}`}>{renderLinks(leftItems)}</div>
          <div className={`${styles.menuGroup} ${styles.menuRight}`}>{renderLinks(rightItems)}</div>
        </div>

        <button
          ref={menuButtonRef}
          className={styles.menuButton}
          type="button"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
          aria-controls="primary-menu"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

      </nav>
    </header>
  );
}
