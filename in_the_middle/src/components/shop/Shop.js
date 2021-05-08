import React, { useState, useEffect } from "react";
import "./Shop.css";
import Header from "../header/Header";
import { Link, Redirect, Route } from "react-router-dom";
import ShopItem from "./ShopItem";
import { db } from "../../firebase";
import ShopDetail from "../shopDetail/ShopDetail";

const Shop = ({ shopDetail, searchBtnClicked, itemViews }) => {
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [views, setViews] = useState(0);
  const [details, setDetails] = useState();
  const [items, setItems] = useState([]);
  const [toShopDetail, setToShopDetail] = useState(shopDetail);
  const [selectedItem, setSelectedItem] = useState(null);
  const selectItem = (items) => {
    setSelectedItem(items);
  };

  console.log(itemViews);
  useEffect(() => {
    db.collection("items")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
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
      {toShopDetail ? (
        <>
          <ShopDetail
            // key={id}
            selectedItem
            img={img}
            name={name}
            cost={cost}
            views={views}
            location={location}
            description={description}
            shopDetail={toShopDetail}
          />
        </>
      ) : (
        // </Redirect>
        <div className='container'>
          {/* {searchBtnClicked ? <div></div> : } */}
          <Header />
          <div className='shop__main'>
            <div className='shop__main__addAction'>
              <Link to='/manageItem'>
                <button className='btn_post'>Manage Item</button>
              </Link>
              <Link to='/uploadItem'>
                <button className='btn_post'>Post Ad</button>
              </Link>
            </div>
            {/* <div className='shop__link'> */}
            <div className='items'>
              {items.map(({ id, data: { itemName, itemImg, itemCost, itemRegion, itemDesc } }) => (
                <>
                  <div
                    className='item'
                    onClick={(e) => {
                      console.log(toShopDetail);
                      console.log(itemName);
                      console.log(views);
                      e.preventDefault();
                      setToShopDetail(true);
                      setName(itemName);
                      setImg(itemImg);
                      setViews(itemViews + 1);
                      setCost(itemCost);
                      setDescription(itemDesc);
                      setLocation(itemRegion);
                    }}>
                    <img src={itemImg} alt='' />
                    <p className='itemName'>{itemName}</p>
                    <p>${itemCost}</p>
                    {/* <p>{itemViews}</p> */}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        // </div>
      )}
    </>
  );
};

export default Shop;
