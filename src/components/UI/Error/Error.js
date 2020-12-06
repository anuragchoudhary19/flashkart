import React from 'react';
import classes from './Error.module.css';
const Error = (props) => {
  return (
    <div className={classes.error}>
      <i className='fas fa-exclamation-circle fa-xs'>{props.message}</i>
    </div>
  );
};

export default Error;
