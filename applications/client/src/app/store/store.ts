import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from '@entities/Boards/model';
import modalReducer from '@entities/Modal/model/modalSlice';


export const store = configureStore({
    reducer: {
        boards: boardsReducer,
        modal: modalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
