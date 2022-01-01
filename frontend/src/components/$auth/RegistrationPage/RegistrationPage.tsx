import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { setUsername } from '../../../store/user/slice';
import registerUser from '../../../store/user/thunks/registerUser';
import { ICredentials } from '../../../types/ICredentials';
import Container from '../../Container/Container';
import PageTemplateUnauth from '../../PageTemplateUnauth/PageTemplateUnauth';

const RegistrationPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const submitLogin = (credentials: ICredentials) => {
    dispatch(setUsername(credentials.userName));
    dispatch(registerUser(credentials));
    navigate('/');
  };

  return (
    <PageTemplateUnauth>
      <Container>
        <form onSubmit={handleSubmit(submitLogin)} className="loginForm">
          <input
            {...register('userName', { required: true })}
            type="text"
            className="loginInput"
            placeholder="Username"
          />
          <input
            {...register('password', { required: true })}
            type="password"
            className="loginInput"
            placeholder="Password"
          />
          <input
            type="submit"
            className="primaryButton loginButton"
            value="Sign Up"
          />
        </form>
        <div className="loginSubform">
          <p>
            Have an account?&nbsp;
            <Link to="/">Log In</Link>
          </p>
        </div>
      </Container>
    </PageTemplateUnauth>
  );
};

export default RegistrationPage;
