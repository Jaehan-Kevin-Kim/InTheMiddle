import React, { useEffect, useState } from "react";
import "./UploadItem.css";
import Header from "../header/Header";
import { Link, Redirect, Route } from "react-router-dom";
import { db } from "../../firebase";
import firebase from "firebase";

function UploadItem() {
  const [itemName, setItemName] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [itemRegion, setItemRegion] = useState("");
  const [itemImg, setItemImg] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [redirect, setRedirect] = useState(false);

  console.log();
  // useEffect(() => {
  //   console.log("useEffect");
  //   return <Redirect to='/shop' />;
  // }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setItemImg(e.target.files[0]);
    }
  };

  const onSubmit = (e) => {
    console.log(itemImg, itemName, itemCost, itemRegion, itemDesc);
    e.preventDefault();
    db.collection("items").add({
      itemImg:
        "https://9to5mac.com/wp-content/uploads/sites/6/2019/11/how-to-quickly-select-move-delete-notes-iphone-ipad-two-finger-tap.jpeg?quality=82&strip=all",
      itemName,
      itemCost,
      itemRegion,
      itemDesc,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setItemName("");
    setItemDesc("");
    setItemRegion("");
    setItemCost("");
    setItemImg("");
    setRedirect(true);
    // <Redirect from='/uploadItem' to='/shop' />;
    // <Route path='/uploadItem'>
    //   {redirect ? <Redirect to='/shop' /> : <Redirect to='/uploadItem' />}
    //   {/* return <Redirect to='/shop' />; */}
    // </Route>;
  };

  <Route path='/uploadItem'>
    {onSubmit ? <Redirect to='/shop' /> : <Redirect to='/uploadItem' />}
    {/* return <Redirect to='/shop' />; */}
  </Route>;

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
        {/* <Link to='/shop'> */}
        <button className='btn_post' onClick={onSubmit}>
          {/* <Redirect to='/shop' />; */}
          Submit
        </button>
        {/* </Link> */}
      </div>
    </>
  );
}

export default UploadItem;
