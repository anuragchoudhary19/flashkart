import React, { useState } from 'react';
import { auth } from '../../../firebase';
import classes from './ForgotPassword.module.css';
import Error from '../../../components/UI/Error/Error';
import Success from '../../../components/UI/Success/Success';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then((res) => {
        setLoading(false);
        setMessage(`Password reset link was sent to '${email}'`);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  return (
    <div className={classes.forgotPassword}>
      <div className={classes.header}>
        <h1>Forgot Password?</h1>
      </div>
      <div className={classes.form}>
        <form onSubmit={submitHandler}>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            autoFocus='true'
            required
          />
          {message ? <Success message={message} /> : null}
          {error ? <Error message={error} /> : null}
          <button type='submit' disabled={!email || loading}>
            {loading ? (
              <span>
                <i class='fas fa-spinner fa-spin'></i>Submit
              </span>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
