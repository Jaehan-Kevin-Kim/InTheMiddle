import React from "react";
import "./FeedInputOption.css";
import styled from "styled-components";

const FeedInputOptions = styled.div`
  display: flex;
  color: grey;
  font-weight: 600;
  padding: 5px;
`;

function FeedInputOption({ Icon, name, color }) {
  return (
    <FeedInputOptions>
      <div className="icon" style={{ color: color }}>
        <Icon />
      </div>
      <div className="name">{name}</div>
    </FeedInputOptions>
  );
}

export default FeedInputOption;
