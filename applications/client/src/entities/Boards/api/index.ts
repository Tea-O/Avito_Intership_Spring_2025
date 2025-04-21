import { api } from '@app/providers';
import type { BoardsData } from '../types';

export const getBoards = async () => await api.get<BoardsData>('/boards');
