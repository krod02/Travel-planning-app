import React from 'react';
import '../destinationDetails.css';

const RecommendedPOI = (props) => {
  const { tripImage } = props;

  return (
    <div className='recommended-poi-list-container'>
      <div className='poi-list-title'>Points of Interest</div>
      <div className='poi'>
        <div className='poi-number'>1.</div>
        <div
          className='poi-img'
          style={{ backgroundImage: `url(${tripImage})` }}
        ></div>
        <div className='poi-info'>
          <div className='poi-name'>Plaza Mayor</div>
          <div className='poi-latitude'>Latitude: 40.415</div>
          <div className='poi-longitude'>Longitude: -3.707</div>
          <div className='poi-address'>
            Address: Plaza Mayor, Pl. Mayor, 28012 Madrid, Spain
          </div>
          <div className='poi-category'>Historical Landmark</div>
        </div>
      </div>
      <div className='poi'>
        <div className='poi-number'>2.</div>
        <div
          className='poi-img'
          style={{ backgroundImage: `url(${tripImage})` }}
        ></div>
        <div className='poi-info'>
          <div className='poi-name'>Plaza Mayor</div>
          <div className='poi-latitude'>Latitude: 40.415</div>
          <div className='poi-longitude'>Longitude: -3.707</div>
          <div className='poi-address'>
            Address: Plaza Mayor, Pl. Mayor, 28012 Madrid, Spain
          </div>
          <div className='poi-category'>Historical Landmark</div>
        </div>
      </div>
    </div>
  );
};

export { RecommendedPOI };
