import React from 'react';

const Validation = (props) => {
  const {input} = props;

  if (input >= 5) {
    return (
      <div>
        Text long Enough
      </div>
    );
  }
  return (
    <div>
      Text too short!
    </div>
  );
  
}

export default Validation;