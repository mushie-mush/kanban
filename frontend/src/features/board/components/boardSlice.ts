import { createSlice } from '@reduxjs/toolkit';

interface Board {
  id: string;
  name: string;
  owner: string;
}

interface BoardState {
  boards: Board[];
}

const initialState: BoardState = {
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
