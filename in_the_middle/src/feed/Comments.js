import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { db } from "../firebase";
import firebase from "firebase";
import "./Comments.css";

const Comments = ({ user, postId }) => {
  const [email, setEmail] = useState();
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);
  //   const [comment, setComment] = useState("");
  console.log(user);
  console.log(postId);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("newPosts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    db.collection("newPosts")
      .doc(postId)
      .collection("comments")
      .add({
        email: user.displayName,
        // description: user.email,
        message: input,
        photoUrl: user.photoUrl || "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setInput("");
  };

  //   const postComment = (event) => {
  //     event.preventDefault();

  //     db.collection("newPosts").doc(postId).collection("comments").add({
  //       text: comment,
  //       username: user.displayName,
  //       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //     });
  //     setComment("");
  //   };

  return (
    <>
      <div className='comments__container'>
        <div className='comments__top'>
          <Avatar>{user.displayName && user.displayName.split("")[0]} </Avatar>
          <form onSubmit={onSubmit}>
            <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
            <button type='submit' onClick={onSubmit}>
              Post
            </button>{" "}
          </form>
        </div>
        <div className='post__comments'>
          {comments.map((comment) => (
            <p className='post__comments__comment'>
              <Avatar>{comment.email.split("")[0]}</Avatar>
              <b>{comment.email}</b>
              <p>{comment.message}</p>
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
