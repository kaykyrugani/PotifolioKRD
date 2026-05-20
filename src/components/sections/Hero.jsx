import { whatsappPath } from '../../utils/contact';
import heroImage from '../../assets/images/ImgHero.png';
import Button from '../ui/Button';
import styles from './Hero.module.css';

const quickBenefits = [
  {
    title: 'Sites rápidos',
    description: 'alta performance',
  },
  {
    title: 'Design moderno',
    description: 'visual responsivo',
  },
  {
    title: 'SEO técnico',
    description: 'estrutura otimizada',
  },
  {
    title: 'Foco em resultados',
    description: 'conversão e clareza',
  },
];

const floatingBadges = [
  'Alta Performance',
  'SEO Técnico',
  'Responsivo',
  'Conversão',
  'React',
  'Sites Premium',
];

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>DARK TECH PREMIUM PARA PRESENÇA DIGITAL</p>
          <h1 className={styles.heroTitle}>
            Crio sites que transformam visitantes em <span>clientes</span>
          </h1>
        </div>

        <div className={styles.heroTextBlock}>
          <p className={styles.subtitle}>
            Desenvolvimento de sites institucionais e landing pages rápidas, modernas e otimizadas para SEO, performance e conversão.
          </p>
          <div className={styles.actions}>
            <Button to={whatsappPath}>Chamar no WhatsApp</Button>
            <Button to="/projetos" variant="secondary">Ver projetos</Button>
          </div>
        </div>

        <div className={styles.heroImageArea} aria-hidden="true">
          <img src={heroImage} alt="" loading="eager" />
        </div>

        <div className={styles.floatingBadges} aria-hidden="true">
          {floatingBadges.map((badge) => (
            <span key={badge} className={styles.floatingBadge}>
              {badge}
            </span>
          ))}
        </div>

        <ul className={styles.quickBenefits} aria-label="Benefícios rápidos">
          {quickBenefits.map((benefit) => (
            <li key={benefit.title}>
              <span className={styles.benefitIcon} aria-hidden="true" />
              <strong>{benefit.title}</strong>
              <small>{benefit.description}</small>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
