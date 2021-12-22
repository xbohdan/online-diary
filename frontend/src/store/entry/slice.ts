import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getEntry from './thunks/getEntry';

export interface IEntry {
  title: string | undefined;
  note: string | undefined;
  creationDate?: string | undefined;
  status: 'loading' | 'show' | 'write';
}

const initialState: IEntry = {
  title: undefined,
  note: undefined,
  creationDate: undefined,
  status: 'loading',
};

export const entrySlice = createSlice({
  name: 'entry',
  initialState,
  reducers: {
    setEntry: (state, action: PayloadAction<IEntry>) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEntry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getEntry.fulfilled, (state, action) => {
        const { title, note, status } = action.payload;
        state.title = title;
        state.note = note;
        state.status = 'show';
      })
      .addCase(getEntry.rejected, (state) => {
        state.status = 'write';
      });
  },
});

export const { setEntry } = entrySlice.actions;

export default entrySlice.reducer;
