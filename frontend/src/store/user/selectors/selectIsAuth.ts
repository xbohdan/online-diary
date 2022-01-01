import getToken from '../../../helpers/getToken';
import { RootState } from '../../store';

const selectIsAuth = (store: RootState): boolean => {
  return Boolean(getToken(store));
};

export default selectIsAuth;
