import React, { useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './Note.css';
import dateToString from '../../../helpers/dateToString';
import getNextDate from '../../../helpers/getNextDate';
import getPrevDate from '../../../helpers/getPrevDate';

import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import selectNote from '../../../store/note/selectors';
import { initialState } from '../../../store/note/slice';
import fetchNote from '../../../store/note/thunks/fetchNote';
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
    dispatch(fetchNote(date as string));
  }, [dispatch, date]);

  const navigate = useNavigate();

  const navigateToPrev = (currentDate: string) => {
    const prevDate = getPrevDate(new Date(currentDate));
    const path = `/note/${dateToString(prevDate)}`;
    navigate(path);
  };

  const navigateToNext = (currentDate: string) => {
    const nextDate = getNextDate(new Date(currentDate));
    const path = `/note/${dateToString(nextDate)}`;
    navigate(path);
  };

  return (
    <PageTemplate>
      <Container>
        <button
          type="button"
          onClick={() => navigateToPrev(date as string)}
          className="arrowDiv leftArrowDiv"
        >
          <span className="arrow ">←</span>
        </button>
        {note.status === 'loading' && <Loader />}
        {note.status === 'show' && <ShowNote note={note} />}
        {note.status === 'write' && <WriteNote note={initialState} />}
        {note.status === 'update' && <WriteNote note={note} />}
        <button
          type="button"
          onClick={() => navigateToNext(date as string)}
          className="arrowDiv rightArrowDiv"
        >
          <span className="arrow">→</span>
        </button>
      </Container>
    </PageTemplate>
  );
};

export default Note;
