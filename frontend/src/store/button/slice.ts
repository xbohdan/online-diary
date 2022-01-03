import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IButton } from '../../types/IButton';

export const initialState: IButton = {
  isDisabled: false,
};

export const buttonSlice = createSlice({
  name: 'button',
  initialState,
  reducers: {
    setButtonIsDisabled: (state, action: PayloadAction<boolean>) => {
      state.isDisabled = action.payload;
    },
  },
});

export const { setButtonIsDisabled } = buttonSlice.actions;

export default buttonSlice.reducer;
