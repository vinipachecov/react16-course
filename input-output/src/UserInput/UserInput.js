import React from 'react';
import './UserInput.css';
const UserInput = (props) => {
  return (
    <div className="UserInput">
      <input type='text' onChange={props.change} placeholder='Change your name here!' />      
    </div>
  );  
}

export default UserInput;