import React, { useState } from "react";
import "./UploadItem.css";
import Header from "../header/Header";
import { Link } from "react-router-dom";

function UploadItem() {
  const [itemName, setItemName] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [itemRegion, setItemRegion] = useState("");
  const [itemImg, setItemImg] = useState("");
  const [itemDesc, setItemDesc] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setItemImg(e.target.files[0]);
    }
  };

  const onSubmit = () => {
    console.log(itemImg, itemName, itemCost, itemRegion, itemDesc);
  };
  return (
    <>
      <div className='container'>
        <Header />
        <h1>Upload Item</h1>
        <div className='upload_form'>
          <div className='upload_input'>
            <h3>Item Name</h3>
            <input
              type='text'
              placeholder='item name'
              onChange={(e) => setItemName(e.target.value)}
              value={itemName}
            />
          </div>
          <div className='upload_input'>
            <h3>Price</h3>
            <input
              type='text'
              placeholder='$000'
              onChange={(e) => setItemCost(e.target.value)}
              value={itemCost}
            />
          </div>
          <div className='upload_input'>
            <h3>City/Region</h3>
            <input
              type='text'
              placeholder='city and region'
              onChange={(e) => setItemRegion(e.target.value)}
              value={itemRegion}
            />
          </div>

          <div className='upload_image'>
            <h3>Image Upload</h3>
            <input type='file' onChange={handleChange} />
            {/* <button>Upload</button> */}
          </div>

          <div className='upload_description'>
            <h3>Description</h3>
            <textarea
              name=''
              id=''
              cols='50'
              rows='5'
              onChange={(e) => setItemDesc(e.target.value)}
              value={itemDesc}
            />
          </div>
        </div>
        <Link to='/shop'>
          <button className='btn_post' onClick={onSubmit}>
            Submit
          </button>
        </Link>
      </div>
    </>
  );
}

export default UploadItem;
