import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import './dashboard.css';
import { useLocation } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { Trips } from './dashboardComponents/trips.jsx';
import { PlanTrip } from './dashboardComponents/planTrip.jsx';
import { useUser } from '../../context/userContext.js';
import { AuthContext } from '../../context/authContext.js';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = (props) => {
    const { banner, tripImage } = props;

    const navigate = useNavigate();
  
    // Accessing the logout function from AuthContext to manage authentication state
    const { logout } = useContext(AuthContext);
  
    // Hook to access the current location object, useful for reading URL state
    const location = useLocation();
    const email = location.state.email;
  
    // Custom hook to manage and access user data
    const { userData, updateUserData } = useUser();
  
    // State to manage visibility of the menu
    const [isMenuVisible, setIsMenuVisible] = useState(false);
  
    // Ref to track the initial mounting of the component
    // Prevents repetitive API calls or updates on component re-renders
    const isInitialMount = useRef(false);
  
    // Effect hook to update user data based on the provided email
    // It runs only when the email or updateUserData changes
    useEffect(() => {
      // Check if email exists and it's the initial component mount
      if (email && !isInitialMount.current) {
        updateUserData(email);

        // Set the ref to true after initial data fetch to prevent re-fetching
        isInitialMount.current = true;
      }
    }, [email, updateUserData]);
  
    // Conditional rendering to show a loading state if userData is not available yet
    if (!userData || Object.keys(userData).length === 0) {
      return <div>Loading...</div>;
    }
  
    // Function to toggle the visibility of the menu
    const toggleMenu = () => {
      // Sets the state to the opposite of its current value
      setIsMenuVisible(!isMenuVisible);
    };
  
    // Function to handle logout process
    const handleLogout = async (e) => {
      e.preventDefault(); 
      await logout(); 
      navigate('/'); 
    };

  return (
    <div className='dashboard screen'>
      <div className='banner-container'>
        <div
          className='banner-img'
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
        <div className='banner-overlay'>
          <div className='banner-title'>Welcome {userData.firstName}</div>
          <div className='banner-subtitle'>Plan to travel the world!</div>
        </div>
        <Space className='user-avatar' direction='vertical' size={16}>
          <Space wrap size={16}>
            <Avatar
              className='avatar'
              size='large'
              icon={<UserOutlined />}
              onClick={toggleMenu}
            />
            {isMenuVisible && (
              <div className='logout-menu'>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </Space>
        </Space>
      </div>
      <Trips userData={userData} tripImage={tripImage} email={email} />
      <PlanTrip userData={userData} email={email} />
    </div>
  );
};

export default Dashboard;
