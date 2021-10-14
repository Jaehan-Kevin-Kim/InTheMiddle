import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import CreateIcon from "@material-ui/icons/Create";
import "./Feed.css";
import FeedInputOption from "./FeedInputOption";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import styled from "styled-components";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import Post from "./Post";
import firebase from "firebase";
import { db } from "../firebase";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { newPostAction } from "../actions/newPostsAction";

const FeedContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 80%;
  margin: 5em auto;
  border: 1px solid lightgrey;
  max-width: 1150px;
`;

const FeedTop = styled.div`
  display: flex;
  align-items: center;

  & form {
    display: flex;
    align-items: center;
    border: 1px solid lightgrey;
    border-radius: 25px;
    padding: 10px;
    height: 50px;
    color: grey;
    width: 90%;
    margin-left: 15px;
    position: relative;
  }

  & input {
    // margin-left: 5px;
    outline: none;
    border: none;
    margin: 0 0 0 5px;
    height: 15px;
  }

  & button {
    position: absolute;
    top: 10;
    right: 0;
    margin-right: 20px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid lightgrey;
  }
`;

const FeedBottom = styled.div`
  margin-top: 1em;
  width: 100%;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: space-evenly;
  height: 2em;

  & div:hover {
    background-color: whitesmoke !important;
    border-radius: 10px;
  }
`;

function Feed({ userId, user }) {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState();
  const [postId, setPostId] = useState("");
  const dispatch = useDispatch();
  const feeds = useSelector((state) => state.newpostsReducer.post);
  if (feeds) {
    console.log("feeds", feeds);
  }
  // console.log("feeds:", feeds);
  // const user = useSelector(selectUser);
  // console.log(user);
  // console.log(userId);

  // console.log(user);
  // const displayName = user.displayName;

  useEffect(() => {
    db.collection("newPosts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        );
      });
  }, []);

  useEffect(() => {
    setEmail(user.displayName);
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      return null;
    }
    const feed = {
      email: user.displayName,
      message: input,
      photoUrl: user.photoUrl || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      comment: "",
    };
    dispatch(newPostAction(feed));
    // dispatch(
    //   newPostAction({
    //     email: user.displayName,
    //     message: input,
    //     photoUrl: user.photoUrl || "",
    //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //     comment: "",
    //   })
    // );
    // dispatch({
    //   type: NEW_POST,
    //   // type: NEW_POST,
    //   // email: user.displayName,
    //   // message: input,
    //   // photoUrl: user.photoUrl || "",
    //   // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    // });
    db.collection("newPosts").add({
      email: user.displayName,
      // description: user.email,
      // postId:
      message: input,
      photoUrl: user.photoUrl || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <>
      <Header />
      <FeedContainer>
        <FeedTop>
          <Avatar>{email && email.split("")[0]} </Avatar>
          <form onSubmit={onSubmit}>
            <CreateIcon className="icon" />
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button style={{ cursor: "pointer" }} type="submit" onClick={onSubmit}>
              Send
            </button>
          </form>
        </FeedTop>
        <FeedBottom>
          <div className="">
            <FeedInputOption Icon={ImageIcon} name="Photo" color="#70B5F9" />
          </div>
          <FeedInputOption Icon={SubscriptionsIcon} name="Video" color="#E7A33E" />
        </FeedBottom>
      </FeedContainer>
      {posts.map(({ id, data: { description, message, email, photoUrl, timestamp } }) => (
        <Post
          key={id}
          postId={id}
          description={description}
          message={message}
          name={email}
          photoUrl={photoUrl}
          timestamp={timestamp}
          user={user}
        />
      ))}
    </>
  );
}

export default Feed;
