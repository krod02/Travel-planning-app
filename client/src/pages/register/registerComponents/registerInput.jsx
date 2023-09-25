import React from 'react';
import './components.css';
import { useNavigate } from 'react-router-dom';

export const RegisterInput = () => {
  return (
    <form
      className='register-input'
      // onSubmit={handleSubmit}
    >
      <div className='register-title'>Register</div>
      <div className='form-control'>
        <input
          className='firstName-input'
          type='text'
          placeholder='First Name'
          required
          // onChange={handleChange}
        />
      </div>
      <div className='form-control'>
        <input
          className='lastName-input'
          type='text'
          placeholder='Last Name'
          required
          // onChange={handleChange}
        />
      </div>
      <div className='form-control'>
        <input
          className='email-input-1'
          type='text'
          placeholder='Email'
          required
          // onChange={handleChange}
        />
      </div>
      <div className='form-control'>
        <input
          className='password-input-1'
          type='password'
          placeholder='Password'
          required
          // onChange={handleChange}
        />
        <small>Error Message</small>
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};
