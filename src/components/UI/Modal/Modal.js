import React, { useEffect, useMemo } from 'react';
import classes from './Modal.module.css';

const Modal = (props) => {
  let modal = [classes.modal];

  if (props.show) {
    modal.push(classes.modalActive);
  }

  const hide = () => {
    props.hide();
    props.setShowAuth(1);
  };
  return (
    <div className={modal.join(' ')}>
      <div className={classes.close} onClick={() => hide()}>
        X
      </div>
      {props.children}
    </div>
  );
};

export default Modal;
