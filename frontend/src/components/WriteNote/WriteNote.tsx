import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import './WriteNote.css';
import useAppDispatch from '../../hooks/useAppDispatch';
import { IEntry } from '../../store/entry/slice';
import postEntry from '../../store/entry/thunks/postEntry';

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
    console.log(entry);
    entry.creationDate = date;
    dispatch(postEntry(entry as IEntry));
  };

  return (
    <form onSubmit={handleSubmit(submitNote)} className="noteForm">
      <input
        {...register('title', { required: true })}
        className="title"
        placeholder="Title"
      />
      <TextareaAutosize
        {...register('note', { required: true })}
        className="noteText"
        placeholder="Write your note..."
      />
      <input type="submit" className="submitButton" value="Save" />
    </form>
  );
};

export default WriteNote;
