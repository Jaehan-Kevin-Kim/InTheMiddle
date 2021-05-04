import React from 'react';

import './Shop.css';

import Header from '../header/Header';

function Shop() {
  return (
    <>
      <Header />

      <div className='shop__main'>
        <div>
          <img
            src='https://specials-images.forbesimg.com/imageserve/5d3703e2f1176b00089761a6/960x0.jpg?cropX1=836&cropX2=5396&cropY1=799&cropY2=3364'
            alt=''
          />
          <p>Laptop</p>
          <p>$500</p>
          <p>Views</p>
        </div>
      </div>
    </>
  );
}

export default Shop;
