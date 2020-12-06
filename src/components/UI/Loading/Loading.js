import React from 'react';
import classes from './Loading.module.css';

const Loading = (props) => {
  return <div className={classes.loader}>{props.text}</div>;
};

export default Loading;
