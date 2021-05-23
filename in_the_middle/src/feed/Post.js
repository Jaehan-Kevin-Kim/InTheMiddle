import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import PostInputOption from "./PostInputOption";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import "./Post.css";
import Comments from "./Comments";
// import { selectUser } from './features/userSlice';

const Post = ({ description, message, name, user, postId }) => {
  const [commentActive, setCommentActive] = useState(false);

  const commentActivator = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log(commentActive);
    if (commentActive) {
      setCommentActive(false);
    } else {
      setCommentActive(true);
    }
  };
  return (
    <>
      <div className='post__container'>
        <div className='post__top'>
          <Avatar> {name.split("")[0]} </Avatar>
          <div className='post__top__info'>
            <div className='post__top__info__name'>{name}</div>
            <div className='post__top__info__job'>{description}</div>
          </div>
        </div>
        <div className='post__line'></div>
        <div className='post__main'>
          <p>{message}</p>
        </div>
        <div className='post__bottom'>
          <PostInputOption Icon={ThumbUpAltOutlinedIcon} name='Like' color='gray' />
          <button onClick={commentActivator}>
            <PostInputOption Icon={ChatOutlinedIcon} name='Comment' color='gray' />
          </button>
          <PostInputOption Icon={ShareOutlinedIcon} name='Share' color='gray' />
          <PostInputOption Icon={SendOutlinedIcon} name='Send' color='gray' />
        </div>
        {commentActive && (
          <div className='comments'>
            <Comments user={user} postId={postId} />
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
