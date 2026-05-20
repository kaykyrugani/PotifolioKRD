import { Link } from 'react-router-dom';
import styles from './Button.module.css';

export default function Button({ children, href, to, variant = 'primary', className = '', ...props }) {
  const classNames = [styles.button, styles[variant], className].filter(Boolean).join(' ');

  if (to) {
    return (
      <Link className={classNames} to={to} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={classNames} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classNames} type="button" {...props}>
      {children}
    </button>
  );
}
