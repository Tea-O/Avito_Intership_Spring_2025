import { Tasks } from '../../type';


export type IssuesItemProps = Tasks & {
    onClick?: (task: Tasks) => void;
};