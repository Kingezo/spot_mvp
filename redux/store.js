import { configureStore } from '@reduxjs/toolkit'
// ...
import user from './slices/user';
import { useReducer } from 'react';

export const store = configureStore({
  reducer: {
    user
  },
});

export default store;