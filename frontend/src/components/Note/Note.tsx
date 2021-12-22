import React, { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';

import './Note.css';

import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import selectEntry from '../../store/entry/selectors';
import getEntry from '../../store/entry/thunks/getEntry';
import ShowNote from '../ShowNote/ShowNote';
import WriteNote from '../WriteNote/WriteNote';

const Note = () => {
  const dispatch = useAppDispatch();
  const entry = useAppSelector(selectEntry);
  const { date } = useParams();

  useLayoutEffect(() => {
    dispatch(getEntry(date as string));
  }, [date]);

  if (entry.status === 'loading') return <p>Loading...</p>;

  if (entry.status === 'show') {
    return <ShowNote entry={entry} />;
  }

  return <WriteNote />;
};

export default Note;
