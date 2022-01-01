import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL, entryMocked } from '../../../config';
import getToken from '../../../helpers/getToken';
import { dayDurationMs, today } from '../../../helpers/isEditable';
import returnDataWithDelay from '../../../helpers/returnDataWithDelay';
import mockShowNote from '../../../mocks/mockShowNote';

import { INote } from '../../../types/INote';
import { RootState } from '../../store';

const fetchNote = createAsyncThunk<INote, string>(
  'notes/fetchNote',
  async (fetchDate: string, thunkAPI) => {
    if (entryMocked) {
      if (
        Math.abs(new Date(fetchDate).getTime() - today) <=
        dayDurationMs * 2
      ) {
        return returnDataWithDelay(mockShowNote, 'fast 3G');
      }

      throw new Error('Mock write');
    }

    const token = getToken(thunkAPI.getState() as RootState);

    const res = await fetch(`${BASE_API_URL}/notes/${fetchDate}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();
    return data as INote;
  },
);

export default fetchNote;
