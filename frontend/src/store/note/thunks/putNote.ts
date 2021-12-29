import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { BASE_API_URL, entryMocked } from '../../../config';
import returnDataWithDelay from '../../../helpers/returnDataWithDelay';
import { INote } from '../../../types/INote';

const promiseStatus = {
  pending: 'Updating note...',
  success: 'Note was updated!',
  error: 'Error: note was not updated!',
};

const putNote = createAsyncThunk<INote, INote>(
  'notes/putNote',
  async (note: INote) => {
    if (entryMocked) {
      return toast.promise(returnDataWithDelay(note, 'slow 3G'), promiseStatus);
    }

    const url = `${BASE_API_URL}/notes/${note.creationDate}`;

    const promise = fetch(url, {
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

    const res = await toast.promise(promise, promiseStatus);

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();
    return data as INote;
  },
);

export default putNote;
