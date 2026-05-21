import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../../data/siteContent';
import { whatsappLabel, whatsappPath } from '../../utils/contact';
import Button from '../ui/Button';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);
  const getLinkClass = ({ isActive }) => [styles.link, isActive ? styles.active : ''].filter(Boolean).join(' ');

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : ''}`} aria-label="Navegação principal">
        <NavLink className={styles.brand} to="/" onClick={closeMenu}>
          <span className={styles.brandMark}>KR</span>
          <span>
            <strong>Kayky Rugani</strong>
            <small>Dev</small>
          </span>
        </NavLink>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'} className={getLinkClass} onClick={closeMenu}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <Button to={whatsappPath} variant="primary" className={styles.cta}>
          Chamar no WhatsApp
          <span>{whatsappLabel}</span>
        </Button>
      </nav>
    </header>
  );
}
