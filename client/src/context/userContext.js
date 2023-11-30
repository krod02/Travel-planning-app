import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const localData = localStorage.getItem('user');
    return localData
      ? JSON.parse(localData)
      : { users: {}, currentUserID: null };
  });

  // This is the axios instance that is used to make requests to the server
  const instance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
  });

  const formatUserData = (data) => {
    // Assuming 'data' has the structure { "6": { ... user data ... } }
    const userId = Object.keys(data)[0];
    const user = data[userId];

    if (!user) return {};

    // Destructure the user data
    const { userID, email, firstName, lastName, plans = {} } = user;

    // Format the plans
    let formattedPlans = Object.values(plans).map((plan) => {
      let destinations = Object.values(plan.destinations || {}).map(
        (destination) => {
          let pointsOfInterest = Object.values(
            destination.pointsOfInterest || {}
          );
          return { ...destination, pointsOfInterest };
        }
      );

      return { ...plan, destinations };
    });

    return { userID, email, firstName, lastName, plans: formattedPlans };
  };

  const updateUserData = async (email) => {
    try {
      const res = await instance.get('/user/data', {
        params: { email },
        withCredentials: true,
      });

      const formattedData = formatUserData(res.data);
      setUserData(formattedData);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (err) {
      console.error('Error updating user data: ', err);
    }
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, formatUserData }}>
      {children}
    </UserContext.Provider>
  );
};
