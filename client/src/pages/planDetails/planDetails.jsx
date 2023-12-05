import React, { useState } from 'react';
import '../dashboard/dashboard.css';
import './planDetails.css';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { Destinations } from './planDetailsComponents/destinations.jsx';
import { AddDestinations } from './planDetailsComponents/addDestinations.jsx';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext.js';
import { useContext } from 'react';

const PlanDetails = (props) => {
  const { banner, tripImage } = props;
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const location = useLocation();
  const [planData, setPlanData] = useState(location.state.plan);

  const updatePlanData = (newDestination) => {
    setPlanData((prevPlanData) => {
      // Check if 'destinations' exists, if not create an empty array
      const updatedDestinations = prevPlanData.destinations
        ? [...prevPlanData.destinations, newDestination]
        : [newDestination];

      // Return updated plan data
      return { ...prevPlanData, destinations: updatedDestinations };
    });
  };

  const [isMenuVisible, setIsMenuVisible] = useState(false);

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
    <div className='planDetails screen'>
      <div className='banner-container'>
        <div
          className='banner-img'
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
        <div className='banner-overlay'>
          <div className='banner-title'>Travel Plan Details</div>
          <div className='banner-subtitle'>Trip to Spain</div>
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
      <div className='planDetails-components-container'>
        <Destinations tripImage={tripImage} plan={planData} />
        <AddDestinations
          onAddDestination={updatePlanData}
          planID={planData.planID}
        />
      </div>
    </div>
  );
};

export default PlanDetails;
