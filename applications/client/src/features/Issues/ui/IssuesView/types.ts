import { State } from '@shared/types';
import { Tasks } from '@entities/Issues';

export type IssuesViewProps = {
  issues: Tasks[];
  state: State;
  className?: string;
  onTaskClick?: (task: Tasks) => void;
};
