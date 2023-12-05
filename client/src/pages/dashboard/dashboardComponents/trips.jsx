import React from 'react';
import '../dashboard.css';
import { useNavigate } from 'react-router-dom';

const Trips = (props) => {
  const { tripImage, userData, email } = props;

  const Navigate = useNavigate();

  // Function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];

    return `${day} ${monthName}`;
  };

  // Check if plans exist in userData
  const plans = userData && userData.plans ? userData.plans : {};

  const handleSubmit = (e, userID, plan) => {
    e.preventDefault();

    Navigate('/planDetails', { state: { userID, plan, email: email } });
  };

  return (
    <div className='current-trips'>
      <div className='trip-title-container'>
        <div className='trips-title'>My Trips</div>
        <div className='trip-underline'></div>
      </div>
      <div className='trips-container'>
        {Object.values(plans).map((plan, index) => {
          // Get the first destination's image
          const destinations =
            plan && plan.destinations ? plan.destinations : {};
          const firstDestination = Object.values(destinations)[0];
          const destinationImage = firstDestination
            ? firstDestination.destinationImage
            : tripImage;

          return (
            plan.planName && (
              <div key={index} className='trip'>
                <div
                  key={index}
                  className='trip-img'
                  style={{
                    backgroundImage: `url(${destinationImage || tripImage})`,
                  }}
                >
                  <button className='menu-dots'>⋮</button>
                </div>
                <div className='trip-actions'>
                  <div className='trip-info'>
                    <div className='trip-name'>{plan.planName}</div>
                    <div className='trip-date'>{`${formatDate(
                      plan.startDate
                    )} - ${formatDate(plan.endDate)}`}</div>
                  </div>
                  <button
                    className='open-plans'
                    onClick={(e) => handleSubmit(e, userData.userID, plan)}
                  >
                    Open Plans
                  </button>
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
