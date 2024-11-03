import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearUser } from './slices/user';
import { auth } from '../config/firebase';

export const logoutUser = createAsyncThunk('user/logout', async (_, { dispatch }) => {
  try {
    // Perform the Firebase sign-out
    await auth.signOut();
    // Dispatch the clearUser action to reset the state
    dispatch(clearUser());
  } catch (error) {
    console.error('Error logging out:', error);
    // Optionally handle errors
  }
});
