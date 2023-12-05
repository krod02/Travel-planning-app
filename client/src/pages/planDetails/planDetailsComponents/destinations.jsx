import React from 'react';
import '../planDetails.css';
import { useNavigate } from 'react-router-dom';

const Destinations = (props) => {
  const { tripImage, plan } = props;
  const Navigate = useNavigate();

  console.log('plan:', plan);

  // Ensure destinations is an array
  const destinationsArray = Array.isArray(plan.destinations)
    ? plan.destinations
    : Object.values(plan.destinations || {});

  // Filter out destinations with null or empty properties
  const validDestinations = destinationsArray.filter((destination) => {
    return (
      destination.destinationName && destination.dateFrom && destination.dateTo
    );
  });

  // Check if there are valid destinations
  const hasDestinations = validDestinations.length > 0;

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const onClick = () => {
    Navigate('/destinationDetails');
  };

  return (
    <div className='destinations-wrapper'>
      <div className='destinations-title-container'>
        <div className='trip-title'>{plan.planName}</div>
        <div className='trip-date-2'>{`${formatDate(
          plan.startDate
        )} - ${formatDate(plan.endDate)}`}</div>
      </div>
      {hasDestinations ? (
        <div className='destinations-container'>
          {validDestinations.map((destination, index) => (
            <div key={index} className='destination'>
              <div
                className='destination-img'
                style={{
                  backgroundImage: `url(${
                    destination.destinationImage || tripImage
                  })`,
                }}
              ></div>
              <div className='destination-info'>
                <div className='destination-location'>{`${index + 1}. ${
                  destination.destinationName
                }`}</div>
                <div className='destination-date'>{`${formatDate(
                  destination.dateFrom
                )} - ${formatDate(destination.dateTo)}`}</div>
                <button className='view-details' onClick={onClick}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='no-destinations'>No destinations added yet.</div>
      )}
    </div>
  );
};
export { Destinations };
