import { IAuth } from './IAuth';

// LocalStorage.getItem returns null if item was not found
export interface IUser {
  userName?: string | null;
  auth: IAuth;
}
