import React from 'react';
import '../dashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const PlanTrip = (props) => {
  const { userData, email } = props;

  const [inputs, setInputs] = React.useState({
    planName: '',
    startDate: '',
    endDate: '',
  });
  const Navigate = useNavigate();

  const handleChange = (e) => {
    // updating state of inputs wnen they change
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const instance = axios.create({
    //creating axios instance to make requests to server
    baseURL: 'http://localhost:8080',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tripData = {
        ...inputs,
        userID: userData.userID,
      };
      const saveResult = await instance.post(
        '/dashboard/create-trip',
        tripData
      );
      const planData = saveResult.data;
      if (saveResult.status === 200) {
        Navigate('/planDetails', { state: { plan: planData, email: email } });
      }
    } catch (err) {
      console.error('Error saving trip:', err);
    }
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
              name='planName'
              type='text'
              placeholder='Name'
              required
              onChange={handleChange}
            />
          </div>
          <div className='input-trip'>
            <input
              className='start-date-input'
              name='startDate'
              type='text'
              placeholder='Start Date (DD/MM/YYYY)'
              required
              onChange={handleChange}
            />
          </div>
          <div className='input-trip'>
            <input
              className='end-date-input'
              name='endDate'
              type='text'
              placeholder='End Date (DD/MM/YYYY)'
              required
              onChange={handleChange}
            />
          </div>
          <div className='input-trip-button'>
            <button className='plan-trip-button' onClick={handleSubmit}>
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
            <button className='invite-button'>Invite</button>
          </div>
        </div>
      </div>
    </div>
  );
};
