import { BASE_API_URL, userMocked } from '../../config';
import mockAuth from '../../mocks/mockAuth';
import { IAuth } from '../../types/IAuth';
import { ICredentials } from '../../types/ICredentials';
import returnDataWithDelay from '../returnDataWithDelay';

const registerUser = async (credentials: ICredentials) => {
  if (userMocked) {
    return returnDataWithDelay(mockAuth, 'fast 3G');
  }

  const url = `${BASE_API_URL}/register/`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const unavailableUserName = 406;
  if (res.status === unavailableUserName) {
    throw new Error('Username already exists');
  }
  if (!res.ok) throw new Error(res.statusText);

  const data = await res.json();
  return data as IAuth;
};

export default registerUser;
