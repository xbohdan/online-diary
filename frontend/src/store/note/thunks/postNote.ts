import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { BASE_API_URL, entryMocked } from '../../../config';
import returnDataWithDelay from '../../../helpers/returnDataWithDelay';
import { INote } from '../../../types/INote';

const promiseStatus = {
  pending: 'Saving note...',
  success: 'Note was saved!',
  error: 'Error: note was not saved!',
};

const postNote = createAsyncThunk<INote, INote>(
  'notes/postNote',
  async (note: INote) => {
    if (entryMocked) {
      return toast.promise(returnDataWithDelay(note, 'slow 3G'), promiseStatus);
    }

    const url = `${BASE_API_URL}/notes/`;

    const promise = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });

    const res = await toast.promise(promise, promiseStatus);

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();
    return data as INote;
  },
);

export default postNote;
