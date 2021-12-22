import React from 'react';

import './ShowNote.css';
import { IEntry } from '../../store/entry/slice';

interface Props {
  entry: IEntry;
}

const ShowNote = ({ entry }: Props) => {
  const { title, note } = entry;

  return (
    <div className="showEntry">
      <h1 className="showTitle">{title}</h1>
      <p className="showNote">{note}</p>
    </div>
  );
};

export default ShowNote;
