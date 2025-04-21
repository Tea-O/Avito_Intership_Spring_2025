import { RCheckboxProps } from './types.ts';
import styles from './RCheckbox.module.scss';

export const RCheckbox = ({
                            checked,
                            onChange,
                            disabled = false,
                            className = '',
                            ...props
                          }: RCheckboxProps) => {
  return (
      <label className={`${styles['r-checkbox']} ${className}`}>
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className={styles['r-checkbox__input']}
            {...props}
        />
        <span className={styles['r-checkbox__checkmark']}></span>
      </label>
  );
};
