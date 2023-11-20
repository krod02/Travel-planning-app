import React from 'react';
import '../register.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const RegisterInput = () => {
  const [inputs, setInputs] = React.useState({
    //state to store inputs
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    // updating state of inputs wnen they change
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const [error, setError] = React.useState(null); //state to store error message

  const navigate = useNavigate(); //using navigate hook to navigate to login page after register

  const instance = axios.create({
    //creating axios instance to make requests to server
    baseURL: 'http://localhost:8080',
  });

  const register = async (email, password, firstName, lastName) => {
    //function to make register request to server
    const res = await instance.post('/user/register', {
      //making post request to server
      email,
      password,
      firstName,
      lastName,
    });
    return res.data;
  };

  const handleSubmit = async (e) => {
    // function to handle submit when register button is clicked
    e.preventDefault();
    try {
      const result = await register(
        //calling register function
        inputs.email,
        inputs.password,
        inputs.firstName,
        inputs.lastName
      );
      if (result && !result.error) {
        navigate('/');
      }
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message); //setting error message
    }
  };

  return (
    <div className='register-wrapper'>
      <form className='register-input' onSubmit={handleSubmit}>
        <div className='register-sub-container'>
          <div className='form-control'>
            <input
              className='firstName-input'
              name='firstName'
              type='text'
              placeholder='First Name'
              required
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <input
              className='lastName-input'
              name='lastName'
              type='text'
              placeholder='Last Name'
              required
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <input
              className='email-input-1'
              name='email'
              type='text'
              placeholder='Email'
              required
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <input
              className='password-input-1'
              name='password'
              type='password'
              placeholder='Password'
              required
              onChange={handleChange}
            />
            {error && <small className='error-message'>{error}</small>}
          </div>
        </div>
        <div className='register-button-container'>
          <button className='register-button' type='submit'>
            Register
          </button>
          <span className='login-text'>
            Don't have an account? <Link to='/'>Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
};
