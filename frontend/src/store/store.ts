import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import isValidToken from '../helpers/isValidToken';
import userReducer, { logout } from './user/slice';
import noteReducer from './note/slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    note: noteReducer,
  },
});

store.subscribe(() => {
  const username = store.getState().user.userName;
  const { token, expiration } = store.getState().user.auth;
  if (typeof token === 'string' && isValidToken(expiration as string)) {
    localStorage.setItem('USERNAME', username as string);
    localStorage.setItem('TOKEN', token as string);
    localStorage.setItem('EXPIRATION', expiration as string);
  } else if (token) {
    store.dispatch(logout());
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
