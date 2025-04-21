import { State } from '@shared/types';
import { Board } from '@entities/Boards';

export type BoardsViewProps = {
  boards: Board[];
  state: State;
};
