import {BoardItemProps} from './type';
import {RCard} from '@/shared/ui';
import {FiExternalLink} from "react-icons/fi";
import {useNavigate} from 'react-router-dom';

export const BoardItem: React.FC<BoardItemProps> = (props: BoardItemProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/board/${props.id}`);
    };

    return <RCard icon={FiExternalLink} onClick={handleClick}>{props.name}</RCard>;
};