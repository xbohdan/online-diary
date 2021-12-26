import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL, entryMocked } from '../../../config';
import { INote } from '../../../types/INote';

const putNote = createAsyncThunk<INote, INote>(
  'notes/fetchNote',
  async (note: INote) => {
    if (entryMocked) {
      return note;
    }

    const url = `${BASE_API_URL}/notes/${note.creationDate}`;

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: note.heading,
        note: note.content,
        modificationDate: note.modificationDate,
      }),
    });

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();
    return data as INote;
  },
);

export default putNote;
