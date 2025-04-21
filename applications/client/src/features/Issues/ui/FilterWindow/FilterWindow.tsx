import React from 'react';
import {RButton, RCheckbox, RInput} from '@shared/ui';
import {IoClose} from "react-icons/io5";
import styles from './FilterWindow.module.scss';
import {FilterWindowProps} from './types';

export const FilterWindow: React.FC<FilterWindowProps> = (props: FilterWindowProps) => {
    if (!props.isOpen) return null;

    return (
        <div className={styles['filter-window']}>
            <div className={styles['filter-window__content']}>
                <div className={styles['filter-window__header']}>
                    <h2>Фильтры</h2>
                    <button onClick={props.onClose} className={styles['filter-window__close']}>
                        <IoClose size={20}/>
                    </button>
                </div>

                <div className={styles['filter-section']}>
                    <h3>Приоритет</h3>
                    <div className={styles['filter-options']}>
                        <label>
                            <RCheckbox
                                checked={props.filters.priority.low}
                                onChange={() => props.onPriorityChange('low')}
                            />
                            Малый
                        </label>
                        <label>
                            <RCheckbox
                                checked={props.filters.priority.medium}
                                onChange={() => props.onPriorityChange('medium')}
                            />
                            Среднее
                        </label>
                        <label>
                            <RCheckbox
                                checked={props.filters.priority.high}
                                onChange={() => props.onPriorityChange('high')}
                            />
                            Высокое
                        </label>
                    </div>
                </div>

                <div className={styles['filter-section']}>
                    <h3>Статус</h3>
                    <div className={styles['filter-options']}>
                        <label>
                            <RCheckbox
                                checked={props.filters.status.backlog}
                                onChange={() => props.onStatusChange('backlog')}
                            />
                            Не начато
                        </label>
                        <label>
                            <RCheckbox
                                checked={props.filters.status.inProgress}
                                onChange={() => props.onStatusChange('inProgress')}
                            />
                            В процессе
                        </label>
                        <label>
                            <RCheckbox
                                checked={props.filters.status.done}
                                onChange={() => props.onStatusChange('done')}
                            />
                            Выполнено
                        </label>
                    </div>
                </div>

                <div className={styles['filter-section']}>
                    <h3>Доски</h3>
                    <div className={styles['filter-search']}>
                        <RInput
                            placeholder="Поиск доски"
                            value={props.filters.board.search}
                            onChange={(e) => props.onBoardChange(e.target.value)}
                            className={styles['wide-input']}
                        />
                    </div>
                </div>

                <div className={styles['filter-actions']}>
                    <RButton variant="outlined" onClick={props.onReset}>Сбросить</RButton>
                    <RButton onClick={props.onApply}>Найти</RButton>
                </div>
            </div>
        </div>
    );
};