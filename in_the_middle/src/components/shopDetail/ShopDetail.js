import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import "./ShopDetail.css";
import { Avatar } from "@material-ui/core";
import { Link, Redirect, withRouter, useHistory } from "react-router-dom";
import Shop from "../shop/Shop";
import styled from "styled-components";

const Container = styled.div`
  /* background: rgb(170, 185, 181); */
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailItem = styled.div`
  display: flex;
  & img {
    object-fit: contain;
    margin-right: 1em;
    width: 300px;
  }
`;

const GoBackBtn = styled.button`
  margin: 30px;
  border: none;
  background-color: white;
  border: 3px solid #f2db66;
  outline: 0;
  height: 30px;
  width: 100px;
  cursor: pointer;
`;

const DetailItemMain = styled.div`
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 55%;
`;

const DetailItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const DetailItemInfoMsg = styled.div`
  display: flex;
  flex-direction: column;
`;

const BtnLike = styled.button`
  width: 3rem;
  cursor: pointer;
  border: none;
  background-color: #f2db66;
  outline: 0;
  height: 30px;
  width: 70px;
  cursor: pointer;
  border-radius: 20px;
`;

const BtnSend = styled.button`
  width: 3rem;
  cursor: pointer;
  border: none;
  background-color: #f2db66;
  outline: 0;
  height: 30px;
  width: 70px;
  cursor: pointer;
  border-radius: 20px;
`;

const DetailItemDescription = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 2px solid lightgray;
  width: 100%;

  & h5 {
    font-size: 20px;
  }
`;

const DetailSeller = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  width: 100%;
  border: 2px solid lightgray;
  padding: 20px;
`;

const DetailSellerInfo = styled.div`
  display: flex;
  align-items: center;
`;

const DetailSellerName = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailSellerRate = styled.div``;

const ShopDetail = ({ img, name, cost, location, description, shopDetail, views }) => {
  const [toShopDetail, setToShopDetail] = useState(shopDetail);
  console.log(img, name, cost, location);
  console.log(useHistory());
  const history = useHistory();

  const handleGoBack = () => {
    setToShopDetail(false);
    history.push("/shop");
  };

  const SellerAvatar = styled(Avatar)`
    display: flex;
    flex-direction: column;
  `;

  return (
    <>
      {toShopDetail ? (
        <>
          <Header />
          <GoBackBtn onClick={handleGoBack}>Go Back</GoBackBtn>
          {/* <Link to='/shop'>Go back </Link> */}
          {/* <Redirect to='/shopDetail'> </Redirect> */}
          <Container>
            <DetailItemMain>
              <DetailItem>
                <img src={img} alt="" />
                <DetailItemInfo>
                  <h1>{name}</h1>
                  <h3>${cost}</h3>
                  <h5>{location}</h5>
                  <BtnLike>Like</BtnLike>
                  <DetailItemInfoMsg>
                    <textarea name="" id="" cols="20" rows="5"></textarea>
                    <BtnSend>Send</BtnSend>
                  </DetailItemInfoMsg>
                </DetailItemInfo>
              </DetailItem>
              <DetailItemDescription>
                <h5>Description</h5>
                <p>{description}</p>
              </DetailItemDescription>
              <DetailSeller>
                <DetailSellerInfo>
                  {/* <Avatar className="detail_seller_avatar">J</Avatar> */}
                  <SellerAvatar>J</SellerAvatar>
                  <DetailSellerName>
                    <h5>Owen Kim</h5>
                    <p>Number of deal: 1000</p>
                  </DetailSellerName>
                </DetailSellerInfo>
                <DetailSellerRate>
                  <h5>4.5/5</h5>
                  <h5>Going to seller's product ▶</h5>
                </DetailSellerRate>
              </DetailSeller>
            </DetailItemMain>
          </Container>
        </>
      ) : (
        <Shop shopDetail={toShopDetail} itemViews={views} />
      )}
    </>
  );
};

export default ShopDetail;
