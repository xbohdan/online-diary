import { IAuth } from '../types/IAuth';

const mockAuth: IAuth = {
  token: 'mockToken',
  expiration: new Date(
    new Date().setHours(new Date().getHours() + 1),
  ).toString(),
};

export default mockAuth;
