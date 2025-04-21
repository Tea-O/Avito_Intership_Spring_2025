import { api } from '@app/providers';
import {CreatTasks, TasksData, UpdateTasks} from "../type";


export const getTasks = async () => await api.get<TasksData>('/tasks');

export const creatTasks = async (payload: CreatTasks) => await api.post('/tasks/create', payload);

export const updateTasks = async (taskId: number, payload: UpdateTasks) => await api.put(`/tasks/update/${taskId}`, payload);

export const getTasksById = async (taskId: number) => await api.get<TasksData>(`/tasks/${taskId}`);