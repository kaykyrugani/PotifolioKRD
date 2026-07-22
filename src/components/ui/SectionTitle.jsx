import Badge from './Badge';
import styles from './SectionTitle.module.css';

export default function SectionTitle({
  eyebrow,
  title,
  description,
  as: Heading = 'h1',
  align = 'center',
  className = '',
  eyebrowClassName = '',
  titleClassName = '',
  descriptionClassName = '',
}) {
  const classNames = [styles.header, styles[align], className].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {eyebrow && <Badge className={eyebrowClassName}>{eyebrow}</Badge>}
      <Heading className={titleClassName}>{title}</Heading>
      {description && <p className={descriptionClassName}>{description}</p>}
    </div>
  );
}
