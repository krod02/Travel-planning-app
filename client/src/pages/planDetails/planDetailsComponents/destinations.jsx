import React from 'react';
import '../planDetails.css';
import { useNavigate, Link } from 'react-router-dom';

const Destinations = (props) => {
  const { tripImage } = props;
  return (
    <div className='destinations-wrapper'>
      <div className='destinations-title-container'>
        <div className='trip-title'>Trip to Spain</div>
        <div className='trip-date'>23 May - 23 June</div>
      </div>
      <div className='destinations-container'>
        <div className='destination'>
          <div
            className='destination-img'
            style={{ backgroundImage: `url(${tripImage})` }}
          ></div>
          <div className='destination-info'>
            <div className='destination-location'>1. Madrid, Spain</div>
            <div className='destination-date'>23 May - 5 June</div>
            <button className='view-details'>View Details</button>
          </div>
        </div>
        <div className='destination'>
          <div
            className='destination-img'
            style={{ backgroundImage: `url(${tripImage})` }}
          ></div>
          <div className='destination-info'>
            <div className='destination-location'>2. Madrid, Spain</div>
            <div className='destination-date'>23 May - 5 June</div>
            <button className='view-details'>View Details</button>
          </div>
        </div>
        <div className='destination'>
          <div
            className='destination-img'
            style={{ backgroundImage: `url(${tripImage})` }}
          ></div>
          <div className='destination-info'>
            <div className='destination-location'>1. Madrid, Spain</div>
            <div className='destination-date'>23 May - 5 June</div>
            <button className='view-details'>View Details</button>
          </div>
        </div>
        <div className='destination'>
          <div
            className='destination-img'
            style={{ backgroundImage: `url(${tripImage})` }}
          ></div>
          <div className='destination-info'>
            <div className='destination-location'>2. Madrid, Spain</div>
            <div className='destination-date'>23 May - 5 June</div>
            <button className='view-details'>View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Destinations };
