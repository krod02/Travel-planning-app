import React from 'react';
import '../dashboard.css';

export const PlanTrip = (props) => {
  const [inputs, setInputs] = React.useState({
    tripName: '',
    tripLocation: '',
    tripStartDate: '',
    tripEndDate: '',
  });
  const handleChange = (e) => {
    // updating state of inputs wnen they change
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  return (
    <div className='plan-trip'>
      <div className='plan-trip-title-container'>
        <div className='plan-trip-title'>Plan new Trip</div>
        <div className='plan-trip-underline'></div>
      </div>
      <div className='plan-trip-wrapper'>
        <div className='input-trip-container'>
          <div className='input-trip'>
            <input
              className='trip-name-input'
              name='tripName'
              type='text'
              placeholder='Name'
              required
              onChange={handleChange}
            />
          </div>
          <div className='input-trip'>
            <input
              className='trip-location-input'
              name='tripLocation'
              type='text'
              placeholder='Location'
              required
              onChange={handleChange}
            />
          </div>
          <div className='input-trip'>
            <input
              className='start-date-input'
              name='tripStartDate'
              type='text'
              placeholder='Start Date'
              required
              onChange={handleChange}
            />
          </div>
          <div className='input-trip'>
            <input
              className='end-date-input'
              name='tripEndDate'
              type='text'
              placeholder='End Date'
              required
              onChange={handleChange}
            />
          </div>
          <div className='input-trip-button'>
            <button className='plan-trip-button' type='submit'>
              Begin Plans
            </button>
          </div>
        </div>

        <div className='invite-partner-container'>
          <div className='invite-partner-title-container'>
            <div className='invite-partner-title'>Invite a Partner</div>
            <div className='invite-partner-subtitle'>
              Plan with your friends
            </div>
          </div>

          <div className='input-partner'>
            <input
              className='partner-email-input'
              name='partnerEmail'
              type='text'
              placeholder='Partner Email'
              required
              onChange={handleChange}
            />
          </div>
          <div className='input-button-container '>
            <button className='invite-button' type='submit'>
              Invite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
