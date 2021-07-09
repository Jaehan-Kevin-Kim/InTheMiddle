import React, { useState } from "react";
import Header from "../header/Header";
import "./ShopDetail.css";
import { Avatar } from "@material-ui/core";
import { Link, Redirect, withRouter, useHistory } from "react-router-dom";
import Shop from "../shop/Shop";

const ShopDetail = ({ img, name, cost, location, description, shopDetail, views }) => {
  const [toShopDetail, setToShopDetail] = useState(shopDetail);
  // const ShopDetail = (props) => {
  // const [itemImg, setItemImg] = useState("");
  // const [itemCost, setItemCost] = useState("");
  // const [location, setLocation] = useState("");
  // const [itemName, setItemName] = useState("");
  // const [description, setDescription] = useState("");
  console.log(img, name, cost, location);
  console.log(useHistory());
  const history = useHistory();
  // console.log({ history, match });
  // console.log(props);

  const handleGoBack = () => {
    //history.goBack();
    setToShopDetail(false);
    history.push("/shop");
  };

  return (
    <>
      {toShopDetail ? (
        <>
          <Header />
          <button className="goBack_btn" onClick={handleGoBack}>
            Go Back
          </button>
          {/* <Link to='/shop'>Go back </Link> */}
          {/* <Redirect to='/shopDetail'> </Redirect> */}
          <div className="container">
            <div className="detail_item_main">
              <div className="detail_item">
                <img src={img} alt="" />
                <div className="detail_item_info">
                  <h1>{name}</h1>
                  <h3>${cost}</h3>
                  <h5>{location}</h5> location
                  <button className="btn btn_like">Like</button>
                  <div className="detail_item_info_msg">
                    <textarea name="" id="" cols="20" rows="5"></textarea>
                    <button className="btn btn_send">Send</button>
                  </div>
                </div>
              </div>
              <div className="detail_item_description">
                <h5>Description</h5>
                <p>{description}</p>
              </div>
              <div className="detail_seller">
                <div className="detail_seller_info">
                  <Avatar Avatar className="detail_seller_avatar">
                    J
                  </Avatar>
                  <div className="detail_seller_name">
                    <h5>Owen Kim</h5>
                    <p>Number of deal: 1000</p>
                  </div>
                </div>
                <div className="detail_seller_rate">
                  <h5>4.5/5</h5>
                  <h5>Going to seller's product ▶</h5>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Shop shopDetail={toShopDetail} itemViews={views} />
      )}
    </>
  );
};

export default ShopDetail;
