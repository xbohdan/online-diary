import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { setUsername } from '../../../store/user/slice';
import loginUser from '../../../store/user/thunks/loginUser';
import { ICredentials } from '../../../types/ICredentials';
import Container from '../../Container/Container';

import './LoginPage.css';
import PageTemplateUnauth from '../../PageTemplateUnauth/PageTemplateUnauth';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();

  const submitLogin = (credentials: ICredentials) => {
    dispatch(setUsername(credentials.userName));
    dispatch(loginUser(credentials));
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
            value="Log In"
          />
        </form>
        <div className="loginSubform">
          <p>
            Don&apos;t have an account?&nbsp;
            <Link to="/registration">Sign Up</Link>
          </p>
        </div>
      </Container>
    </PageTemplateUnauth>
  );
};

export default LoginPage;
