import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL, entryMocked } from '../../../config';
import getToken from '../../../helpers/getToken';
import returnDataWithDelay from '../../../helpers/returnDataWithDelay';
import { RootState } from '../../store';

const deleteNote = createAsyncThunk<number, string>(
  'notes/deleteNote',
  async (fetchDate: string, thunkAPI) => {
    if (entryMocked) {
      return returnDataWithDelay(200, 'fast 3G');
    }

    const token = getToken(thunkAPI.getState() as RootState);

    const res = await fetch(`${BASE_API_URL}/notes/${fetchDate}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(res.statusText);

    return res.status;
  },
);

export default deleteNote;
