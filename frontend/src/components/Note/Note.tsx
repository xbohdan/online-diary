import React from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

import './Note.css';

const Note = () => {
  const { register, handleSubmit } = useForm();

  const submitNote = (noteText: any) => {
    console.log(noteText);
  };

  return (
    <form onSubmit={handleSubmit(submitNote)} className="noteForm">
      <input
        {...register('title', { required: true })}
        className="title"
        placeholder="Title"
      />
      <TextareaAutosize
        {...register('noteText', { required: true })}
        className="noteText"
        placeholder="Write your note..."
      />
      <input type="submit" className="submitButton" value="Save" />
    </form>
  );
};

export default Note;
