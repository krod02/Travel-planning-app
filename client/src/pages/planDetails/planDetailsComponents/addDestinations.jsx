import React from 'react';
import '../planDetails.css';
import axios from 'axios';

const AddDestinations = (props) => {
  const { onAddDestination, planID } = props;

  const [inputs, setInputs] = React.useState({
    destinationLocation: '',
    destinationStartDate: '',
    destinationEndDate: '',
    destinationOrder: '',
  });

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
      // Fetch the image URL from Unsplash
      const imageUrlResponse = await instance.get('/destination/fetch-images', {
        params: { location: inputs.destinationLocation },
      });
      const imageUrl = imageUrlResponse.data;
      console.log('imageUrl:', imageUrlResponse);

      // Prepare the data for saving the destination
      // Prepare the data for the new destination
      const newDestinationData = {
        planID: planID,
        destinationName: inputs.destinationLocation,
        dateTo: inputs.destinationStartDate,
        dateFrom: inputs.destinationEndDate,
        destinationImage: imageUrl, // Add the fetched image URL
        orderInPlan: inputs.destinationOrder,
      };

      // Save the destination
      const saveResult = await instance.post(
        '/destination/save-destination',
        newDestinationData
      );

      if (saveResult.status === 200) {
        onAddDestination(saveResult.data);
      }
    } catch (err) {
      console.error('Error saving destination:', err);
    }
  };

  return (
    <div className='add-destination'>
      <div className='add-destination-title-container'>
        <div className='add-destination-title'>Add Destination</div>
      </div>
      <div className='add-destination-wrapper'>
        <div className='input-destination'>
          <input
            className='destination-location-input'
            name='destinationLocation'
            type='text'
            placeholder='Location'
            required
            onChange={handleChange}
          />
        </div>
        <div className='input-destination'>
          <input
            className='dateFrom-input'
            name='destinationStartDate'
            type='text'
            placeholder='Date From (DD/MM/YYYY)'
            required
            onChange={handleChange}
          />
        </div>
        <div className='input-destination'>
          <input
            className='dateTo-input'
            name='destinationEndDate'
            type='text'
            placeholder='Date To (DD/MM/YYYY)'
            required
            onChange={handleChange}
          />
        </div>
        <div className='input-destination'>
          <input
            className='destination-order-input'
            name='destinationOrder'
            type='text'
            placeholder='Order In Plan'
            required
            onChange={handleChange}
          />
        </div>
        <div className='add-destination-button-container'>
          <button className='add-destination-button' onClick={handleSubmit}>
            Add Destination
          </button>
        </div>
      </div>
    </div>
  );
};

export { AddDestinations };
