import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL, userMocked } from '../../../config';
import returnDataWithDelay from '../../../helpers/returnDataWithDelay';
import mockAuth from '../../../mocks/mockAuth';
import { IAuth } from '../../../types/IAuth';
import { ICredentials } from '../../../types/ICredentials';

const registerUser = createAsyncThunk<IAuth, ICredentials>(
  'user/register',
  async (user: ICredentials) => {
    if (userMocked) {
      return returnDataWithDelay(mockAuth, 'fast 3G');
    }

    const url = `${BASE_API_URL}/register/`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();
    return data as IAuth;
  },
);

export default registerUser;
