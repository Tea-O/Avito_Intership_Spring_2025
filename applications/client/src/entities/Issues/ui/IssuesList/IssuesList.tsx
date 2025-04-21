import { IssuesListProps } from './types';

export const IssuesList: React.FC<IssuesListProps> = (props: IssuesListProps) => {
  return <section className={props.className}>{props.children}</section>;
};
