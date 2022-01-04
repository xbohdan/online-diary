import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IAuth } from '../../types/IAuth';
import { IUser } from '../../types/IUser';

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
    setAuth: (state, action: PayloadAction<IAuth>) => {
      state.auth = action.payload;
    },
    logout: (state) => {
      state.auth.token = null;
      state.auth.expiration = undefined;
      state.userName = undefined;
      localStorage.removeItem('USERNAME');
      localStorage.removeItem('TOKEN');
      localStorage.removeItem('EXPIRATION');
      toast.warn('Logged out');
    },
  },
});

export const { setUsername, setAuth, logout } = userSlice.actions;

export default userSlice.reducer;
