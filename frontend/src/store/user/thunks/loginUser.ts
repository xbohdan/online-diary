import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL, userMocked } from '../../../config';
import mockAuth from '../../../mocks/mockAuth';
import { IAuth } from '../../../types/IAuth';
import { ICredentials } from '../../../types/ICredentials';

const loginUser = createAsyncThunk<IAuth, ICredentials>(
  'user/login',
  async (user: ICredentials) => {
    if (userMocked) {
      return mockAuth;
    }

    const url = `${BASE_API_URL}/login/`;

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

export default loginUser;
