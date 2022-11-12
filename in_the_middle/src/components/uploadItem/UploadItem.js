import React, { useState } from "react";
import "./UploadItem.css";
import Header from "../header/Header";
import { useHistory } from "react-router-dom";
import { db, storage } from "../../firebase";
import firebase from "firebase";
import styled from "styled-components";

const Upload = styled.div`
  height: 100%;
  background: rgba(255, 255, 251, 0.76);
  /* margin: 0; */
  margin: 3em auto;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadHeader = styled.h1`
  margin-bottom: 1.5em;
`;

const UploadForm = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 2em auto;
  width: 70%; */
  border: 1px solid lightgray;
  padding: 3em;
  margin-bottom: 1.5em;
`;

const UploadInput = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  & h3 {
    margin-right: 10px;
    margin-bottom: 10px;
    height: 2.5rem;
  }
`;
const Progress = styled.progress`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ItemInput = styled.input`
  height: 2.5rem;
  /* width: 100%; */
  display: flex;
  align-items: center;
`;

const ImageUpload = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  & .buttons {
    width: 100%;
  }
  & .buttons input {
    border-bottom: none;
  }
`;

const FileInput = styled.input`
  // width: 0.1px;
  height: 2.5rem;
  // opacity: 0;
  // overflow: hidden;
  // position: absolute;
  // z-index: -1;
`;
const UploadBtn = styled.button``;

const SubmitButton = styled.button`
  width: 3rem;
  cursor: pointer;
  border: none;
  background-color: #f2db66;
  outline: 0;
  height: 30px;
  width: 70px;
  cursor: pointer;
  border-radius: 20px;
`;

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
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
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
            // setProgress(0);
            setImage(null);
          });
      },
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
      <Header />
      <Upload>
        <UploadHeader>Upload Item</UploadHeader>
        <UploadForm>
          <UploadInput>
            <h3>Item Name</h3>
            <ItemInput
              type="text"
              placeholder="item name"
              onChange={(e) => setItemName(e.target.value)}
              value={itemName}
            />
          </UploadInput>
          <UploadInput>
            <h3>Price</h3>
            <ItemInput
              type="text"
              placeholder="$000"
              onChange={(e) => setItemCost(e.target.value)}
              value={itemCost}
            />
          </UploadInput>
          <UploadInput>
            <h3>City/Region</h3>
            <ItemInput
              type="text"
              placeholder="city and region"
              onChange={(e) => setItemRegion(e.target.value)}
              value={itemRegion}
            />
          </UploadInput>

          {/* <div className='upload_image'>
            <ImageUpload onClick={imageUploadFunction} />
          </div> */}
          <ImageUpload>
            <h3 style={{ alignSelf: "flex-start", marginBottom: "10px" }}>
              Image Upload
            </h3>
            <div className="buttons">
              <input type="file" onChange={handleChange} />
              <button onClick={handleUpload}>Upload</button>
            </div>
            <Progress
              style={{ marginTop: "-30px", marginBottom: "1rem" }}
              value={progress}
              max="100"
            />
          </ImageUpload>

          <div className="upload_description">
            <h3>Description</h3>
            <textarea
              name=""
              id=""
              cols="60"
              rows="5"
              onChange={(e) => setItemDesc(e.target.value)}
              value={itemDesc}
            />
          </div>
        </UploadForm>

        <SubmitButton className="btn_post" onClick={onSubmit}>
          Submit
        </SubmitButton>
      </Upload>
    </>
  );
};

export default UploadItem;
