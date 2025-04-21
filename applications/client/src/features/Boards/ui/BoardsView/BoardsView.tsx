import { BoardItem, BoardList } from '@/entities/Boards';
import type { BoardsViewProps } from './types';
import styles from './BoardsView.module.scss';

export const BoardsView: React.FC<BoardsViewProps> = (props: BoardsViewProps) => {
  return (
    <section className={styles['board-view']}>
      <div className={styles['board-view__inner']}>
        {props.state.loading && <div>Loading...</div>}
        {!props.state.loading && !props.state.error && (
          <BoardList className={styles['board-view__list']}>
            {props.boards.map((board) => (
              <BoardItem key={board.id} {...board} />
            ))}
          </BoardList>
        )}
      </div>
    </section>
  );
};
