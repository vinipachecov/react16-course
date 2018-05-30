import React from 'react';

const Char = (props) => {
  return (
    <div style={{
      display: 'inline-block',
      padding: '16px',
      textAlign: 'center',
      margin: '16px',
      border: '1px solid black'
    }}>      
    {props.letter}
    </div>
  );
}

export default Char;