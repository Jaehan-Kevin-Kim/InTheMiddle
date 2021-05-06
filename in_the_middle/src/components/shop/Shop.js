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
  const [toShopDetail, setToShopDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const selectItem = (items) => {
    setSelectedItem(items);
  };

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

  // const onClickItem = (e) => {
  //   console.log(toShopDetail);
  //   e.preventDefault();
  //   setToShopDetail(true);
  // };
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
            {/* {selectedItem && (
              <div>
                <ShopDetail
                  img={itemImg}
                  name={itemName}
                  cost={itemCost}
                  location='calgary'
                  description='Nice'
                  views={itemViews}
                />
              </div>
            )} */}

            {items.map(({ id, data: { itemName, itemImg, itemViews, itemCost } }) => (
              <ShopItem
                key={id}
                img={itemImg}
                name={itemName}
                cost={itemCost}
                views={itemViews}
                // onClickItem={selectItem}
              />
              // <Link className='shop__link' to='/shopDetail'>
              //   <div onClick={onClickItem}>
              //     {toShopDetail ? (
              //       <ShopDetail
              //         key={id}
              //         img={itemImg}
              //         name={itemName}
              //         cost={itemCost}
              //         views={itemViews}
              //         location='calgary'
              //         description='Nice'
              //       />
              //     ) : (
              //       <ShopItem
              //         key={id}
              //         img={itemImg}
              //         name={itemName}
              //         cost={itemCost}
              //         views={itemViews}
              //         // onClickItem={selectItem}
              //       />
              //     )}
              //   </div>
              // </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
