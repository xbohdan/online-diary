// First attempt to get token from Redux store, otherwise get token from the
// localStorage. Reading from Redux store is faster.
import { RootState } from '../store/store';

const getToken = (store: RootState): string | null => {
  let { token } = store.user.auth;
  if (!token) token = localStorage.getItem('TOKEN');
  return token;
};

export default getToken;
