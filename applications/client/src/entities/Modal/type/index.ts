export interface Users {
    id: number;
    fullName: string;
    email: string;
    description: string;
    avatarUrl: string;
    teamId: number;
    teamName: string;
    tasksCount: number;
}

export interface UsersData {
    data: Users[];
}

export interface UserSelectOption {
    value: number;
    label: string;
    userData: Users;
}