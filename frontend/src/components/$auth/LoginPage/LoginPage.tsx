import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../$buttons/PrimaryButton/PrimaryButton';
import loginUser from '../../../helpers/auth/loginUser';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { setAuth, setUsername } from '../../../store/user/slice';
import { IAuth } from '../../../types/IAuth';
import { ICredentials } from '../../../types/ICredentials';
import Container from '../../Container/Container';

import './LoginPage.css';
import PageTemplateUnauth from '../../PageTemplateUnauth/PageTemplateUnauth';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [isDisabled, setIsDisabled] = useState(false);
  const submitLogin = async (credentials: ICredentials) => {
    setIsDisabled(true);
    try {
      const auth = await loginUser(credentials);
      dispatch(setUsername(credentials.userName));
      dispatch(setAuth(auth as IAuth));
    } catch (error) {
      setError('password', {
        type: 'incorrectPassword',
        message: error.message,
      });
    } finally {
      setIsDisabled(false);
    }
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
          {errors.password && (
            <p className="errorMessage">{errors.password.message}</p>
          )}
          <PrimaryButton
            value="Log In"
            className="loginButton"
            isDisabled={isDisabled}
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
