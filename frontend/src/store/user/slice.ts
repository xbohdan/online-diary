import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/IUser';
import loginUser from './thunks/loginUser';
import registerUser from './thunks/registerUser';

export const initialState: IUser = {
  userName: localStorage.getItem('USERNAME'),
  auth: {
    token: localStorage.getItem('TOKEN'),
    expiration: localStorage.getItem('EXPIRATION'),
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    logout: (state) => {
      state.auth.token = null;
      state.auth.expiration = undefined;
      state.userName = undefined;
      localStorage.removeItem('USERNAME');
      localStorage.removeItem('TOKEN');
      localStorage.removeItem('EXPIRATION');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(registerUser.fulfilled, loginUser.fulfilled),
      (state, action) => {
        state.auth = action.payload;
      },
    );
  },
});

export const { setUsername, logout } = userSlice.actions;

export default userSlice.reducer;
