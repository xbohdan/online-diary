import React, { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';

import './Note.css';

import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import selectNote from '../../../store/note/selectors';
import { initialState } from '../../../store/note/slice';
import getNote from '../../../store/note/thunks/getNote';
import Container from '../../Container/Container';
import Loader from '../../Loader/Loader';
import PageTemplate from '../../PageTemplate/PageTemplate';
import ShowNote from '../ShowNote/ShowNote';
import WriteNote from '../WriteNote/WriteNote';

const Note = () => {
  const dispatch = useAppDispatch();
  const note = useAppSelector(selectNote);
  const { date } = useParams();

  useLayoutEffect(() => {
    dispatch(getNote(date as string));
  }, [dispatch, date]);

  return (
    <PageTemplate>
      <Container>
        {note.status === 'loading' && <Loader />}
        {note.status === 'show' && <ShowNote note={note} />}
        {note.status === 'write' && <WriteNote note={initialState} />}
        {note.status === 'update' && <WriteNote note={note} />}
      </Container>
    </PageTemplate>
  );
};

export default Note;
