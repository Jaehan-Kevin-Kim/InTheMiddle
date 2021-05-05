import React from "react";

function ShopItem({ img, name, cost, views }) {
  console.log(img, name, cost, views);
  return (
    <div className='item'>
      <img src={img} alt='car' />
      <p>{name}</p>
      <p>${cost}</p>
      <p>{views}</p>
    </div>
  );
}

export default ShopItem;
