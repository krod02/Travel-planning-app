import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import './styleguide.css';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { UserContextProvider } from './context/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
