import { createSlice } from '@reduxjs/toolkit';
import type { ITask } from '../board';

interface ITaskState {
  tasksByColumnID: Record<string, ITask[]>;
}

const initialState: ITaskState = {
  tasksByColumnID: {},
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { columnId, task } = action.payload;
      if (!state.tasksByColumnID[columnId]) {
        state.tasksByColumnID[columnId] = [];
      }
      state.tasksByColumnID[columnId].push(task);
    },
    loadTasks: (state, action) => {
      const { columnId, tasks } = action.payload;
      state.tasksByColumnID[columnId] = tasks;
    },
  },
});

export const { addTask, loadTasks } = taskSlice.actions;

export default taskSlice.reducer;
