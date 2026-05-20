import { Link } from 'react-router-dom';
import { navItems, services, technologies } from '../../data/siteContent';
import { whatsappLabel } from '../../utils/contact';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>KR</span>
          <h2>Kayky Rugani Dev</h2>
          <p>Portfólio profissional focado em interfaces modernas, performance e conversão.</p>
        </div>

        <div className={styles.columns}>
          <div>
            <h3>Navegação</h3>
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>{item.label}</Link>
            ))}
          </div>
          <div>
            <h3>Serviços</h3>
            {services.map((service) => (
              <Link key={service.title} to="/servicos">{service.title}</Link>
            ))}
          </div>
          <div>
            <h3>Tecnologias</h3>
            {technologies.slice(0, 5).map((tech) => (
              <Link key={tech} to="/tecnologias">{tech}</Link>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Kayky Rugani Dev.</span>
          <span>WhatsApp: {whatsappLabel}</span>
        </div>
      </div>
    </footer>
  );
}
