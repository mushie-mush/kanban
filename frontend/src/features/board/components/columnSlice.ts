import { createSlice } from '@reduxjs/toolkit';
import type { IColumn } from '../board';

interface IColumnState {
  columnsByBoardID: Record<string, IColumn[]>;
}

const initialState: IColumnState = {
  columnsByBoardID: {},
};

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    addColumn: (state, action) => {
      const { boardId, column } = action.payload;
      if (!state.columnsByBoardID[boardId]) {
        state.columnsByBoardID[boardId] = [];
      }
      state.columnsByBoardID[boardId].push(column);
    },
    loadColumns: (state, action) => {
      const { boardId, columns } = action.payload;
      state.columnsByBoardID[boardId] = columns;
    },
  },
});

export const { addColumn, loadColumns } = columnSlice.actions;

export default columnSlice.reducer;
