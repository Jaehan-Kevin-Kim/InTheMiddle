import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Header from "../header/Header";
import "./ManageItem.css";
// import { db } from "../../firebase";

const ManageItem = ({ userId }) => {
  const [items, setItems] = useState([]);
  const [uid, setUid] = useState(userId);
  console.log(userId);

  useEffect(() => {
    // console.log(userId);
    console.log(uid);
    let unsubscribe;
    // if (userId) {
    //unsubscribe =
    db.collection("items")
      //   .doc(userId)
      .orderBy("timestamp", "desc")
      .onSnapshot(
        (snapshot) =>
          // setItems(
          //   console.log(snapshot)
          snapshot.docs.map((doc) => {
            if (doc.data().userId === userId) {
              console.log(doc.data());
              setItems(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(),
                }))
              );
            }
          })
        // )
      );
    console.log(items);
    //   console.log("setItems", items);
    //   console.log(userId);
    // }
    // console.log(items);
    // return () => {
    //   unsubscribe();
    // };
  }, [userId]);

  return (
    <div className='container'>
      <Header />
      <div className='manageItem'>
        <h2> Manage Post</h2>
        {items.map(({ data: { itemName, itemImg, itemCost } }) => (
          <li className='manageItem__list'>
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
        ))}
      </div>
    </div>
  );
};

export default ManageItem;
