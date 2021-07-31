import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import CreateIcon from "@material-ui/icons/Create";
import "./Feed.css";
import FeedInputOption from "./FeedInputOption";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import Post from "./Post";
import firebase from "firebase";
import { db } from "../firebase";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { newPostAction } from "../actions/newPostsAction";

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
          }))
        );
      });
  }, []);

  useEffect(() => {
    setEmail(user.displayName);
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();
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
      <div className="feed__container">
        <div className="feed__top">
          <Avatar>{email && email.split("")[0]} </Avatar>
          <form onSubmit={onSubmit}>
            <CreateIcon className="icon" />
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit" onClick={onSubmit}>
              send
            </button>
          </form>
        </div>
        <div className="feed__bottom">
          <div className="">
            <FeedInputOption Icon={ImageIcon} name="Photo" color="#70B5F9" />
          </div>
          <FeedInputOption Icon={SubscriptionsIcon} name="Video" color="#E7A33E" />
        </div>
      </div>
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
