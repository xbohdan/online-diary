import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL, entryMocked } from '../../../config';
import { IEntry } from '../slice';

const putEntry = createAsyncThunk<IEntry, IEntry>(
  'entries/fetchEntry',
  async (note: IEntry) => {
    if (entryMocked) {
      return note;
    }

    const url = `${BASE_API_URL}/entries/${note.creationDate}`;

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: note.title,
        note: note.note,
        modificationDate: note.modificationDate,
      }),
    });

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();
    return data as IEntry;
  },
);

export default putEntry;
