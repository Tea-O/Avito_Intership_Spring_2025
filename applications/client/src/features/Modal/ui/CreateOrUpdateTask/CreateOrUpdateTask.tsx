import React, {useEffect, useState} from 'react';
import {RButton, RInput, RSelect, RTextarea} from '@shared/ui';
import styles from './CreateOrUpdateTask.module.scss';
import {CreateOrUpdateTaskProps, priorityOptions, statusOptions, TaskFormData} from "./types.ts";
import {creatTasks, Priority, updateTasks} from "@entities/Issues";
import {AxiosError} from "axios";
import {UsersData} from "@entities/Modal";
import {State} from "@shared/types";
import {getUsers, usersToOptions} from "@entities/Modal/";
import {Portal} from "@shared/ui/Portal";
import {useSelector, useDispatch} from 'react-redux';
import {fetchBoards} from '@entities/Boards/model';
import type {RootState} from "@app/store/store.ts";


export const CreateOrUpdateTask: React.FC<CreateOrUpdateTaskProps> = (props) => {
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        boardName: '',
        boardId: 0,
        description: '',
        priority: '',
        status: '',
        assignee: 0,
    });

    const [users, setUsers] = useState<Nullable<UsersData>>(null);

    const dispatch = useDispatch();
    const boardsState = useSelector((state: RootState) => state.boards);

    useEffect(() => {

        if (props.initialData) {
            setFormData({
                title: props.initialData.title,
                description: props.initialData.description,
                boardName: props.initialData.boardName || '',
                boardId: props.initialData.boardId,
                priority: props.initialData.priority,
                status: props.initialData.status,
                assignee: props.initialData.assignee?.id || 0,
            });
        } else {
            setFormData({
                title: '',
                boardName: '',
                boardId: 0,
                description: '',
                priority: '',
                status: '',
                assignee: 0,
            });
        }
    }, [props.initialData]);

    const fetchUsers = async () => {

        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                console.error(err);
            }
        } finally {

        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (boardsState.data.length === 0 && !boardsState.loading) {
            dispatch(fetchBoards());
        }
    }, [dispatch, boardsState.data.length, boardsState.loading]);


    const handleChange = (field: keyof TaskFormData, value: number | string | Priority) => {
        console.log(field, value);
        setFormData(prev => ({...prev, [field]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (props.initialData) {

            await updateTasks(props.initialData.id, {
                assigneeId: formData.assignee,
                boardId: Number(formData.boardId),
                description: formData.description,
                priority: formData.priority,
                status: formData.status,
                title: formData.title,
            });
        } else {

            await creatTasks({
                assigneeId: formData.assignee,
                boardId: Number(formData.boardId),
                description: formData.description,
                priority: formData.priority,
                title: formData.title,
            });
        }

        props.onClose();
        if (props.onTaskCreated) props.onTaskCreated();
    };

    const userOptions = usersToOptions(users?.data);

    const boardOptions = boardsState.data.map(board => ({
        label: board.name,
        value: board.id,
    }));


    if (!props.isOpen) return null;

    return (
        <Portal>
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h2>{props.initialData ? 'Редактирование задачи' : 'Создание задачи'}</h2>
                        <button className={styles.closeButton} onClick={props.onClose}>×</button>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.taskForm}>
                        <div className={styles.formGroup}>
                            <label>Название</label>
                            <RInput
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                placeholder="Введите название задачи"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Описание</label>
                            <RTextarea
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                placeholder="Введите описание задачи"
                                maxHeight={150}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Проект</label>
                            <RSelect
                                options={boardOptions}
                                value={props.initialData ? props.initialData.boardId : null}
                                onChange={(selectedOption: { value: number, label: string } | null) => {
                                    if (selectedOption) {
                                        setFormData(prev => ({
                                            ...prev,
                                            boardId: selectedOption.value,
                                            boardName: selectedOption.label
                                        }));
                                    }
                                }}
                                placeholder="Выберите проект"
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Приоритет</label>
                                <RSelect
                                    options={priorityOptions}
                                    value={formData.priority}
                                    onChange={(value) => handleChange('priority', value)}
                                    placeholder="Выберите приоритет"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Статус</label>
                                <RSelect
                                    options={statusOptions}
                                    value={formData.status}
                                    onChange={(value) => handleChange('status', value)}
                                    placeholder="Выберите статус"
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Исполнитель</label>
                            <RSelect
                                options={userOptions}
                                value={formData.assignee}
                                onChange={(value) => handleChange('assignee', value)}
                                placeholder="Выберите исполнителя"
                            />
                        </div>

                        <div className={styles.formActions}>
                            <RButton type="submit">
                                {props.initialData ? 'Обновить задачу' : 'Создать задачу'}
                            </RButton>
                        </div>
                    </form>
                </div>
            </div>
        </Portal>
    );
};
