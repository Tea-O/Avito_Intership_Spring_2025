import type {Issue} from '@entities/Issues';

export type BoardViewProps = {
    title: string;
    issues: Issue[];
    droppableId: string;
    onTaskClick: (issue: Issue) => void;
};