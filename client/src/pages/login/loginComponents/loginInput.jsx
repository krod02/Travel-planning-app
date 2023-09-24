import React from 'react';
import './components.css';
import { useNavigate } from 'react-router-dom';

export const LoginInput = () => {
  
  return (
    <form className='password-input' 
    // onSubmit={handleSubmit}
    >
      <div className="login-title">Login</div>
      <div className="form-control">
        <input 
          className="email-input" 
          type="text" 
          placeholder="Email"
          required
          // onChange={handleChange} 
        />
      </div>
      <div className="form-control">
        <input
          className="password-input"
          type="password"
          placeholder="Password"
          required
          // onChange={handleChange}
        />
        <small>Error Message</small>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

