import { Status } from "@entities/Issues";
import { Priority } from "@entities/Issues";

export interface FilterWindowProps {
    isOpen: boolean;
    onClose: () => void;
    filters: {
        priority: {
            low: boolean;
            medium: boolean;
            high: boolean;
        };
        status: {
            backlog: boolean;
            inProgress: boolean;
            done: boolean;
        };
        board: {
            search: string;
        };
    };
    onPriorityChange: (type: 'low' | 'medium' | 'high') => void;
    onStatusChange: (type: 'backlog' | 'inProgress' | 'done') => void;
    onBoardChange: (searchValue: string) => void;
    onReset: () => void;
    onApply: () => void;
}
