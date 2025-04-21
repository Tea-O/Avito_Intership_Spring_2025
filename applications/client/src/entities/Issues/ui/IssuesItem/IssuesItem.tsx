import { IssuesItemProps } from './type';
import { RCard } from '@/shared/ui';
import { CiEdit } from 'react-icons/ci';

export const IssuesItem: React.FC<IssuesItemProps> = (props: IssuesItemProps) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(props);
    }
  };

  return <RCard icon={CiEdit} onClick={handleClick} >{props.title}</RCard>;
};