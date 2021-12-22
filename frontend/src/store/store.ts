import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import entryReducer from './entry/slice';

export const store = configureStore({
  reducer: {
    entry: entryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
