import React from 'react';

import './ShowNote.css';
import { useParams } from 'react-router-dom';
import isEditable from '../../../helpers/isEditable';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { setStatus } from '../../../store/note/slice';
import deleteNote from '../../../store/note/thunks/deleteNote';
import { INote } from '../../../types/INote';

interface Props {
  note: INote;
}

const ShowNote = ({ note }: Props) => {
  const dispatch = useAppDispatch();

  const { heading, content } = note;
  const { date } = useParams();
  const dateObj = new Date(date as string);
  const canEdit = isEditable(dateObj);

  return (
    <>
      <div className="showNote">
        <h1 className="showHeading">{heading}</h1>
        <hr className="headingContentLine" />
        <p className="showContent">{content}</p>
      </div>
      <div className="showContentControlButtons">
        {canEdit && (
          <input
            type="button"
            className="secondaryButton editButton"
            value="Edit"
            onClick={() => dispatch(setStatus('update'))}
          />
        )}
        <input
          type="button"
          className="redButton deleteButton"
          value="Delete"
          onClick={() => {
            dispatch(deleteNote(date as string));
          }}
        />
      </div>
    </>
  );
};

export default ShowNote;
