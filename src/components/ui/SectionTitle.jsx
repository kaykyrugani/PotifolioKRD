import Badge from './Badge';
import styles from './SectionTitle.module.css';

export default function SectionTitle({ eyebrow, title, description, align = 'center', className = '' }) {
  const classNames = [styles.header, styles[align], className].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
