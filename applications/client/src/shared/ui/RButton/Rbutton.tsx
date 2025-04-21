import { RButtonProps } from './types.ts';
import styles from './RButton.module.scss';

export const RButton = ({ icon, children, ...props }: RButtonProps) => {
  return (
      <button {...props} className={styles['r-button']}>
        {icon && <span className={styles['r-button__icon']}>{icon}</span>}
        {children}
      </button>
  );
};