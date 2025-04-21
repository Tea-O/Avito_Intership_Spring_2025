import styles from './RLayout.module.scss';
import { Outlet } from 'react-router-dom';
import { RHeader } from '../RHeader';

export const RLayout: React.FC = () => {
  return (
    <div className={styles['r-layout']}>
      <div className={styles['r-layout__inner']}>
        <RHeader />
        <main className={styles['r-layout__main']}>
          <main className={styles['r-layout__content']}>
            <Outlet />
          </main>
        </main>
      </div>
    </div>
  );
};
