import { BASE_API_URL, userMocked } from '../../config';
import mockAuth from '../../mocks/mockAuth';
import { IAuth } from '../../types/IAuth';
import { ICredentials } from '../../types/ICredentials';
import returnDataWithDelay from '../returnDataWithDelay';

const loginUser = async (user: ICredentials) => {
  if (userMocked) {
    return returnDataWithDelay(mockAuth, 'fast 3G');
  }

  const url = `${BASE_API_URL}/login/`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const incorrectPassword = 401;
  if (res.status === incorrectPassword) {
    throw new Error('Username and password do not match');
  }
  if (!res.ok) throw new Error(res.statusText);

  const data = await res.json();
  return data as IAuth;
};

export default loginUser;
