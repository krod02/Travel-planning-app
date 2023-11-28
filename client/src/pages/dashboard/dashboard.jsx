import React from 'react';
import { useEffect, useRef } from 'react';
import './dashboard.css';
import { useLocation } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { Trips } from './dashboardComponents/trips.jsx';
import { PlanTrip } from './dashboardComponents/planTrip.jsx';
import { useUser } from '../../context/userContext.js';

const Dashboard = (props) => {
  const { banner, tripImage } = props;

  const location = useLocation();
  const email = location.state.email;

  const { userData, updateUserData } = useUser();

  const isInitialMount = useRef(false);

  useEffect(() => {
    if (email && !isInitialMount.current) {
      updateUserData(email);
      isInitialMount.current = true;
    }
  }, [email]);

  if (!userData || Object.keys(userData).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className='dashboard screen'>
      <div className='banner-container'>
        <div
          className='banner-img'
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
        <div className='banner-overlay'>
          <div className='banner-title'>Welcome Kevin</div>
          <div className='banner-subtitle'>Plan to travel the world!</div>
        </div>
        <Space className='user-avatar' direction='vertical' size={16}>
          <Space wrap size={16}>
            <Avatar className='avatar' size='large' icon={<UserOutlined />} />
          </Space>
        </Space>
      </div>
      <Trips tripImage={tripImage} />
      <PlanTrip />
    </div>
  );
};

export default Dashboard;
