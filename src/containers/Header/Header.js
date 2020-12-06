import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Auth from '../Auth/Auth';
import firebase from 'firebase';
import classes from './Header.module.css';

const Header = () => {
  const [show, setShow] = useState(false);
  let dispatch = useDispatch();
  let history = useHistory();
  const { user } = useSelector((state) => ({ ...state }));
  const hideBackdrop = () => {
    setShow(false);
  };

  const logoutHandler = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });

    history.push('/');
  };

  return (
    <>
      <div className={classes.header}>
        <div className={classes.logo}>
          <Link to='/'>FlashKart</Link>
        </div>
        <div className={classes.search}>
          <div>
            <i className='fas fa-search'></i>
          </div>
          <input type='search' name='search-product' />
        </div>

        {!user && (
          <div className={classes.login}>
            <button onClick={() => setShow(true)}>Log in</button>
          </div>
        )}
        {user && (
          <div className={classes.logout}>
            <button onClick={logoutHandler}>Logout</button>
          </div>
        )}
      </div>
      <Auth show={show} hide={hideBackdrop} />
    </>
  );
};

export default Header;
