import React from 'react';
import classes from './Success.module.css';

const Success = (props) => {
  return (
    <div className={classes.success}>
      <i className='fas fa-check-circle fa-xs'>{props.message}</i>
    </div>
  );
};

export default Success;
