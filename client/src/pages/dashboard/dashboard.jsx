import React from 'react';
import './dashboard.css';
import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const Dashboard = (props) => {
  const { banner } = props;

  return (
    <div className='dashboard screen'>
      <div className='banner-container'>
        <div
          className='banner-img'
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
        <div className='banner-title'>Welcome Kevin</div>
        <div className='banner-subtitle'>Plan to travel the world!</div>
        <Avatar
          size={{
            xs: 24,
            sm: 32,
            md: 40,
            lg: 64,
            xl: 80,
            xxl: 100,
          }}
          icon={<AntDesignOutlined />}
        />
      </div>
    </div>
  );
};

export default Dashboard;
