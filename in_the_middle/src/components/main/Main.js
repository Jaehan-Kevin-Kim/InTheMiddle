import React from 'react';
import './Main.css';
import Header from '../header/Header';
import Shop from '../shop/Shop';

function Main({ onClick }) {
  // const onClick = () => {
  //   <Shop />;
  // };
  return (
    <>
      <Header />
      <div className='main__main'>
        <div className='main__bennerImg'>
          <img src='' alt='' />
        </div>
        <div className='main__selectBox'>
          <div className='selectBox'>
            <button>Shop</button>

            {/* </div>
          <div className='selectBox'> */}
            <button>Feed</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;