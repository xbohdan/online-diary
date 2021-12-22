import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL, entryMocked } from '../../../config';
import { IEntry } from '../slice';

const postEntry = createAsyncThunk<IEntry, IEntry>(
  'entries/fetchEntry',
  async (note: IEntry) => {
    if (entryMocked) {
      return note;
    }

    const url = `${BASE_API_URL}/entries/`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();
    return data as IEntry;
  },
);

export default postEntry;
