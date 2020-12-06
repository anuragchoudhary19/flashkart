import React from 'react';
import classes from './Backdrop.module.css';

const Backdrop = (props) => {
  let bg = [classes.backdrop];
  if (props.show) {
    bg.push(classes.backdropActive);
  }
  return <div className={bg.join(' ')}>{props.children}</div>;
};

export default Backdrop;
