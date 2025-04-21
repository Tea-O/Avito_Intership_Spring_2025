import { api } from '@app/providers';
import {UsersData} from "../type";

export const getUsers = async () => await api.get<UsersData>('/users');