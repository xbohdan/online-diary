import { NoteStatus } from './NoteStatus';

export interface INote {
  heading: string | undefined;
  content: string | undefined;
  creationDate?: string | undefined;
  modificationDate?: string | undefined;
  status: NoteStatus;
}
