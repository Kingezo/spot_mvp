import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  user: null,
  userLoading: false,
};

const serializableUser = (userData) => {
  return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      // Include other fields you want to serialize
  };
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.userLoading = false;
    },
  },
});

export const { setUser, setUserLoading, clearUser } = userSlice.actions;

export default userSlice.reducer;
