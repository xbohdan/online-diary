import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL, entryMocked } from '../../../config';
import getToken from '../../../helpers/getToken';
import returnDataWithDelay from '../../../helpers/returnDataWithDelay';
import { INote } from '../../../types/INote';
import { RootState } from '../../store';

const postNote = createAsyncThunk<INote, INote>(
  'notes/postNote',
  async (note: INote, thunkAPI) => {
    if (entryMocked) {
      return returnDataWithDelay(note, 'fast 3G');
    }

    const url = `${BASE_API_URL}/notes/`;

    const token = getToken(thunkAPI.getState() as RootState);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();
    return data as INote;
  },
);

export default postNote;
