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
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state.email;

  const { userData, updateUserData } = useUser();

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const isInitialMount = useRef(false);

  useEffect(() => {
    if (email && !isInitialMount.current) {
      updateUserData(email);
      isInitialMount.current = true;
    }
  }, [email, updateUserData]);
  console.log(userData.firstName);

  if (!userData || Object.keys(userData).length === 0) {
    return <div>Loading...</div>;
  }

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLogout = async (e) => {
    //this is the function that handles the logout
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
      <Trips userData={userData} tripImage={tripImage} />
      <PlanTrip />
    </div>
  );
};

export default Dashboard;
