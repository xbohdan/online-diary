import { RootState } from '../../store';
import { IEntry } from '../slice';

const selectEntry = (state: RootState): IEntry => state.entry;
export default selectEntry;
