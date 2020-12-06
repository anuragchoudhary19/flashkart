import React, { useState, useEffect } from 'react';
import Error from '../../../components/UI/Error/Error';
import classes from './SignupComplete.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../../firebase';

const SignupComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForSignup'));
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('Password cannot be empty');
      return;
    }
    if (password.length < 8 || password.length > 32) {
      setError('Password length must be between 8 and 32');
      return;
    }
    // let passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
    // if (!passwordReg.test(password)) {
    //   setError('Password must contain a lowercase, uppercase, number and special character');
    //   return;
    // }

    try {
      const result = await auth.signInWithEmailLink(email, window.location.href);
      if (result.user.emailVerified) {
        //remove email from local storage
        window.localStorage.removeItem('emailForSignup');
        //get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            name: user.name,
            email: user.email,
            token: idTokenResult.token,
          },
        });
        console.log(idTokenResult);
      }
      console.log(result);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.complete}>
      <div className={classes.header}>
        <h1>Signup Complete</h1>
      </div>
      <div className={classes.form}>
        <form onSubmit={submitHandler}>
          <input className={classes.email} type='email' value={email} autoComplete='false' disabled='true' />
          <input
            className={classes.password}
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            autoFocus
          />
          {error ? <Error message={error} /> : null}
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignupComplete;
