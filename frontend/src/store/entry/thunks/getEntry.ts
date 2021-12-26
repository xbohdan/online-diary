import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL, entryMocked } from '../../../config';
import { dayDurationMs, today } from '../../../helpers/isEditable';
import returnDataWithDelay from '../../../helpers/returnDataWithDelay';
import mockShowEntry from '../../../mocks/mockShowEntry';

import { IEntry } from '../slice';

const getEntry = createAsyncThunk<IEntry, string>(
  'entries/fetchEntry',
  async (fetchDate: string) => {
    if (entryMocked) {
      if (
        Math.abs(new Date(fetchDate).getTime() - today) <=
        dayDurationMs * 2
      ) {
        return returnDataWithDelay(mockShowEntry, 'fast 3G');
      }

      return Promise.reject(new Error('Mock write'));
    }

    const res = await fetch(`${BASE_API_URL}/entries/${fetchDate}`);

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();
    return data as IEntry;
  },
);

export default getEntry;
