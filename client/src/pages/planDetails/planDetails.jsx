import React from 'react';
import '../dashboard/dashboard.css';
import './planDetails.css';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { Destinations } from './planDetailsComponents/destinations.jsx';
import { AddDestinations } from './planDetailsComponents/addDestinations.jsx';

const PlanDetails = (props) => {
  const { banner, tripImage } = props;

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
            <Avatar className='avatar' size='large' icon={<UserOutlined />} />
          </Space>
        </Space>
      </div>
      <div className='planDetails-components-container'>
        <Destinations tripImage={tripImage} />
        <AddDestinations />
      </div>
    </div>
  );
};

export default PlanDetails;
