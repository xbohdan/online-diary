import React from 'react';

import './ShowNote.css';
import { useParams } from 'react-router-dom';
import isEditable from '../../../helpers/isEditable';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { IEntry, setStatus } from '../../../store/entry/slice';

interface Props {
  entry: IEntry;
}

const ShowNote = ({ entry }: Props) => {
  const dispatch = useAppDispatch();

  const { title, note } = entry;
  const { date } = useParams();
  const dateObj = new Date(date as string);
  const canEdit = isEditable(dateObj);

  return (
    <>
      <div className="showEntry">
        <h1 className="showTitle">{title}</h1>
        <hr className="titleContentLine" />
        <p className="showNote">{note}</p>
      </div>
      <div className="showNoteControlButtons">
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
        />
      </div>
    </>
  );
};

export default ShowNote;
