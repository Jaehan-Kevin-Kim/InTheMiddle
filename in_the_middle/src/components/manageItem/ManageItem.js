import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Header from "../header/Header";
import "./ManageItem.css";
import ManageItemEach from "./ManageItemEach";
import styled from "styled-components";
// import { db } from "../../firebase";

const ManageContainer = styled.div`
  width: 70%;
  margin: 1em auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 1.5em 3em;
  height: 80%;
  align-items: center;
  justify-content: center;
`;

const ManageItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;

  & h2 {
    margin-bottom: 10px;
  }
`;

const ManageItemList = styled.div``;

const ManageItem = ({ userId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.collection("items")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        // const result = snapshot.docs.filter(v => v.id = )
        setItems(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      );
  }, []);

  return (
    <>
      <Header />
      <ManageContainer>
        <ManageItems>
          <h2> Manage Post</h2>

          <ManageItemList>
            {items.map((item) => (
              <ManageItemEach
                key={item.id}
                manageItemObj={item}
                isOwner={item.data.userId === userId}
              />
              // console.log(item)
            ))}
            {/* <ManageItemEach /> */}
          </ManageItemList>

          {/* <li className='manageItem__list'>
        <input type='checkbox' name='check' />
        
          <div className='manageItem__list__item'>
        
            <div className='manageItem__list__item__left'>
             <img src={itemImg} alt='' />
       
              <div className='manageItem__list__item__info'>
            <p>{itemName}</p>
                 <p>${itemCost}</p>
               
              </div>
  
        
            </div>
        <div className='manageItem__list__item__right'></div>
       
          </div>
      
        </li>
 ))} */}
        </ManageItems>
      </ManageContainer>
    </>
  );
};

export default ManageItem;
