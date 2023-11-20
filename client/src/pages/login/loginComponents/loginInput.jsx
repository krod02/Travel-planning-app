import React from 'react';
import '../login.css';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import { useContext } from 'react';

export const LoginInput = () => {
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    // updating state of inputs wnen they change
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const [error, setError] = React.useState(null); //state to store error message

  const navigate = useNavigate(); //using navigate hook to navigate to home page after login

  const { login } = useContext(AuthContext); //using login function from authContext

  const handleSubmit = async (e) => {
    // function to handle submit when login button is clicked
    e.preventDefault();
    try {
      await login(inputs.email, inputs.password); //calling login function from authContext
      navigate('/dashboard');
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message); //setting error message
    }
  };

  return (
    <form className='password-input-container' onSubmit={handleSubmit}>
      <div className='title-container'>
        <h1 className='input-title'>Login</h1>
      </div>
      <div className='login-sub-container'>
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
        <div className='submit-container'>
          <button className='submit-button' type='submit'>
            Login
          </button>
        </div>
        <span className='register-text'>
          Don't have an account? <Link to='/register'>Register</Link>
        </span>
      </div>
    </form>
  );
};
