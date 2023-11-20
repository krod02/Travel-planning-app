import React from 'react';
import './login.css';
import { LoginInput } from './loginComponents/loginInput.jsx';

const Login = (props) => {
  const { background } = props; // background image

  return (
    <div className='login screen'>
      <div
        className='background-img'
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div className='login-title-container'>
        <div className='login-title'>Travel</div>
        <div className='login-subtitle'>Assistant</div>
      </div>
      <LoginInput />
    </div>
  );
};

export default Login;
