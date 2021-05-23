import React from 'react';
import './FeedInputOption.css';

function FeedInputOption({ Icon, name, color }) {
  return (
    <div className='feedInputOption'>
      <div className='icon' style={{ color: color }}>
        <Icon />
      </div>
      <div className='name'>{name}</div>
    </div>
  );
}

export default FeedInputOption;
