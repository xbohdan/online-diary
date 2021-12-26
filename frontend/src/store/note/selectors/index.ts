import { RootState } from '../../store';
import { INote } from '../../../types/INote';

const selectNote = (state: RootState): INote => state.note;
export default selectNote;
