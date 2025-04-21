import {useParams} from 'react-router-dom';
import styles from './BoardPage.module.scss';
import {getBoardById} from '@entities/Board';
import {BoardView} from "@features/Board";
import {useCallback, useEffect, useMemo, useState} from 'react';
import {AxiosError} from "axios";
import {State} from "@shared/types";
import {Tasks, TasksData} from "@entities/Issues";
import {CreateOrUpdateTask} from "@/features/Modal";
import {DragDropContext, Droppable, Draggable, DropResult} from '@hello-pangea/dnd';
import {updateTaskStatusById} from '@entities/Board';
import {useDispatch, useSelector} from "react-redux";
import {openCreateModal, closeCreateModal} from '@entities/Modal/model/modalSlice';
import {RootState} from "@reduxjs/toolkit/query";

export const BoardPage: React.FC = () => {
    const {id} = useParams();
    const [board, setBoard] = useState<TasksData>({data: []});
    const [state, setState] = useState<State>({loading: false, error: null});
    const dispatch = useDispatch();
    const isCreateModalOpen = useSelector((state: RootState) => state.modal.isCreateModalOpen);
    const [editingState, setEditingState] = useState<{ task: Nullable<Tasks>, isOpen: boolean }>({
        task: null,
        isOpen: false,
    });
    const boards = useSelector((state: RootState) => state.boards.data);

    const currentBoard = useMemo(() => {
        const boardId = Number(id);
        return isNaN(boardId)
            ? null
            : boards.find(board => board.id === boardId);
    }, [boards, id]);

    const handleDragEnd = async (result: DropResult) => {
        const {destination, source, draggableId} = result;

        if (!destination || destination.droppableId === source.droppableId) return;

        const newStatusMap: Record<string, string> = {
            todo: 'Backlog',
            in_progress: 'InProgress',
            done: 'Done',
        };

        try {
            const newStatus = newStatusMap[destination.droppableId];
            await updateTaskStatusById(Number(draggableId), newStatus);
            await fetchBoardData();
        } catch (error) {
            console.error('Ошибка при обновлении статуса', error);
        }
    };

    const fetchBoardData = useCallback(async () => {
        setState({loading: true});
        try {
            const response = await getBoardById(id);
            setBoard(response.data);
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                console.error(err);
                setState({error: 'Ошибка при загрузке доски'});
            }
        } finally {
            setState({loading: false});
        }
    }, [id]);

    useEffect(() => {
        fetchBoardData();
    }, [fetchBoardData]);

    const handleTaskClick = (task: Tasks) => {
        setEditingState({
            task: {
                ...task,
                boardId: currentBoard?.id || 0,
                boardName: currentBoard?.name || ''
            },
            isOpen: true
        });
    };

    const grouped = useMemo(() => {
        const tasks = board?.data || [];
        return {
            todo: tasks.filter((task) => task.status === "Backlog"),
            in_progress: tasks.filter((task) => task.status === 'InProgress'),
            done: tasks.filter((task) => task.status === 'Done'),
        };
    }, [board]);

    if (state.loading) return <div>Загрузка...</div>;
    if (state.error) return <div>{state.error}</div>;

    return (
        <div className={styles['board-page']}>
            <h2 className={styles['board-page__title']}>{currentBoard?.name || `Доска #${id}`}</h2>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className={styles['board-page__columns']}>
                    {['todo', 'in_progress', 'done'].map((statusKey) => (
                        <Droppable droppableId={statusKey} key={statusKey}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={styles['board-page__column']}
                                >
                                    <BoardView
                                        title={
                                            statusKey === 'todo' ? 'To Do'
                                                : statusKey === 'in_progress' ? 'In Progress'
                                                    : 'Done'
                                        }
                                        issues={grouped[statusKey]}
                                        onTaskClick={handleTaskClick}
                                        renderTask={(task, index) => (
                                            <Draggable draggableId={String(task.id)} index={index} key={task.id}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <div onClick={() => handleTaskClick(task)}>
                                                            {task.title}
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )}
                                    />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>

            <CreateOrUpdateTask
                isOpen={isCreateModalOpen || editingState.isOpen}
                initialData={editingState.task}
                onClose={() => {
                    dispatch(closeCreateModal());
                    setEditingState({task: null, isOpen: false});
                }}
                onTaskCreated={fetchBoardData}
            />
        </div>
    );
};
