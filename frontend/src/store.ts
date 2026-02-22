import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/user/components/authSlice';
import boardReducer from './features/board/components/boardSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
