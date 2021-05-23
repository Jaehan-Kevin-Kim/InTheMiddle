import React from 'react';
import './PostInputOption.css';

function PostInputOption({ Icon, name, color }) {
  return (
    <div className='postInputOption' style={{ color: color, padding: '5px' }}>
      <Icon />
      <div className='postInputOption__name'>{name}</div>
    </div>
  );
}

export default PostInputOption;
