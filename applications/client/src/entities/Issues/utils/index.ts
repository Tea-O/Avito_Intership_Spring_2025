import {TasksData} from "../type";

/**
 * Находит задачи, содержащие в названии указанную подстроку (без учета регистра)
 * @param {TasksData} tasks - Объект с данными задач
 * @param {string} name - Строка для поиска
 * @returns {Tasks[]} Массив найденных задач или пустой массив, если ничего не найдено
 */
export function findTask(tasks: TasksData, name: string) {
    if (!tasks?.data) return [];
    if (!name.trim()) return tasks.data;
    const normalizedSearch = name.trim().toLowerCase();
    return tasks.data.filter(task =>
        task.title?.toLowerCase().includes(normalizedSearch)
    );
}

