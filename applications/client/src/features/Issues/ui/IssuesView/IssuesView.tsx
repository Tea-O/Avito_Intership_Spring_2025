import { IssuesList, IssuesItem } from '@/entities/Issues';
import type { IssuesViewProps } from './types';
import styles from './IssuesView.module.scss';
import clsx from 'clsx';

export const IssuesView: React.FC<IssuesViewProps> = (props: IssuesViewProps) => {
    return (
        <section className={styles['issues-view']}>
            <div className={styles['issues-view__inner']}>
                <div className={clsx(styles['issues-view__list'], props.className)}>
                    {props.state.loading && <div>Loading...</div>}
                    {!props.state.loading && !props.state.error && (
                        <IssuesList className={styles['issues-view__list']}>
                            {props.issues.map((issue) => (
                                <IssuesItem
                                    key={issue.id}
                                    {...issue}
                                    onClick={props.onTaskClick}
                                />
                            ))}
                        </IssuesList>
                    )}
                </div>
            </div>
        </section>
    );
};
