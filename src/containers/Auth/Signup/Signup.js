import React, { useState } from 'react';
import Loading from '../../../components/UI/Loading/Loading';
import Error from '../../../components/UI/Error/Error';
import Success from '../../../components/UI/Success/Success';
import { auth } from '../../../firebase';
import classes from './Signup.module.css';

const Signup = (props) => {
  const [email, setEmail] = useState('anurag.typhoon@gmail.com');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: 'http://localhost:3000/signup/complete',
      handleCodeInApp: true,
    };
    await auth
      .sendSignInLinkToEmail(email, config)
      .then(() => {
        window.localStorage.setItem('emailForSignup', email);
        setMessage(`Email was sent to '${email}'.`);
        setEmail('');
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className={classes.signup}>
      <div className={classes.header}>
        <h1>Sign Up</h1>
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
          <span className={classes.forgotPassword} onClick={() => props.setShowAuth(3)}>
            Forgot Password?
          </span>
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

export default Signup;
