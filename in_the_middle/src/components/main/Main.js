import React from "react";
import "./Main.css";
import Header from "../header/Header";
import Shop from "../shop/Shop";
import { BrowserRouter, Link, Route } from "react-router-dom";
import styled from "styled-components";

const MainContainer = styled.div`
  margin: 0;
  background-color: rgb(255, 255, 254);
  height: 100%;
  width: 100%;
  align-items: center;
`;

const MainBennerImg = styled.div`
  width: 100%;
  height: 500px;
  background-image: url("https://images.pexels.com/photos/6231630/pexels-photo-6231630.jpeg?auto=compress&cs=tinysrgb&h=650&w=940");
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: -75px;
  opacity: 0.7;
  object-fit: cover;
`;

const MainSelectBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainSelect = styled.div``;

const MainSelectBtn = styled.button`
  border: none;
  background-color: #f2db66;
  outline: 0;
  height: 150px;
  width: 200px;
  font-size: 50px;
  margin-right: 30px;
  opacity: 0.75;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

function Main() {
  return (
    <>
      <MainContainer>
        <Header />
        <MainBennerImg>
          <img src="" alt="" />
        </MainBennerImg>
        <MainSelectBox>
          <MainSelect>
            <Link to="/shop">
              <MainSelectBtn>Shop</MainSelectBtn>
            </Link>
            <Link to="/feed">
              <MainSelectBtn>Feed</MainSelectBtn>
            </Link>
          </MainSelect>
        </MainSelectBox>
      </MainContainer>
    </>
  );
}

export default Main;
