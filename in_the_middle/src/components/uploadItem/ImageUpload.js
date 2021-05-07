import React, { useState } from "react";
import { db, storage } from "../../firebase";
import firebase from "firebase";
import "./imageUpload.css";

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
            //post image inside db
            // db.collection("items").add({
            //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            //   caption: caption,
            //   imageUrl: url,
            //   // username: username,
            // });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  return (
    <div className='imageUpload'>
      <progress className='imageUploadProgress' value={progress} max='100' />

      <input type='File' onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUpload;
