import React from 'react';
import './dashboard.css';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { Trips } from './dashboardComponents/trips.jsx';

const Dashboard = (props) => {
  const { banner, tripImage } = props;

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
    </div>
  );
};

export default Dashboard;
