import {createSlice} from '@reduxjs/toolkit';

interface ModalState {
    isCreateModalOpen: boolean;
}

const initialState: ModalState = {
    isCreateModalOpen: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openCreateModal(state) {
            state.isCreateModalOpen = true;
        },
        closeCreateModal(state) {
            state.isCreateModalOpen = false;
        },
    },
});

export const {openCreateModal, closeCreateModal} = modalSlice.actions;
export default modalSlice.reducer;
