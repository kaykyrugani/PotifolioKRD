import { Link } from 'react-router-dom';
import { navItems, services, technologies } from '../../data/siteContent';
import logoKrd from '../../assets/logos/logoKRD1semFundo.png';
import { whatsappLabel, whatsappPath } from '../../utils/contact';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <svg className={styles.orbit} viewBox="0 0 520 360" aria-hidden="true">
        <circle cx="270" cy="178" r="118" />
        <circle cx="270" cy="178" r="76" />
        <path d="M74 226c72-66 142-99 210-99 58 0 106 18 144 54" />
        <path d="M446 132c-72 66-142 99-210 99-58 0-106-18-144-54" />
        <line x1="162" y1="108" x2="376" y2="254" />
        <line x1="392" y1="118" x2="144" y2="244" />
        <circle cx="162" cy="108" r="5" />
        <circle cx="392" cy="118" r="5" />
        <circle cx="376" cy="254" r="5" />
        <circle cx="144" cy="244" r="5" />
      </svg>

      <div className={styles.inner}>
        <div className={styles.signatureGrid}>
          <section className={`${styles.panel} ${styles.leftPanel}`} aria-labelledby="footer-navigation">
            <span className={styles.eyebrow}>Navegação</span>
            <h2 id="footer-navigation">Caminhos principais</h2>
            <p>Uma estrutura enxuta para navegar pelo projeto, serviços, tecnologias e contato.</p>
            <nav className={styles.linkList} aria-label="Links do rodapé">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>{item.label}</Link>
            ))}
            </nav>
          </section>

          <div className={styles.logoCore} aria-label="Assinatura Kayky Rugani Dev">
            <svg className={styles.logoOrbit} viewBox="0 0 240 240" aria-hidden="true">
              <defs>
                <linearGradient id="footerOrbitGradient" x1="0" y1="0" x2="240" y2="240">
                  <stop offset="0%" stopColor="#00C2FF" />
                  <stop offset="55%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
              <circle cx="120" cy="120" r="94" />
              <circle cx="120" cy="120" r="62" />
              <path d="M38 120a82 82 0 0 1 82-82" />
              <path d="M202 120a82 82 0 0 1-82 82" />
              <path d="M62 78a82 82 0 0 1 116-10" />
              <circle cx="52" cy="88" r="5" />
              <circle cx="188" cy="154" r="5" />
              <circle cx="122" cy="38" r="4" />
            </svg>
            <div className={styles.logoPortal}>
              <img className={styles.footerLogo} src={logoKrd} alt="Kayky Rugani Dev" />
            </div>
          </div>

          <section className={`${styles.panel} ${styles.rightPanel}`} aria-labelledby="footer-services">
            <span className={styles.eyebrow}>Entrega técnica</span>
            <h2 id="footer-services">Design, código e presença digital</h2>
            <div className={styles.stack}>
              <div>
                <h3>Serviços</h3>
                <div className={styles.linkList}>
                  {services.map((service) => (
                    <Link key={service.title} to="/servicos">{service.title}</Link>
                  ))}
                </div>
              </div>

              <div>
                <h3>Stack</h3>
                <div className={styles.tags}>
                  {technologies.slice(0, 6).map((tech) => (
                    <Link key={tech} to="/tecnologias">{tech}</Link>
                  ))}
                </div>
              </div>
            </div>
            <Link className={styles.contactLink} to={whatsappPath}>
              WhatsApp: {whatsappLabel}
            </Link>
          </section>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Kayky Rugani Dev.</span>
          <span>Assinatura visual e desenvolvimento autoral.</span>
        </div>
      </div>
    </footer>
  );
}
