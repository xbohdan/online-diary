import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL, entryMocked } from '../../../config';
import { dayDurationMs, today } from '../../../helpers/isEditable';
import returnDataWithDelay from '../../../helpers/returnDataWithDelay';
import mockShowNote from '../../../mocks/mockShowNote';

import { INote } from '../../../types/INote';

const getNote = createAsyncThunk<INote, string>(
  'notes/fetchNote',
  async (fetchDate: string) => {
    if (entryMocked) {
      if (
        Math.abs(new Date(fetchDate).getTime() - today) <=
        dayDurationMs * 2
      ) {
        return returnDataWithDelay(mockShowNote, 'fast 3G');
      }

      return Promise.reject(new Error('Mock write'));
    }

    const res = await fetch(`${BASE_API_URL}/notes/${fetchDate}`);

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();
    return data as INote;
  },
);

export default getNote;
