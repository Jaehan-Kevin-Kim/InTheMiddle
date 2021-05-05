import React, { useState, useEffect } from "react";
import "./Shop.css";
import Header from "../header/Header";
import { Link } from "react-router-dom";
import ShopItem from "./ShopItem";

function Shop() {
  const [itemImg, setItemImg] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [itemViews, setItemViews] = useState(0);

  useEffect(() => {
    setItemImg(
      "https://specials-images.forbesimg.com/imageserve/5d3703e2f1176b00089761a6/960x0.jpg?cropX1=836&cropX2=5396&cropY1=799&cropY2=3364"
    );
    setItemName("Laptop");
    setItemCost(500);
    setItemViews(200);
  }, []);

  return (
    <>
      <div className='container'>
        <Header />
        <div className='shop_button'>
          <Link to='/uploadItem'>
            <button className='btn_post'>Post Ad</button>
          </Link>
        </div>
        <div className='shop__main'>
          <Link to='/shopDetail'>
            <div className='item'>
              <ShopItem img={itemImg} name={itemName} cost={itemCost} views={itemViews} />
              {/* <img
                src='https://specials-images.forbesimg.com/imageserve/5d3703e2f1176b00089761a6/960x0.jpg?cropX1=836&cropX2=5396&cropY1=799&cropY2=3364'
                alt=''
              />
              <p>Laptop</p>
              <p>$500</p>
              <p>Views</p> */}
            </div>
          </Link>
          {/* <div className='item'>
            <img
              src='https://specials-images.forbesimg.com/imageserve/5d3703e2f1176b00089761a6/960x0.jpg?cropX1=836&cropX2=5396&cropY1=799&cropY2=3364'
              alt=''
            />
            <p>Laptop</p>
            <p>$500</p>
            <p>Views</p>
          </div>
          <div className='item'>
            <img
              src='https://specials-images.forbesimg.com/imageserve/5d3703e2f1176b00089761a6/960x0.jpg?cropX1=836&cropX2=5396&cropY1=799&cropY2=3364'
              alt=''
            />
            <p>Laptop</p>
            <p>$500</p>
            <p>Views</p>
          </div>
          <div className='item' onClick={toShopItem}>
            <img
              src='https://specials-images.forbesimg.com/imageserve/5d3703e2f1176b00089761a6/960x0.jpg?cropX1=836&cropX2=5396&cropY1=799&cropY2=3364'
              alt=''
            />
            <p>Laptop</p>
            <p>$500</p>
            <p>Views</p>
          </div>
          <div className='item' onClick={toShopItem}>
            <img
              src='https://specials-images.forbesimg.com/imageserve/5d3703e2f1176b00089761a6/960x0.jpg?cropX1=836&cropX2=5396&cropY1=799&cropY2=3364'
              alt=''
            />
            <p>Laptop</p>
            <p>$500</p>
            <p>Views</p>
          </div>
          <div className='item' onClick={toShopItem}>
            <img
              src='https://specials-images.forbesimg.com/imageserve/5d3703e2f1176b00089761a6/960x0.jpg?cropX1=836&cropX2=5396&cropY1=799&cropY2=3364'
              alt=''
            />
            <p>Laptop</p>
            <p>$500</p>
            <p>Views</p>
          </div>
          <div className='item'>
            <img
              src='https://specials-images.forbesimg.com/imageserve/5d3703e2f1176b00089761a6/960x0.jpg?cropX1=836&cropX2=5396&cropY1=799&cropY2=3364'
              alt=''
            />
            <p>Laptop</p>
            <p>$500</p>
            <p>Views</p>
          </div>
          <div className='item'>
            <img
              src='https://specials-images.forbesimg.com/imageserve/5d3703e2f1176b00089761a6/960x0.jpg?cropX1=836&cropX2=5396&cropY1=799&cropY2=3364'
              alt=''
            />
            <p>Laptop</p>
            <p>$500</p>
            <p>Views</p>
          </div>
          <div className='item'>
            <img
              src='https://specials-images.forbesimg.com/imageserve/5d3703e2f1176b00089761a6/960x0.jpg?cropX1=836&cropX2=5396&cropY1=799&cropY2=3364'
              alt=''
            />
            <p>Laptop</p>
            <p>$500</p>
            <p>Views</p>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Shop;
