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
    // updating state of inputs on change of input
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: 'http://localhost:8080',
  });
  const login = async (email, password) => {
    const res = await instance.post('/user/login', {
      email,
      password,
    });
    if(res.data.error){
      alert(res.data.error);
      return;
    }
    return res.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(inputs.email, inputs.password);
      console.log(res);
      if (res){
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
