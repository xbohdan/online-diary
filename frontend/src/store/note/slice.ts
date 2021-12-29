import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { INote } from '../../types/INote';
import { NoteStatus } from '../../types/NoteStatus';
import deleteNote from './thunks/deleteNote';
import getNote from './thunks/getNote';
import postNote from './thunks/postNote';
import putNote from './thunks/putNote';

export const initialState: INote = {
  heading: undefined,
  content: undefined,
  creationDate: undefined,
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
    builder
      .addCase(getNote.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNote.rejected, (state) => {
        state.status = 'write';
      });

    builder.addCase(deleteNote.fulfilled, (state) => {
      state.status = 'write';
    });

    builder.addMatcher(
      isAnyOf(getNote.fulfilled, postNote.fulfilled, putNote.fulfilled),
      (state, action) => {
        const { heading, content } = action.payload;
        state.heading = heading;
        state.content = content;
        state.status = 'show';
      },
    );
  },
});

export const { setNote, setStatus } = noteSlice.actions;

export default noteSlice.reducer;
