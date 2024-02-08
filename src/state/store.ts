import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import paintingsAPI from '../services/api';
import filterSlice from './filterSlice';

const store = configureStore({
  reducer: {
    [paintingsAPI.reducerPath]: paintingsAPI.reducer,
    filter: filterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(paintingsAPI.middleware),
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>

export default store;
