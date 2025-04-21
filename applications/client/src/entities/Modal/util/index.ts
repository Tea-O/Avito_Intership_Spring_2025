import {Users} from "@entities/Modal";

export const usersToOptions = (users: Users[] | undefined) => {
    if (!users) return [];

    return users.map(user => ({
        value: user.id,
        label: user.fullName,
        userData: user
    }));
};