import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { BASE_API_URL, entryMocked } from '../../../config';
import returnDataWithDelay from '../../../helpers/returnDataWithDelay';

const promiseStatus = {
  pending: 'Deleting note...',
  success: 'Note was deleted!',
  error: 'Error: note was not deleted!',
};

const deleteNote = createAsyncThunk<number, string>(
  'notes/deleteNote',
  async (fetchDate: string) => {
    if (entryMocked) {
      return toast.promise(returnDataWithDelay(200, 'slow 3G'), promiseStatus);
    }

    const promise = fetch(`${BASE_API_URL}/notes/${fetchDate}`, {
      method: 'DELETE',
    });

    const res = await toast.promise(promise, promiseStatus);

    if (!res.ok) throw new Error(res.statusText);

    return res.status;
  },
);

export default deleteNote;
