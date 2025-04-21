import clsx from 'clsx';
import { RInputProps } from './types.ts';
import styles from './RInput.module.scss';

export const RInput = (props: RInputProps) => {
  return <input {...props} className={clsx(styles['r-input'], props.className)} />;
};
