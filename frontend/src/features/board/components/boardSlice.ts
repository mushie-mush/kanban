import { createSlice } from '@reduxjs/toolkit';
import type { IBoard } from '../board.d';

interface IBoardState {
  boards: IBoard[];
}

const initialState: IBoardState = {
  boards: [],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },
    loadBoards: (state, action) => {
      state.boards = action.payload;
    },
  },
});

export const { addBoard, loadBoards } = boardSlice.actions;

export default boardSlice.reducer;
