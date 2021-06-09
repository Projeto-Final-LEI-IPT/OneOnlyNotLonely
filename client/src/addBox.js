import React from 'react';
import boxForm from './boxForm';

const AddBox = () => {
  const handleOnSubmit = (box) => {
    console.log(box);
  };

  return (
    <React.Fragment>
      <boxForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );
};

export default AddBox;