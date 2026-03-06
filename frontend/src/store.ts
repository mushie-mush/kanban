import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/user/components/authSlice';
import boardReducer from './features/board/components/boardSlice';
import columnReducer from './features/board/components/columnSlice';
import taskReducer from './features/board/components/taskSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardReducer,
    columns: columnReducer,
    tasks: taskReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
