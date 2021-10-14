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
import styled from "styled-components";

const ShopContainer = styled.div`
  background: rgba(255, 255, 251, 0.76);
  margin: 0;
`;

const ShopMain = styled.div`
  margin: 2em auto;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ShopMainTop = styled.div`
  margin: 2em auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ShopSearchInput = styled.input`
  margin: 0;
  width: 250px;
  height: 2.5rem;
  border: 1px solid lightgrey;
  display: flex;
  align-items: center;
`;

const ShopMainTopBtn = styled.div`
  display: flex;
  align-items: center;
`;

const ShopTopBtn = styled.button`
  height: 2.5rem;
  margin-left: 1rem;
  background: lightgrey;
  padding: 10px;
  cursor: pointer;
  border: 1px solid lightgrey;
  &:hover {
    border: 1px solid #f2db66;
    background: #f2db66;
  }
`;

const ShopMainItems = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  grid-gap: 25px;
  position: relative;
  margin: 3em auto;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const ShopItemStyle = styled.div`
  width: 100%;
  padding: 5%;
  margin: 0 auto;
  cursor: pointer;
  border: 1px solid rgba(211, 211, 211, 0.568);
  background-color: #ffffff;
  border-radius: 5px;
  &:hover {
    opacity: 0.6;
  }
`;

const ShopItemImg = styled.img`
  object-fit: cover;
  width: 99%;
  height: 200px;
`;

const ShopItemName = styled.p`
  text-align: left;
  text-decoration: none;
  color: black;
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 1rem;
`;

const ShopItemCost = styled.p`
  text-align: left;
  text-decoration: none;
  color: black;
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 1rem;
`;

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
  const [searchedItemActive, setSearchedItemActive] = useState(false);
  const history = useHistory();

  const itemsFromRedux = useSelector((state) => state.itemsReducer);
  console.log("searchedItem", searchedItem);

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
            })),
          );
        });
    } else {
      let result = [];
      db.collection("items")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          console.log("snapshot", snapshot);
          setItems(
            searchedItem.map((v) => {
              snapshot.docs.filter((doc) => v.id === doc.id);
            }),
          );
        });
      console.log("items", items);
      console.log("result", result);

      result.map((v) => console.log("v", v));
      console.log("items", items);
    }
  }, []);

  const searchingFunction = (e) => {
    const filterItem = items.filter((item) =>
      item.data.itemName.toLowerCase().includes(e.target.value.toLowerCase()),
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
        <ShopContainer>
          <Header />
          <ShopMain>
            {/* <div className="shop__main__addAction"> */}
            <ShopMainTop>
              <ShopSearchInput
                type="text"
                onChange={searchingFunction}
                placeholder="Search by Item Name"
              />
              {/* <ShopSearchInput> */}

              <ShopMainTopBtn>
                {/* <ShopMainTopBtn> */}
                <Link to="/manageItem">
                  <ShopTopBtn className="btn_post">My Items</ShopTopBtn>
                  {/* <ShopTopBtn>*/}
                </Link>
                <Link to="/uploadItem">
                  <ShopTopBtn className="btn_post">Post Ad</ShopTopBtn>
                  {/* <ShopTopBtn> */}
                </Link>
              </ShopMainTopBtn>
            </ShopMainTop>

            {/* <div className="items"> */}
            <ShopMainItems>
              {searchedItemActive
                ? selectedItem.map(
                    ({ id, data: { itemName, itemImg, itemCost, itemRegion, itemDesc } }) => (
                      <>
                        {/* <ShopItem> */}
                        <ShopItemStyle
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
                          <ShopItemImg src={itemImg} alt="" />
                          <ShopItemName className="itemName">{itemName}</ShopItemName>
                          <ShopItemCost>${itemCost}</ShopItemCost>
                        </ShopItemStyle>
                      </>
                    ),
                  )
                : items.map(
                    ({ id, data: { itemName, itemImg, itemCost, itemRegion, itemDesc } }) => (
                      <>
                        {/* <ShopItem> */}
                        <ShopItemStyle
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
                          <ShopItemImg src={itemImg} alt="" />
                          <ShopItemName>{itemName}</ShopItemName>
                          <ShopItemCost>${itemCost}</ShopItemCost>
                        </ShopItemStyle>
                      </>
                    ),
                  )}
            </ShopMainItems>
          </ShopMain>
        </ShopContainer>
      )}
    </>
  );
};

export default Shop;
