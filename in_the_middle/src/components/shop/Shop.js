import React, { useState, useEffect, useCallback } from "react";
import "./Shop.css";
import Header from "../header/Header";
import { Link, Redirect, Route } from "react-router-dom";
import ShopItem from "./ShopItem";
import { db } from "../../firebase";
import ShopDetail from "../shopDetail/ShopDetail";
import { useDispatch, useSelector } from "react-redux";
import itemsReducer, { ITEM } from "../../reducers/itemsReducer";

const Shop = ({ shopDetail, searchBtnClicked, itemViews, searchedItem }) => {
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [views, setViews] = useState(0);
  const [details, setDetails] = useState();
  const [items, setItems] = useState([]);
  const [toShopDetail, setToShopDetail] = useState(shopDetail);
  const [selectedItem, setSelectedItem] = useState([]);
  const [test, setTest] = useState("");
  const [searchedItemActive, setSearchedItemActive] = useState(false);

  const dispatch = useDispatch();
  const itemsFromRedux = useSelector((state) => state.itemsReducer);
  const selectItem = (items) => {
    setSelectedItem(items);
  };

  // console.log("searchedItem in Shop", searchedItem);
  // console.log(itemViews);

  useEffect(() => {
    // console.log("db 실행 in shop");

    if (!searchedItem) {
      console.log("searchedItem 없음");
      db.collection("items")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setItems(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });

      // });
      // setSearchedItemActive(true);
    } else {
      searchedItemActiveFunction();
    }
    console.log("rerender");
    console.log("searchedItemActive:", searchedItemActive);
    console.log("test", test);
  }, []);

  const searchedItemActiveFunction = useCallback(
    () => {
      setSearchedItemActive(async (prev) => await prev);
      setTest("testest");
      console.log("itemsFromRedux", itemsFromRedux);
      console.log("searchedItem 있음");
      console.log("items", items);
      // setSelectedItem(searchedItem);
      console.log("searchedItem in Shop in else", searchedItem);
    },
    []
    // }, []);
  );
  // useEffect(() => {
  //   if (searchedItem) {
  //     setSearchedItemActive((prev) => !prev);
  //     console.log("itemsFromRedux", itemsFromRedux);
  //     console.log("searchedItem 있음");
  //     console.log("items", items);
  //     setSelectedItem(searchedItem);
  //     console.log("searchedItem in Shop in else", searchedItem);
  //     console.log("rerender");
  //     console.log("searchedItemActive:", searchedItemActive);
  //   }
  // }, [searchedItem]);

  useEffect(() => {
    return dispatch(
      {
        // itemsReducer({
        type: ITEM,
        payload: {
          items,
        },
      }
      // })
    );
  }, [items]);

  // console.log(items);
  console.log(searchedItem);
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
        <div className="container">
          {/* {searchBtnClicked ? <div></div> : } */}
          <Header />
          <div className="shop__main">
            <div className="shop__main__addAction">
              <Link to="/manageItem">
                <button className="btn_post">Manage Item</button>
              </Link>
              <Link to="/uploadItem">
                <button className="btn_post">Post Ad</button>
              </Link>
            </div>
            {/* <div className='shop__link'> */}
            <div className="items">
              {searchedItem
                ? searchedItem.map(
                    ({ id, data: { itemName, itemImg, itemCost, itemRegion, itemDesc } }) => (
                      <>
                        <div
                          className="item"
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
                          <img src={itemImg} alt="" />
                          <p className="itemName">{itemName}</p>
                          <p>${itemCost}</p>
                          {/* <p>{itemViews}</p> */}
                        </div>
                      </>
                    )
                  )
                : // }))}
                  // {
                  items.map(
                    ({ id, data: { itemName, itemImg, itemCost, itemRegion, itemDesc } }) => (
                      <>
                        <div
                          className="item"
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
                          <img src={itemImg} alt="" />
                          <p className="itemName">{itemName}</p>
                          <p>${itemCost}</p>
                          {/* <p>{itemViews}</p> */}
                        </div>
                      </>
                    )
                  )}
            </div>
          </div>
        </div>
        // </div>
      )}
    </>
  );
};

export default Shop;
