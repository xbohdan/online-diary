import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL, entryMocked } from '../../../config';
import dateToString from '../../../helpers/dateToString';
import returnDataWithDelay from '../../../helpers/returnDataWithDelay';
import mockShowEntry from '../../../mocks/mockShowEntry';
import mockWriteEntry from '../../../mocks/mockWriteEntry';
import { IEntry } from '../slice';

const getEntry = createAsyncThunk<IEntry, string>(
  'entries/fetchEntry',
  async (fetchDate: string) => {
    if (entryMocked) {
      if (fetchDate === dateToString(new Date())) {
        return returnDataWithDelay(mockShowEntry, '4G');
      }

      return returnDataWithDelay(mockWriteEntry, '4G');
    }

    const res = await fetch(`${BASE_API_URL}/entries/${fetchDate}`);

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();
    return data as IEntry;
  },
);

export default getEntry;
