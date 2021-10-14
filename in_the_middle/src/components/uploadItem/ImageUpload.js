import React, { useState } from "react";
import { db, storage } from "../../firebase";
import firebase from "firebase";
import "./imageUpload.css";
import styled from "styled-components";

const ImageUploads = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Progress = styled.progress`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ImageUpload = ({ onClick }) => {
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
            // post image inside db
            db.collection("items").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              // caption: caption,
              imageUrl: url,
              // username: username,
            });

            setProgress(0);
            // setCaption("");
            setImage(null);
          });
      },
    );
  };
  return (
    <ImageUploads>
      <Progress value={progress} max="100" />
      <div className="buttons">
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      </div>
    </ImageUploads>
  );
};

export default ImageUpload;
