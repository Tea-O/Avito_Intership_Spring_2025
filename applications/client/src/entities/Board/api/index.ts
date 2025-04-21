import { api } from '@app/providers';
import {TasksData} from "@Issues";
import {Tasks} from "@Issues";

export const getBoardById = async (id: number) => await api.get<TasksData>(`/boards/${id}`);

export const updateTaskStatusById = async (taskId: number) => await api.put<Tasks>(`/tasks/updateStatus/${taskId}`);