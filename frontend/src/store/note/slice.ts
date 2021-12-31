import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { INote } from '../../types/INote';
import { NoteStatus } from '../../types/NoteStatus';
import deleteNote from './thunks/deleteNote';
import getNote from './thunks/getNote';
import postNote from './thunks/postNote';
import putNote from './thunks/putNote';

export const initialState: INote = {
  heading: undefined,
  content: undefined,
  initialDate: undefined,
  modificationDate: undefined,
  status: 'write',
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setNote: (state, action: PayloadAction<INote>) => {
      state = action.payload;
    },
    setStatus: (state, action: PayloadAction<NoteStatus>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNote.rejected, (state) => {
      state.status = 'write';
    });

    builder
      .addCase(postNote.fulfilled, () => {
        toast.success('Note was saved!');
      })
      .addCase(putNote.fulfilled, () => {
        toast.success('Note was updated!');
      })
      .addCase(deleteNote.fulfilled, (state) => {
        state.status = 'write';
        toast.success('Note was deleted!');
      });
    builder.addMatcher(
      isAnyOf(
        getNote.pending,
        postNote.pending,
        putNote.pending,
        deleteNote.pending,
      ),
      (state) => {
        state.status = 'loading';
      },
    );

    builder.addMatcher(
      isAnyOf(getNote.fulfilled, postNote.fulfilled, putNote.fulfilled),
      (state, action) => {
        const { heading, content } = action.payload;
        state.heading = heading;
        state.content = content;
        state.status = 'show';
      },
    );

    builder.addMatcher(
      isAnyOf(postNote.rejected, putNote.rejected, deleteNote.rejected),
      (state, action) => {
        toast.error(action.error.message);
      },
    );
  },
});

export const { setNote, setStatus } = noteSlice.actions;

export default noteSlice.reducer;
