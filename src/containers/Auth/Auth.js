import React, { useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import classes from './Auth.module.css';

const Auth = (props) => {
  const [showAuth, setShowAuth] = useState(1);
  return (
    <Backdrop show={props.show}>
      <Modal show={props.show} hide={props.hide} setShowAuth={setShowAuth}>
        {props.show ? ( //important if one want to remove all changes make to component
          <>
            {showAuth === 1 ? <Login hide={props.hide} setShowAuth={setShowAuth} /> : null}
            {showAuth === 2 ? <Signup setShowAuth={setShowAuth} /> : null}
            {showAuth === 3 ? <ForgotPassword setShowAuth={setShowAuth} /> : null}
            <div className={classes.switchAuth}>
              {showAuth === 1 || showAuth === 3 ? (
                <button onClick={() => setShowAuth(2)}>Don't have an account? Signup</button>
              ) : null}
              {showAuth === 2 || showAuth === 3 ? (
                <button onClick={() => setShowAuth(1)}>Already a user? Login</button>
              ) : null}
            </div>
          </>
        ) : null}
      </Modal>
    </Backdrop>
  );
};

export default Auth;
