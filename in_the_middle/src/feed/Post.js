import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import PostInputOption from "./PostInputOption";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import "./Post.css";
import Comments from "./Comments";
// import { selectUser } from './features/userSlice';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  width: 80%;
  margin: 1em auto;
  border: 1px solid lightgrey;
  max-width: 1150px;
`;

const PostTop = styled.div`
  display: flex;
  align-items: center;
`;

const PostTopInfo = styled.div`
  margin-left: 10px;
`;

const PostTopInfoName = styled.div`
  font-weight: 700;
`;

const PostTopInfoJob = styled.div`
  font-size: 12px;
  color: gray;
`;

const PostLine = styled.div`
  margin: 1em 0;
  border-bottom: 1px solid lightgrey;
`;

const PostBottom = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  & > button {
    background: none;
    border: none;
  }
`;
const CommentsStyle = styled.div`
  margin-top: 1.5em;
  border-top: 1px dashed lightgray;
`;

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
      <PostContainer>
        <PostTop>
          <Avatar> {name.split("")[0]} </Avatar>
          <PostTopInfo>
            <PostTopInfoName>{name}</PostTopInfoName>
            <PostTopInfoJob>{description}</PostTopInfoJob>
          </PostTopInfo>
        </PostTop>
        <PostLine></PostLine>
        <div>
          <p>{message}</p>
        </div>
        <PostBottom>
          <PostInputOption Icon={ThumbUpAltOutlinedIcon} name="Like" color="gray" />
          <button onClick={commentActivator}>
            <PostInputOption Icon={ChatOutlinedIcon} name="Comment" color="gray" />
          </button>
        </PostBottom>
        {commentActive && (
          <CommentsStyle>
            <Comments user={user} postId={postId} />
          </CommentsStyle>
        )}
      </PostContainer>
    </>
  );
};

export default Post;
