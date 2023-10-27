import React from 'react';
import './dashboard.css';


const Dashboard = (props) => {
    const { banner } = props;
    <div className='dashboard screen'>
        <div
        className='banner-img'
        style={{ banner: `url(${banner})` }}
      ></div>

    </div>

};

export default Dashboard;