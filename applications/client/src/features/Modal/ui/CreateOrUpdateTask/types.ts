import {Priority} from "@entities/Issues";
import {Tasks} from "@entities/Issues";

export interface TaskFormData {
    title: string;
    status: string;
    description: string;
    boardId: number;
    boardName: string;
    priority: string;
    assignee: number;

}

export interface TaskFormData extends Omit<Tasks, 'id' | 'assignee'> {
    assignee: number;
}

export interface CreateOrUpdateTaskProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: TaskFormData | Tasks;
    onSubmit: (data: TaskFormData) => void;
    onTaskCreated?: () => void;
}

export const priorityOptions = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' }
];

export const statusOptions = [
    { value: 'Backlog', label: 'Backlog' },
    { value: 'InProgress', label: 'In Progress' },
    { value: 'Done', label: 'Done' }
];