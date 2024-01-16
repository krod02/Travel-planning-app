import React from 'react';
import '../dashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const PlanTrip = (props) => {
const { userData, email } = props;

// State hook for managing input fields. Initialized with empty values.
const [inputs, setInputs] = React.useState({
  planName: '',
  startDate: '',
  endDate: '',
});

const Navigate = useNavigate();

// Function to handle changes in input fields
const handleChange = (e) => {
  // Update the inputs state based on the input field's name and its new value
  // Uses functional update to correctly update the state based on the previous state
  setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
};

// Creating an axios instance with a base URL for making HTTP requests
const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

// Function to handle form submission
const handleSubmit = async (e) => {
  e.preventDefault(); 

  try {
    // Constructing the trip data object from inputs and the user's ID
    const tripData = {
      ...inputs,
      userID: userData.userID,
    };

    // Sending a POST request to create a new trip, passing the trip data
    const saveResult = await instance.post('/dashboard/create-trip', tripData);

    const planData = saveResult.data;

    if (saveResult.status === 200) {
      // Navigate to the plan details page, passing plan data and email as state
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
