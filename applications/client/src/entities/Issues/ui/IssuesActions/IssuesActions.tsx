import clsx from 'clsx';
import styles from './IssuesActions.module.scss';
import { IssuesActionsProps } from './type';

export const IssuesActions: React.FC<IssuesActionsProps> = (props) => {
  return (
    <div className={styles['issues-actions']}>
      <div className={styles['issues-actions__inner']}>
        <div className={clsx(styles['issues-actions__actions'], props.className)}>{props.children}</div>
      </div>
    </div>
  );
};
