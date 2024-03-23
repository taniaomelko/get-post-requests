import { configureStore } from '@reduxjs/toolkit';
import { RootReducer } from './reducers';

export const getStore = () => configureStore({
  reducer: RootReducer,
});
