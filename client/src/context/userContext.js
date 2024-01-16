import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// UserContextProvider component that provides user data context to its children components
export const UserContextProvider = ({ children }) => {
  // State for managing user data
  const [userData, setUserData] = useState(() => {
    const localData = localStorage.getItem('user');
    // Parse the stored data if available, or set default data structure
    return localData
      ? JSON.parse(localData)
      : { users: {}, currentUserID: null };
  });

  // Creating an axios instance for HTTP requests with a base URL
  const instance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
  });

  // Function to format raw user data into a structured format
  const formatUserData = (data) => {
    // Extracting the first userId from the data object
    const userId = Object.keys(data)[0];
    const user = data[userId];

    if (!user) return {};

    // Destructure relevant fields from the user data
    const { userID, email, firstName, lastName, plans = {} } = user;

    // Format plans data by mapping over each plan
    let formattedPlans = Object.values(plans).map((plan) => {
      // Format destinations data within each plan
      let destinations = Object.values(plan.destinations || {}).map(
        (destination) => {
          // Map over points of interest for each destination
          let pointsOfInterest = Object.values(
            destination.pointsOfInterest || {}
          );
          return { ...destination, pointsOfInterest };
        }
      );

      return { ...plan, destinations };
    });

    // Return the formatted user data
    return { userID, email, firstName, lastName, plans: formattedPlans };
  };

  // Function to update user data
  const updateUserData = async (email) => {
    try {
      // Making a GET request to retrieve user data based on email
      const res = await instance.get('/user/data', {
        params: { email },
        withCredentials: true,
      });

      const formattedData = formatUserData(res.data);
      // Updating state with formatted data
      setUserData(formattedData);
      // Storing the received data in localStorage
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (err) {
      console.error('Error updating user data: ', err);
    }
  };

  // Providing userData, updateUserData, and formatUserData to the children components
  return (
    <UserContext.Provider value={{ userData, updateUserData, formatUserData }}>
      {children}
    </UserContext.Provider>
  );
};

