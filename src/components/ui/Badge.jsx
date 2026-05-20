import styles from './Badge.module.css';

export default function Badge({ children, className = '' }) {
  const classNames = [styles.badge, className].filter(Boolean).join(' ');

  return <span className={classNames}>{children}</span>;
}
