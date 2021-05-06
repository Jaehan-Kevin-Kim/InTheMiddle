import React from "react";
import Header from "../header/Header";
import "./ShopDetail.css";
import { Avatar } from "@material-ui/core";

function ShopDetail({ img, name, cost, location, description }) {
  // const [itemImg, setItemImg] = useState("");
  // const [itemCost, setItemCost] = useState("");
  // const [location, setLocation] = useState("");
  // const [itemName, setItemName] = useState("");
  // const [description, setDescription] = useState("");
  console.log(img, name, cost, location);

  return (
    <>
      <div className='container'>
        <Header />
        <div className='detail_item_main'>
          <div className='detail_item'>
            <img src={img} alt='' /> {/* item img */}
            <div className='detail_item_info'>
              <h1>{name}</h1>
              <h3>${cost}</h3> {/* price */}
              <h5>{location}</h5> {/* location */}
              <button className='btn btn_like'>Like</button>{" "}
              {/* 좋아요 버튼을 누르면 횟수가 적립되야함 */}
              <div className='detail_item_info_msg'>
                <textarea name='' id='' cols='20' rows='5'></textarea>
                <button className='btn btn_send'>Send</button> {/* 실시간 쳇 기능 */}
              </div>
            </div>
          </div>
          <div className='detail_item_description'>
            <h5>Description</h5>
            <p>{description}</p>
          </div>
          <div className='detail_seller'>
            <div className='detail_seller_info'>
              <Avatar Avatar className='detail_seller_avatar'>
                J
              </Avatar>
              <div className='detail_seller_name'>
                <h5>Owen Kim</h5> {/* seller name */}
                <p>Number of deal: 1000</p> {/* counting number */}
              </div>
            </div>
            <div className='detail_seller_rate'>
              <h5>4.5/5</h5> {/* rating */}
              <h5>Going to seller's product ▶</h5> {/* 판매자 페이지로 이동 */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopDetail;
