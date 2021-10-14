import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { db } from "../firebase";
import firebase from "firebase";
import styled from "styled-components";
import "./Comments.css";

const CommentsContainer = styled.div`
  margin: 1em auto;
  display: flex;
  flex-direction: column;
`;

const CommentsTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  &.MuiAvatar-root {
    width: 30px;
    height: 30px;
  }

  & form {
    margin-left: 10px;
  }

  & input {
    height: 50px;
    outline: none;
    margin: 0;
  }

  & form button {
    margin-left: 3px;
    background: #f0c14b;
    color: #111;
    border: none;
    padding: 2px;
    cursor: pointer;
    border-radius: 5px;
    width: 40px;
  }
`;

const PostComments = styled.div`
  & p {
    font-size: 15px;
    font-family: "Cairo", sans-serif;
  }
  & p b {
    margin-right: 10px;
    font-size: 15px;
  }
`;

const Comment = styled.div`
  display: flex;
  border: 1px solid #ffecb4;
  width: fit-content;
  padding: 5px;
  border-radius: 10px;
  background-color: #ffecb4;
  margin: 0em 2em 0.5em 2em;
  align-items: center;
  font-size: 1rem;

  &.MuiAvatar-root {
    width: 20px;
    height: 20px;
    font-size: 1rem;
    margin-right: 0.5rem;
  }

  & p {
    margin: 0 1rem;
    font-size: 1rem;
  }
`;

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
      <CommentsContainer className="comments__container">
        <CommentsTop className="comments__top">
          <Avatar>{user.displayName && user.displayName.split("")[0]} </Avatar>
          <form onSubmit={onSubmit}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit" onClick={onSubmit}>
              Post
            </button>{" "}
          </form>
        </CommentsTop>
        <PostComments className="post__comments">
          {comments.map((comment) => (
            <Comment className="post__comments__comment">
              <Avatar>{comment.email.split("")[0]}</Avatar>
              <b>{comment.email}</b>
              <p>{comment.message}</p>
            </Comment>
          ))}
        </PostComments>
      </CommentsContainer>
    </>
  );
};

export default Comments;
