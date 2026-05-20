import styles from './Container.module.css';

export default function Container({ children, size = 'default', className = '' }) {
  const classNames = [styles.container, styles[size], className].filter(Boolean).join(' ');

  return <div className={classNames}>{children}</div>;
}
