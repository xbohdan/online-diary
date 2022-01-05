import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import PrimaryButton from '../../$buttons/PrimaryButton/PrimaryButton';
import registerUser from '../../../helpers/auth/registerUser';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { setAuth, setUsername } from '../../../store/user/slice';
import { IAuth } from '../../../types/IAuth';
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
    setError,
  } = useForm({ criteriaMode: 'all' });

  const [isDisabled, setIsDisabled] = useState(false);
  const submitRegistration = async (credentials: ICredentials) => {
    setIsDisabled(true);
    try {
      const auth = await registerUser(credentials);
      dispatch(setUsername(credentials.userName));
      dispatch(setAuth(auth as IAuth));
    } catch (error) {
      setError('userName', {
        type: 'unavailableUsername',
        message: error.message,
      });
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <PageTemplateUnauth>
      <Container>
        <form onSubmit={handleSubmit(submitRegistration)} className="authForm">
          <input
            {...register('userName', { required: true })}
            type="text"
            className="authInput"
            placeholder="Username"
          />
          {errors.userName && (
            <p className="errorMessage">{errors.userName.message}</p>
          )}
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
            className="authInput"
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
          <PrimaryButton
            value="Sign Up"
            className="authButton"
            isDisabled={isDisabled}
          />
        </form>
        <div className="authSubform">
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
