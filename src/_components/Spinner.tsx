import React from 'react';

const Spinner = () => {
  return (
    <div className=" ml-2 flex justify-center items-center">
      <div
        className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
