import { IAuth } from '../../../types/IAuth';
import { RootState } from '../../store';

export const selectUserName = (state: RootState): string | undefined | null =>
  state.user.userName;
export const selectAuth = (state: RootState): IAuth => state.user.auth;
export const selectToken = (state: RootState): string | undefined | null =>
  state.user.auth.token;
export const selectExpiration = (state: RootState): string | undefined | null =>
  state.user.auth.expiration;
