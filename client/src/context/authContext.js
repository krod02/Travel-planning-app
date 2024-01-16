import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// AuthContextProvider component that provides authentication context to its children
export const AuthContextProvider = ({ children }) => {
  // State hook for tracking user's login status
  // Initializes from localStorage if available, otherwise defaults to null
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  // Creating an axios instance for making HTTP requests with a base URL
  // withCredentials is set to true to include credentials in cross-site requests
  const instance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
  });

  // Function to handle user login
  // Makes a POST request to the server with email and password
  const login = async (email, password) => {
    const res = await instance.post('/user/login', {
      email,
      password,
    });
    if (res.data.error) {
      alert(res.data.error);
      return;
    }
    // Update the user state with the received data on successful login
    setUser(res.data);
  };

  // Function to handle user logout
  // Makes a POST request to the server to logout
  const logout = async () => {
    try {
      const res = await instance.post('/user/logout');
      if (res.data.error) {
        console.error('Logout error:', res.data.error);
        return;
      }
      // Remove user data from localStorage on successful logout
      localStorage.removeItem('user');
      // Update the user state to null to reflect logout in context
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // useEffect hook to persist the user state to localStorage
  // This ensures that user login state is saved across browser sessions
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // Providing user, login, and logout to all children components
  // This allows any child component to access and modify the authentication state
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

