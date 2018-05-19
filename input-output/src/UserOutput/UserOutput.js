import React from 'react';
import './UserOutput.css';

const UserOutput = (props) => {
  return (
    <div className='UserOutput'>
      <p>The name output is: {props.name}</p>
      <p>The name output is: {props.name}</p>
    </div>
  );
}

export default UserOutput;