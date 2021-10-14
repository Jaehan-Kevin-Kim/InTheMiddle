import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShopDetail from "../shopDetail/ShopDetail";
import styled from "styled-components";

const ShopItemEach = styled.div``;

const ItemEach = styled.div``;

const ItemImg = styled.img``;

const ItemName = styled.p``;

const ItemCost = styled.p``;

function ShopItem({ id, img, name, cost, views }) {
  const [toShopDetail, setToShopDetail] = useState(false);

  const onClickItem = (e) => {
    console.log("toShopDetail: ", toShopDetail);
    e.preventDefault();
    setToShopDetail(true);
  };

  console.log(img, name, cost, views);
  return (
    <Link className="shop__link" to="/shopDetail">
      <ShopItemEach>
        {toShopDetail ? (
          <ShopDetail
            key={id}
            img={img}
            name={name}
            cost={cost}
            views={views}
            location="calgary"
            description="Nice"
            onClick={onClickItem}
          />
        ) : (
          <ItemEach>
            <img src={img} alt="" />
            <p>{name}</p>
            <p>${cost}</p>
            <ItemImg src={img} alt="" />
            <ItemName>{name}</ItemName>
            <ItemCost>${cost}</ItemCost>
          </ItemEach>
        )}
      </ShopItemEach>
    </Link>
  );
}

export default ShopItem;
