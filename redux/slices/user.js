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
    setUserInfo: (state, action) => {
      const { firstName, lastName } = action.payload;
      state.firstName = firstName
      state.lastName = lastName
      state.email = email;
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload};
      }

    },
    clearUser: (state) => {
      state.user = null;
      state.firstName = '';
      state.lastName = '';
      state.userLoading = false;
    },
  },
});

export const { setUser, setUserInfo, setUserLoading, clearUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
