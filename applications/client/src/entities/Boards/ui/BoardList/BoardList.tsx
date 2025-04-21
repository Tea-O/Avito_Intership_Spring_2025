import { BoardListProps } from './types';

export const BoardList: React.FC<BoardListProps> = (props: BoardListProps) => {
  return <section className={props.className}>{props.children}</section>;
};
