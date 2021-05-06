import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShopDetail from "../shopDetail/ShopDetail";

function ShopItem({ id, img, name, cost, views }) {
  const [toShopDetail, setToShopDetail] = useState(false);

  const onClickItem = (e) => {
    console.log("toShopDetail: ", toShopDetail);
    e.preventDefault();
    setToShopDetail(true);
  };

  console.log(img, name, cost, views);
  return (
    <div onClick={onClickItem}>
      {toShopDetail ? (
        <Link className='shop__link' to='/shopDetail'>
          <ShopDetail
            key={id}
            img={img}
            name={name}
            cost={cost}
            views={views}
            location='calgary'
            description='Nice'
          />
        </Link>
      ) : (
        <div
          className='item'
          // onClick={() => onClickItem({ img, name, cost, views })}
          // onClick={
          //   <Link className='shop__link' to='/shopDetail'>
          //     <ShopDetail
          //       key={id}
          //       img={img}
          //       name={name}
          //       cost={cost}
          //       location='calgary'
          //       description='Nice'
          //       views={views}
          //     />
          //   </Link>
          // }
        >
          <img src={img} alt='' />
          <p>{name}</p>
          <p>${cost}</p>
          <p>{views}</p>
        </div>
      )}
    </div>
  );
}

export default ShopItem;
