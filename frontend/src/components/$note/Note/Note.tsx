import React, { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';

import './Note.css';

import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import selectEntry from '../../../store/entry/selectors';
import getEntry from '../../../store/entry/thunks/getEntry';
import Container from '../../Container/Container';
import Loader from '../../Loader/Loader';
import PageTemplate from '../../PageTemplate/PageTemplate';
import ShowNote from '../ShowNote/ShowNote';
import WriteNote from '../WriteNote/WriteNote';

const Note = () => {
  const dispatch = useAppDispatch();
  const entry = useAppSelector(selectEntry);
  const { date } = useParams();

  useLayoutEffect(() => {
    dispatch(getEntry(date as string));
  }, [dispatch, date]);

  return (
    <Container>
      <PageTemplate>
        {entry.status === 'loading' && <Loader />}
        {entry.status === 'show' && <ShowNote entry={entry} />}
        {entry.status === 'write' && <WriteNote />}
      </PageTemplate>
    </Container>
  );
};

export default Note;
