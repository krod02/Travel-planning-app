import React from 'react';
import './components.css';
import { useNavigate } from 'react-router-dom';

export const LoginInput = () => {

  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {// updating state of inputs on change of input
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  }

  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
  });
  const login = async (email, password) => {
    const res = await instance.post('/login', {
      email,
      password,
    });
    if (!res.data){
      return "User not found"
    } 
    return res.data; 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      const res = login(inputs.email, inputs.password);
      if (res === "User not found"){
        console.log(res);
      } else {
        navigate('/dashboard');
      }
    } catch (err){
      console.log(err);
    }
  }

  
  return (
    <form className='password-input' 
    // onSubmit={handleSubmit}
    >
      <div className="login-title">Login</div>
      <div className="form-control">
        <input 
          className="email-input"
          name="email" 
          type="text" 
          placeholder="Email"
          required
          onChange={handleChange} 
        />
      </div>
      <div className="form-control">
        <input
          className="password-input"
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <small>Error Message</small>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

