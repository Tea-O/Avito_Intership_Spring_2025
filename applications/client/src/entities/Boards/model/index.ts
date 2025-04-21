import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBoards } from '../api';
import type { Boards } from '../types';

type BoardsState = {
    data: Boards[];
    loading: boolean;
    error: string | null;
};

const initialState: BoardsState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchBoards = createAsyncThunk<Boards[], void, { rejectValue: string }>(
    'boards/fetchBoards',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getBoards();
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || 'Не удалось загрузить доски');
        }
    }
);

const index = createSlice({
    name: 'boards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoards.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBoards.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchBoards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка при загрузке';
            });
    },
});

export default index.reducer;
