import React from 'react';
import '../dashboard.css';

const Trips = (props) => {
  return (
    <div className='current-trips'>
      <div className='trip-title-container'>
        <div className='trips-title'>My Trips</div>
        <div className='trip-underline'></div>
      </div>
      <div className='trips-container'>
        <div className='trip-overlay'>
          <div className='trip-img'></div>
          <div className='trip-info'>
            <div className='trip-name'>Trip to Paris</div>
            <div className='trip-location'>New York, New York</div>
            <div className='trip-date'>23 May - 5 June</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Trips };
