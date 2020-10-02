import React from 'react';

const CandidateProfileHeader = () => {
  return (
    <div className="Dropzone">
      <img
        src={`${process.env.PUBLIC_URL}/img/default.png`}
        alt="profile"
        className="Dropzone__img-img"
      />
    </div>
  );
};

export default CandidateProfileHeader;
