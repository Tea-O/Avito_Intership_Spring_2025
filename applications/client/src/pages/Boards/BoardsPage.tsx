import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './BoardsPage.module.scss';
import { fetchBoards } from '@entities/Boards';
import { BoardsView } from '@features/Boards';
import { CreateOrUpdateTask } from '@features/Modal';
import { openCreateModal, closeCreateModal } from '@entities/Modal/model/modalSlice';
import type { RootState, AppDispatch } from '@app/store';

export const BoardsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: boards, loading, error } = useSelector((state: RootState) => state.boards);
  const isCreateModalOpen = useSelector((state: RootState) => state.modal.isCreateModalOpen);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  return (
      <div className={styles['boards-page__list']}>
        <BoardsView
            boards={boards}
            state={{ loading, error }}
            onCreateClick={() => dispatch(openCreateModal())}
        />

        <CreateOrUpdateTask
            isOpen={isCreateModalOpen}
            onClose={() => dispatch(closeCreateModal())}
            onTaskCreated={() => dispatch(fetchBoards())}
        />
      </div>
  );
};