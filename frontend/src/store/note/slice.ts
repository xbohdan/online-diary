import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INote } from '../../types/INote';
import { NoteStatus } from '../../types/NoteStatus';
import getNote from './thunks/getNote';

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
      .addCase(getNote.fulfilled, (state, action) => {
        const { heading, content } = action.payload;
        state.heading = heading;
        state.content = content;
        state.status = 'show';
      })
      .addCase(getNote.rejected, (state) => {
        state.status = 'write';
      });
  },
});

export const { setNote, setStatus } = noteSlice.actions;

export default noteSlice.reducer;
