import React from 'react';
import classes from './Button.css';

const button = (props) => (
  // Use a array of styles to reuse the cancel and confirm purchase button styles
  <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}  
    disabled={props.disabled}  
  >
  {props.children}
  </button>
);

export default button;