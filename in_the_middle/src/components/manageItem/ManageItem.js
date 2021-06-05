import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Header from "../header/Header";
import "./ManageItem.css";
import ManageItemEach from "./ManageItemEach";
// import { db } from "../../firebase";

const ManageItem = ({ userId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.collection("items")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setItems(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="manageItem">
        <h2> Manage Post</h2>

        <div>
          {items.map((item) => (
            <ManageItemEach
              key={item.id}
              manageItemObj={item}
              isOwner={item.data.userId === userId}
            />
            // console.log(item)
          ))}
          {/* <ManageItemEach /> */}
        </div>

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
      </div>
    </div>
  );
};

export default ManageItem;
