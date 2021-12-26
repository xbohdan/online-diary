import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import './WriteNote.css';
import dateToString from '../../../helpers/dateToString';

import useAppDispatch from '../../../hooks/useAppDispatch';
import { INote } from '../../../types/INote';
import postNote from '../../../store/note/thunks/postNote';
import putNote from '../../../store/note/thunks/putNote';

interface IProps {
  note: INote;
}

const WriteNote = ({ note }: IProps) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const { date } = useParams();

  const { heading, content, status } = note;

  const submitNote = (_entry: INote) => {
    _entry.creationDate = date;

    if (status === 'write') {
      dispatch(postNote(_entry));
    } else if (status === 'update') {
      _entry.modificationDate = dateToString(new Date());
      dispatch(putNote(_entry));
    }
  };

  return (
    <form onSubmit={handleSubmit(submitNote)} className="noteForm">
      <input
        {...register('heading', { required: true })}
        className="writeHeading inputField"
        placeholder="Title"
        defaultValue={heading}
      />
      <TextareaAutosize
        {...register('content', { required: true })}
        className="writeContent inputField"
        placeholder="Write your note..."
        defaultValue={content}
      />
      <input type="submit" className="primaryButton saveButton" value="Save" />
    </form>
  );
};

export default WriteNote;
