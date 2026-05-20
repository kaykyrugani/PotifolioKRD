import styles from './Card.module.css';

export default function Card({ children, className = '', tone = 'default' }) {
  const classNames = [styles.card, styles[tone], className].filter(Boolean).join(' ');

  return <article className={classNames}>{children}</article>;
}
