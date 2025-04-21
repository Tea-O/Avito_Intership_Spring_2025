import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {getTasks, IssuesActions, Tasks, TasksData} from '@entities/Issues';
import {AxiosError} from 'axios';
import {State} from '@shared/types';
import {IssuesView, FilterWindow} from '@features/Issues';
import {RButton, RInput} from '@shared/ui';
import styles from './IssuesPage.module.scss';
import {useSearch} from '@shared/hooks';
import {IoFilterSharp} from "react-icons/io5";
import {LuPlus} from "react-icons/lu";
import {CreateOrUpdateTask} from "@/features/Modal";
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@app/store/storeModale';
import {closeCreateModal} from '@entities/Modal/model/modalSlice';
import {openCreateModal} from "@entities/Modal/model/modalSlice.ts";
import { IoSearchOutline } from "react-icons/io5";

interface Filters {
    priority: {
        low: boolean;
        medium: boolean;
        high: boolean;
    };
    status: {
        backlog: boolean;
        inProgress: boolean;
        done: boolean;
    };
    board: {
        search: string;
    };
}

const loadFilters = (): Filters => {
    const savedFilters = localStorage.getItem('taskFilters');
    if (savedFilters) {
        return JSON.parse(savedFilters);
    }
    return {
        priority: {low: false, medium: false, high: false},
        status: {backlog: false, inProgress: false, done: false},
        board: {search: ''}
    };
};

export const IssuesPage: React.FC = () => {
    const [tasks, setTasks] = useState<Nullable<TasksData>>(null);
    const [state, setState] = useState<State>({loading: false});
    const [searchQuery, setSearchQuery] = useState('');
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<Filters>(loadFilters());
    const [tempFilters, setTempFilters] = useState<Filters>({...appliedFilters});
    const [editingState, setEditingState] = useState<{ task: Nullable<Tasks>, isOpen: boolean }>({
        task: null,
        isOpen: false,
    });

    const dispatch = useDispatch();
    const isCreateModalOpen = useSelector((state: RootState) => state.modal.isCreateModalOpen);


    const handleTaskClick = (task: Tasks) => {
        setEditingState({task, isOpen: true});
    };

    const searchedTasks = useSearch(tasks?.data, searchQuery, (task) => task.title) || [];


    useEffect(() => {
        localStorage.setItem('taskFilters', JSON.stringify(appliedFilters));
    }, [appliedFilters]);

    const fetchTasks = useCallback(async () => {
        setState({loading: true});
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                console.error(err);
            }
        } finally {
            setState({loading: false});
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const filteredTasks = useMemo(() => {
        return searchedTasks.filter(task => {
            const priorityFilter =
                (!appliedFilters.priority.low && !appliedFilters.priority.medium && !appliedFilters.priority.high) ||
                (appliedFilters.priority.low && task.priority === 'Low') ||
                (appliedFilters.priority.medium && task.priority === 'Medium') ||
                (appliedFilters.priority.high && task.priority === 'High');

            const statusFilter =
                (!appliedFilters.status.backlog && !appliedFilters.status.inProgress && !appliedFilters.status.done) ||
                (appliedFilters.status.backlog && task.status === 'Backlog') ||
                (appliedFilters.status.inProgress && task.status === 'InProgress') ||
                (appliedFilters.status.done && task.status === 'Done');

            const boardFilter =
                !appliedFilters.board.search ||
                (task.boardName && task.boardName.toLowerCase().includes(appliedFilters.board.search.toLowerCase()));

            return priorityFilter && statusFilter && boardFilter;
        });
    }, [searchedTasks, appliedFilters]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const toggleFilters = () => {
        setIsFiltersOpen(prev => !prev);
    };

    const handlePriorityChange = (type: keyof typeof tempFilters.priority) => {
        setTempFilters(prev => ({
            ...prev,
            priority: {
                ...prev.priority,
                [type]: !prev.priority[type],
            }
        }));
    };

    const handleStatusChange = (type: keyof typeof tempFilters.status) => {
        setTempFilters(prev => ({
            ...prev,
            status: {
                ...prev.status,
                [type]: !prev.status[type],
            }
        }));
    };

    const handleBoardChange = (searchValue: string) => {
        setTempFilters(prev => ({
            ...prev,
            board: {
                search: searchValue
            }
        }));
    };

    const resetFilters = () => {
        const defaultFilters = {
            priority: {low: false, medium: false, high: false},
            status: {backlog: false, inProgress: false, done: false},
            board: {search: ''}
        };
        setTempFilters(defaultFilters);
        setAppliedFilters(defaultFilters);
    };

    const applyFilters = () => {
        setAppliedFilters(tempFilters);
        setIsFiltersOpen(false);
    };

    const memoizedIssuesList = useMemo(() => (
        <IssuesView
            issues={filteredTasks}
            state={state}
            className={styles['issues-page__view']}
            onTaskClick={handleTaskClick}
        />
    ), [filteredTasks, state]);

    return (
        <div className={styles['issues-page']}>
            <div className={styles['issues-page__inner']}>
                <IssuesActions className={styles['issues-page__filter']}>
                    <div className={styles['filter__wrapper']}>
                        <IoSearchOutline />
                        <RInput placeholder="Поиск" value={searchQuery} onChange={handleSearch}/>
                    </div>
                    
                    <RButton icon={<IoFilterSharp/>} onClick={toggleFilters}>Фильтры</RButton>
                </IssuesActions>

                {memoizedIssuesList}

                <IssuesActions className={styles['issues-page__create']}>
                    <RButton icon={<LuPlus/>} onClick={() => dispatch(openCreateModal())}>
                        Создать задачу
                    </RButton>
                </IssuesActions>
            </div>

            <FilterWindow
                isOpen={isFiltersOpen}
                onClose={toggleFilters}
                filters={tempFilters}
                onPriorityChange={handlePriorityChange}
                onStatusChange={handleStatusChange}
                onBoardChange={handleBoardChange}
                onReset={resetFilters}
                onApply={applyFilters}
            />

            <CreateOrUpdateTask
                isOpen={isCreateModalOpen || editingState.isOpen}
                initialData={editingState.task}
                onClose={() => {
                    dispatch(closeCreateModal());
                    setEditingState({task: null, isOpen: false});
                }}
                onTaskCreated={fetchTasks}
            />
        </div>
    );
};