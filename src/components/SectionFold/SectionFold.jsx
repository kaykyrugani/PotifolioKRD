import { forwardRef } from 'react';
import styles from './SectionFold.module.css';

const variantClasses = {
  bottom: styles.bottom,
  top: styles.top,
};

const SectionFold = forwardRef(function SectionFold(
  {
    as: Component = 'section',
    variant = 'bottom',
    className = '',
    children,
    ...props
  },
  ref,
) {
  const variantClassName = variantClasses[variant] || variantClasses.bottom;
  const foldClassName = [styles.fold, variantClassName, className].filter(Boolean).join(' ');

  return (
    <Component className={foldClassName} ref={ref} {...props}>
      {children}
    </Component>
  );
});

export default SectionFold;
