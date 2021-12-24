import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import './WriteNote.css';

import useAppDispatch from '../../../hooks/useAppDispatch';
import { IEntry } from '../../../store/entry/slice';
import postEntry from '../../../store/entry/thunks/postEntry';

interface INote {
  title: string;
  note: string;
  creationDate?: string;
}

const WriteNote = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const { date } = useParams();

  const submitNote = (entry: INote) => {
    entry.creationDate = date;
    dispatch(postEntry(entry as IEntry));
  };

  return (
    <form onSubmit={handleSubmit(submitNote)} className="noteForm">
      <input
        {...register('title', { required: true })}
        className="title inputField"
        placeholder="Title"
      />
      <TextareaAutosize
        {...register('note', { required: true })}
        className="noteText inputField"
        placeholder="Write your note..."
      />
      <input type="submit" className="primaryButton saveButton" value="Save" />
    </form>
  );
};

export default WriteNote;
