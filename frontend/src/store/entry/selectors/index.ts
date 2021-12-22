import { RootState } from '../../store';

const selectEntry = (state: RootState) => state.entry;
export default selectEntry;
