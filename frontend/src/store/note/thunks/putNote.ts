import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL, entryMocked } from '../../../config';
import getToken from '../../../helpers/getToken';
import returnDataWithDelay from '../../../helpers/returnDataWithDelay';
import { INote } from '../../../types/INote';
import { RootState } from '../../store';

const putNote = createAsyncThunk<INote, INote>(
  'notes/putNote',
  async (note: INote, thunkAPI) => {
    if (entryMocked) {
      return returnDataWithDelay(note, 'fast 3G');
    }

    const url = `${BASE_API_URL}/notes/${note.initialDate}`;

    const token = getToken(thunkAPI.getState() as RootState);

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
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
