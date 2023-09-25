import React from 'react';
import './register.css';
import { RegisterInput } from './registerComponents/registerInput.jsx';

const Register = () => {
  return (
    <div className='container-center-horizontal'>
      <div className='register screen'>
        <RegisterInput />
      </div>
    </div>
  );
};

export default Register;
