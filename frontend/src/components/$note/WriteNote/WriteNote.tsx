import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import './WriteNote.css';
import dateToString from '../../../helpers/dateToString';

import useAppDispatch from '../../../hooks/useAppDispatch';
import { IEntry } from '../../../store/entry/slice';
import postEntry from '../../../store/entry/thunks/postEntry';
import putEntry from '../../../store/entry/thunks/putEntry';

interface IProps {
  entry: IEntry;
}

const WriteNote = ({ entry }: IProps) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const { date } = useParams();

  const { title, note, status } = entry;

  const submitNote = (_entry: IEntry) => {
    _entry.creationDate = date;

    if (status === 'write') {
      dispatch(postEntry(_entry));
    } else if (status === 'update') {
      _entry.modificationDate = dateToString(new Date());
      dispatch(putEntry(_entry));
    }
  };

  return (
    <form onSubmit={handleSubmit(submitNote)} className="noteForm">
      <input
        {...register('title', { required: true })}
        className="title inputField"
        placeholder="Title"
        defaultValue={title}
      />
      <TextareaAutosize
        {...register('note', { required: true })}
        className="noteText inputField"
        placeholder="Write your note..."
        defaultValue={note}
      />
      <input type="submit" className="primaryButton saveButton" value="Save" />
    </form>
  );
};

export default WriteNote;
