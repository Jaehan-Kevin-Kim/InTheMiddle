import React, { useState, useEffect } from "react";
import "./Shop.css";
import Header from "../header/Header";
import { Link } from "react-router-dom";
import ShopItem from "./ShopItem";
import { db } from "../../firebase";
import ShopDetail from "../shopDetail/ShopDetail";

function Shop() {
  const [itemImg, setItemImg] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [itemViews, setItemViews] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // setItemImg(
    //   "https://specials-images.forbesimg.com/imageserve/5d3703e2f1176b00089761a6/960x0.jpg?cropX1=836&cropX2=5396&cropY1=799&cropY2=3364"
    // );
    // setItemName("Laptop");
    // setItemCost(500);
    // setItemViews(200);
    db.collection("items").onSnapshot((snapshot) =>
      setItems(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
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
          <div className='item'>
            {items.map(({ id, data: { itemName, itemImg, itemViews, itemCost } }) => (
              <Link
                className='shop__link'
                to='/shopDetail'
                key={id}
                img={itemImg}
                name={itemName}
                cost={itemCost}
                location='calgary'
                description='Nice'
                views={itemViews}>
                <ShopItem
                  key={id}
                  img={itemImg}
                  name={itemName}
                  cost={itemCost}
                  views={itemViews}
                />
                {/* <ShopDetail
                  
                /> */}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
