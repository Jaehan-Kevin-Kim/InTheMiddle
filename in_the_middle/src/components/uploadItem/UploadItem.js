import React, { useState } from "react";
import "./UploadItem.css";
import Header from "../header/Header";
import { useHistory } from "react-router-dom";
import { db, storage } from "../../firebase";
import firebase from "firebase";

const UploadItem = ({ userId }) => {
  const [itemName, setItemName] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [itemRegion, setItemRegion] = useState("");
  const [itemImg, setItemImg] = useState();
  const [itemDesc, setItemDesc] = useState("");
  // const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress fuction ...
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        //error fuction ...
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete fuction ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setItemImg(url);
            setProgress(0);
            setImage(null);
          });
      }
    );
  };

  const onSubmit = (e) => {
    console.log(itemImg, itemName, itemCost, itemRegion, itemDesc);
    e.preventDefault();

    db.collection("items").add({
      userId,
      itemImg,
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
    history.push("/shop");
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

          {/* <div className='upload_image'>
            <ImageUpload onClick={imageUploadFunction} />
          </div> */}
          <div className='imageUpload'>
            <progress className='imageUploadProgress' value={progress} max='100' />

            <input type='File' onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
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

        <button className='btn_post' onClick={onSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default UploadItem;
