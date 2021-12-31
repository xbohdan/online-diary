import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL, entryMocked } from '../../../config';
import returnDataWithDelay from '../../../helpers/returnDataWithDelay';
import { INote } from '../../../types/INote';

const putNote = createAsyncThunk<INote, INote>(
  'notes/putNote',
  async (note: INote) => {
    if (entryMocked) {
      return returnDataWithDelay(note, 'fast 3G');
    }

    const url = `${BASE_API_URL}/notes/${note.initialDate}`;

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        heading: note.heading,
        content: note.content,
        modificationDate: note.modificationDate,
      }),
    });

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();
    return data as INote;
  },
);

export default putNote;
