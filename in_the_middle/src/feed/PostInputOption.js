import React from "react";
import styled from "styled-components";
import "./PostInputOption.css";

const PostInputOptionStyle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background-color: whitesmoke;
    border-radius: 10px;
  }
`;

const PostInputOptionName = styled.div`
  margin-left: 3px;
`;

function PostInputOption({ Icon, name, color }) {
  return (
    <PostInputOptionStyle style={{ color: color }}>
      <Icon />
      <PostInputOptionName>{name}</PostInputOptionName>
    </PostInputOptionStyle>
  );
}

export default PostInputOption;
