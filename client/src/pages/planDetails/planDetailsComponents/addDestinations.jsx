import React from 'react';
import '../planDetails.css';

const AddDestinations = (props) => {
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
            placeholder='Date To'
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
          <button className='add-destination-button' type='submit'>
            Add Destination
          </button>
        </div>
      </div>
    </div>
  );
};

export { AddDestinations };
