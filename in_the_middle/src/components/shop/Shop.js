import React, { useState, useEffect, useCallback } from "react";
import "./Shop.css";
import Header from "../header/Header";
import { Link, Redirect, Route } from "react-router-dom";
import ShopItem from "./ShopItem";
import { db } from "../../firebase";
import ShopDetail from "../shopDetail/ShopDetail";
import { useHistory } from "react-router-dom";
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
  // const [selectedItemSaved, setSelectedItemSaved] = useState();
  // const [test, setTest] = useState("");
  const [searchedItemActive, setSearchedItemActive] = useState(false);
  // const [asdfg, setAsdfg] = useState(false);
  // const [sample, setSample] = useState([
  //   { id: 1, password: 11 },
  //   { id: 2, password: 22 },
  // ]);
  const history = useHistory();

  const itemsFromRedux = useSelector((state) => state.itemsReducer);
  console.log("searchedItem", searchedItem);

  // const selectItem = (items) => {
  //   setSelectedItem(items);
  // };

  const searchedItemFromHeader = useSelector((state) => state);

  useEffect(() => {
    console.log("searchedItemFromHeader", searchedItemFromHeader);
    console.log("searchedItem", searchedItem);
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
    } else {
      let result = [];
      db.collection("items")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          console.log("snapshot", snapshot);
          setItems(
            searchedItem.map(
              (v) => {
                snapshot.docs.filter((doc) => v.id === doc.id);
              }
              // result = snapshot.docs.filter((doc) => v.id === doc.id);
              // const some = snapshot.docs.some((doc) => v.id === doc.id);
              // console.log("some", some);
              // if (some) {
              //   console.log("some is working");
              //   console.log(v);
              //   setSelectedItemSaved(v);
              //   console.log("selectedItemSaved", selectedItemSaved);
              // setItems((prev) => [...prev, { id: v.id, data: v.data }]);
              // setSelectedItemSaved({ id: v.id });
            )
          );
        });
      // console.log("snapshot.docs", snapshot.docs.id);
      console.log("items", items);
      // });
      console.log("result", result);

      result.map(
        (v) => console.log("v", v)

        // id: v.id,
        // data: v.data(),
      );
      console.log("items", items);
    }

    // else {
    //   setSearchedItemActive((prev) => {
    //     return !prev;
    //   });

    //   setSample((prevState) => {
    //     return [...prevState, { id: 3, password: 33 }];
    //   });
    //   console.log("sample in useEffect", sample);

    //   console.log("searchedItem 있음");
    //   console.log("items", items);
    //   // setSelectedItem(searchedItem);
    //   console.log("searchedItem in Shop in else", searchedItem);
    //   console.log("searchedItemActive:", searchedItemActive);
    // searchedItemActiveFunction();

    // console.log("itemsFromRedux.data", itemsFromRedux.data);
  }, []);

  /*
  const searchedItemActiveFunction = useCallback(
    () => {
      setSearchedItemActive((prev) => {
        return !prev;
      });
      setTest("testest");
      console.log("itemsFromRedux", itemsFromRedux);
      console.log("searchedItem 있음");
      console.log("items", items);
      // setSelectedItem(searchedItem);
      console.log("searchedItem in Shop in else", searchedItem);
      console.log("searchedItemActive:", searchedItemActive);
    },
    []
    // }, []);
  );
  */
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

  /*
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
  */

  const searchingFunction = (e) => {
    const filterItem = items.filter((item) =>
      item.data.itemName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log("filterItem", filterItem);
    setSelectedItem(filterItem);
    setSearchedItemActive(true);
  };

  console.log(items);
  console.log("searchedItemBeforeReturn", searchedItem);
  return (
    <>
      {toShopDetail ? (
        <>
          <ShopDetail
            key={img}
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
        <div className="container">
          <Header />
          <div>
            <input type="text" onChange={searchingFunction} placeholder="Search by Item Name" />
          </div>
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
              {searchedItemActive
                ? selectedItem.map(
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
                        {/* <Link to="/shopDetail"> */}
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
                        </div>
                        {/* </Link> */}
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
