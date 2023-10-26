import React from 'react';
import './register.css';
import { RegisterInput } from './registerComponents/registerInput.jsx';

const Register = (props) => {
  const { background } = props;

  return (
    <div className='register screen'>
      <div
        className='background-img'
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div className='register-title-container'>
        <div className='register-title'>Register</div>
      </div>
      <RegisterInput />
    </div>
  );
};

export default Register;
