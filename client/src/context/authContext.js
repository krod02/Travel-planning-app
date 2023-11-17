import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // The user state is used to keep track of the user's login status
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  // This is the axios instance that is used to make requests to the server
  const instance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
  });

  // This function is used to login a user and makes a request to the server
  const login = async (email, password) => {
    const res = await instance.post('/user/login', {
      email,
      password,
    });
    if (res.data.error) {
      alert(res.data.error);
      return;
    }
    setUser(res.data);
  };

  // This function is used to logout a user and makes a request to the server
  const logout = async () => {
    setUser(null);
  };

  // This useEffect hook is used to save the user state to local storage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // This is the context provider that wraps around the entire application
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
