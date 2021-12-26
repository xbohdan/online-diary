import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL, entryMocked } from '../../../config';
import { INote } from '../../../types/INote';

const postNote = createAsyncThunk<INote, INote>(
  'notes/fetchNote',
  async (note: INote) => {
    if (entryMocked) {
      return note;
    }

    const url = `${BASE_API_URL}/notes/`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
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
