import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import PrimaryButton from '../../$buttons/PrimaryButton/PrimaryButton';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { setButtonIsDisabled } from '../../../store/button/slice';
import { setUsername } from '../../../store/user/slice';
import registerUser from '../../../store/user/thunks/registerUser';
import { ICredentials } from '../../../types/ICredentials';
import Container from '../../Container/Container';
import PageTemplateUnauth from '../../PageTemplateUnauth/PageTemplateUnauth';

import './RegistrationPage.css';

const RegistrationPage = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: 'all' });

  const submitRegistration = async (credentials: ICredentials) => {
    dispatch(setButtonIsDisabled(true));
    dispatch(setUsername(credentials.userName));
    await dispatch(registerUser(credentials));
    dispatch(setButtonIsDisabled(false));
  };

  return (
    <PageTemplateUnauth>
      <Container>
        <form onSubmit={handleSubmit(submitRegistration)} className="loginForm">
          <input
            {...register('userName', { required: true })}
            type="text"
            className="loginInput"
            placeholder="Username"
          />
          <input
            {...register('password', {
              required: 'Password cannot be empty',
              validate: {
                minLen: (password: string) =>
                  password.length >= 6 ||
                  'Password must be at least 6 characters',
                hasLowerCaseLetter: (password: string) =>
                  password.toUpperCase() !== password ||
                  'Password must have at least one lowercase letter',
                hasUpperCaseLetter: (password: string) =>
                  password.toLowerCase() !== password ||
                  'Password must have at least one uppercase letter',
                hasDigit: (password: string) =>
                  /\d/.test(password) ||
                  'Password must have at least one digit',
                hasNonAlphanumericSymbol: (password: string) =>
                  /[^a-zA-Z0-9]/.test(password) ||
                  'Password must have at least one non-alphanumeric symbol',
              },
            })}
            type="password"
            className="loginInput"
            placeholder="Password"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type} className="errorMessage">
                  {message}
                </p>
              ))
            }
          />
          <PrimaryButton value="Sign Up" className="loginButton" />
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
