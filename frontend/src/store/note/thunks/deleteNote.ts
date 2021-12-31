import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL, entryMocked } from '../../../config';
import returnDataWithDelay from '../../../helpers/returnDataWithDelay';

const deleteNote = createAsyncThunk<number, string>(
  'notes/deleteNote',
  async (fetchDate: string) => {
    if (entryMocked) {
      return returnDataWithDelay(200, 'fast 3G');
    }

    const res = await fetch(`${BASE_API_URL}/notes/${fetchDate}`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error(res.statusText);

    return res.status;
  },
);

export default deleteNote;
