import React from 'react';
import '../dashboard.css';

const Trips = (props) => {
  const { tripImage, userData } = props;

  const plans = userData.plans;
  return (
    <div className='current-trips'>
      <div className='trip-title-container'>
        <div className='trips-title'>My Trips</div>
        <div className='trip-underline'></div>
      </div>
      <div className='trips-container'>
        {Object.values(plans).map((plan, index) => {
          // Get the first destination's image
          const firstDestination = Object.values(plan.destinations)[0];
          const destinationImage = firstDestination
            ? firstDestination.destinationImage
            : null;

          return (
            plan.planName && (
              <div
                key={index}
                className='trip-img'
                style={{
                  backgroundImage: `url(${
                    destinationImage || 'defaultImageURL'
                  })`,
                }}
              >
                <div className='trip-info'>
                  <div className='trip-name'>{plan.planName}</div>
                  <div className='trip-date'>{`${plan.startDate} - ${plan.endDate}`}</div>
                  <button className='menu-dots'>⋮</button>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export { Trips };
