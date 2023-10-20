import React from 'react';
import './components.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LoginInput = () => {
  
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    // updating state of inputs wnen they change
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };
  console.log(inputs)

  const [error, setError] = React.useState(null); //state to store error message

  const navigate = useNavigate(); //using navigate hook to navigate to home page after login

  const instance = axios.create({
    //creating axios instance to make requests to server
    baseURL: 'http://localhost:8080',
  });
  const login = async (email, password) => {
    //function to make login request to server
    const res = await instance.post('/user/login', {
      email,
      password,
    });
    return res.data;
  };

  const handleSubmit = async (e) => {
    // function to handle submit when login button is clicked
    e.preventDefault();
    try {
      const result = await login(inputs.email, inputs.password);
      console.log(result);
      if (result && !result.error) {
        navigate('/home');
      }
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <form className='password-input' onSubmit={handleSubmit}>
      <div className='login-title'>Login</div>
      <div className='form-control'>
        <input
          className='email-input'
          name='email'
          type='text'
          placeholder='Email'
          required
          onChange={handleChange}
        />
      </div>
      <div className='form-control'>
        <input
          className='password-input'
          name='password'
          type='password'
          placeholder='Password'
          required
          onChange={handleChange}
        />
        {error && <small className='error-message'>{error}</small>}
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};
