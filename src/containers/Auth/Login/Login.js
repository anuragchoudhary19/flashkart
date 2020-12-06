import React, { useState } from 'react';
import { createOrUpdateUser } from '../../../functions/login';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth, googleAuthProvider } from '../../../firebase';
import classes from './Login.module.css';
import Error from '../../../components/UI/Error/Error';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  let dispatch = useDispatch();
  let history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email) {
      document.getElementById('email-login').style.border = '1px solid red';
      setEmailError('Email is required');
      return;
    }
    if (!password) {
      document.getElementById('password-login').style.border = '1px solid red';
      setPasswordError('Password is required');
      return;
    }
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => console.log(res))
        .catch();
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          name: user.name,
          email: user.email,
          token: idTokenResult.token,
        },
      });
      props.hide();
    } catch (err) {
      // console.log(err);
      if (err.code === 'auth/wrong-password') setPasswordError('Wrong Password');
      if (err.code === 'auth/user-not-found') setEmailError('Email not registered');
    }
  };

  const googleLoginHandler = async () => {
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          name: user.name,
          email: user.email,
          token: idTokenResult.token,
        },
      });
      props.hide();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={classes.login}>
      <div className={classes.header}>
        <h1>Log In</h1>
      </div>
      <div className={classes.form}>
        <form onSubmit={submitHandler}>
          <input
            id='email-login'
            className={classes.email}
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            autoFocus
          />
          <input
            id='password-login'
            className={classes.password}
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          <span className={classes.forgotPassword} onClick={() => props.setShowAuth(3)}>
            Forgot Password?
          </span>
          {emailError ? <Error message={emailError} /> : null}
          {passwordError ? <Error message={passwordError} /> : null}
          <button type='submit'>Log in</button>
        </form>
        <h6>or</h6>
        <button onClick={googleLoginHandler}>Continue with Google</button>
      </div>
      {/* {showForgotPassword ? <ForgotPassword /> : null} */}
    </div>
  );
};

export default Login;
