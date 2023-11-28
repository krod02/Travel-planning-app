import React from 'react';
import '../dashboard/dashboard.css';
import './destinationDetails.css';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

const DestinationDetails = (props) => {
  const { banner } = props;
  return (
    <div className='destinationDetails screen'>
      <div className='banner-container'>
        <div
          className='banner-img'
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
        <div className='banner-overlay'>
          <div className='banner-title'>Destination Details</div>
          <div className='banner-subtitle'>Madrid, Spain</div>
        </div>
        <Space className='user-avatar' direction='vertical' size={16}>
          <Space wrap size={16}>
            <Avatar className='avatar' size='large' icon={<UserOutlined />} />
          </Space>
        </Space>
      </div>
    </div>
  );
};

export default DestinationDetails;
