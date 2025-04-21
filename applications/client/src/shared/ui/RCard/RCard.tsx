import { RCardProps } from './types.ts';
import styles from './RCard.module.scss';
import clsx from 'clsx';

export const RCard = (props: RCardProps) => {
    const { icon: Icon, children, onClick, className } = props;

    return (
        <div
            className={clsx(styles['r-card'], className)}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
        >
            <div className={styles['r-card__inner']}>
                {children}
            </div>
            
            {Icon && (
                    <div className={styles['r-card__icon']}>
                        <Icon />
                    </div>
                )}
        </div>
    );
};
