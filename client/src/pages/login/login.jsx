import React from 'react';
import './login.css';
import {LoginInput} from './loginComponents/loginInput.jsx';

const Login = () => {
  return (
    <div className='container-center-horizontal'>
      <div className='login screen'>
        <LoginInput />
      </div>
    </div>
  );
};

export default Login;
